import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

// Create an order
export const createOrder = async (req, res) => {
  const { items } = req.body; // รับรายการสินค้าที่ต้องการสั่งซื้อจากคำขอ

  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "cartItems.product"
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    // คัดกรองรายการสินค้าที่ต้องการสั่งซื้อจากตะกร้า
    const orderItems = cart.cartItems
      .filter((cartItem) =>
        items.some(
          (item) => item.product.toString() === cartItem.product._id.toString()
        )
      )
      .map((cartItem) => ({
        product: cartItem.product._id,
        quantity: items.find(
          (item) => item.product.toString() === cartItem.product._id.toString()
        ).quantity,
        price: cartItem.product.price, // เพิ่มการดึงข้อมูลราคา
      }));

    if (orderItems.length === 0) {
      return res.status(400).json({ message: "No valid items to order." });
    }

    const totalAmount = orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const order = new Order({
      user: req.user._id,
      items: orderItems,
      totalAmount,
    });

    await order.save();

    // ลบรายการสินค้าที่ถูกสั่งซื้อออกจากตะกร้า
    cart.cartItems = cart.cartItems.filter(
      (cartItem) =>
        !items.some(
          (item) => item.product.toString() === cartItem.product._id.toString()
        )
    );

    await cart.save();

    res.status(201).json({ message: "Order created successfully.", order });
  } catch (error) {
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
