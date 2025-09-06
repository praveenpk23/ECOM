import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // reference User collection
    required: true
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: { type: Number, default: 1 },
      price: { type: Number, required: true } // store product price at time of add
    }
  ],
  itemPrice: { type: Number, default: 0 },
  shippingPrice: { type: Number, default: 0 },
  taxPrice: { type: Number, default: 0 },
  totalPrice: { type: Number, default: 0 }
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
