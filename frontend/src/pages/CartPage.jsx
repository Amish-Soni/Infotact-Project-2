import React from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../api/axios";
import "./CartPage.css";

const CartPage = () => {
  const { cart, loading, updateCartItem, removeCartItem, clearCart } =
    useCart();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const subtotal = cart?.items.reduce(
    (acc, item) => acc + item.menu.price * item.quantity,
    0
  );
  const deliveryFee = 50; // Example fee
  const total = subtotal + deliveryFee;

  const handleCheckout = async () => {
    try {
      // 1. Create a Razorpay Order
      const { data: orderData } = await axiosInstance.post(
        "/order/create-razorpay-order",
        { amount: total }
      );
      const rzpOrder = orderData.order;

      // 2. Configure Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Get this from your .env file
        amount: rzpOrder.amount,
        currency: "INR",
        name: "HomeCook Food Delivery",
        description: "Payment for your meal order",
        order_id: rzpOrder.id,
        handler: async (response) => {
          // 3. Verify Payment on your backend
          try {
            await axiosInstance.post("/order/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              deliveryType: "Delivery", // Or get this from user choice
              deliveryAddress: auth.user.address,
            });
            toast.success("Order placed successfully!");
            clearCart(); // Clear the cart state
            navigate("/order-success"); // Redirect to a success page
          } catch (verifyError) {
            toast.error("Payment verification failed.");
            console.error(verifyError);
          }
        },
        prefill: {
          name: auth.user.name,
          email: auth.user.email,
        },
        theme: {
          color: "#e67e22",
        },
      };

      // 4. Open Razorpay checkout modal
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error("Checkout failed. Please try again.");
      console.error(error);
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (!cart || cart.items.length === 0) {
    return (
      <div className="cart-container empty-cart">
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added any meals yet.</p>
        <button onClick={() => navigate("/")}>Browse Meals</button>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <h2>Your Shopping Cart</h2>
      <div className="cart-layout">
        <div className="cart-items">
          {cart.items.map((item) => (
            <div key={item.menu._id} className="cart-item">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}${
                  item.menu.images ? item.menu.images[0] : ""
                }`}
                alt={item.menu.title}
              />
              <div className="item-details">
                <h3>{item.menu.title}</h3>
                <p>₹{item.menu.price}</p>
              </div>
              <div className="item-controls">
                <button
                  onClick={() =>
                    updateCartItem(item.menu._id, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    updateCartItem(item.menu._id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
              <p className="item-total">₹{item.menu.price * item.quantity}</p>
              <button
                className="remove-btn"
                onClick={() => removeCartItem(item.menu._id)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>₹{deliveryFee}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
