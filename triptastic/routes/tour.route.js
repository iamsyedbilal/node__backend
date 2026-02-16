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
  getToursWithin,
  getDistances,
} from '../controllers/tour.controller.js';
import reviewRouter from './review.route.js';
import { protectedRoute, restrictTo } from '../controllers/auth.controller.js';

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

router.route('/top-luxury').get(topTours, getAllTours);

router.route('/stats').get(getTourStats);

router
  .route('/monthly-plan/:year')
  .get(protectedRoute, restrictTo('admin', 'lead-guide', 'guide'), monthlyPlan);

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(protectedRoute, getToursWithin);

router.route('/distances/:latlng/unit/:unit').get(protectedRoute, getDistances);

router
  .route('/')
  .get(getAllTours)
  .post(protectedRoute, restrictTo('admin', 'lead-guide'), createTour);

router
  .route('/:id')
  .get(getTourById)
  .patch(protectedRoute, restrictTo('admin', 'lead-guide'), updateTour)
  .delete(protectedRoute, restrictTo('admin', 'lead-guide'), deleteTour);

export default router;
