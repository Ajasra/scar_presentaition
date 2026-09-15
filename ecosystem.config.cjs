module.exports = {
  apps: [
    {
      name: "scar-presentation",
      script: "./node_modules/.bin/vite",
      args: "preview --host 127.0.0.1 --port 8745 --strictPort",
      cwd: "/srv/apps/scar_presentaition",
      autorestart: true,
      restart_delay: 5000,
      max_restarts: 10,
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};