module.exports = {
  apps: [
    {
      name: "scar-presentation",
      script: "node",
      args: "./node_modules/vite/bin/vite.js preview --port 8745 --host",
      env: {
        NODE_ENV: "production",
        PORT: 8745
      }
    }
  ]
};