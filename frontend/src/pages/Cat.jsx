import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Pet.css';
import { useNavigate } from 'react-router-dom';

function Cat() {
  const [cats, setCats] = useState([]);
  const [filteredCats, setFilteredCats] = useState([]);
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/pets?category=Cat');
        setCats(res.data);
        setFilteredCats(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCats();
  }, []);

  useEffect(() => {
    if (filter === 'All') {
      setFilteredCats(cats);
    } else {
      setFilteredCats(cats.filter(cat => cat.subcategory === filter));
    }
  }, [filter, cats]);

  const handleFilter = (filterValue) => {
    setFilter(filterValue);
  };

  const handleAdoptClick = () => {
    navigate(`/adopt`);
  };

  return (
    <>
    <div className="banner-container">
    <img 
        src={`${process.env.PUBLIC_URL}/images/logo/rescat.jpeg`}
        alt="Cat Banner"
        className="banner-image"
        />
    </div>


    <div className="container mt-5">
      <h2 className="mb-4">Cats</h2>
      <div className="mb-4">
        <button
          className={`btn me-2 ${filter === 'Special' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => handleFilter('Special')}
        >
          Special
        </button>
        <button
          className={`btn me-2 ${filter === 'Normal' ? 'btn-secondary' : 'btn-outline-secondary'}`}
          onClick={() => handleFilter('Normal')}
        >
        Normal
        </button>
          <button
          className={`btn me-2 ${filter === 'Kitten' ? 'btn-secondary' : 'btn-outline-secondary'}`}
          onClick={() => handleFilter('Kitten')}
        >
          Kitten
        </button>
        <button
          className={`btn ${filter === 'All' ? 'btn-success' : 'btn-outline-success'}`}
          onClick={() => handleFilter('All')}
        >
          Show All
        </button>
      </div>
      <div className="row">
        {filteredCats.map((cat, index) => (
          <div className="col-md-12 mb-4" key={cat._id}>
            <div className=" horizontal-card">
              <div className="row g-0">
                {index % 2 === 0 ? (
                  <>
                    <div className="col-md-4">
                      <div className="image-container">
                      <img src={`${process.env.PUBLIC_URL}/images/pets/${cat.imageUrl}.jpeg`} width={200} height={200} alt={cat.name} />
      
                        {cat.adopted === 'Yes' && <span className="adopted-tag">Adopted</span>}
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{cat.name}</h5>
                        <p className="card-title">{cat.description}</p>
                        <p className="card-text">Sub-Category: {cat.subcategory}</p>
                        <Link to={`/cats/${cat._id}`} className="btn btn-primary">View Details</Link>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{cat.name}</h5>
                        <p className="card-title">{cat.description}</p>
                        <p className="card-text">Sub-Category: {cat.subcategory}</p>
                        <Link to={`/cats/${cat._id}`} className="btn btn-primary">View Details</Link>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="image-container">
                      <img src={`${process.env.PUBLIC_URL}/images/pets/${cat.imageUrl}.jpeg`} width={200} height={200} alt={cat.name} />
      
                        {cat.adopted === 'Yes' && <span className="adopted-tag">Adopted</span>}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
      ))}
      </div>
      <div className='text-center m-5'>
        <button className="btn btn-primary text-center" onClick={handleAdoptClick}>I am willing to adopt a pet</button>
      </div>
    </div>
    </>
  );
}

export default Cat;
