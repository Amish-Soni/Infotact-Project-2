import express from "express";
import {
  createRazorpayOrder,
  verifyPayment,
  getUserOrders,
} from "../controllers/orderController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create-razorpay-order", requireSignIn, createRazorpayOrder);
router.post("/verify-payment", requireSignIn, verifyPayment);
router.get("/my-orders", requireSignIn, getUserOrders);

export default router;
