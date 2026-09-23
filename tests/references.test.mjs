import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { REFERENCE_CATEGORIES, normalizeReferenceSearch, matchesReference, readReferenceFilters, writeReferenceFilters } from '../src/lib/references.ts';

const catalog = JSON.parse(readFileSync(new URL('../src/data/references.json', import.meta.url), 'utf8'));
const provenance = JSON.parse(readFileSync(new URL('../src/data/reference-provenance.json', import.meta.url), 'utf8'));
const chapters = readdirSync(new URL('../src/content/chapters/', import.meta.url)).filter(name => name.endsWith('.md')).map(name => name.replace(/\.md$/, ''));

test('catalog preserves every original chapter source, current source, and wider suggestion', () => {
  assert.equal(provenance.chapterSources.filter(source => source.version === 'original').length, 187);
  assert.equal(provenance.chapterSources.filter(source => source.version === 'current').length, 70);
  assert.equal(provenance.suggestions.length, 269);
  const sources = [...provenance.chapterSources, ...provenance.suggestions];
  const sourceIds = new Set(sources.map(source => source.sourceId));
  assert.equal(sourceIds.size, sources.length);
  for (const source of sources) {
    const entries = catalog.filter(entry => entry.sourceIds.includes(source.sourceId));
    assert.ok(entries.length, `Unrestored source: ${source.sourceId}`);
    for (const entry of entries) {
      assert.ok(entry.origins.includes(source.chapterId ? 'chapter' : 'suggestion'), `${entry.id}: missing origin`);
      if (source.chapterId) assert.ok(entry.chapters.includes(source.chapterId), `${entry.id}: lost chapter association`);
    }
  }
  const allowedTags = REFERENCE_CATEGORIES.map(category => category.id);
  assert.equal(new Set(catalog.map(entry => entry.id)).size, catalog.length);
  for (const entry of catalog) {
    assert.match(entry.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(entry.author.trim() && entry.title.trim() && entry.influence.trim(), `${entry.id}: incomplete annotation`);
    assert.ok(['work', 'reading-lead'].includes(entry.kind));
    assert.ok(entry.tags.length >= 1 && entry.tags.length <= 3);
    assert.equal(new Set(entry.tags).size, entry.tags.length);
    for (const tag of entry.tags) assert.ok(allowedTags.includes(tag), `${entry.id}: unknown category ${tag}`);
    assert.ok(entry.sourceIds.length > 0);
    assert.equal(new Set(entry.sourceIds).size, entry.sourceIds.length);
    for (const id of entry.sourceIds) assert.ok(sourceIds.has(id), `${entry.id}: unknown source ${id}`);
    for (const chapter of entry.chapters) assert.ok(chapters.includes(chapter), `${entry.id}: missing chapter ${chapter}`);
  }
});

const reference = {
  search: normalizeReferenceSearch('Gödel, Escher, Bach — Douglas Hofstadter. Self-reference and the limits of formal models.'),
  tags: ['knowledge', 'information'],
  chapters: ['06-maps-all-the-way-down'],
  origins: ['chapter', 'suggestion'],
};
const empty = { query: '', categories: [], chapter: '', origin: '' };

test('search accepts accents, punctuation, and multiple terms in any order', () => {
  assert.equal(matchesReference(reference, { ...empty, query: '  HOFSTADTER gödel  ' }), true);
  assert.equal(matchesReference(reference, { ...empty, query: 'godel self-reference' }), true);
  assert.equal(matchesReference(reference, { ...empty, query: 'Gödel economics' }), false);
  assert.equal(matchesReference(reference, { ...empty, query: '   ' }), true);
});

test('categories are alternatives while chapter, source, and search narrow the results together', () => {
  assert.equal(matchesReference(reference, { ...empty, categories: ['mind', 'knowledge'] }), true);
  assert.equal(matchesReference(reference, { ...empty, categories: ['mind'] }), false);
  assert.equal(matchesReference(reference, { query: 'models', categories: ['information'], chapter: '06-maps-all-the-way-down', origin: 'chapter' }), true);
  assert.equal(matchesReference(reference, { ...empty, chapter: 'another-chapter' }), false);
  assert.equal(matchesReference({ ...reference, origins: ['chapter'] }, { ...empty, origin: 'suggestion' }), false);
});

test('shareable filters reject unknown values and preserve unrelated URL state', () => {
  const filters = readReferenceFilters(new URLSearchParams('q=G%C3%B6del&tag=knowledge&tag=knowledge&tag=made-up&chapter=missing&source=invalid'), chapters);
  assert.deepEqual(filters, { query: 'Gödel', categories: ['knowledge'], chapter: '', origin: '' });
  const selected = { query: '  Gödel  ', categories: ['knowledge', 'information'], chapter: chapters[0], origin: 'chapter' };
  const url = writeReferenceFilters(new URL('https://unnatural.info/reading?campaign=friend&tag=mind&q=old#ref-example'), selected);
  assert.equal(url.searchParams.get('campaign'), 'friend');
  assert.equal(url.hash, '#ref-example');
  assert.deepEqual(readReferenceFilters(url.searchParams, chapters), { ...selected, query: 'Gödel' });
  const cleared = writeReferenceFilters(url, empty);
  assert.equal(cleared.search, '?campaign=friend');
  assert.equal(cleared.hash, '#ref-example');
});
