const http = require("node:http");
const path = require("node:path");
const fs = require("node:fs");

// This is a simple Node.js server that serves static files.
// NGINX is often used as a reverse proxy in front of such servers.
// It can handle tasks like load balancing, caching, and serving static files efficiently.
// In this setup, NGINX would forward requests to this Node.js server running on port 4000.

const server = http.createServer(function (req, res) {
  const filePath = path.join(
    __dirname,
    req.url === "/" ? "index.html" : req.url
  );

  const fileName = String(path.extname(filePath)).toLowerCase();

  const fileTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "text/png",
  };

  const constantType = fileTypes[fileName] || "application/octet-stream";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("404 not file found");
      }
    } else {
      res.writeHead(200, { "Content-Type": constantType });
      res.end(content, "utf-8");
    }
  });
});

server.listen("4000", function () {
  console.log(`Server is up and running on PORT 4000`);
});
