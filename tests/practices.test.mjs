import test from 'node:test';
import assert from 'node:assert/strict';
import { PRACTICES, gardenOutcome, parseSavedAnswers, practicesForChapter, recommendRoute } from '../src/lib/practices.ts';

test('saved reflections round-trip without interpreting their content', () => {
  const answers = { story: '<script>still just a note</script>\nA second line', confidence: '0', later: 'I changed my mind.' };
  assert.deepEqual(parseSavedAnswers(JSON.stringify({ version: 1, answers })), answers);
});

test('invalid or unsupported saves do not become a replacement note', () => {
  for (const raw of [null, '', '{broken', 'null', '[]', '{"version":2,"answers":{}}', '{"version":1,"answers":[]}', '{"version":1,"answers":"text"}']) {
    assert.equal(parseSavedAnswers(raw), null);
  }
  assert.deepEqual(parseSavedAnswers(JSON.stringify({ version: 1, answers: { observed: 'Keep this', bad: {}, huge: 'x'.repeat(12001), '__invalid': 'discard' } })), { observed: 'Keep this' });
});

test('route priorities expose a tradeoff and respect a step-free requirement', () => {
  const fastest = recommendRoute('time', false);
  const cheapest = recommendRoute('cost', false);
  assert.notEqual(fastest.name, cheapest.name);
  assert.ok(fastest.minutes < cheapest.minutes);
  assert.ok(cheapest.cost < fastest.cost);
  const accessible = recommendRoute('cost', true);
  assert.equal(accessible.steps, 0);
  assert.notEqual(accessible.name, cheapest.name);
  assert.equal(recommendRoute('time', true).steps, 0);
});

test('garden outcomes expose costs alongside benefits', () => {
  const baseline = gardenOutcome('open', 'volunteer', 'few', 'normal');
  const shared = gardenOutcome('open', 'shared', 'all', 'normal');
  assert.ok(shared.harvest > baseline.harvest);
  assert.ok(shared.hours > baseline.hours);
  assert.ok(shared.unheard < baseline.unheard);
  assert.equal(baseline.excluded, 0);
  assert.equal(gardenOutcome('members', 'volunteer', 'few', 'normal').excluded, 4);
  assert.ok(gardenOutcome('open', 'volunteer', 'few', 'dry').harvest < baseline.harvest);
});

test('every registered practice has a chapter route and distinct answer keys', () => {
  assert.equal(new Set(PRACTICES.map(p => p.slug)).size, PRACTICES.length);
  for (const practice of PRACTICES) {
    assert.equal(new Set(practice.fields.map(f => f.key)).size, practice.fields.length);
    for (const number of practice.chapters) assert.ok(practicesForChapter(number).includes(practice));
    for (const slug of practice.framing ?? []) assert.ok(practicesForChapter(undefined, slug).includes(practice));
  }
});
