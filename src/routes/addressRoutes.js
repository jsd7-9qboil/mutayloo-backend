import express from "express";
import { addAddress, getAddress } from "../controllers/addressController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addAddress);
router.get("/:id", authMiddleware, getAddress);

export default router;
