// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    imageService: 'compile',
  }),
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fa'],
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    plugins: [/** @type {any} */ (tailwind())],
  },
});
