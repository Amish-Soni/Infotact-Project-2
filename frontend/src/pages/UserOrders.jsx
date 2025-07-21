import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import toast from "react-hot-toast";
import "./UserOrders.css";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axiosInstance.get("/order/my-orders");
        setOrders(data.orders);
      } catch (error) {
        toast.error("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p>Loading your orders...</p>;

  return (
    <div className="user-orders-container">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>You have not placed any orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div>
                  <strong>Order ID:</strong> #{order._id.slice(-6)}
                </div>
                <div>
                  <strong>Date:</strong>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </div>
                <div className={`status status-${order.status.toLowerCase()}`}>
                  {order.status}
                </div>
              </div>
              <div className="order-body">
                {order.items.map((item) => (
                  <div key={item._id} className="order-item">
                    <span>
                      {item.menu.title} (x{item.quantity})
                    </span>
                    <span>₹{item.menu.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="order-footer">
                <strong>Total: ₹{order.totalAmount}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;
