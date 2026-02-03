import express from 'express';
import {
  createReview,
  getAllReviews,
} from '../controllers/review.controller.js';
const router = express.Router();

router.route('/').get(getAllReviews);
router.route('/create').post(createReview);

export default router;
