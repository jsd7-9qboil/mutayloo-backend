import Order from "../models/orderModel.js";

// Create an order
export const createOrder = async (req, res) => {
  const { shippingAddress, products, total, paymentMethod, status } = req.body;

  try {
    const orderItems = products.map((product) => ({
      product: product._id,
      quantity: product.quantity,
      price: product.product.price, // Assuming price is a property of product
    }));

    const order = new Order({
      user: req.user._id,
      items: orderItems,
      totalAmount: total,
      status,
    });

    await order.save();
    res.status(201).json({ message: "Order created successfully.", order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(400).json({ message: error.message });
  }
};

// Get orders for a user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "items.product"
    );
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.product");
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
