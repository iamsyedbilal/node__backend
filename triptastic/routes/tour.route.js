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

const router = express.Router();

router.route('/top-luxury').get(topTours, getAllTours);

router.route('/stats').get(getTourStats);

router.route('/monthly-plan/:year').get(monthlyPlan);

router.route('/').get(getAllTours).post(createTour);

router.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

export default router;
