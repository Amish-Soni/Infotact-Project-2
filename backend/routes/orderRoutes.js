import express from "express";
import {
  createRazorpayOrder,
  verifyPayment,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import {
  requireSignIn,
  isAdmin,
  isChef,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create-razorpay-order", requireSignIn, createRazorpayOrder);
router.post("/verify-payment", requireSignIn, verifyPayment);
router.get("/my-orders", requireSignIn, getUserOrders);
// Admin or Chef access
router.get("/all", requireSignIn, isAdmin, getAllOrders);
router.put("/update-status/:id", requireSignIn, isAdmin, updateOrderStatus);

export default router;
