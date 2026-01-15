const express = require("express");
const booksRouter = require("./routes/book.route.js");
const { logger } = require("./middleware/logger.js");

const app = express();
const PORT = 7000;

// Build in middleware
// Data is coming from frontent it will give the data in body
app.use(express.json());

// Use custom logger middleware
app.use(logger);

app.use("/books", booksRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
