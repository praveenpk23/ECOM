import { nanoid } from "nanoid";
import Order from "../models/OrderModel.js";
import asyncHandler from "../middleWare/asyncHandler .js";
import Cart from "../models/CartModel.js";
/**
 * Create order with unique ID
 */
export const createOrderWithUniqueId = asyncHandler(async (req, res) => {
  let retries = 5;
  while (retries > 0) {
    const orderId = nanoid(10);
    try {
      const newOrder = await Order.create({
        ...req.body, // take order data from body
        orderId,
        user: req.user._id, // logged-in user
      });
      if(newOrder){
        await Cart.deleteMany({user:req.user._id})
      }
      return res.status(201).json(newOrder);
    } catch (err) {
      if (err.code === 11000 && err.keyPattern?.orderId) {
        retries--;
        if (retries === 0) {
          throw new Error("Could not generate unique orderId after 5 tries");
        }
      } else {
        throw err;
      }
    }
  }
});

/**
 * Get all orders for current user
 */
export const getOrdersById = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort("-createdAt");
  res.status(200).json(orders);
});

/**
 * Get single order by orderId
 */
export const getOrderByOrderId = asyncHandler(async (req, res) => {
  const { orderId } = req.params; // expecting /orders/:orderId
  const order = await Order.findOne({ _id:orderId });
  console.log(orderId,order)
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  if (!req.user._id.equals(order.user)) {
    res.status(403);
    throw new Error("Not authorized to view this order");
  }
  res.status(200).json(order);
});

/**
 * Update order status
 */
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body; // new status

  const order = await Order.findOne({ orderId });
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  const isOwner = req.user._id.equals(order.user);
  const isAdmin = req.user.isAdmin;

  // Define rules
  const adminOnlyStatuses = ["Processing", "Shipped", "Delivered"];
  const ownerAllowedStatuses = ["Cancelled", "ReturnRequested"];

  if (adminOnlyStatuses.includes(status) && !isAdmin) {
    res.status(403);
    throw new Error(`Only admin can update status to '${status}'`);
  }

  if (ownerAllowedStatuses.includes(status) && !isOwner) {
    res.status(403);
    throw new Error(`You are not allowed to update status to '${status}'`);
  }

  // update status & push to history
  order.status = status;
  order.statusUpdates.push({ status });

  // optional: mark delivered
  if (status === "Delivered") {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
  }

  // optional: mark cancelled
  if (status === "Cancelled") {
    order.isReturned = false;
    order.isReturnRequested = false;
  }

  const updated = await order.save();
  res.status(200).json(updated);
});
