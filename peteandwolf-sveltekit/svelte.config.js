import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
export default {
  kit: {
    adapter: adapter({
      fallback: null,
      precompress: false,
      strict: true
    }),
     // Set the cache-control headers for the entire site
     headers: {
      '/': {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
      },
      '/(.*)': {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
      }
    }
  },
  preprocess: vitePreprocess()
};