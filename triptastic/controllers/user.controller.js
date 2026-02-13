import asyncHandler from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import User from '../models/user.model.js';
import { deleteOne, createOne, updateOne } from './handlerFactoryFunc.js';

const filterObj = (obj, ...allowedFiled) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFiled.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

export const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

export const updateMe = asyncHandler(async (req, res, next) => {
  // 1) Block password updates
  if (req.body.password || req.body.confirmPassword) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /update-Password.',
        400
      )
    );
  }
  // 2) Filter allowed fields
  const filteredBody = filterObj(req.body, 'name', 'email');
  // 3) Update user
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  // 4) Send response
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

export const deleteMe = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

export const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

export const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

export const updateUser = updateOne(User);

export const deleteUser = deleteOne(User);
