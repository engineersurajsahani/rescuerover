import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './PetDetail.css';
import { useNavigate } from 'react-router-dom';

function CatDetail() {
  const { id } = useParams();
  const [cat, setCat] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/pets/${id}`);
        setCat(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCat();
  }, [id]);

  const handleAdoptClick = () => {
    navigate(`/adopt`);
  };

  if (!cat) return <div>Loading...</div>;

  return (
    <div className="container m-5">
      <div className='text-center'>
        <button className="btn btn-primary text-center" onClick={handleAdoptClick}>I am willing to adopt a pet</button>
      </div>
      <h2 className="mb-4">Cat Details</h2>
      <div className="card">
      <img src={`${process.env.PUBLIC_URL}/images/pets/${cat.imageUrl}.jpeg`} width={200} height={200} alt={cat.name} />
      
        <div className="card-body">
          <h5 className="card-title">{cat.name}</h5>
          <p className="card-text">Age: {cat.age} years</p>
          <p className="card-text">Description: {cat.description}</p>
          <p className="card-text">Category: {cat.category}</p>
          <p className="card-text">Subcategory: {cat.subcategory}</p>
        </div>
      </div>
    </div>
  );
}

export default CatDetail;
