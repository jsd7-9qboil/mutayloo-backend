import Product from "../models/productModel.js";

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const {
      sku,
      name,
      desc,
      color,
      price,
      category,
      power,
      qty_instock,
      image,
    } = req.body;

    if (
      !sku ||
      !name ||
      !desc ||
      !color ||
      !price ||
      !category ||
      !power ||
      !qty_instock ||
      !image
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const product = new Product({
      sku,
      name,
      desc,
      color,
      price,
      category,
      power,
      qty_instock,
      image,
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully.", product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all products or filter by power
export const getProducts = async (req, res) => {
  try {
    const power = req.query.power;
    let products;
    if (power) {
      products = await Product.find({ power: power });
    } else {
      products = await Product.find();
    }

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found." });
    }

    res.json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    const {
      sku,
      name,
      desc,
      color,
      price,
      category,
      power,
      qty_instock,
      image,
    } = req.body;

    if (sku) product.sku = sku;
    if (name) product.name = name;
    if (desc) product.desc = desc;
    if (color) product.color = color;
    if (price) product.price = price;
    if (category) product.category = category;
    if (power) product.power = power;
    if (qty_instock) product.qty_instock = qty_instock;
    if (image) product.image = image;

    await product.save();
    res.json({ message: "Product updated successfully.", product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    await product.remove();
    res.json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
