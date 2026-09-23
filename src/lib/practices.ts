export type Field = { key: string; label: string; hint?: string; type?: 'text' | 'date' | 'range'; after?: boolean };
export type Practice = { slug: string; title: string; minutes: string; question: string; scene: string; note: string; chapters: number[]; framing?: string[]; fields: Field[]; source?: { title: string; url: string } };

export const PRACTICES: Practice[] = [
  {
    slug: 'notebook', title: 'The story in the silence', minutes: '5–10',
    question: 'How much happened before you explained it?',
    scene: 'An invitation is unanswered. You catch yourself composing a reply to a rejection that nobody has sent. Bring a small moment like that, or use this imaginary one.',
    note: 'Keep your first account and your later account side by side. A useful change can be a smaller claim, a new question, or a reason to keep your view.',
    chapters: [4, 6, 24], framing: ['prologue', 'epilogue'],
    fields: [
      { key: 'event', label: 'A small moment', hint: 'Describe enough to recognize it later. Leave names out if you prefer.' },
      { key: 'observed', label: 'What could someone else have observed?', hint: 'For example: I sent a message yesterday and have not received a reply.' },
      { key: 'story', label: 'The explanation I added' },
      { key: 'unknown', label: 'What I do not know yet' },
      { key: 'claim', label: 'One specific claim I could reconsider', hint: 'A claim about what happened, rather than a rating of your worth.' },
      { key: 'confidence', label: 'My confidence in that claim', type: 'range' },
      { key: 'later', label: 'When I return: what happened, or what do I see differently?', after: true },
      { key: 'laterConfidence', label: 'My confidence now', type: 'range', after: true },
      { key: 'remaining', label: 'What remains unresolved?', after: true },
    ],
  },
  {
    slug: 'wants', title: 'Two wants at the same table', minutes: '5–8', question: 'What if the hesitation is doing more than one job?',
    scene: 'You want to accept a dinner invitation. You also want an evening with nobody asking you anything. Neither wish disappears when you call yourself indecisive.',
    note: 'These are possible descriptions, not hidden causes the exercise can diagnose. “I do not know” is a useful answer.', chapters: [1, 2, 3, 7],
    fields: [
      { key: 'choice', label: 'A choice I am considering' },
      { key: 'urge', label: 'The immediate pull' },
      { key: 'enjoyment', label: 'What I expect to enjoy', hint: 'Wanting something and enjoying it may come apart.' },
      { key: 'obligation', label: 'What I feel I owe, and to whom' },
      { key: 'fear', label: 'What I am trying to avoid' },
      { key: 'value', label: 'What I would like this choice to honor' },
      { key: 'room', label: 'One option that makes room for more than one concern' },
    ], source: { title: 'Berridge and Robinson on wanting and liking', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5171207/' },
  },
  {
    slug: 'disagreement', title: 'The missing part of the conversation', minutes: '5–8', question: 'Which explanation did you hear first?',
    scene: 'You invite a friend to dinner. They answer: “Must be nice to have that much free time.” Your first reply is already taking shape.',
    note: 'A possible explanation is not an excuse, and extra context need not erase a disagreement. The aim is a better question.', chapters: [2, 4, 24],
    fields: [
      { key: 'first', label: 'My first explanation of their reply' },
      { key: 'alternative', label: 'Another account that could fit the same words' },
      { key: 'revision', label: 'After the reveal: what changes, and what does not?', after: true },
      { key: 'question', label: 'A sincere question I could ask them', after: true },
    ],
  },
  {
    slug: 'maps', title: 'The shortest way is not always a way', minutes: '4–7', question: 'What did your map decide was worth showing?',
    scene: 'Three routes reach the same dinner. A bus is fast, a footbridge is free, and a path takes the long way through the park. Choose what matters, then look for the missing detail.',
    note: 'The routes are invented. A map can be accurate about one thing and unhelpful for a particular traveler.', chapters: [5, 6, 11],
    fields: [
      { key: 'prediction', label: 'Before revealing the detail: who might find this recommendation unhelpful?' },
      { key: 'hidden', label: 'This map was useful for… and hid…', after: true },
      { key: 'ownmap', label: 'A map, metric, or plan in my own life with a similar omission', after: true },
    ],
  },
  {
    slug: 'labels', title: 'One event, three people', minutes: '5–8', question: 'How did a missed task become a whole personality?',
    scene: 'Someone has not washed the dishes after dinner. “Lazy,” you think. Watch what changes when the same behavior receives a different label.',
    note: 'An alternative label is another hypothesis. A precise observation leaves room to ask what happened.', chapters: [8, 9, 10, 11],
    fields: [
      { key: 'evidence', label: 'What evidence would support or weaken this label?' },
      { key: 'observation', label: 'Describe the behavior without describing the whole person' },
      { key: 'category', label: 'A form or category I have struggled to fit', hint: 'You can use an imaginary example: a form that assumes every worker has one job.' },
      { key: 'excluded', label: 'What does the category make possible? What does it leave out?' },
    ],
  },
  {
    slug: 'garden', title: 'Who gets a key to the garden?', minutes: '6–10', question: 'A rule can help the garden and burden a gardener. Can you see both?',
    scene: 'Ten households share a garden. Change three rules and the weather in this deliberately small model. Look at the harvest alongside the work, access, and say that people have.',
    note: 'This is an invented model of one season, not a forecast or a test of a political system. Its assumptions determine its results. Change your interpretation when the assumptions do not fit.', chapters: [9, 19, 20],
    fields: [
      { key: 'cost', label: 'Who carries the cost of my chosen rules?' },
      { key: 'missing', label: 'What important part of a real garden does this model leave out?' },
      { key: 'rule', label: 'One rule I would propose, and how people could challenge it' },
    ], source: { title: 'Ostrom on governing shared resources', url: 'https://www.aeaweb.org/articles?id=10.1257/aer.100.3.641' },
  },
  {
    slug: 'experiment', title: 'The bread improved. Was it the salt?', minutes: '6–10', question: 'How many stories fit one successful attempt?',
    scene: 'Your second loaf tastes better. You changed the salt, the oven temperature, and the flour. What have you learned? Choose a comparison and inspect the invented results.',
    note: 'A few made-up ratings illustrate the difficulty of learning from variation. They are not baking advice or scientific evidence.', chapters: [12, 14, 24],
    fields: [
      { key: 'prediction', label: 'My prediction before seeing the results' },
      { key: 'learned', label: 'After the results: what can I reasonably conclude?', after: true },
      { key: 'rival', label: 'Another explanation still worth considering', after: true },
      { key: 'test', label: 'One small test of my own, including a comparison', after: true },
    ], source: { title: 'Why interventions need assumptions', url: 'https://plato.stanford.edu/entries/causation-mani/' },
  },
  {
    slug: 'modes', title: 'More of what you are already doing?', minutes: '5–8', question: 'Does this moment need a better plan, a first step, or some room?',
    scene: 'You have rewritten an apology six times. You could improve it again. You could send a short, sincere version. You could ask what you are hoping the perfect wording will guarantee.',
    note: 'Learning, Creating, and Becoming are overlapping modes. Rest and outside help also belong among your options. This chooser does not diagnose a personality or level of maturity.', chapters: [13, 14, 15, 16, 17, 18],
    fields: [
      { key: 'situation', label: 'A situation I am bringing to this' },
      { key: 'reason', label: 'Why might this response fit?' },
      { key: 'goal', label: 'Is the goal itself worth reconsidering?' },
      { key: 'switch', label: 'What would make me choose a different response?' },
    ],
  },
  {
    slug: 'attention', title: 'A cup, before the next thing', minutes: '3–6', question: 'Does a familiar thing still have anything to show you?',
    scene: 'Find a cup, a stone, or another ordinary object. You can also imagine one. There is nothing you have to discover.',
    note: 'Different attention can change an experience. It does not establish what reality ultimately is. You can stop, skip, or report no change.', chapters: [16, 22],
    fields: [
      { key: 'use', label: 'First: describe what this object is for' },
      { key: 'qualities', label: 'Then: notice color, texture, wear, weight, or associations', hint: 'Look for as long or as briefly as you like.' },
      { key: 'change', label: 'Did anything change in my attention? “No” is an answer.' },
      { key: 'limit', label: 'What would this experience be unable to prove?' },
    ],
  },
  {
    slug: 'one-week', title: 'One small thing, then come back', minutes: '5 now, 5 later', question: 'What survives a week outside this book?',
    scene: 'Choose something small enough to try and ordinary enough to matter. Ask one question before assuming. Leave one evening unplanned. Make one task easier to begin.',
    note: 'You choose when to return; the site does not send reminders. Stop or adapt if the experiment is costly or unhelpful. A result can be a reason to reject the book’s suggestion.', chapters: [15, 23], framing: ['epilogue'],
    fields: [
      { key: 'change', label: 'One small change I want to try' },
      { key: 'cue', label: 'If… then I will…', hint: 'Name a recognizable cue and an action under your influence.' },
      { key: 'expect', label: 'What I expect to notice' },
      { key: 'limit', label: 'When I will stop, adapt, or ask for help' },
      { key: 'date', label: 'A date to revisit this', type: 'date' },
      { key: 'result', label: 'On returning: what actually happened?', after: true },
      { key: 'alternative', label: 'What else might explain it?', after: true },
      { key: 'keep', label: 'What will I keep, change, or disagree with?', after: true },
    ], source: { title: 'Research on if–then plans', url: 'https://www.socmot.uni-konstanz.de/publications/implementation-intentions-and-goal-achievement-meta-analysis-effects-and-processes' },
  },
];

export function practicesForChapter(number?: number, slug?: string) {
  return PRACTICES.filter(p => (number != null && p.chapters.includes(number)) || (slug && p.framing?.includes(slug)));
}

export const ROUTES = [
  { name: 'Footbridge', minutes: 12, cost: 0, steps: 38 },
  { name: 'Bus and pavement', minutes: 8, cost: 3, steps: 0 },
  { name: 'Park path', minutes: 26, cost: 0, steps: 0 },
];

export function recommendRoute(priority: string, stepFree: boolean) {
  return [...ROUTES].filter(r => !stepFree || r.steps === 0).sort((a, b) => priority === 'cost' ? a.cost - b.cost || a.minutes - b.minutes : a.minutes - b.minutes)[0];
}

export function gardenOutcome(access: string, work: string, voice: string, weather: string) {
  const water = weather === 'dry' ? 60 : 100;
  const demand = access === 'open' ? 120 : 75;
  const maintenance = work === 'shared' ? 8 : 4;
  const coordination = voice === 'all' ? 4 : 1;
  return { harvest: Math.max(0, Math.floor(Math.min(water, demand) * .6 + maintenance * 3 - coordination * 2)), hours: maintenance + coordination, excluded: access === 'open' ? 0 : 4, unheard: voice === 'all' ? 0 : 6, water, demand, maintenance, coordination };
}

export type Answers = Record<string, string>;
export function parseSavedAnswers(raw: string | null): Answers | null {
  if (!raw) return null;
  try {
    const saved = JSON.parse(raw);
    if (saved?.version !== 1 || !saved.answers || typeof saved.answers !== 'object' || Array.isArray(saved.answers)) return null;
    return Object.fromEntries(Object.entries(saved.answers).filter((entry): entry is [string, string] => {
      const [key, value] = entry;
      return /^[a-zA-Z][a-zA-Z0-9]*$/.test(key) && typeof value === 'string' && value.length <= 12000;
    }));
  } catch { return null; }
}
