/// <reference path="../worker-configuration.d.ts" />

import { Think } from "@cloudflare/think";
import type { Session } from "agents/experimental/memory/session";
import { createOpenAI } from "@ai-sdk/openai";
import { generateObject, tool, type LanguageModel, type ToolSet } from "ai";
import { z } from "zod";

import { UNNATURAL_SYSTEM_PROMPT } from "./prompts";

// ---------------------------------------------------------------------------
// Types shared across the pipeline tools
// ---------------------------------------------------------------------------

type TopicType = "concept" | "situation" | "skill";
type WantsType = "understanding" | "achieving";
type MmmStage = "measure" | "model" | "manifest";

interface Classification {
  type: TopicType;
  lenses: string[];
  wantsType: WantsType;
  notes: string;
}

// ---------------------------------------------------------------------------
// UnnaturalAgent
// ---------------------------------------------------------------------------

export class UnnaturalAgent extends Think<Env> {
  override maxSteps = 6;
  override chatRecovery = true;

  /** Main reasoning model — used for intake + synthesis orchestration. */
  override getModel(): LanguageModel {
    return this.openrouter()("google/gemma-4-26b-a4b-it") as unknown as LanguageModel;
  }

  /** Cheap model used inside pipeline tools for classification + extraction. */
  private cheapModel(): LanguageModel {
    return this.openrouter()("anthropic/claude-haiku-4-5") as unknown as LanguageModel;
  }

  private openrouter() {
    return createOpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: this.env.OPENROUTER_API_KEY,
      headers: {
        "HTTP-Referer": "https://unnatural.info",
        "X-Title": "Unnatural Analysis Agent",
      },
    });
  }

  override getSystemPrompt(): string {
    return UNNATURAL_SYSTEM_PROMPT;
  }

  override configureSession(session: Session): Session | Promise<Session> {
    // Cache the (large) system prompt across turns.
    return session.withCachedPrompt();
  }

  override getTools(): ToolSet {
    const env = this.env;
    const cheap = () => this.cheapModel();
    const main = () => this.getModel();
    const agent = this;

    return {
      classify_topic: tool({
        description:
          "Classify the user's topic. Decides whether this is a concept, situation, or skill; " +
          "picks the framework lenses to apply; and detects whether the user wants understanding " +
          "or to achieve something. Call this first, once you have enough context from intake.",
        parameters: z.object({
          topic: z.string().describe("Short name of the thing being analyzed."),
          userWant: z
            .string()
            .describe("What the user wants out of this analysis (stated or inferred)."),
          context: z
            .string()
            .describe("Any extra context the user gave during intake."),
        }),
        execute: async ({ topic, userWant, context }) => {
          try {
            const { object } = await generateObject({
              model: cheap(),
              schema: z.object({
                type: z.enum(["concept", "situation", "skill"]),
                lenses: z.array(z.string()),
                wantsType: z.enum(["understanding", "achieving"]),
                notes: z.string(),
              }),
              prompt:
                `Classify the following input for an "unnatural" framework analysis.\n\n` +
                `Topic: ${topic}\n` +
                `User wants: ${userWant}\n` +
                `Context: ${context}\n\n` +
                `Return:\n` +
                `- type: "concept" (an idea/thing), "situation" (a scenario with parties), or "skill" (a practice/process)\n` +
                `- lenses: 3-6 short tokens naming the framework lenses most relevant ` +
                `(e.g. "three-blades", "mmm-loop", "layered-realism", "thingification", ` +
                `"info-physical-duality", "wants-per-party", "cost-of-cut", "meaning-dimensions").\n` +
                `- wantsType: "understanding" if the user wants to see clearly, "achieving" if they want to accomplish something.\n` +
                `- notes: 1-2 sentences on what the analysis should prioritize.`,
            });
            return object satisfies Classification;
          } catch (err) {
            // Fallback classification if the cheap model fails.
            return {
              type: "concept" as const,
              lenses: ["three-blades", "mmm-loop", "layered-realism"],
              wantsType: "understanding" as const,
              notes: `Fallback classification — cheap model failed: ${
                err instanceof Error ? err.message : String(err)
              }`,
            } satisfies Classification;
          }
        },
      }),

      analyze_topic: tool({
        description:
          "Produce a detailed prose analysis of the topic, applying the framework lenses chosen " +
          "during classification. Call this after classify_topic.",
        parameters: z.object({
          classification: z.object({
            type: z.enum(["concept", "situation", "skill"]),
            lenses: z.array(z.string()),
            wantsType: z.enum(["understanding", "achieving"]),
            notes: z.string(),
          }),
          topic: z.string(),
          context: z.string(),
        }),
        execute: async ({ classification, topic, context }) => {
          const lensGuidance = lensGuidanceFor(classification.type);
          try {
            const { object } = await generateObject({
              model: main(),
              schema: z.object({ analysis: z.string() }),
              prompt:
                `You are applying the "unnatural" framework to analyze a ${classification.type}.\n\n` +
                `Topic: ${topic}\n` +
                `Context: ${context}\n` +
                `User wants: ${classification.wantsType}\n` +
                `Relevant lenses: ${classification.lenses.join(", ")}\n` +
                `Notes: ${classification.notes}\n\n` +
                `${lensGuidance}\n\n` +
                `Return a single field "analysis" containing detailed prose — no headers, ` +
                `no markdown sections, just paragraphs. This prose will be structured into a ` +
                `final document in a later step. Be direct, specific, and unsentimental. ` +
                `Use framework terms correctly. Avoid filler.`,
            });
            return { analysis: object.analysis };
          } catch (err) {
            return {
              analysis:
                `(Analysis generation failed: ${
                  err instanceof Error ? err.message : String(err)
                }. Topic: ${topic}. Type: ${classification.type}.)`,
            };
          }
        },
      }),

      synthesize_analysis: tool({
        description:
          "Synthesize the prose analysis into a structured markdown document with labeled sections. " +
          "Call this after analyze_topic. Returns the final document to show the user.",
        parameters: z.object({
          topic: z.string(),
          type: z.enum(["concept", "situation", "skill"]),
          analysis: z.string(),
          wantsType: z.enum(["understanding", "achieving"]),
        }),
        execute: async ({ topic, type, analysis, wantsType }) => {
          const sections = sectionsFor(type);
          try {
            const { object } = await generateObject({
              model: main(),
              schema: z.object({ document: z.string() }),
              prompt:
                `Turn the following prose analysis into a structured markdown document.\n\n` +
                `Topic: ${topic}\n` +
                `Type: ${type}\n` +
                `User wants: ${wantsType}\n\n` +
                `Use exactly these section headers, in this order:\n` +
                `## ${topic} — ${capitalize(type)} Analysis\n` +
                sections.map((s) => `### ${s}`).join("\n") +
                `\n\nIf a section genuinely does not apply, write "N/A" with a brief reason.\n` +
                `Do not invent new sections. Do not omit sections.\n` +
                `End with exactly 3 numbered follow-up questions under a "### To Go Deeper" section.\n\n` +
                `Source prose:\n${analysis}`,
            });
            return { document: object.document };
          } catch (err) {
            // Fallback: emit a minimal valid document using the source prose directly.
            const doc =
              `## ${topic} — ${capitalize(type)} Analysis\n\n` +
              `### Summary\n\n${analysis}\n\n` +
              `### To Go Deeper\n\n1. What would change if a core distinction were redrawn?\n` +
              `2. Where is attention actually going, vs. stated intent?\n` +
              `3. What would close the MMM loop here?\n\n` +
              `(Synthesis failed: ${err instanceof Error ? err.message : String(err)})`;
            return { document: doc };
          }
        },
      }),

      store_analysis: tool({
        description:
          "Store a generalized (no personal details) version of the analysis in the repository. " +
          "Call this last, after the document is complete. Returns the stored id.",
        parameters: z.object({
          topic: z.string(),
          type: z.enum(["concept", "situation", "skill"]),
          document: z.string(),
          wantsType: z.enum(["understanding", "achieving"]),
          analysis: z.string(),
        }),
        execute: async ({ topic, type, document, wantsType, analysis }) => {
          try {
            // Per-user daily cap. The Agent DO is keyed by user.id, so a
            // counter in this DO's own storage is naturally per-user.
            const cap = parseInt(env.DAILY_ANALYSIS_CAP ?? "20", 10);
            const today = new Date().toISOString().slice(0, 10);
            const counterKey = `analyses:${today}`;
            const current = ((await agent.ctx.storage.get(counterKey)) as number | undefined) ?? 0;
            if (current >= cap) {
              return {
                id: "",
                stored: false,
                error: `Daily analysis cap reached (${cap} per day). Try again tomorrow.`,
              };
            }

            // Extract structured fields from the prose using the cheap model.
            const extraction = await extractMetadata(cheap(), topic, type, analysis);

            const id = crypto.randomUUID();
            const tags = extractTags(type, analysis, extraction.primaryLens);
            const userId = agent.name ?? null;

            await env.DB.prepare(
              `INSERT INTO analyses (id, user_id, topic_name, type, mmm_stage, primary_lens, wants_type, tags, summary, full_analysis, created_at)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            )
              .bind(
                id,
                userId,
                extraction.generalizedTopic,
                type,
                extraction.mmmStage,
                extraction.primaryLens,
                wantsType,
                JSON.stringify(tags),
                extraction.summary,
                document,
                Date.now(),
              )
              .run();

            await agent.ctx.storage.put(counterKey, current + 1);
            // Expire the counter ~36h out so stale dates clean themselves up.
            await agent.ctx.storage.setAlarm(Date.now() + 36 * 60 * 60 * 1000);

            return { id, stored: true, remaining: cap - (current + 1) };
          } catch (err) {
            return {
              id: "",
              stored: false,
              error:
                err instanceof Error ? err.message : String(err),
            };
          }
        },
      }),
    };
  }

  /**
   * Alarm handler: sweep stale per-day counters. Agent DOs persist storage
   * for the lifetime of the user, so without cleanup daily counter keys
   * would accumulate indefinitely.
   */
  async alarm(): Promise<void> {
    const today = new Date().toISOString().slice(0, 10);
    const entries = await this.ctx.storage.list({ prefix: "analyses:" });
    for (const key of entries.keys()) {
      if (key !== `analyses:${today}`) {
        await this.ctx.storage.delete(key);
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function capitalize(s: string): string {
  return s.length === 0 ? s : s[0].toUpperCase() + s.slice(1);
}

function lensGuidanceFor(type: TopicType): string {
  switch (type) {
    case "concept":
      return (
        `For a concept, apply:\n` +
        `- Information/Physical split: what is the informational part vs the physical substrate?\n` +
        `- Layered Realism: which of the five tiers does it primarily inhabit?\n` +
        `- Three Blades: which blade created or maintains it? What distinction solidified, at what cost?\n` +
        `- Thingification: what was once fluid here? What did the naming cost?`
      );
    case "situation":
      return (
        `For a situation, apply:\n` +
        `- Wants at play for each party (not stated preferences — where attention actually goes).\n` +
        `- Second Blade divergence: where do each party's models drift from reality?\n` +
        `- Third Blade: what valences drive behavior before reasoning kicks in?\n` +
        `- Cost of the current cut: what is being discarded by the distinctions in play?\n` +
        `- Meaning dimensions (coherence / purpose / significance) where relevant.`
      );
    case "skill":
      return (
        `For a skill, apply:\n` +
        `- MMM stage diagnosis: is the practitioner in Measure, Model, or Manifest?\n` +
        `- Where is the loop stalling (stalled measure / model / manifest)?\n` +
        `- What would unstick it? Be concrete.\n` +
        `- What wants sustain the skill? What wants undermine it?\n` +
        `- What thingification in this domain has become an obstacle?`
      );
  }
}

function sectionsFor(type: TopicType): string[] {
  const common = [
    "What This Is",
    "The Wants at Play",
    "The Three Blades (What Cuts Were Made)",
    "Information vs. Physical Reality",
    "Layer of Reality",
    "Cost of the Current Distinctions",
    "Where the Loop Is (MMM Status)",
    "Summary",
    "To Go Deeper",
  ];
  if (type === "skill") {
    // For skills the MMM section is central; info/physical split less relevant.
    return [
      "What This Is",
      "The Wants at Play",
      "Where the Loop Is (MMM Status)",
      "The Three Blades (What Cuts Were Made)",
      "Cost of the Current Distinctions",
      "Summary",
      "To Go Deeper",
    ];
  }
  if (type === "situation") {
    // Situations need per-party wants treatment; surface meaning dimensions.
    return [
      "What This Is",
      "The Wants at Play",
      "The Three Blades (What Cuts Were Made)",
      "Layer of Reality",
      "Cost of the Current Distinctions",
      "Where the Loop Is (MMM Status)",
      "Summary",
      "To Go Deeper",
    ];
  }
  return common;
}

interface ExtractedMetadata {
  generalizedTopic: string;
  mmmStage: MmmStage | null;
  primaryLens: string;
  summary: string;
}

async function extractMetadata(
  model: LanguageModel,
  topic: string,
  type: TopicType,
  analysis: string,
): Promise<ExtractedMetadata> {
  try {
    const { object } = await generateObject({
      model,
      schema: z.object({
        generalizedTopic: z
          .string()
          .describe(
            "The topic name with any personal/identifying details stripped — a generic label.",
          ),
        mmmStage: z
          .enum(["measure", "model", "manifest"])
          .nullable()
          .describe("Dominant MMM stage surfaced in the analysis, or null if not applicable."),
        primaryLens: z
          .string()
          .describe(
            "Single most important framework lens for this analysis (e.g. 'three-blades', 'mmm-loop', 'thingification').",
          ),
        summary: z
          .string()
          .describe("2-3 sentence abstract of the analysis, generalized (no personal details)."),
      }),
      prompt:
        `Extract repository metadata from an "unnatural" framework analysis. ` +
        `Strip personal details — names, employers, exact numbers, identifying stories — ` +
        `and keep the structural content.\n\n` +
        `Topic: ${topic}\n` +
        `Type: ${type}\n` +
        `Analysis:\n${analysis}`,
    });
    return {
      generalizedTopic: object.generalizedTopic || topic,
      mmmStage: object.mmmStage,
      primaryLens: object.primaryLens || "three-blades",
      summary: object.summary || "",
    };
  } catch {
    // Conservative fallback — store with minimal metadata rather than fail the turn.
    return {
      generalizedTopic: topic,
      mmmStage: type === "skill" ? "model" : null,
      primaryLens: "three-blades",
      summary: analysis.slice(0, 400),
    };
  }
}

function extractTags(type: TopicType, analysis: string, primaryLens: string): string[] {
  const tags = new Set<string>();
  tags.add(type);
  tags.add(primaryLens);

  const markers: Array<[RegExp, string]> = [
    [/thingifi/i, "thingification"],
    [/layered realis|layer of realit/i, "layered-realism"],
    [/first blade|self\s*\/\s*non-self/i, "first-blade"],
    [/second blade|world\s*\/\s*model/i, "second-blade"],
    [/third blade|good\s*\/\s*bad|valence/i, "third-blade"],
    [/measure\b|\bmap\b/i, "measure"],
    [/\bmodel\b|manipulat/i, "model"],
    [/manifest|\bmake\b/i, "manifest"],
    [/meaning|coherence|purpose|significance/i, "meaning"],
    [/institution|social fact/i, "institutional"],
    [/information.*physical|physical.*information/i, "info-physical"],
  ];

  for (const [re, tag] of markers) {
    if (re.test(analysis)) tags.add(tag);
  }

  return Array.from(tags).slice(0, 6);
}
