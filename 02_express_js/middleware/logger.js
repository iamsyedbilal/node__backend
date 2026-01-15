const fs = require("fs");
const path = require("path");

exports.logger = (req, res, next) => {
  const log = `${Date.now()} - ${req.method} ${req.url}`;
  const logDir = path.join(__dirname, "log");
  const logFile = path.join(logDir, "server.log");

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  fs.appendFileSync(logFile, log + "\n");
  next();
};
