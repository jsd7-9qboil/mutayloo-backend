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
    sku: {
      type: String,
      required: true,
      // unique: true, // ลบออกเพื่อให้สามารถซ้ำกันได้
    },
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
    },
    power: {
      type: String,
      required: true,
    },
    qty_instock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
    image: {
      type: imageSchema,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
