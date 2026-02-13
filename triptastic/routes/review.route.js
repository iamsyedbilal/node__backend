import express from 'express';
import {
  createReview,
  getAllReviews,
  deleteReview,
  updateReview,
  setTourUserIds,
} from '../controllers/review.controller.js';
import { restrictTo, protectedRoute } from '../controllers/auth.controller.js';
const router = express.Router({ mergeParams: true });

router.use(protectedRoute);

router
  .route('/')
  .get(getAllReviews)
  .post(restrictTo('user'), setTourUserIds, createReview);

router
  .route('/:id')
  .delete(restrictTo('user', 'admin'), deleteReview)
  .patch(restrictTo('user', 'admin'), updateReview);

export default router;
