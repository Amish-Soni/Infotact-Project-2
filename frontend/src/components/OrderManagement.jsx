import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import toast from "react-hot-toast";
import "./OrderManagement.css";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const orderStatuses = [
    "Pending",
    "Confirmed",
    "Preparing",
    "Ready",
    "Delivered",
    "Cancelled",
  ];

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const { data } = await axiosInstance.get("/order/all");
        setOrders(data.orders);
      } catch (error) {
        toast.error("Failed to fetch orders.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const { data } = await axiosInstance.put(
        `/order/update-status/${orderId}`,
        { status: newStatus }
      );

      // Update the order status in the local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, status: data.order.status }
            : order
        )
      );
      toast.success("Order status updated!");
    } catch (error) {
      toast.error("Failed to update status.");
      console.error(error);
    }
  };

  if (loading) return <p>Loading all orders...</p>;

  return (
    <div className="order-management-container">
      <h3>All Customer Orders</h3>
      <div className="orders-table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>#{order._id.slice(-6)}</td>
                <td>{order.user.name}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  {order.items.map((item) => (
                    <div key={item._id} className="table-item-list">
                      {item.menu.title} (x{item.quantity})
                    </div>
                  ))}
                </td>
                <td>₹{order.totalAmount}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className={`status-select status-${order.status.toLowerCase()}`}
                  >
                    {orderStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
