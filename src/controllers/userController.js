import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

//TODO specifically admin can register admin role, other user can not!!!

export const registerUser = async (req, res) => {
  try {
    const { fname, lname, email, password, dob, isAdmin } = req.body;

    const user = new User({ fname, lname, email, password, dob, isAdmin });
    await user.save();

    const token = jwt.sign(
      { _id: user._id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: "User not found." });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const { fname, lname, email, password, dob, imgProfile } = req.body;

    // Update fields
    if (fname) user.fname = fname;
    if (lname) user.lname = lname;
    if (email) user.email = email;
    if (password) user.password = password;
    if (dob) user.dob = dob;
    if (imgProfile) user.imgProfile = imgProfile;

    await user.save();

    res.json({ message: "Profile updated successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
