import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/FE',
  test: {
    globals: true,
    setupFiles: ['./src/mocks/setupTests.ts'],
    environment: 'jsdom'
  },
  define: {
    'process.env.NODE_ENV': '"development"'
  }
});
