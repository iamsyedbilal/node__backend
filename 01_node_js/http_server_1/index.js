const http = require("node:http");
const fs = require("node:fs");

const server = http.createServer(function (req, res) {
  const method = req.method;
  const request = req.url;

  const log = `\n[${Date.now()}: ${method},${request}]`;
  fs.appendFile("log.txt", log, "utf-8", (err) => {
    if (err) console.error("Log error:", err);
  });

  switch (method) {
    case "GET":
      switch (request) {
        case "/":
          return res.writeHead(200).end("Hello mate from the HOME");
        case "/contact-us":
          return res
            .writeHead(200)
            .end("Email: Syedbilal@gmail.com Phone:+923788328328");
        case "/tweet":
          return res.writeHead(200).end("Tweet1\nTweet2");
      }
    case "POST":
      switch (request) {
        case "/tweet":
          return res.writeHead(200).end("Your tweet was created");
      }
  }
  return res.writeHead(404).end("Invalid request");
});

server.listen(7000, function () {
  console.log("Server is running on PORT 7000");
});
