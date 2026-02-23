import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import { connectDB } from "./db/connectDB.js";
import ideasRouter from "./routes/ideas.route.js";
const PORT = 5000;

const app = express();

// Static Folder

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", ideasRouter);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on PORT http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Error while connecting to the DB ${error}`);
  });
