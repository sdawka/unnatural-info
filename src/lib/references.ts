export const REFERENCE_CATEGORIES = [
  { id: 'mind', label: 'Mind & wanting' },
  { id: 'meaning', label: 'Meaning & ethics' },
  { id: 'knowledge', label: 'Knowledge & truth' },
  { id: 'language', label: 'Language & categories' },
  { id: 'society', label: 'Society & power' },
  { id: 'information', label: 'Information & technology' },
  { id: 'nature', label: 'Life & nature' },
  { id: 'learning', label: 'Learning & making' },
  { id: 'traditions', label: 'Contemplative traditions' },
] as const;

export type ReferenceCategory = typeof REFERENCE_CATEGORIES[number]['id'];
export type Reference = {
  id: string;
  author: string;
  title: string;
  year: number | string | null;
  kind: 'work' | 'reading-lead';
  tags: ReferenceCategory[];
  influence: string;
  chapters: string[];
  origins: ('chapter' | 'suggestion')[];
  sourceIds: string[];
};
export type ReferenceFilters = { query: string; categories: string[]; chapter: string; origin: string };

export function normalizeReferenceSearch(value: string): string {
  return value.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}

export function matchesReference(
  reference: { search: string; tags: readonly string[]; chapters: readonly string[]; origins: readonly string[] },
  filters: ReferenceFilters,
): boolean {
  const terms = normalizeReferenceSearch(filters.query).split(/\s+/).filter(Boolean);
  return terms.every(term => reference.search.includes(term))
    && (filters.categories.length === 0 || filters.categories.some(category => reference.tags.includes(category)))
    && (!filters.chapter || reference.chapters.includes(filters.chapter))
    && (!filters.origin || reference.origins.includes(filters.origin));
}

export function readReferenceFilters(params: URLSearchParams, chapterIds: readonly string[]): ReferenceFilters {
  const allowedTags: readonly string[] = REFERENCE_CATEGORIES.map(category => category.id);
  const chapter = params.get('chapter') ?? '';
  return {
    query: params.get('q') ?? '',
    categories: [...new Set(params.getAll('tag'))].filter(tag => allowedTags.includes(tag)),
    chapter: chapterIds.includes(chapter) ? chapter : '',
    origin: ['chapter', 'suggestion'].includes(params.get('source') ?? '') ? params.get('source')! : '',
  };
}

export function writeReferenceFilters(url: URL, filters: ReferenceFilters): URL {
  const next = new URL(url);
  for (const key of ['q', 'tag', 'chapter', 'source']) next.searchParams.delete(key);
  if (filters.query.trim()) next.searchParams.set('q', filters.query.trim());
  for (const category of filters.categories) next.searchParams.append('tag', category);
  if (filters.chapter) next.searchParams.set('chapter', filters.chapter);
  if (filters.origin) next.searchParams.set('source', filters.origin);
  return next;
}
