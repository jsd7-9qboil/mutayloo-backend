import express from "express";
import {
	createUser,
	getUsers,
	editProfile,
	getUserById,
	deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/user/:id", getUserById);
router.patch("/users/edit-profile/:id", editProfile);
router.post("/users/sign-up", createUser);
router.get("/users", getUsers);
router.delete("/users/:id", deleteUser);

export default router;
