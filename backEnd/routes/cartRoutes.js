// routes/cartRoutes.js
import express from 'express';
import { 
  mergeCartOnLogin, 
  getCart, 
  addToCart, 
  updateCartQuantity, 
  removeFromCart ,
} from '../controllers/cartController.js';
import { protect } from "../middleware/protect.js";
const router = express.Router();

// Merge local cart on login
// POST /api/cart/merge
router.post('/merge', protect, mergeCartOnLogin);

// Get logged-in user's cart
// GET /api/cart
router.get('/', protect, getCart);

// Add a product to cart
// POST /api/cart
router.post('/', protect, addToCart);

// Update quantity of a product in cart
// PUT /api/cart/:productId
router.put('/:productId', protect, updateCartQuantity);

// Remove a product from cart
// DELETE /api/cart/:productId
router.delete('/:productId', protect, removeFromCart);

export default router;
