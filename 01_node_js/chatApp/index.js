const ChatRoom = require("./chat.js");

const chat = new ChatRoom();

chat.on("join", function (user) {
  console.log(`${user} `);
});

chat.on("message", function (user, message) {
  console.log(`${user} : ${message}`);
});

chat.on("leave", function (user) {
  console.log(`${user}`);
});

//simulating the chat
chat.joinChat("Bilal");
chat.sendMessage("Bilal", "Hey am using node chat app");
chat.joinChat("Basit");
chat.sendMessage("Basit", "am going i don't like this chat app");
chat.leaveTheChat("Basit");
chat.sendMessage("Bilal", "OK🤐");
