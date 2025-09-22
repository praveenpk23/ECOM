import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    // items copied from cart at order creation
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
      }
    ],

    // address + contact info at time of ordering
    shippingAddress: {
      fullName: { type: String, required: true },
      addressLine1: { type: String, required: true },
      addressLine2: String,
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      country: { type: String, required: true },
      phone: { type: String, required: true }
    },

    // prices
    itemPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },

    // order status + history
    status: {
      type: String,
      enum: ['Ordered', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Ordered'
    },
    statusUpdates: [
      {
        status: {
          type: String,
          enum: ['Ordered', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
          required: true
        },
        updatedAt: { type: Date, default: Date.now }
      }
    ],

    // delivery info
    isDelivered: { type: Boolean, default: false },
    deliveredAt: Date,

    // optional payment info
    paymentMethod: String,
    isPaid: { type: Boolean, default: false },
    paidAt: Date
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
