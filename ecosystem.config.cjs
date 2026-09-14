module.exports = {
  apps: [
    {
      name: "scar-presentation",
      script: "npm",
      args: "run start",
      autorestart: true,
      env: {
        NODE_ENV: "production",
        PORT: 8745
      }
    }
  ]
};