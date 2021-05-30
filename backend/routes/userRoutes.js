import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

import {
  authUser,
  registUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js';

router.route('/login').post(authUser);
router.route('/').get(protect, admin, getUsers);
router.route('/registe').post(registUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
