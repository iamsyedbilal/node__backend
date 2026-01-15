const express = require("express");

const {
  getBooks,
  getBookById,
  postBook,
  deleteBook,
} = require("../controllers/book.controller.js");

const router = express.Router();

// Routes
// GET BOOKS
router.get("/", getBooks);

// GET BOOK BY ID
router.get("/:id", getBookById);

// POST A BOOK
router.post("/", postBook);

// DELETE BOOK
router.delete("/:id", deleteBook);

module.exports = router;
