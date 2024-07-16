import express from "express";
import {
	registerUser,
	adminRegister,
	loginUser,
	getUserProfile,
	getUserById,
	getAllUsers,
	updateUserProfile,
	updateUserById,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/adminRegister", authMiddleware, adminMiddleware, adminRegister);
router.post("/login", loginUser);

router.get("/profile", authMiddleware, getUserProfile);
router.get("/profile/:id", authMiddleware, adminMiddleware, getUserById);
router.get("/all", authMiddleware, adminMiddleware, getAllUsers);

router.post(
	"/profile",
	authMiddleware,
	upload.single("imgProfile"),
	updateUserProfile
);
router.post(
	"/:id",
	authMiddleware,
	upload.single("imgProfile"),
	updateUserById
);

export default router;
