import express from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../controllers/cartController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", requireSignIn, addToCart);
router.get("/", requireSignIn, getCart);
router.put("/update", requireSignIn, updateCartItem);
router.delete("/remove/:menuId", requireSignIn, removeCartItem);
router.delete("/clear", requireSignIn, clearCart);

export default router;
