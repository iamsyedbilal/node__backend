import { text } from "express";
import mongoose from "mongoose";

const ideaSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Please add a text field"],
  },
  tag: {
    type: String,
  },
  username: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Ideas = mongoose.model("Idea", ideaSchema);

export default Ideas;
