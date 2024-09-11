import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Product.css'; // Import the CSS file with button styles

function Product() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
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
    if (filter === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === filter));
    }
  }, [filter, products]);

  const handleFilter = (filterValue) => {
    setFilter(filterValue);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Products</h2>
      <div className="mb-4">
        <button className="btn btn-tshirt" onClick={() => handleFilter('Tshirt')}>Tshirt</button>
        <button className="btn btn-cup" onClick={() => handleFilter('Cup')}>Cup</button>
        <button className="btn btn-food" onClick={() => handleFilter('Food')}>Food</button>
        <button className="btn btn-shampoo" onClick={() => handleFilter('Shampoo')}>Shampoo</button>
        <button className="btn btn-show-all" onClick={() => handleFilter('All')}>Show All</button>
      </div>
      <div className="row">
        {filteredProducts.map(product => (
          <div className="col-md-4 mb-4" key={product._id}>
            <div className="card">
              <img src={`${process.env.PUBLIC_URL}/images/products/${product.imageUrl}.jpeg`} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Price: ₹{product.price}</p>
                <p className="card-text">Category: {product.category}</p>
                <Link to={`/products/${product._id}`} className="btn btn-primary">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
