module.exports = {
  apps: [{
    name: 'wowactivity-api',
    script: 'dist/main.js',
    watch: 'backend/dist',
    cwd: './backend',
  },
  {
    name: 'wowactivity-fe',
    script: 'serve',
    env: {
      PM2_SERVE_PATH: 'frontend/build-prod',
      PM2_SERVE_PORT: 3000,
      PM2_SERVE_SPA: 'true',
      PM2_SERVE_HOMEPAGE: '/index.html',
    },
  }
  ],
};
