import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleBuyClick = () => {
    navigate(`/checkout/${id}`, {
      state: { productId: product._id, productName: product.name }
    });
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container m-5">
      <h2 className="mb-4">Product Details</h2>
      <div className="card">
        <div className="text-center card-img-container">
          <img src={`${process.env.PUBLIC_URL}/images/products/${product.imageUrl}.jpeg`} width={200} height={200} alt={product.name} />
        </div>
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">Price: ₹{product.price}</p>
          <p className="card-text">Description: {product.description}</p>
          <p className="card-text">Category: {product.category}</p>
          <button className="btn btn-primary" onClick={handleBuyClick}>Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
