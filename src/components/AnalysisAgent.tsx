import React, { useEffect, useMemo, useState, type FormEvent } from "react";
import { useAgent } from "agents/react";
import { useAgentChat } from "@cloudflare/ai-chat/react";
import type { UIMessage } from "ai";

const AGENT_URL =
  (typeof import.meta !== "undefined" &&
    (import.meta as unknown as { env?: Record<string, string> }).env?.PUBLIC_AGENT_URL) ||
  "https://unnatural-agent.dawka.workers.dev";

interface SessionUser {
  id: string;
  email: string;
  name?: string;
}

interface SessionResponse {
  user?: SessionUser;
  session?: { id: string; userId: string; expiresAt: string };
}

type AuthState =
  | { status: "loading" }
  | { status: "signed-out" }
  | { status: "signed-in"; user: SessionUser };

/**
 * Look through messages newest-first for a synthesized analysis document.
 * The agent's synthesize step produces markdown starting with
 * `## <topic> - <Type> Analysis`.
 */
function findAnalysisDoc(messages: UIMessage[]): string | null {
  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    if (msg.role !== "assistant") continue;
    const text = messageText(msg);
    if (/^##\s+.+\sAnalysis\b/m.test(text)) {
      return text;
    }
  }
  return null;
}

/** Flatten all text parts from a UIMessage into a single string. */
function messageText(msg: UIMessage): string {
  const parts = msg.parts ?? [];
  return parts
    .map((p) => {
      if (p.type === "text" && typeof (p as { text?: unknown }).text === "string") {
        return (p as { text: string }).text;
      }
      return "";
    })
    .join("");
}

/**
 * Ultra-minimal markdown renderer - handles headings, bold, italic, inline
 * code, line breaks, and paragraphs. Intentionally not a full parser.
 */
function renderMarkdown(src: string): string {
  const escaped = src
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const lines = escaped.split("\n");
  const out: string[] = [];
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length > 0) {
      const joined = paragraph.join(" ");
      out.push(`<p>${inlineMd(joined)}</p>`);
      paragraph = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (line === "") {
      flushParagraph();
      continue;
    }
    const h = /^(#{1,6})\s+(.*)$/.exec(line);
    if (h) {
      flushParagraph();
      const level = h[1].length;
      out.push(`<h${level}>${inlineMd(h[2])}</h${level}>`);
      continue;
    }
    const li = /^[-*]\s+(.*)$/.exec(line);
    if (li) {
      flushParagraph();
      out.push(`<li>${inlineMd(li[1])}</li>`);
      continue;
    }
    const ol = /^(\d+)\.\s+(.*)$/.exec(line);
    if (ol) {
      flushParagraph();
      out.push(`<li>${inlineMd(ol[2])}</li>`);
      continue;
    }
    paragraph.push(line);
  }
  flushParagraph();

  return out.join("\n");
}

function inlineMd(s: string): string {
  return s
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

// ---------------------------------------------------------------------------
// Sign-in view
// ---------------------------------------------------------------------------

function SignIn({ onSent }: { onSent: () => void }) {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch(`${AGENT_URL}/api/auth/magic-link/send-magic-link`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, callbackURL: window.location.href }),
      });
      if (!res.ok) {
        const body = await res.text();
        throw new Error(`Request failed (${res.status}): ${body}`);
      }
      setSent(true);
      onSent();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={styles.panel}>
      <h2 style={styles.h2}>Sign in to analyze</h2>
      <p style={styles.muted}>
        Enter your email - we'll send a magic link. No password.
      </p>
      {sent ? (
        <p style={styles.success}>
          Check your inbox for a sign-in link, then return to this page.
        </p>
      ) : (
        <form onSubmit={submit} style={styles.form}>
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            disabled={sending}
          />
          <button type="submit" disabled={sending || !email} style={styles.button}>
            {sending ? "Sending..." : "Send magic link"}
          </button>
          {error && <p style={styles.error}>{error}</p>}
        </form>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Chat view
// ---------------------------------------------------------------------------

function Chat({ user }: { user: SessionUser }) {
  const agentUrl = useMemo(() => new URL(AGENT_URL), []);

  // Connect to the UnnaturalAgent Durable Object via WebSocket. agents/react
  // normalizes the class name to kebab-case ("unnatural-agent") for routing.
  const agent = useAgent({
    host: agentUrl.host,
    agent: "unnatural-agent",
    name: user.id,
  });

  const { messages, sendMessage, status, isStreaming, error } = useAgentChat({
    agent,
    credentials: "include",
  });

  const [input, setInput] = useState("");
  const analysisDoc = useMemo(
    () => findAnalysisDoc(messages as UIMessage[]),
    [messages],
  );
  const isWorking = status === "streaming" || isStreaming || status === "submitted";

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isWorking) return;
    sendMessage({ text: input });
    setInput("");
  };

  return (
    <div style={styles.chat}>
      <header style={styles.chatHeader}>
        <div>
          <h1 style={styles.h1}>Analyze</h1>
          <p style={styles.muted}>Signed in as {user.email}</p>
        </div>
      </header>

      <div style={styles.messages} aria-live="polite">
        {messages.length === 0 && (
          <p style={styles.muted}>
            Describe something you want to understand - a concept, a situation, or
            a skill. The agent will apply the unnatural framework.
          </p>
        )}
        {(messages as UIMessage[]).map((m) => (
          <Message key={m.id} message={m} />
        ))}
        {isWorking && <p style={styles.analyzing}>Analyzing...</p>}
        {error && <p style={styles.error}>{error.message}</p>}
      </div>

      {analysisDoc && <AnalysisDocument markdown={analysisDoc} />}

      <form onSubmit={submit} style={styles.inputRow}>
        <input
          type="text"
          placeholder="What do you want to analyze?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isWorking}
          style={styles.input}
        />
        <button type="submit" disabled={isWorking || !input.trim()} style={styles.button}>
          Send
        </button>
      </form>
    </div>
  );
}

function Message({ message }: { message: UIMessage }) {
  const text = messageText(message);
  const isUser = message.role === "user";
  return (
    <div style={{ ...styles.message, ...(isUser ? styles.userMsg : styles.assistantMsg) }}>
      <div style={styles.role}>{isUser ? "you" : "agent"}</div>
      <div
        style={styles.msgBody}
        dangerouslySetInnerHTML={{ __html: renderMarkdown(text || " ") }}
      />
    </div>
  );
}

function AnalysisDocument({ markdown }: { markdown: string }) {
  return (
    <section style={styles.analysisDoc} aria-label="Analysis document">
      <div style={styles.analysisHeader}>Analysis Document</div>
      <div
        style={styles.analysisBody}
        dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }}
      />
    </section>
  );
}

// ---------------------------------------------------------------------------
// Root component
// ---------------------------------------------------------------------------

export function AnalysisAgent() {
  const [auth, setAuth] = useState<AuthState>({ status: "loading" });

  const checkSession = async () => {
    try {
      const res = await fetch(`${AGENT_URL}/api/auth/get-session`, {
        credentials: "include",
      });
      if (!res.ok) {
        setAuth({ status: "signed-out" });
        return;
      }
      const body = (await res.json()) as SessionResponse | null;
      if (body && body.user) {
        setAuth({ status: "signed-in", user: body.user });
      } else {
        setAuth({ status: "signed-out" });
      }
    } catch {
      setAuth({ status: "signed-out" });
    }
  };

  useEffect(() => {
    void checkSession();
  }, []);

  if (auth.status === "loading") {
    return (
      <div style={styles.panel}>
        <p style={styles.muted}>Checking session...</p>
      </div>
    );
  }

  if (auth.status === "signed-out") {
    return <SignIn onSent={() => void checkSession()} />;
  }

  return <Chat user={auth.user} />;
}

// ---------------------------------------------------------------------------
// Minimal inline styles - Astro has no Tailwind configured here.
// ---------------------------------------------------------------------------

const styles: Record<string, React.CSSProperties> = {
  panel: {
    border: "1px solid #ddd",
    padding: "1.5rem",
    borderRadius: "4px",
    maxWidth: "520px",
    margin: "3rem auto",
  },
  h1: { fontSize: "1.75rem", fontWeight: 400, margin: 0 },
  h2: { fontSize: "1.25rem", fontWeight: 500, marginBottom: "0.5rem" },
  muted: { color: "#666", fontSize: "0.95rem", lineHeight: 1.5 },
  success: { color: "#0a6", marginTop: "1rem" },
  error: { color: "#c33", marginTop: "0.5rem" },
  form: { display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1rem" },
  input: {
    padding: "0.6rem 0.75rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem",
    fontFamily: "inherit",
    width: "100%",
  },
  button: {
    padding: "0.6rem 1rem",
    border: "1px solid #111",
    background: "#111",
    color: "#fff",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  chat: { display: "flex", flexDirection: "column", gap: "1rem" },
  chatHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderBottom: "1px solid #eee",
    paddingBottom: "1rem",
  },
  messages: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    minHeight: "200px",
  },
  message: {
    padding: "0.75rem 1rem",
    borderRadius: "4px",
    border: "1px solid #eee",
  },
  userMsg: { background: "#f7f7f7" },
  assistantMsg: { background: "#fff" },
  role: {
    fontSize: "0.7rem",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#888",
    marginBottom: "0.25rem",
  },
  msgBody: { fontSize: "1rem", lineHeight: 1.6 },
  analyzing: {
    fontStyle: "italic",
    color: "#888",
    padding: "0.5rem 0",
  },
  inputRow: {
    display: "flex",
    gap: "0.5rem",
    borderTop: "1px solid #eee",
    paddingTop: "1rem",
  },
  analysisDoc: {
    marginTop: "1.5rem",
    padding: "1.5rem",
    border: "2px solid #111",
    borderRadius: "4px",
    background: "#fafafa",
  },
  analysisHeader: {
    fontFamily: "ui-monospace, monospace",
    fontSize: "0.75rem",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "#666",
    marginBottom: "1rem",
  },
  analysisBody: { fontSize: "1rem", lineHeight: 1.7 },
};
