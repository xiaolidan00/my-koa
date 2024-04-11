const log4js = require("log4js");
log4js.configure({
  appenders: { cheese: { type: "file", filename: "access.log" } },
  categories: { default: { appenders: ["access"], level: "error" } },
});
const logger = log4js.getLogger();

logger.level = "all";
module.exports = { log4js, logger };
