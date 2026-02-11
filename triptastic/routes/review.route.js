import express from 'express';
import {
  createReview,
  getAllReviews,
} from '../controllers/review.controller.js';
import { restrictTo, protectedRoute } from '../controllers/auth.controller.js';
const router = express.Router({ mergeParams: true });

router.use(protectedRoute);

router.route('/').get(getAllReviews).post(restrictTo('user'), createReview);

export default router;
