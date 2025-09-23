import express from "express";
import {
  createOrderWithUniqueId,
  getOrdersById,
  getOrderByOrderId,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

router.post("/", protect, createOrderWithUniqueId); // create new order
router.get("/", protect, getOrdersById); // get all orders of user
router.get("/:orderId", protect, getOrderByOrderId); // get single order by orderId
router.put("/:orderId/status", protect, updateOrderStatus); // update status

export default router;
