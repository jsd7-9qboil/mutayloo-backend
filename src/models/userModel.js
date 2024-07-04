import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		fname: {
			type: String,
			required: true,
		},
		lname: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		dob: {
			type: String,
			match: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, // ตรวจสอบรูปแบบ DD/MM/YYYY
		},
		imgProfile: {
			type: String,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
//date
//img
//isAdmin
