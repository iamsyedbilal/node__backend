import Review from '../models/review.model.js';
import asyncHandler from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import { deleteOne, createOne, updateOne } from './handlerFactoryFunc.js';

export const setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

export const getAllReviews = asyncHandler(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };
  const review = await Review.find(filter);

  res
    .status(200)
    .json({ status: 'success', result: review.length, data: { review } });
});

export const createReview = createOne(Review);
export const updateReview = updateOne(Review);
export const deleteReview = deleteOne(Review);
