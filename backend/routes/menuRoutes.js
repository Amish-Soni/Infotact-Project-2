import express from "express";
import { upload } from "../middlewares/multerMiddleware.js";
import {
  createMenuItem,
  getAllMenus,
  getChefMenus,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuController.js";
import { requireSignIn, isChef } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create new menu item
router.post(
  "/add",
  requireSignIn,
  isChef,
  upload.array("images", 5),
  createMenuItem
);

// Get all available menu items
router.get("/all", getAllMenus);

// Get logged-in chef’s menu items
router.get("/chef", requireSignIn, isChef, getChefMenus);

// Update a menu item
router.put(
  "/:id",
  requireSignIn,
  isChef,
  upload.array("images", 5),
  updateMenuItem
);

// Delete a menu item
router.delete("/:id", requireSignIn, isChef, deleteMenuItem);

export default router;
