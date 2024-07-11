import express from "express";
import {
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
  getCart,
} from "../controllers/cartController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addItemToCart);
router.post("/update", authMiddleware, updateItemQuantity);
router.post("/remove", authMiddleware, removeItemFromCart);
router.get("/", authMiddleware, getCart);

export default router;
