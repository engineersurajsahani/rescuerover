import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart() {
  const username = localStorage.getItem('username'); // Get the username from localStorage
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (username) {
      // Get Cart from localStorage for the logged-in user
      const storedCart = JSON.parse(localStorage.getItem(`cart_${username}`)) || [];
      setCart(storedCart);
    }
  }, [username]);

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter(item => item._id !== productId);
    setCart(updatedCart);
    localStorage.setItem(`cart_${username}`, JSON.stringify(updatedCart)); // Update localStorage
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCart = cart.map(item => {
      if (item._id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem(`cart_${username}`, JSON.stringify(updatedCart)); // Update localStorage
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    navigate('/checkout'); // Navigate to the checkout page
  };

  if (!username) {
    return (
      <div className="container mt-5">
        <h2>Please log in to view your cart.</h2>
        <Link to="/login" className="btn btn-primary">Log In</Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container mt-5">
        <h2>Your Cart is Empty</h2>
        <Link to="/products" className="btn btn-primary">Go to Products</Link>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cart.map(product => (
          <div className="cart-item" key={product._id}>
            <div className="cart-item-info">
              <img
                src={`${process.env.PUBLIC_URL}/images/products/${product.imageUrl}.jpeg`}
                alt={product.name}
              />
              <div className="cart-item-details">
                <h4>{product.name}</h4>
                <p>Price: ₹{product.price}</p>
                <p>Category: {product.category}</p>
              </div>
            </div>
            <div className="cart-item-actions">
              <label>Quantity:</label>
              <input
                type="number"
                min="1"
                value={product.quantity}
                onChange={(e) => handleQuantityChange(product._id, parseInt(e.target.value))}
              />
              <button className="btn btn-danger" onClick={() => handleRemoveFromCart(product._id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-total mt-4">
        <h4>Total Price: ₹{getTotalPrice()}</h4>
        <button className="btn btn-success" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
