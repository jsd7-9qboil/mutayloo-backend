import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

// import middleware
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getProducts); // Get all products
router.get("/:id", getProductById); // Get a single product by ID
router.post("/create", authMiddleware, adminMiddleware, createProduct); // Create a new product
router.patch("/updeate/:id", authMiddleware, adminMiddleware, updateProduct); // Update a product
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteProduct); // Delete a product

export default router;