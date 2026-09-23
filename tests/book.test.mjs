import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { READING_PATHS } from '../src/lib/book.ts';

test('reading paths cover the numbered book without missing chapters or ambiguous anchors', () => {
  const directory = new URL('../src/content/chapters/', import.meta.url);
  const publishedNumbers = readdirSync(directory)
    .filter(name => name.endsWith('.md'))
    .flatMap(name => {
      const metadata = readFileSync(new URL(name, directory), 'utf8').split('---')[1];
      const number = metadata.match(/^chapterNumber: (\d+)$/m);
      return number && !/^draft: true$/m.test(metadata) ? [Number(number[1])] : [];
    });
  assert.equal(new Set(READING_PATHS.map(path => path.id)).size, READING_PATHS.length);
  for (const path of READING_PATHS) {
    assert.match(path.id, /^[a-z]+(?:-[a-z]+)*$/);
    assert.ok(path.chapters.length > 0, `${path.id} needs an entry chapter`);
    assert.equal(new Set(path.chapters).size, path.chapters.length);
    for (const number of path.chapters) assert.ok(publishedNumbers.includes(number), `${path.id}: missing chapter ${number}`);
  }
  const covered = [...new Set(READING_PATHS.flatMap(path => [...path.chapters]))].sort((a, b) => a - b);
  assert.deepEqual(covered, publishedNumbers.sort((a, b) => a - b));
});
