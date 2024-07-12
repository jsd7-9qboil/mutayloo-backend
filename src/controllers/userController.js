import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Customer register a new user
export const registerUser = async (req, res) => {
  try {
    const { fname, lname, email, password, dob } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fname,
      lname,
      email,
      password: hashedPassword,
      dob,
      isAdmin: false,
    });
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

// Admin can register every role
export const adminRegister = async (req, res) => {
  try {
    const { fname, lname, email, password, dob, isAdmin } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fname,
      lname,
      email,
      password: hashedPassword,
      dob,
      isAdmin,
    });
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

// Login a user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    res.json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const userProfile = await User.aggregate([
      { $match: { _id: req.user._id } },
      {
        $lookup: {
          from: "addresses",
          localField: "_id",
          foreignField: "customer_id",
          as: "address",
        },
      },
      {
        $project: {
          password: 0,
        },
      },
    ]);

    if (!userProfile || userProfile.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json(userProfile[0]); // Return the first result as the user profile
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update user profile
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
    if (password) user.password = await bcrypt.hash(password, 10);
    if (dob) user.dob = dob;
    if (imgProfile) user.imgProfile = imgProfile;

    await user.save();

    res.json({ message: "Profile updated successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
