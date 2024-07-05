import express from "express";
import {
	createProduct,
	getProducts,
	getProductById,
	searchProducts,
	filterProducts,
	updateProduct,
	deleteProduct,
	getReviewsForProduct,
	createReviewForProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/products/create", createProduct);
router.get("/products", getProducts);
router.get("/products/search", searchProducts);
router.get("/products/filter", filterProducts);
router.get("/products/:id", getProductById);
router.patch("/products/update/:id", updateProduct);
router.delete("/products/delete/:id", deleteProduct);
router.get("/products/:id/reviews", getReviewsForProduct);
router.post("/products/:id/reviews/create", createReviewForProduct);

export default router;
