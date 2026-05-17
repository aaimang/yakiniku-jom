import { defineConfig } from 'vite';

export default defineConfig({
  // base: './' makes all asset paths relative, so the site works perfectly on GitHub Pages sub-paths
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        menu: 'menu.html',
        course: 'course.html',
        contact: 'contact.html',
      },
    },
  },
});
