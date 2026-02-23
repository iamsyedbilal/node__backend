import { Router } from "express";
import {
  getAllIdeas,
  createIdea,
  updateIdes,
  deleteIdea,
  getIdea,
} from "../controllers/ideas.controller.js";

const router = Router();

router.route("/ideas").get(getAllIdeas).post(createIdea);

router.route("/ideas/:id").patch(updateIdes).delete(deleteIdea).get(getIdea);

export default router;
