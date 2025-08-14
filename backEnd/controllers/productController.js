import asyncHandler from '../middleWare/asyncHandler .js';
import Product from '../models/ProductModel.js';
import mongoose from 'mongoose';
// Controller function to get all products
// async (req, res) => {
//   try {
//     const products = await Product.find({});
//     if (!products.length) {
//       return res.status(404).json({ message: 'No products found' });
//     }
//     res.json(products);
//     console.log("P")
//   } catch (error) { 
//     res.status(500).json({ message: 'Server error' });
//   }
// };


export const getAllProducts =  asyncHandler(async(req,res)=>{
  const products = await Product.find({})
  res.send(products)
})

// Controller function to get a product by id
export const getProductById = asyncHandler(
  async (req, res) => {
    const product = await Product.findById(req.params.id);

     res.json(product);

//     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     return res.status(400).json({ message: 'Invalid product ID format' });
//   }else{
  
//     if (product) {
     
//       console.log("PP")
//     } else {
//       res.status(404).json({ message: 'Product not found' });
//     }
// } 
}
)

