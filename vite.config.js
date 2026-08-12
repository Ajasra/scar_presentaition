import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,
    host: true, // Listen on all local IPs for cross-device presentation on local Wi-Fi
    open: false
  },
  build: {
    target: 'esnext'
  }
});
