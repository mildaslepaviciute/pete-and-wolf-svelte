// svelte.config.js
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';  // Changed this line

export default {
  kit: {
    adapter: adapter({
      fallback: 'index.html' // This ensures that all routes are handled by the SPA
    }),
    prerender: {
      entries: ['*'] // Prerender all routes
    }
  },
  preprocess: vitePreprocess()
};