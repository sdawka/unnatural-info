export const ACTS = [
  { key: 'volo-ergo-sum', roman: 'I', name: 'What moves us', alias: 'Volo Ergo Sum', tagline: 'Something matters before we explain why.', premise: 'Begin with the pulls of living bodies, the things we care about, and the different worlds people seem to inhabit. How can different wants and viewpoints meet a reality we share?', color: 'var(--color-act-i)', cls: 'i' },
  { key: 'initd', roman: 'II', name: 'How we make sense of things', alias: 'init.d', tagline: 'Our pictures of the world get to work.', premise: 'A boundary gives a thing its shape. A name becomes a category; a category enters a form, a rule, an institution. Follow the distinctions that make knowledge and shared life possible, and what they leave out.', color: 'var(--color-act-ii)', cls: 'ii' },
  { key: 'mmm', roman: 'III', name: 'How we learn, create, and change', alias: 'MMM', tagline: 'We change the world. It changes us.', premise: 'Follow learning, creating, and becoming through ordinary life, science, technology, and collective change. Ask what survives across generations, what counts as progress, and how our ways of living belong to nature.', color: 'var(--color-act-iii)', cls: 'iii' },
] as const;

export const BOOK_DESCRIPTION = 'A philosophical journey through what moves us, how we know, and how ideas shape society, technology, and our place in nature. No philosophy background needed.';
export const START_CHAPTER = 'prologue';

export function readingMinutes(body = '') {
  const prose = body.replace(/<[^>]+>/g, ' ').replace(/\[[^\]]*\]\([^)]*\)/g, match => match.slice(1, match.indexOf(']')));
  return Math.max(1, Math.ceil(prose.trim().split(/\s+/).filter(Boolean).length / 220));
}

export function draftLabel(status: string) {
  return status === 'stub' ? 'Outline' : status === 'final' ? 'Revised chapter' : 'Working draft';
}

export type ReadingPath = {
  id: string;
  title: string;
  description: string;
  scene: string;
  question: string;
  chapters: readonly [number, ...number[]];
};

export const READING_PATHS = [
  {
    id: 'what-matters',
    title: 'I don’t always understand what I want, or what makes life feel worthwhile.',
    description: 'Follow wanting into care, value, attention, and the conditions that make a life livable.',
    scene: 'You reach for the phone, find very little there, and reach again. Later, you water a plant without expecting much excitement. One thing keeps asking for your attention. The other may be something you actually care about.',
    question: 'How do wanting, enjoying, and finding something worth doing come apart?',
    chapters: [1, 3, 7, 16, 23],
  },
  {
    id: 'different-worlds',
    title: 'People can live in the same world and seem to inhabit different ones.',
    description: 'Explore different wants, shared evidence, social categories, and traditions with different ideas of a good life.',
    scene: 'A school report calls a child easily distracted. At home, that child spends an hour finding out how a broken radio comes apart. The teacher and the parent may both have noticed something real. They may also be asking different things of the same person.',
    question: 'What would help us understand the difference—and what could show that an account is mistaken?',
    chapters: [2, 4, 8, 22],
  },
  {
    id: 'society',
    title: 'The way society works can feel inevitable, even though people made it.',
    description: 'Follow labels and measures into institutions: what they make possible, whom they fit, and how they can change.',
    scene: 'A library opens at nine and closes at five. Those hours make a service possible: somebody can staff it, clean it, and know when to arrive. They also make it difficult to use if you work nine to five. The timetable has become part of the shape of people’s days.',
    question: 'How do arrangements we made come to feel like facts of nature, and who gets to remake them?',
    chapters: [9, 11, 19, 20],
  },
  {
    id: 'knowledge',
    title: 'We have so much information. I’m not sure what we actually know.',
    description: 'Move from useful pictures to evidence, experiments, and the public work of correcting a claim.',
    scene: 'Imagine a bus service reporting that more buses now arrive on time. A passenger says the service has become worse. Perhaps canceled buses are absent from the figures, or the route they need has gone. The number needs a question beside it before it can settle this one.',
    question: 'What was counted, what was left out, and what evidence would change either account?',
    chapters: [6, 12, 14, 24],
  },
  {
    id: 'progress',
    title: 'We can change so much. It’s harder to say what counts as progress.',
    description: 'Follow ideas into things we make, then examine learning, technology, and the consequences of collective change.',
    scene: 'A road is widened. Driving along it becomes quicker; walking across it becomes harder. Something has improved. Before calling the whole change progress, we need to know for whom, at what cost, and what happens next.',
    question: 'How do we decide what our growing ability to change the world should serve?',
    chapters: [10, 13, 15, 17, 18, 20],
  },
  {
    id: 'nature',
    title: 'We’re part of nature. Somehow, we’ve come to feel apart from it.',
    description: 'Explore living boundaries, the physical work of information, and what connects human culture with the rest of life.',
    scene: 'Lunch arrives on a plate, looking pleasantly self-contained. Follow it back and there are plants, soil, water, other living things, someone’s work, a recipe, and a route to the shop. Then it becomes part of a body capable of wondering where nature ends.',
    question: 'What changes when living beings can describe their world and pass those descriptions on?',
    chapters: [5, 10, 21],
  },
] as const satisfies readonly ReadingPath[];
