// svelte.config.js
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';  // Changed this line

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      fallback: null,
      precompress: false,
      strict: true
    })
  },
  preprocess: vitePreprocess()
};

export default config;