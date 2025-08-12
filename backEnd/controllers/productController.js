import Product from '../models/ProductModel.js';
import mongoose from 'mongoose';
// Controller function to get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products.length) {
      return res.status(404).json({ message: 'No products found' });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller function to get a product by id
export const getProductById = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid product ID format' });
  }else{
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Invalid product ID' });
  }
} 
};
