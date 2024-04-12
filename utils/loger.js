const log4js = require("log4js");
log4js.configure({
  appenders: {
    access: { type: "file", filename: "access.log" },
    terminal: { type: "console" },
  },
  categories: {
    default: { appenders: ["access", "terminal"], level: "error" },
  },
});
const logger = log4js.getLogger();

logger.level = "all";
module.exports = { log4js, logger };
