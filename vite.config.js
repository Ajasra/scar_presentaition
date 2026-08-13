import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    port: 8745,
    host: true, // Listen on all local IPs for cross-device presentation on local Wi-Fi
    allowedHosts: true,
    open: false
  },
  preview: {
    port: 8745,
    strictPort: true,
    host: true,
    allowedHosts: true
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 2000
  }
});

