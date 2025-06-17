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
                // Add timestamp to prevent caching
                entryFileNames: 'assets/[name]-[hash]-' + Date.now() + '.js',
                chunkFileNames: 'assets/[name]-[hash]-' + Date.now() + '.js',
                assetFileNames: 'assets/[name]-[hash]-' + Date.now() + '.[ext]',
                manualChunks: undefined // Prevents code splitting for CSS
            }
        }
    },
    server: {
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    }
});