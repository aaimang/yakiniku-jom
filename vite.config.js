import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // base: './' makes all asset paths relative, so the site works perfectly on GitHub Pages sub-paths
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        menu: resolve(__dirname, 'menu.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
});
