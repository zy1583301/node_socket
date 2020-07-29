/* eslint-disable */
module.exports = {
  apps: [
    {
      name: "DeviceID-API",
      script: "./app.js",
      instances: 3,
      autorestart: true,
      max_memory_restart: "500M",
      error_file: "../error_log",
      out_file: "../output_log",
      log_file: "../combined.log",
      combine_logs: true,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
