// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import tailwind from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://hawshemi.com',
  output: 'server',
  adapter: cloudflare({
    imageService: 'compile',
  }),
  integrations: [sitemap(), robotsTxt()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fa'],
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    plugins: [/** @type {any} */ (tailwind())],
  },
});
