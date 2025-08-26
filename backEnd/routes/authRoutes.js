import express from 'express';
// import Product from '../models/Product.js';
import { checkAuth } from '../controllers/authController.js';
import { protect } from '../middleWare/protect.js';
const router = express.Router();

// GET all products
router.use(protect)
router.get('/',checkAuth);

export default router;