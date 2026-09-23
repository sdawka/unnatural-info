export const ACTS = [
  { key: 'volo-ergo-sum', roman: 'I', name: 'What moves us', alias: 'Volo Ergo Sum', tagline: 'You can want two things at once.', premise: 'Begin with the pulls that make a day matter: desire, obligation, habit, and the trouble of sharing a life with other people.', color: 'var(--color-act-i)', cls: 'i' },
  { key: 'initd', roman: 'II', name: 'How we make sense of things', alias: 'init.d', tagline: 'The story arrives before the evidence.', premise: 'A person becomes a label. A hunch becomes a fact. Explore the shortcuts that make a world understandable, and what they leave outside.', color: 'var(--color-act-ii)', cls: 'ii' },
  { key: 'mmm', roman: 'III', name: 'How we learn, create, and change', alias: 'MMM', tagline: 'The plan meets the world.', premise: 'Try, notice, revise, and leave room for surprise. Three overlapping modes of engagement meet the question of what deserves care.', color: 'var(--color-act-iii)', cls: 'iii' },
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
  { title: 'I keep doing things I do not really want', description: 'Start with automatic action, then follow habit, attention, and choice into the wider book.', chapters: [1, 2, 6, 24] },
  { title: 'Everything gets done, but what for?', description: 'Look at maintenance, meaning, and the difference between a life that functions and one that feels inhabited.', chapters: [3, 5, 16, 23] },
  { title: 'I am trying to work it out, but life interrupts', description: 'Begin with a body that has needs, then track how uncertainty and other people change the plan.', chapters: [13, 15, 17, 24] },
] as const;
