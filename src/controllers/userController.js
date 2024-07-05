import User from "../models/userModel.js";
import Address from "../models/addressModel.js";

// Get all users with their addresses
export const getUsers = async (req, res) => {
	try {
		const users = await User.aggregate([
			{
				$lookup: {
					from: "addresses",
					localField: "_id",
					foreignField: "customer_id",
					as: "addresses",
				},
			},
		]);
		res.status(200).json(users);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// Get user by ID
export const getUserById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);
		if (!user) {
			return res.status(404).json({ message: `User with id ${id} not found` });
		}
		res.status(200).json({ message: "Get User By ID", data: user });
	} catch (error) {
		next(error);
	}
};

// Create a new user
export const createUser = async (req, res) => {
	try {
		const user = new User(req.body);
		await user.save();
		res.status(201).json(user);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// Update profile
export const editProfile = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { fname, lname, email, password } = req.body;

		const updatedUser = await User.findByIdAndUpdate(
			id,
			{ fname, lname, email, password },
			{ new: true, runValidators: true }
		);

		if (!updatedUser) {
			return res.status(404).json({ message: "User not found" });
		}

		res.status(200).json(updatedUser);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// Delete User
export const deleteUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		const deletedUser = await User.findByIdAndDelete(id);

		if (!deletedUser) {
			return res.status(404).json({ message: `User with id ${id} not found` });
		}

		res.status(200).json({ message: `User with id ${id} has been deleted` });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};
