import { readdirSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { defineConfig } from 'vite';
import { cityStarsLayout } from './scripts/city-stars-layout.mjs';

const sourceDirectory = resolve(import.meta.dirname, 'src');
const pages = readdirSync(sourceDirectory)
  .filter((file) => file.endsWith('.html'))
  .map((file) => [basename(file, '.html'), resolve(sourceDirectory, file)]);

export default defineConfig({
  root: sourceDirectory,
  base: './',
  publicDir: resolve(sourceDirectory, 'public'),
  plugins: [cityStarsLayout()],
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
      },
    },
  },
  build: {
    outDir: resolve(import.meta.dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: Object.fromEntries(pages),
    },
  },
});
