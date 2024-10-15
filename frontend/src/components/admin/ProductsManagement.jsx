import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductsManagement.css';

function ProductsManagement() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the server
    fetch('http://localhost:4000/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      fetch(`http://localhost:4000/api/products/${productId}`, { method: 'DELETE' })
        .then(() => {
          // Filter out the deleted product from the state
          setProducts(products.filter((product) => product._id !== productId));
        })
        .catch((error) => console.error('Error deleting product:', error));
    }
  };

  return (
    <div className="products-management">
      <h2>Manage Products</h2>
      <Link to="/admin/products/new" className="btn btn-primary">
        Add New Product
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>₹{product.price}</td>
                <td>{product.category}</td>
                <td>
                  <Link to={`/admin/products/${product._id}`} className="btn btn-edit">
                    Edit
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No products found. Please add some products.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsManagement;
