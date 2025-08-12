import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  brand: String,
  category: String,
  price: Number,
  countInStock: Number,
  rating: Number,
  numReviews: Number
,});

export default mongoose.model('Product', productSchema,);
