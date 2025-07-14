import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // 👈 aggiunto

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,   
    environment: 'jsdom', // 👈 ambiente di test
    setupFiles: './tests/setup.js', // 👈 file di setup per i test
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 👈 alias per /src
    },
  },
});