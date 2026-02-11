import Tour from '../models/tour.model.js';
import APIFeatures from '../utils/apiFeatures.js';
import asyncHandler from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const topTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'avgRating,-price';
  req.query.fields = 'name,price,avgRating,summary,difficulty';
  next();
};

export const getAllTours = asyncHandler(async (req, res) => {
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const tours = await features.query;

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

export const getTourById = asyncHandler(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id).populate('review');

  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

export const createTour = asyncHandler(async (req, res) => {
  const createdTour = await Tour.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      createdTour,
    },
  });
});

export const updateTour = asyncHandler(async (req, res, next) => {
  const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedTour) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      updatedTour,
    },
  });
});

export const deleteTour = asyncHandler(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);

  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

export const getTourStats = asyncHandler(async (req, res) => {
  const stats = await Tour.aggregate([
    { $match: { avgRating: { $gte: 4 } } },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        numRating: { $sum: '$ratingQuantity' },
        avgRating: { $avg: '$avgRating' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    { $sort: { avgPrice: 1 } },
  ]);

  res.status(200).json({
    status: 'success',
    data: stats,
  });
});

export const monthlyPlan = asyncHandler(async (req, res) => {
  const year = parseInt(req.params.year, 10);

  const plan = await Tour.aggregate([
    { $unwind: '$startDate' },
    {
      $match: {
        startDate: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDate' },
        numTourStarts: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    { $addFields: { month: '$_id' } },
    { $project: { _id: 0 } },
    { $sort: { numTourStarts: -1 } },
    { $limit: 12 },
  ]);

  res.status(200).json({
    status: 'success',
    data: plan,
  });
});
