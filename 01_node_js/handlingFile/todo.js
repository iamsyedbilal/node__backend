const fs = require("node:fs");
const path = require("node:path");

const filePath = path.join(__dirname, "todo.json");

const command = process.argv[2];
const todoText = process.argv.slice(3).join(" ");

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([]));
}

function readTodo() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function writeTodo(todos) {
  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
}

if (command === "add") {
  if (!todoText) {
    console.log("Please enter an todo");
    process.exit(1);
  }
  const todos = readTodo();
  todos.push({ text: todoText });
  writeTodo(todos);

  console.log("Todo added✅");
} else if (command === "list") {
  const todos = readTodo();

  if (todos.length === 0) {
    console.log("No todo yet");
    return;
  }

  todos.forEach((item, index) => {
    console.log(`${index + 1} - ${item.text}`);
  });
} else if (command === "remove") {
  const index = Number(todoText);
  const todos = readTodo();

  if (isNaN(index) || !todos[index]) {
    console.log("Invalid index.");
    return;
  }

  const removed = todos.splice(index, 1);
  writeTodo(todos);

  console.log(`Removed: ${removed[0].text}`);
} else {
  console.log("Commands:");
  console.log('  add "todo text"');
  console.log("  list");
  console.log("  remove index");
}
