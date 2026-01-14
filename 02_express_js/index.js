const express = require("express");

const app = express();
const PORT = 7000;

// Build in middleware
// Data is coming from frontent it will give the data in body
app.use(express.json());

//In Memory DB
const books = [
  {
    id: 1,
    title: "Book 1",
    aurthor: "Naruto",
  },
  {
    id: 2,
    title: "Book 2",
    aurthor: "Goku",
  },
];

// Routes
// GET BOOKS
app.get("/books", (req, res) => {
  // You can also set the custom header
  // res.setHeader("x-Bilal", "Bilal");
  // Prefer to send the JSON respond
  // It will convert the array into JSON and send to the route
  res.json(books);
});

// GET BOOK BY ID
app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID must be a number" });
  }

  const book = books.find((e) => e.id === id);
  if (!book) {
    return res.status(404).json({ error: `Books with ${id} not found` });
  }
  return res.status(201).json(book);
});

// POST A BOOK
app.post("/books", (req, res) => {
  const { title, aurthor } = req.body;

  if (!title || title === " ") {
    return res.status(400).json({ error: "Title is required" });
  }

  if (!aurthor || aurthor === " ") {
    return res.status(400).json({ error: "Author is required" });
  }

  const book = { id: books.length + 1, title, aurthor };
  books.push(book);

  return res.status(201).json({ message: "Book is created successfully" });
});

// DELETE BOOK
app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID must be a number" });
  }

  const findIndexOfBook = books.findIndex((book) => book.id === id);

  if (findIndexOfBook < 0) {
    return res.status(404).json({ error: `Book with id ${id} not found` });
  }

  books.splice(findIndexOfBook, 1);

  return res.status(200).json({ message: `Book is deleted` });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
