module.exports = {
  apps : [{
    name: 'www',
    script: './bin/www',
    autorestart: true,
    watch: true,
    watch_delay: 1000,
    ignore_watch: ["seeders", "migrations"],
    env: {
      NODE_ENV: 'production'
    },
  }],
};