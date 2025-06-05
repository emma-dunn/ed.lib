// @ts-check
import { defineConfig } from 'astro/config';
// import mdx from '@astrojs/mdx';
import markdoc from '@astrojs/markdoc'
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [markdoc(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
});