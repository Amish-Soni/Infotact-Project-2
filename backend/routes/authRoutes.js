import express from "express";
import {
  registerController,
  loginController,
  logoutController,
  getCurrentUser,
} from "../controllers/authController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Register User or Chef
router.post("/register", registerController);

// Login
router.post("/login", loginController);

// Logout
router.get("/logout", logoutController);

// Get current logged-in user
router.get("/me", requireSignIn, getCurrentUser);

export default router;
