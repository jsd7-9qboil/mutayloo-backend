import mongoose from "mongoose";
const { Schema } = mongoose;

const addressSchema = new Schema(
	{
		customer_id: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		address_line1: {
			type: String,
			required: true,
		},
		address_line2: {
			type: String,
		},
		postcode: {
			type: String,
			required: true,
		},
		province: {
			type: String,
			required: true,
		},
		district: {
			type: String,
			required: true,
		},
		subdistrict: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Address = mongoose.model("Address", addressSchema);

export default Address;
