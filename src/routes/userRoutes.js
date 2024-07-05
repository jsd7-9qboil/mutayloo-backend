import express from "express";
import {
	createUser,
	getUsers,
	editProfile,
	getUserById,
	deleteUser,
} from "../controllers/userController.js";
import {
	getAddresses,
	editAddress,
	createAddress,
	deleteAddress,
} from "../controllers/addressController.js";

const router = express.Router();

//user route
router.get("/users", getUsers);
router.get("/user/:id", getUserById);
router.patch("/users/edit-profile/:id", editProfile);
router.post("/users/sign-up", createUser);
router.delete("/users/:id", deleteUser);

//address route
router.post("/users/address", createAddress);
router.get("/users/address", getAddresses);
router.patch("/users/address/:id", editAddress);
router.delete("/users/address/:id", deleteAddress);

export default router;
