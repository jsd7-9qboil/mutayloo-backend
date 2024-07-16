import express from "express";
import {
	addAddress,
	getAllAddress,
	getAddressByID,
	getAddressByCustomer,
	updateAddress,
	deleteAddress,
} from "../controllers/addressController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addAddress);
router.get("/", authMiddleware, getAllAddress);
router.get("/:id", authMiddleware, getAddressByID);
router.get("/customer/:customerId", authMiddleware, getAddressByCustomer);
router.patch("/:id", authMiddleware, updateAddress);
router.delete("/:id", authMiddleware, deleteAddress);

export default router;
