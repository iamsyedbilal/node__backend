import express from 'express';
import {
  createTour,
  deleteTour,
  getAllTours,
  getTourById,
  updateTour,
  topTours,
  monthlyPlan,
  getTourStats,
} from '../controllers/tour.controller.js';
import reviewRouter from '../routes/review.route';
import { createReview } from '../controllers/review.controller.js';
import { protectedRoute, restrictTo } from '../controllers/auth.controller.js';

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

router.route('/top-luxury').get(topTours, getAllTours);

router.route('/stats').get(getTourStats);

router.route('/monthly-plan/:year').get(monthlyPlan);

router
  .route('/')
  .get(protectedRoute, getAllTours)
  .post(protectedRoute, createTour);

router
  .route('/:id')
  .get(protectedRoute, restrictTo('user'), getTourById)
  .patch(protectedRoute, updateTour)
  .delete(protectedRoute, deleteTour);

export default router;
