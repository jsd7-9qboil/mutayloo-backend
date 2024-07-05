import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
	thumbnail: {
		type: String,
		required: true,
	},
	gallery: {
		type: [String],
		required: true,
	},
	alt: {
		type: String,
		required: true,
	},
});

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		desc: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		qty_instock: {
			type: Number,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		power: {
			type: String,
			required: true,
		},
		image: {
			type: imageSchema,
			required: true,
		},
		rating: {
			type: Number,
			required: true,
		},
		color: {
			type: String,
			required: true,
		},
		sku: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{ timestamps: true }
);

productSchema.index({ name: "text", desc: "text", category: "text" });

const Product = mongoose.model("Product", productSchema);

export default Product;
