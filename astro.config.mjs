// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://unnatural.info',
  markdown: {
    syntaxHighlight: false,
  },
  integrations: [react()],
});
