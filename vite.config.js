import { defineConfig } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

export default defineConfig({
  base: './',
  plugins: [
    {
      name: 'copy-images-to-dist',
      closeBundle() {
        const src = path.resolve(__dirname, 'images');
        const dest = path.resolve(__dirname, 'dist/images');
        if (fs.existsSync(src)) {
          fs.cpSync(src, dest, { recursive: true });
        }
      },
    },
  ],
});
