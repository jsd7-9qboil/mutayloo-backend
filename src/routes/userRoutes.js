import express from "express";
import {
  registerUser,
  adminRegister,
  loginUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/register", registerUser); // Customer register a new user
router.post("/adminRegister", authMiddleware, adminMiddleware, adminRegister);  // Admin can register every role
router.post("/login", loginUser); // Login a user
router.get("/profile", authMiddleware, getUserProfile); // Get own profile
router.patch("/profile", authMiddleware, updateUserProfile); // Update own profile

export default router;