import type { Answers, Practice } from './practices';

export type SavedNote = {
  version: 1 | 2;
  title: string;
  labels: Record<string, string>;
  answers: Answers;
  updated?: string;
};

const VALID_KEY = /^[a-zA-Z][a-zA-Z0-9]*$/;
const MAX_VALUE_LENGTH = 12000;
const MAX_METADATA_LENGTH = 500;

const LEGACY_WIDGET_LABELS: Record<string, string> = {
  priority: 'Route priority',
  stepFree: 'Need a route without steps',
  reveal: 'Extra context revealed',
  access: 'Garden access',
  work: 'Garden maintenance',
  voice: 'Garden decisions',
  weather: 'Weather',
  label: 'Label considered',
  comparison: 'Experimental comparison',
  mode: 'Response considered',
  order: 'Order of concerns',
};

/**
 * Frozen metadata for notes written by the first release of the practices.
 * Do not derive this from PRACTICES: current prompts may change while these
 * labels must continue to describe existing notes accurately.
 */
const LEGACY_V1_PRACTICE_META: Record<string, { title: string; labels: Record<string, string> }> = {
  notebook: {
    title: 'The story in the silence',
    labels: {
      event: 'A small moment',
      observed: 'What could someone else have observed?',
      story: 'The explanation I added',
      unknown: 'What I do not know yet',
      claim: 'One specific claim I could reconsider',
      confidence: 'My confidence in that claim',
      later: 'When I return: what happened, or what do I see differently?',
      laterConfidence: 'My confidence now',
      remaining: 'What remains unresolved?',
    },
  },
  wants: {
    title: 'Two wants at the same table',
    labels: {
      choice: 'A choice I am considering',
      urge: 'The immediate pull',
      enjoyment: 'What I expect to enjoy',
      obligation: 'What I feel I owe, and to whom',
      fear: 'What I am trying to avoid',
      value: 'What I would like this choice to honor',
      room: 'One option that makes room for more than one concern',
    },
  },
  disagreement: {
    title: 'The missing part of the conversation',
    labels: {
      first: 'My first explanation of their reply',
      alternative: 'Another account that could fit the same words',
      revision: 'After the reveal: what changes, and what does not?',
      question: 'A sincere question I could ask them',
    },
  },
  maps: {
    title: 'The shortest way is not always a way',
    labels: {
      prediction: 'Before revealing the detail: who might find this recommendation unhelpful?',
      hidden: 'This map was useful for… and hid…',
      ownmap: 'A map, metric, or plan in my own life with a similar omission',
    },
  },
  labels: {
    title: 'One event, three people',
    labels: {
      evidence: 'What evidence would support or weaken this label?',
      observation: 'Describe the behavior without describing the whole person',
      category: 'A form or category I have struggled to fit',
      excluded: 'What does the category make possible? What does it leave out?',
    },
  },
  garden: {
    title: 'Who gets a key to the garden?',
    labels: {
      cost: 'Who carries the cost of my chosen rules?',
      missing: 'What important part of a real garden does this model leave out?',
      rule: 'One rule I would propose, and how people could challenge it',
    },
  },
  experiment: {
    title: 'The bread improved. Was it the salt?',
    labels: {
      prediction: 'My prediction before seeing the results',
      learned: 'After the results: what can I reasonably conclude?',
      rival: 'Another explanation still worth considering',
      test: 'One small test of my own, including a comparison',
    },
  },
  modes: {
    title: 'More of what you are already doing?',
    labels: {
      situation: 'A situation I am bringing to this',
      reason: 'Why might this response fit?',
      goal: 'Is the goal itself worth reconsidering?',
      switch: 'What would make me choose a different response?',
    },
  },
  attention: {
    title: 'A cup, before the next thing',
    labels: {
      use: 'First: describe what this object is for',
      qualities: 'Then: notice color, texture, wear, weight, or associations',
      change: 'Did anything change in my attention? “No” is an answer.',
      limit: 'What would this experience be unable to prove?',
    },
  },
  'one-week': {
    title: 'One small thing, then come back',
    labels: {
      change: 'One small change I want to try',
      cue: 'If… then I will…',
      expect: 'What I expect to notice',
      limit: 'When I will stop, adapt, or ask for help',
      date: 'A date to revisit this',
      result: 'On returning: what actually happened?',
      alternative: 'What else might explain it?',
      keep: 'What will I keep, change, or disagree with?',
    },
  },
};

export function practiceStorageKey(slug: string): string {
  return `unnatural:practice:v2:${slug}`;
}

export function legacyStorageKey(slug: string): string {
  return `unnatural:practice:v1:${slug}`;
}

function validAnswers(value: unknown): Answers | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return Object.fromEntries(
    Object.entries(value).filter(
      (entry): entry is [string, string] =>
        VALID_KEY.test(entry[0]) &&
        typeof entry[1] === 'string' &&
        entry[1].length <= MAX_VALUE_LENGTH,
    ),
  );
}

function validLabels(value: unknown): Record<string, string> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const labels = Object.fromEntries(
    Object.entries(value).filter(
      (entry): entry is [string, string] =>
        VALID_KEY.test(entry[0]) &&
        typeof entry[1] === 'string' &&
        entry[1].length > 0 &&
        entry[1].length <= MAX_METADATA_LENGTH,
    ),
  );
  return Object.keys(labels).length === Object.keys(value).length ? labels : null;
}

function validUpdated(value: unknown): string | undefined {
  return typeof value === 'string' && value.length <= MAX_METADATA_LENGTH ? value : undefined;
}

export function readPracticeNote(raw: string | null): SavedNote | null {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
    const saved = value as Record<string, unknown>;
    if (saved.version !== 2 || typeof saved.title !== 'string' || saved.title.length === 0 || saved.title.length > MAX_METADATA_LENGTH) return null;
    const answers = validAnswers(saved.answers);
    const labels = validLabels(saved.labels);
    if (!answers || !labels) return null;
    return { version: 2, title: saved.title, labels, answers, updated: validUpdated(saved.updated) };
  } catch {
    return null;
  }
}

export function readLegacyPracticeNote(raw: string | null, slug: string): SavedNote | null {
  if (!raw) return null;
  const metadata = LEGACY_V1_PRACTICE_META[slug];
  if (!metadata) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
    const saved = value as Record<string, unknown>;
    if (saved.version !== 1) return null;
    const answers = validAnswers(saved.answers);
    if (!answers) return null;
    return {
      version: 1,
      title: metadata.title,
      labels: { ...LEGACY_WIDGET_LABELS, ...metadata.labels },
      answers,
      updated: validUpdated(saved.updated),
    };
  } catch {
    return null;
  }
}

export function createPracticeNote(
  practice: Practice,
  answers: Answers,
  widgetLabels: Record<string, string>,
): SavedNote {
  const safeAnswers = validAnswers(answers) ?? {};
  const labels = Object.fromEntries(practice.fields.map(field => [field.key, field.label]));
  return {
    version: 2,
    title: practice.title,
    labels: { ...widgetLabels, ...labels },
    answers: safeAnswers,
    updated: new Date().toISOString(),
  };
}

export function noteMarkdown(note: SavedNote): string {
  const sections = Object.entries(note.answers)
    .filter(([, value]) => value.trim().length > 0)
    .map(([key, value]) => `## ${note.labels[key] ?? `Unlabelled field (${key})`}\n\n${value}\n`)
    .join('\n');
  const updated = note.updated ? `\nSaved: ${note.updated}\n` : '';
  return `# ${note.title}\n${updated}\n${sections}`;
}
