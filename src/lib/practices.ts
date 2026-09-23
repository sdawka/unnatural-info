export type Field = { key: string; label: string; hint?: string; type?: 'text' | 'date' | 'range'; after?: boolean };
export type Practice = { slug: string; title: string; minutes: string; question: string; scene: string; concept: string; connection: string; steps: string[]; note: string; chapters: number[]; framing?: string[]; fields: Field[]; source?: { title: string; url: string } };

export const PRACTICES: Practice[] = [
  {
    slug: 'wants', title: 'Before the explanation arrives', minutes: '3–5',
    question: 'What was already happening when you decided what you were doing?',
    scene: 'Your hand reaches for the phone, the cup, the last bit of bread. A perfectly reasonable explanation usually comes along. Watch one reach before giving it the full committee report.',
    concept: 'Will, feeling, and thought',
    connection: 'Chapter 1 distinguishes an orientation, a felt state, and a reason. Chapter 7 asks how something comes to count as good or bad for us. Here you try to separate them in one small event.',
    steps: ['Notice one ordinary urge to reach, move, look, or stop. You can recall a recent one.', 'Pause briefly if convenient. Notice the direction of the pull, any bodily feeling, and the words that explain it.', 'Let the moment continue. Was getting the thing as enjoyable as wanting it? Would you choose it again?'],
    note: 'A recollection cannot settle which process came first or caused the others. A gap between wanting, liking, and choosing is enough to notice.',
    chapters: [1, 7], framing: ['prologue'],
    fields: [
      { key: 'event', label: 'The particular reach or urge I noticed' },
      { key: 'urge', label: 'Toward what, or away from what?' },
      { key: 'feeling', label: 'What did it feel like before I explained it?', hint: 'A bodily description is enough. Nothing clear is an answer too.' },
      { key: 'reason', label: 'The explanation that came with it' },
      { key: 'enjoyment', label: 'When I followed it: did wanting and enjoying match?', after: true },
      { key: 'endorsement', label: 'Having noticed that, would I choose the same thing?', after: true },
    ], source: { title: 'Berridge and Robinson on wanting and liking', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5171207/' },
  },
  {
    slug: 'disagreement', title: 'One window, two worlds', minutes: '4–6',
    question: 'Must somebody be mistaken for two people to want different things?',
    scene: 'Two people share a kitchen. One wants the window open. The other wants it closed. Before appointing an unreasonable person, see what each position might make sensible.',
    concept: 'Different wants, a shared world',
    connection: 'Chapter 2 treats a direction as a difference: toward this, away from that. Chapter 4 asks what the different positions still have to answer to together.',
    steps: ['Give each person a reason that could be true at the same time as the other’s.', 'Open the extra detail. Separate the facts about the room from what each person wants.', 'Propose one observation and one arrangement that take both positions seriously.'],
    note: 'The room is imagined. There may be a real conflict even after everybody understands it. Agreement is not the test of whether you noticed the distinction.',
    chapters: [2, 4],
    fields: [
      { key: 'open', label: 'A reason to want the window open' },
      { key: 'closed', label: 'A reason to want it closed, compatible with the first' },
      { key: 'shared', label: 'After the detail: one fact both accounts must accommodate', after: true },
      { key: 'test', label: 'What could we check, and what would still be a difference in wants?', after: true },
      { key: 'arrangement', label: 'One arrangement worth trying for these two people', after: true },
    ],
  },
  {
    slug: 'edges', title: 'Where do you end?', minutes: '3–5',
    question: 'A boundary can be necessary without being the whole story.',
    scene: 'Your skin seems a reasonable place to stop counting you. Then lunch arrives from outside, and air keeps crossing the border without filling in a form.',
    concept: 'The first blade: self and world',
    connection: 'Chapter 5 asks how a living thing maintains an edge while depending on what crosses it. Chapter 8 asks us to inspect what a distinction is doing before treating it as absolute.',
    steps: ['Consider an ordinary breath, a sip of water, and a cup held in your hand. Imagining them is enough.', 'For each, ask separately: is it inside my body, necessary to its activity, or something I count as me? These questions need not have the same answer.', 'Draw or describe one useful boundary. Name the job it does and one dependence that continues across it.'],
    note: 'This does not establish that the self is an illusion. It lets you inspect the difference between having an edge and being independent of everything beyond it.',
    chapters: [5, 8], fields: [
      { key: 'inside', label: 'One thing inside my body that I hesitate to call “me”' },
      { key: 'outside', label: 'One thing outside my boundary that my activity depends on' },
      { key: 'rule', label: 'For this purpose, I draw the line here…' },
      { key: 'cost', label: 'What does that line help me handle? What connection does it hide?' },
    ],
  },
  {
    slug: 'notebook', title: 'What the cup has actually told you', minutes: '4–7',
    question: 'Which part did you meet, and which part did you supply?',
    scene: 'A cup sits on the table, warm to the touch. “Someone has just made tea,” you think. The cup has made no such announcement.',
    concept: 'A model and what might correct it',
    connection: 'Chapter 6 separates the world from our workable picture of it. Chapter 24 asks what would make that picture more answerable to evidence. Your job is to build a claim small enough to check.',
    steps: ['Use the imagined cup, or an ordinary object near you. Record a visible, audible, or otherwise directly noticed detail.', 'Write the explanation you added. Name a different history that could leave the same detail.', 'Choose one thing you could check. If you actually check it, keep the first account beside the revised one.'],
    note: 'Even observations involve interpretation. The useful distinction here is between the narrower report and the larger claim being built from it.',
    chapters: [4, 6, 24], framing: ['epilogue'], fields: [
      { key: 'observed', label: 'The particular detail I noticed' },
      { key: 'claim', label: 'The larger claim I built from it' },
      { key: 'alternative', label: 'Another history that could fit the detail' },
      { key: 'test', label: 'One check that could help distinguish those accounts' },
      { key: 'confidence', label: 'My confidence in the larger claim', type: 'range' },
      { key: 'result', label: 'If I check: what did I find?', after: true },
      { key: 'revision', label: 'What claim can I now make, and what remains unknown?', after: true },
    ],
  },
  {
    slug: 'maps', title: 'The shortest way is not always a way', minutes: '4–7',
    question: 'What did the map decide was worth showing?',
    scene: 'You need to get to the shop. A bus is fast, a footbridge is free, and a path takes the long way through the park. A map can be right about every number it shows and still send somebody the wrong way.',
    concept: 'Map and territory; the cost of a distinction',
    connection: 'Chapters 6 and 11 ask what a useful simplification preserves and who lives with what it omits. Here the omission changes which route is usable.',
    steps: ['Choose time or money as the priority. Say what that choice makes visible.', 'Predict a missing fact before opening the detail. Then change the recommendation to account for it.', 'Sketch a familiar journey on paper. Add one thing your usual map ignores and say whose journey it changes.'],
    note: 'These routes are invented. The exercise tests a map’s fitness for a particular traveler; the map need not contain everything to earn its keep.',
    chapters: [6, 11], fields: [
      { key: 'prediction', label: 'What fact could make this recommendation unusable for someone?' },
      { key: 'hidden', label: 'Useful for… but it left out…', after: true },
      { key: 'cost', label: 'Who carries the cost of that omission?', after: true },
      { key: 'ownmap', label: 'The detail I added to my own sketch, and whose route it changes', after: true },
    ],
  },
  {
    slug: 'labels', title: 'The cup changes jobs', minutes: '4–6',
    question: 'How much of a thing’s identity is a set of instructions?',
    scene: 'Imagine the same chipped cup described as a utensil, a keepsake, or stock in a shop. The chip stays put. The sensible thing to do with it moves around.',
    concept: 'Thingification: what a category holds still',
    connection: 'Chapters 8, 9, and 11 examine how categories let us handle a changing world. Try changing the category while keeping the material object fixed, then trace what action the new description permits.',
    steps: ['Try each description below. For each, decide whether to use, repair, keep, replace, or discard the cup.', 'Name the detail each description makes important and something it ignores.', 'Try the same operation with a role such as “customer,” “carer,” or “employee.” Ask who gets to challenge the description.'],
    note: 'The material properties still matter: a description cannot mend a leak. Categories also change which properties we treat as decisive.',
    chapters: [8, 9, 11], fields: [
      { key: 'actions', label: 'Utensil / keepsake / stock: what would I do in each case?' },
      { key: 'unchanged', label: 'What stayed the same about the cup?' },
      { key: 'excluded', label: 'Which description left out something that matters?' },
      { key: 'person', label: 'For a human role: what does the category permit, and who can challenge it?' },
    ],
  },
  {
    slug: 'patterns', title: 'A few marks move your hand', minutes: '3–5',
    question: 'How does something on this screen become something on your paper?',
    scene: 'Find a scrap of paper and a pen, or trace with a finger. A very small drawing will do. Artistic talent has been excused from this part of the proceedings.',
    concept: 'Information and its physical carrier',
    connection: 'Chapter 10 follows patterns carried by physical things into physical consequences. Chapter 19 follows them into artifacts. Here you can watch one instruction travel from screen to action.',
    steps: ['Follow the first instruction. Switch its presentation and ask whether the task has changed.', 'Choose the changed instruction and make a second drawing.', 'Trace the chain: screen, marks, interpretation, hand, paper. Which parts were necessary for the pattern to do anything here?'],
    note: 'These are instructions, not claims about what is true. Causing an action and being a true description are different questions.',
    chapters: [10, 19], fields: [
      { key: 'carrier', label: 'What changed in the presentation while the instruction stayed the same?' },
      { key: 'meaning', label: 'What changed in my drawing when the instruction changed?' },
      { key: 'chain', label: 'The physical chain that let the instruction have an effect' },
      { key: 'limit', label: 'Where could that chain have failed?' },
    ],
  },
  {
    slug: 'garden', title: 'Who gets a key to the garden?', minutes: '6–10',
    question: 'What gets built into a rule besides its intended result?',
    scene: 'Ten households share a garden. Someone must carry water. Someone must decide who gets a key. An impressive harvest will not tell you who had to miss work.',
    concept: 'Rules as artifacts; adaptive success and fairness',
    connection: 'Chapters 9, 19, and 20 follow classifications and intentions into arrangements other people must live with. Compare what the rule produces with how it distributes work, access, and a say.',
    steps: ['Predict one effect of changing one rule. Keep the other settings steady first.', 'Compare harvest with labor, excluded households, and households without a vote. Then try a dry season.', 'Open the assumptions. Propose one different assumption and one claim about fairness that harvest alone cannot settle.'],
    note: 'The numbers come from an invented one-season model. Inspecting its assumptions is part of the exercise. It cannot decide how a real community should govern itself.',
    chapters: [9, 19, 20], fields: [
      { key: 'prediction', label: 'One rule I will change, and the effect I predict' },
      { key: 'cost', label: 'After trying it: who gains, and who carries the cost?', after: true },
      { key: 'assumption', label: 'One assumption I would change in the model', after: true },
      { key: 'rule', label: 'A proposed rule and a way for affected people to challenge it', after: true },
      { key: 'fairness', label: 'A question about fairness the harvest number cannot answer', after: true },
    ], source: { title: 'Ostrom on governing shared resources', url: 'https://www.aeaweb.org/articles?id=10.1257/aer.100.3.641' },
  },
  {
    slug: 'experiment', title: 'The bread rose. What did you learn?', minutes: '5–8',
    question: 'Can one successful attempt tell you which explanation is right?',
    scene: 'Yesterday’s dough barely rose. Today you changed the yeast, warmed the water, and kneaded longer. The loaf improved. Your explanation is already putting on a small crown.',
    concept: 'Learning: Measure, Model, Manipulate',
    connection: 'Chapter 14 uses the loaf to distinguish noticing a difference, proposing a cause, and changing something to test it. Chapter 12 asks what makes that conclusion correctable.',
    steps: ['Choose the comparison that answers the question you actually have. State a prediction before seeing results.', 'Separate what the invented measurements show from the cause you would like to name.', 'Design the next comparison. Say what it could distinguish and what would still be uncertain.'],
    note: 'The heights are invented. Three rounds illustrate competing explanations and variation; they establish no fact about baking.',
    chapters: [12, 14], fields: [
      { key: 'prediction', label: 'My explanation and its prediction for this comparison' },
      { key: 'observed', label: 'The difference the measurements actually show', after: true },
      { key: 'rival', label: 'Another explanation they have not eliminated', after: true },
      { key: 'test', label: 'The next comparison, and what I would keep as similar as possible', after: true },
    ],
  },
  {
    slug: 'modes', title: 'One sheet, three kinds of doing', minutes: '5–10',
    question: 'What changes when you stop asking the same question of the same thing?',
    scene: 'Take an ordinary sheet of paper. It can help you test an explanation, make something, or follow a shape you had no intention of making. The paper has no preference.',
    concept: 'Learning, Creating, Becoming',
    connection: 'Chapters 13, 17, and 18 distinguish correcting an explanation, bringing something into existence, and making room for an unplanned development. Try the difference with one material instead of choosing a label for yourself.',
    steps: ['Try the three passes below with paper, or imagine the actions if paper is unavailable. Any order is fine.', 'For each pass, notice what directs your attention and what would count as a result.', 'Record something that actually happened. The activities may overlap; look for the difference in what you were asking them to do.'],
    note: 'These are three ways to engage with one material. They are not three personalities or levels of development. You can stop without completing the set.',
    chapters: [13, 17, 18], fields: [
      { key: 'learning', label: 'Learning: what explanation did I test, and what happened?' },
      { key: 'creating', label: 'Creating: what did I mean to make, and what now exists?' },
      { key: 'becoming', label: 'Becoming: what did I notice or follow without planning it?' },
      { key: 'difference', label: 'Where did the purposes differ? Where did the activities overlap?' },
    ],
  },
  {
    slug: 'attention', title: 'A cup with nothing to prove', minutes: '2–5',
    question: 'What becomes noticeable when usefulness is briefly off duty?',
    scene: 'Find a cup, a stone, or something equally unpromising. There is no need to select an object with a rich inner life.',
    concept: 'Becoming: Marvel, Meander, Manifest',
    connection: 'Chapter 16 begins with attention before immediate use, then follows what becomes interesting without specifying the result. This is a small way to try those moves. Chapter 22 asks why that resemblance does not make every contemplative tradition the same.',
    steps: ['First look for use: what is the object for, and how well does it do the job?', 'Then let a detail catch you: a mark, shadow, texture, or memory. Follow it without requiring an improvement or lesson.', 'Notice whether something unplanned became available. Nothing may have. Leave the object alone when you have had enough.'],
    note: 'Making room for an experience does not guarantee one, and an experience does not prove a metaphysics. You do not have to turn the cup into wisdom.',
    chapters: [16, 22], fields: [
      { key: 'use', label: 'What the useful-object view brought forward' },
      { key: 'detail', label: 'The detail my attention followed' },
      { key: 'emergence', label: 'What appeared without being the task? “Nothing” is allowed.' },
      { key: 'demand', label: 'Did I keep asking the exercise to produce something for me?' },
    ],
  },
  {
    slug: 'one-week', title: 'Make room for one ordinary thing', minutes: '5 now, 5 later',
    question: 'When does a plan become an arrangement in the world?',
    scene: 'Choose a small place that keeps becoming unusable: a corner to eat at, a chair to rest in, somewhere to put a cup. We shall keep the ambition roughly the size of the cup.',
    concept: 'Creating: Map, Move, Make',
    connection: 'Chapters 15 and 23 take an intention through constraints, a first attempt, an inspectable result, and a return. Chapter 3 asks why maintaining something worthwhile can matter even when nothing grows.',
    steps: ['Map: say what this place is for, who uses it, and what keeps getting in the way.', 'Move and Make: change one small arrangement now if practical. Leave something you can point to. If you need somebody else’s agreement, that is the first move.', 'Keep a note of what you expect. Return within a week and see what the original plan forgot.'],
    note: 'If the arrangement fails, inspect its conditions before diagnosing your character. Space, time, permission, and other people are part of the material.',
    chapters: [3, 15, 23], framing: ['epilogue'], fields: [
      { key: 'map', label: 'The purpose, people, and constraints of this little place' },
      { key: 'move', label: 'The first action I actually took, or the agreement I need' },
      { key: 'made', label: 'What now exists that did not exist as an arrangement before?' },
      { key: 'cue', label: 'If it needs upkeep: when will I do what, and when will I stop?' },
      { key: 'expect', label: 'What I expect this arrangement to make possible' },
      { key: 'date', label: 'A date to return', type: 'date' },
      { key: 'result', label: 'On returning: what happened to the arrangement?', after: true },
      { key: 'revision', label: 'What did the map miss? What would I keep, change, or abandon?', after: true },
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
