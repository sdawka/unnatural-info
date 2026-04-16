import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const chapters = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/chapters',
  }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    act: z.enum(['prologue', 'volo-ergo-sum', 'initd', 'mmm', 'epilogue']),
    actTitle: z.string().optional(),
    chapterNumber: z.number().optional(),
    order: z.number(),
    summary: z.string(),
    themes: z.array(z.string()).default([]),
    status: z.enum(['stub', 'draft', 'final']).default('stub'),
    draft: z.boolean().default(false),
    furtherReading: z.array(z.object({
      author: z.string(),
      title: z.string(),
      year: z.number(),
      note: z.string(),
    })).optional().default([]),
  }),
});

const wiki = defineCollection({
  loader: glob({
    pattern: ['**/*.md', '!index.md', '!log.md', '!schema.md'],
    base: new URL('../docs/', import.meta.url),
  }),
  schema: z.object({
    title: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
    updated: z.string().optional(),
  }).passthrough(),
});

export const collections = { chapters, wiki };
