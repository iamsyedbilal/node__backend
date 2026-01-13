const EventEmitter = require("node:events");

const eventEmitter = new EventEmitter();

eventEmitter.on("greet", function () {
  console.log("Hello from inside node event");
});

eventEmitter.emit("greet");
