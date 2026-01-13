const EventEmitter = require("node:events");

class ChatRoom extends EventEmitter {
  constructor() {
    super();

    this.users = new Set();
  }

  joinChat(user) {
    this.users.add(user);
    this.emit("join", `${user} has joined the chat`);
  }

  sendMessage(user, message) {
    if (this.users.has(user)) {
      this.emit("message", user, message);
    } else {
      console.log(`${user} is not in this chat`);
    }
  }

  leaveTheChat(user) {
    if (this.users.has(user)) {
      this.users.delete(user);
      this.emit("leave", `${user}: left the chat`);
    } else {
      console.log(`${user} is not in this chat to leave`);
    }
  }
}

module.exports = ChatRoom;
