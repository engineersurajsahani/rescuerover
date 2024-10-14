import React, { useEffect, useState } from 'react';
import './Orders.css'; // Import the CSS file for styling

function Orders() {
  const username = localStorage.getItem('username'); // Get the logged-in user's username
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (username) {
      // Retrieve the orders from localStorage
      const storedOrders = JSON.parse(localStorage.getItem(`orders_${username}`)) || [];
      setOrders(storedOrders);
    }
  }, [username]);

  if (!username) {
    return (
      <div className="container mt-5">
        <h2>Please log in to view your orders.</h2>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mt-5">
        <h2>No orders found.</h2>
      </div>
    );
  }

  // Calculate total price of all orders
  const totalPrice = orders.reduce((total, order) => total + (order.price * order.quantity), 0);

  return (
    <div className="container mt-5">
      <h2>Your Orders</h2>
      <div className="order-list">
        {orders.map((order, index) => (
          <div className="order-item" key={index}>
            <h4 className="order-title">{order.name}</h4>
            <p>Quantity: <span className="order-quantity">{order.quantity}</span></p>
            <p>Price: <span className="order-price">₹{order.price * order.quantity}</span></p>
            <p>Date & Time: <span className="order-timestamp">{order.timestamp}</span></p> {/* Display date and time */}
          </div>
        ))}
      </div>
      <div className="order-summary">
        <h3>Total Price: <span className="total-price">₹{totalPrice}</span></h3>
      </div>
    </div>
  );
}

export default Orders;
