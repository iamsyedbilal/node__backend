import asyncHandler from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const deleteOne = (Model) => {
  return asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
};

export const updateOne = (Model) => {
  return asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
};

export const createOne = (Model) => {
  return asyncHandler(async (req, res, next) => {
    const doc = await Model.create(req.body);

    if (!doc) {
      return next(new AppError('No document cannot be empty', 404));
    }

    res.status(204).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
};
