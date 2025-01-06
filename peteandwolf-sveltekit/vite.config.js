import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [sveltekit()],
    css: {
        preprocessorOptions: {
            scss: {
                quietDeps: true // Reduces SCSS compilation warnings
            }
        }
    },
    optimizeDeps: {
        include: ['svelte', 'swiper']
    },
    build: {
        cssCodeSplit: false, // Creates a single CSS file
        cssMinify: true,
        rollupOptions: {
            output: {
                manualChunks: undefined // Prevents code splitting for CSS
            }
        }
    }
});