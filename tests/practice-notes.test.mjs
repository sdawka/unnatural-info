import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createPracticeNote,
  legacyStorageKey,
  noteMarkdown,
  practiceStorageKey,
  readLegacyPracticeNote,
  readPracticeNote,
} from '../src/lib/practice-notes.ts';

const practice = {
  slug: 'notebook',
  title: 'A new notebook title',
  minutes: '5',
  question: 'Question',
  scene: 'Scene',
  note: 'Note',
  chapters: [],
  fields: [
    { key: 'story', label: 'A new label for new notes' },
    { key: 'later', label: 'What changed later?' },
  ],
};

test('v1 and v2 use separate storage keys', () => {
  assert.equal(legacyStorageKey('notebook'), 'unnatural:practice:v1:notebook');
  assert.equal(practiceStorageKey('notebook'), 'unnatural:practice:v2:notebook');
});

test('version-specific readers reject the other version', () => {
  const v1 = JSON.stringify({ version: 1, answers: { story: 'old' } });
  const v2 = JSON.stringify({ version: 2, title: 'new', labels: { story: 'New story' }, answers: { story: 'new' } });
  assert.equal(readPracticeNote(v1), null);
  assert.equal(readLegacyPracticeNote(v2, 'notebook'), null);
  assert.equal(readLegacyPracticeNote(v1, 'unknown-slug'), null);
});

test('legacy metadata remains frozen when the live practice changes', () => {
  const note = readLegacyPracticeNote(
    JSON.stringify({ version: 1, answers: { story: 'Keep this account', reveal: 'yes' }, updated: '2026-09-22T10:00:00.000Z' }),
    'notebook',
  );
  assert.equal(note?.title, 'The story in the silence');
  assert.equal(note?.labels.story, 'The explanation I added');
  assert.equal(note?.labels.reveal, 'Extra context revealed');
  assert.equal(note?.answers.story, 'Keep this account');
});

test('new notes snapshot their title and labels', () => {
  const note = createPracticeNote(practice, { story: 'new answer', later: 'later answer' }, { reveal: 'Reveal state' });
  practice.title = 'Changed after save';
  practice.fields[0].label = 'Changed after save';
  assert.equal(note.version, 2);
  assert.equal(note.title, 'A new notebook title');
  assert.equal(note.labels.story, 'A new label for new notes');
  assert.equal(note.labels.reveal, 'Reveal state');
  assert.deepEqual(readPracticeNote(JSON.stringify(note)), note);
});

test('unknown valid legacy keys remain visible and exportable', () => {
  const note = readLegacyPracticeNote(JSON.stringify({ version: 1, answers: { futureField: 'kept', '__bad': 'discarded' } }), 'maps');
  assert.deepEqual(note?.answers, { futureField: 'kept' });
  assert.match(noteMarkdown(note), /## Unlabelled field \(futureField\)\n\nkept/);
});

test('markdown preserves multiline answers and stored labels', () => {
  const note = readPracticeNote(JSON.stringify({
    version: 2,
    title: 'Saved title',
    labels: { story: 'Saved label' },
    answers: { story: 'first line\n\nsecond line' },
    updated: '2026-09-23T12:00:00.000Z',
  }));
  const markdown = noteMarkdown(note);
  assert.match(markdown, /^# Saved title/);
  assert.match(markdown, /Saved: 2026-09-23T12:00:00.000Z/);
  assert.match(markdown, /## Saved label\n\nfirst line\n\nsecond line/);
});

test('readers reject malformed metadata and filter invalid or oversized answers', () => {
  assert.equal(readPracticeNote(JSON.stringify({ version: 2, title: 'x', labels: [], answers: {} })), null);
  assert.equal(readPracticeNote(JSON.stringify({ version: 2, title: '', labels: {}, answers: {} })), null);
  const note = readPracticeNote(JSON.stringify({
    version: 2,
    title: 'Valid',
    labels: { kept: 'Kept' },
    answers: { kept: 'yes', object: {}, huge: 'x'.repeat(12001), '__bad': 'no' },
  }));
  assert.deepEqual(note?.answers, { kept: 'yes' });
});
