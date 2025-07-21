import React from "react";
import { Link } from "react-router-dom";
import "./OrderSuccess.css";

const OrderSuccess = () => {
  return (
    <div className="order-success-container">
      <div className="success-icon">✅</div>
      <h2>Order Placed Successfully!</h2>
      <p>Thank you for your purchase. Your meal is being prepared.</p>
      <div className="success-actions">
        <Link to="/my-orders" className="btn btn-primary">
          View My Orders
        </Link>
        <Link to="/" className="btn btn-secondary">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
