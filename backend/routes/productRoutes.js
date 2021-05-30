import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  getTopRatedProducts,
  addReview,
  removeReview,
} from '../controllers/productController.js';

router.route('/').get(getProducts).post(protect, admin, createProduct);
router
  .route('/:id/review')
  .post(protect, addReview)
  .delete(protect, removeReview);
router.route('/top').get(getTopRatedProducts);
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
