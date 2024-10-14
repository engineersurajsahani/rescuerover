import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Product.css'; // Import the CSS file with button styles

function Product() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState('All');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch Products from API
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/products');
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter Products based on selected category
    if (filter === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === filter));
    }
  }, [filter, products]);

  useEffect(() => {
    // Get Cart from localStorage on initial load
    const cartKey = `cart_${localStorage.getItem('username')}`;
    const storedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
    setCart(storedCart);
  }, []);

  const handleFilter = (filterValue) => {
    setFilter(filterValue);
  };

  const handleAddToCart = (product) => {
    const username = localStorage.getItem('username');
    if (!username) {
      alert('Please log in to add items to your cart.');
      return;
    }

    const cartKey = `cart_${username}`;
    const storedCart = JSON.parse(localStorage.getItem(cartKey)) || [];

    // Check if the product is already in the cart
    const existingProduct = storedCart.find(item => item._id === product._id);
    if (existingProduct) {
      existingProduct.quantity += 1; // Increase quantity if the product is already in the cart
    } else {
      storedCart.push({ ...product, quantity: 1 }); // Add product with quantity 1 if not in the cart
    }

    // Save updated cart back to localStorage
    localStorage.setItem(cartKey, JSON.stringify(storedCart));
    setCart(storedCart); // Update the cart state to re-render the cart icon count
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Products</h2>

      {/* Filter Buttons */}
      <div className="mb-4">
        <button className="btn btn-tshirt" onClick={() => handleFilter('Tshirt')}>Tshirt</button>
        <button className="btn btn-cup" onClick={() => handleFilter('Cup')}>Cup</button>
        <button className="btn btn-food" onClick={() => handleFilter('Food')}>Food</button>
        <button className="btn btn-shampoo" onClick={() => handleFilter('Shampoo')}>Shampoo</button>
        <button className="btn btn-show-all" onClick={() => handleFilter('All')}>Show All</button>
      </div>

      {/* Cart Icon with Item Count */}
      <div className="cart-icon">
        <Link to="/cart">
          <i className="fa fa-shopping-cart"></i> Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)})
        </Link>
      </div>

      {/* Product List */}
      <div className="row">
        {filteredProducts.map(product => (
          <div className="col-md-4 mb-4" key={product._id}>
            <div className="card">
              <img src={`${process.env.PUBLIC_URL}/images/products/${product.imageUrl}.jpeg`} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Price: ₹{product.price}</p>
                <p className="card-text">Category: {product.category}</p>
                <p>
                  <button onClick={() => handleAddToCart(product)} className="btn btn-success">Add to Cart</button>
                </p>
                {/* <Link to={`/products/${product._id}`} className="btn btn-primary">View Details</Link> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
