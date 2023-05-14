/// <reference types="vitest" />
import path from 'node:path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import mkcert from 'vite-plugin-mkcert';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tsconfigPaths(),
      checker({
        eslint: {
          lintCommand: 'eslint .',
        },
        typescript: true,
      }),
      mkcert({
        source: 'coding',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      https: true,
      proxy: {
        '/api/': {
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          target:
            process.env.API_URL ?? 'https://jsonplaceholder.typicode.com/',
        },
      },
    },
    test: {
      cache: {
        dir: './node_modules/.vitest',
      },
      environment: 'jsdom',
      globals: true,
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    },
  };
});
