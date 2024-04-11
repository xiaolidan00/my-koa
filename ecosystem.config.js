module.exports = {
  apps: {
    name: "app",
    script: "index.js",
    cwd: "./",
    watch: false,
    ignore_watch: [
      // 不用监听的文件
      // "node_modules",
      // "logs",
    ],
    // exec_mode: "cluster_mode", // 应用启动模式，支持fork和cluster模式

    error_file: "./logs/app-err.log", // 错误日志文件
    out_file: "./logs/app-out.log", // 正常日志文件

    env_production: {
      NODE_ENV: "production",
    },
    env_development: {
      NODE_ENV: "development",
    },
  },
};
