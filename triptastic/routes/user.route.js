import express from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteMe,
  updateMe,
} from '../controllers/user.controller.js';
import {
  signup,
  login,
  forgotPassowrd,
  resetPassword,
  updatePassword,
  protectedRoute,
} from '../controllers/auth.controller.js';

const router = express.Router();

router.route('/signup').post(signup);
router.route('/login').post(login);

router.route('/updateMe').patch(protectedRoute, updateMe);
router.route('/deleteMe').delete(protectedRoute, deleteMe);

router.route('/forgot-password').post(forgotPassowrd);
router.route('/reset-password/:token').patch(resetPassword);
router.route('/update-password').patch(protectedRoute, updatePassword);

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
