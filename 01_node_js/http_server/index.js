const http = require("node:http");

const server = http.createServer(function (req, res) {
  console.log(`A request is coming`);
  res.writeHead(200);
  res.end("Hey thanks for visiting mate");
});

server.listen(8000, function () {
  console.log(`Server is start and running on PORT 8000`);
});
