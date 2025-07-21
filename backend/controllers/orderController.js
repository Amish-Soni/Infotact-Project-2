import { razorpay } from "../config/razorpay.js";
import crypto from "crypto";
import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

// Step 1 — Create Razorpay Order
export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body; // amount in INR
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Step 2 — Verify Razorpay Signature
// Step 2 — Verify Razorpay Signature
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      deliveryType,
      deliveryAddress,
    } = req.body;

    // Signature verification
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;
    if (!isValid)
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });

    // FIX 1: Populate the cart with menu details to access price
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.menu",
      "price"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    // FIX 2: Recalculate total including the delivery fee
    const subtotal = cart.items.reduce(
      (acc, item) => acc + item.quantity * item.menu.price,
      0
    );
    const deliveryFee = 50; // Use the same fee as the frontend
    const totalAmount = subtotal + deliveryFee;

    // Create order
    const order = await Order.create({
      user: req.user._id,
      items: cart.items,
      totalAmount, // This amount now correctly matches what was paid
      deliveryType,
      deliveryAddress,
      paymentStatus: "Paid",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
    });

    // Clear cart after order
    await Cart.findOneAndDelete({ user: req.user._id });

    res.json({ success: true, order });
  } catch (err) {
    console.error("VERIFY PAYMENT ERROR:", err); // Added for better debugging
    res.status(500).json({ success: false, message: err.message });
  }
};

// Step 3 — Get User Orders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("items.menu");
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get All Orders (for admin or chef)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .populate("user", "name email")
      .populate("items.menu", "title price");

    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update Order Status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.json({ success: true, message: "Status updated", order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
