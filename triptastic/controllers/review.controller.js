import Review from '../models/review.model.js';
import asyncHandler from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const getAllReviews = asyncHandler(async (req, res, next) => {
  const review = await Review.find();

  res
    .status(200)
    .json({ status: 'success', result: review.length, data: { review } });
});

export const createReview = asyncHandler(async (req, res, next) => {
  const review = await Review.create(req.body);

  res.status(201).josn({
    status: 'success',
    data: {
      review,
    },
  });
});
