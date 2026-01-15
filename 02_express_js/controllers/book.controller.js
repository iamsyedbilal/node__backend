const { BOOKS } = require("../db/book.js");
const books = BOOKS;

exports.getBooks = (req, res) => {
  // You can also set the custom header
  // res.setHeader("x-Bilal", "Bilal");
  // Prefer to send the JSON respond
  // It will convert the array into JSON and send to the route
  res.json(books);
};

exports.getBookById = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID must be a number" });
  }

  const book = books.find((e) => e.id === id);
  if (!book) {
    return res.status(404).json({ error: `Books with ${id} not found` });
  }
  return res.status(201).json(book);
};

exports.postBook = (req, res) => {
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
};

exports.deleteBook = (req, res) => {
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
};
