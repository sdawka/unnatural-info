export const ACTS = [
  { key: 'volo-ergo-sum', roman: 'I', name: 'What moves us', alias: 'Volo Ergo Sum', tagline: 'You can want two things at once.', premise: 'An invitation, a hesitation, a wish to belong. Begin with the pulls that make a day matter, and the trouble of sharing it with other people.', color: 'var(--color-act-i)', cls: 'i' },
  { key: 'initd', roman: 'II', name: 'How we make sense of things', alias: 'init.d', tagline: 'The story arrives before the reply.', premise: 'A silence becomes a rejection. A person becomes a label. Explore the boundaries and shortcuts that make a world understandable, and what they leave outside.', color: 'var(--color-act-ii)', cls: 'ii' },
  { key: 'mmm', roman: 'III', name: 'How we learn, create, and change', alias: 'MMM', tagline: 'The plan meets the people.', premise: 'Test a recipe, make a meal, leave room for a surprise. Try three overlapping modes of engagement, then ask what is worth changing and what deserves care.', color: 'var(--color-act-iii)', cls: 'iii' },
] as const;

export const BOOK_DESCRIPTION = 'An online philosophical journey through wanting, knowing, and living together. Ordinary scenes, open questions, and small experiments. No philosophy background needed.';
export const START_CHAPTER = 'prologue';

export function readingMinutes(body = '') {
  const prose = body.replace(/<[^>]+>/g, ' ').replace(/\[[^\]]*\]\([^)]*\)/g, match => match.slice(1, match.indexOf(']')));
  return Math.max(1, Math.ceil(prose.trim().split(/\s+/).filter(Boolean).length / 220));
}

export function draftLabel(status: string) {
  return status === 'stub' ? 'Outline' : status === 'final' ? 'Revised chapter' : 'Working draft';
}

export const READING_PATHS = [
  { title: 'An argument that keeps happening', description: 'Different wants, a shared event, and the stories between them.', chapters: [2, 4, 6, 24] },
  { title: 'A label that has become too small', description: 'Where a description helps, where it hardens, and how to loosen it.', chapters: [3, 9, 11, 23] },
  { title: 'A plan that never leaves your head', description: 'Learning, making, and finding room for what you cannot arrange.', chapters: [13, 15, 17, 23] },
] as const;
