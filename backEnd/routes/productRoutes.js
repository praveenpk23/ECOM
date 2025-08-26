import express from 'express';
// import Product from '../models/Product.js';
import { getAllProducts,getProductById } from '../controllers/productController.js';
const router = express.Router();

// GET all products
router.get('/',getAllProducts);
// GET by id
router.get('/:id',getProductById); 

export default router;
