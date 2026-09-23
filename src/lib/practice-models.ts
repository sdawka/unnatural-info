export const WINDOW_CONTEXT = [
  'One person is working at the table beside the window. The other is cooking beside the oven. The breeze reaches the first person directly; heat gathers around the second.',
  'Both can describe the room accurately and still want different things. Checking temperatures at both positions could clarify a factual disagreement. It cannot, by itself, decide whose comfort should take priority.',
];

export const LABEL_VIEWS = [
  { key: 'tool', title: 'A utensil', question: 'Does it hold a drink safely? Is it easy to clean? Would another cup do the same job?' },
  { key: 'keepsake', title: 'A keepsake', question: 'Suppose someone important gave it to you. Would an identical new cup replace what matters? What would repair preserve?' },
  { key: 'stock', title: 'Shop stock', question: 'What must be recorded, priced, disclosed, or removed from sale? What parts of the cup’s history would an inventory omit?' },
];

export const PATTERN_INSTRUCTIONS = [
  { key: 'first', title: 'First instruction', text: 'Draw a circle. Put a dot inside it.' },
  { key: 'type', title: 'Change the presentation', text: 'DRAW A CIRCLE. PUT A DOT INSIDE IT.' },
  { key: 'meaning', title: 'Change the instruction', text: 'Draw a circle. Put a dot outside it.' },
];

export const MODE_PASSES = [
  { key: 'learn', title: 'Learning', verbs: 'Measure · Model · Manipulate', steps: [
    'Try standing an unfolded sheet on its edge. Notice what happens.',
    'Propose what a fold might change. Predict whether the folded sheet will stand.',
    'Fold it once and try. What does the comparison support? What changed besides the outline?',
  ] },
  { key: 'create', title: 'Creating', verbs: 'Map · Move · Make', steps: [
    'Choose a small purpose: make a name card that will stand on the table. Notice the paper and the space available.',
    'Try a fold and put the result down. Adjust if it falls over.',
    'Leave the card standing, if you can. What did handling the material teach you that the plan had omitted?',
  ] },
  { key: 'become', title: 'Becoming', verbs: 'Marvel · Meander · Manifest', steps: [
    'Look at the sheet or an existing crease without deciding what it must become.',
    'Let a shape, shadow, or possible fold catch your attention. Follow it a little, if you want to.',
    'Allow something to take shape without requiring a useful product. What appeared? Nothing in particular is also a result.',
  ] },
];

export const BREAD_RESULTS = { original: [2, 3, 2], many: [6, 5, 6], yeast: [3, 2, 3] };
export const BREAD_FEEDBACK = {
  many: 'The changed dough rose more here. You still cannot tell whether yeast, water temperature, kneading, or their combination explains the difference.',
  yeast: 'The small differences go both ways. These results do not establish a reliable yeast effect. A better comparison or more observations might distinguish the explanations.',
};
