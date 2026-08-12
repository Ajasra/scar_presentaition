import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    port: 8742,
    host: true, // Listen on all local IPs for cross-device presentation on local Wi-Fi
    open: false
  },
  preview: {
    port: 8742,
    host: true
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 2000
  }
});

