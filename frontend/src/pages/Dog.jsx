import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Pet.css';
import { useNavigate } from 'react-router-dom';

function Dog() {
    const [dogs, setDogs] = useState([]);
    const [filteredDogs, setFilteredDogs] = useState([]);
    const [filter, setFilter] = useState('All');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDogs = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/pets?category=Dog');
                setDogs(res.data);
                setFilteredDogs(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchDogs();
    }, []);

    useEffect(() => {
        if (filter === 'All') {
            setFilteredDogs(dogs);
        } else {
            setFilteredDogs(dogs.filter(dog => dog.subcategory === filter));
        }
    }, [filter, dogs]);

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
              src={`${process.env.PUBLIC_URL}/images/logo/resdogs.jpeg`}
              alt="resdogs.jpeg"
              className="banner-image"
              />
          </div>
        <div className="container mt-5">
            <h2 className="mb-4">Dogs</h2>
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
                    className={`btn me-2 ${filter === 'puppy' ? 'btn-secondary' : 'btn-outline-third'}`}
                    onClick={() => handleFilter('puppy')}
                >
                    puppy
                </button>
                <button
                    className={`btn ${filter === 'All' ? 'btn-success' : 'btn-outline-success'}`}
                    onClick={() => handleFilter('All')}
                >
                    Show All
                </button>
            </div>
            <div className="row">
                {filteredDogs.map((dog, index) => (
                    <div className="col-md-12 mb-4" key={dog._id}>
                        <div className=" horizontal-card">
                            <div className="row g-0">
                                {index % 2 === 0 ? (
                                    <>
                                        <div className="col-md-4">
                                            <div className="image-container">
                                            <img src={`${process.env.PUBLIC_URL}/images/pets/${dog.imageUrl}.jpeg`} width={200} height={200} alt={dog.name} />
      
                                                {dog.adopted === 'Yes' && <span className="adopted-tag">Adopted</span>}
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">{dog.name}</h5>
                                                <b><p className="card-title">{dog.description}</p></b>
                                                <p className="card-text">Category: {dog.category}</p>
                                                <p className="card-text">Sub-Category: {dog.subcategory}</p>
                                                <Link to={`/dogs/${dog._id}`} className="btn btn-primary">View Details</Link>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">{dog.name}</h5>
                                                <p className="card-title">{dog.description}</p>
                                                <p className="card-text">Category: {dog.category}</p>
                                                <p className="card-text">Sub-Category: {dog.subcategory}</p>
                                                <Link to={`/dogs/${dog._id}`} className="btn btn-primary">View Details</Link>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="image-container">
                                            <img src={`${process.env.PUBLIC_URL}/images/pets/${dog.imageUrl}.jpeg`} width={200} height={200} alt={dog.name} />
      
                                                {dog.adopted === 'Yes' && <span className="adopted-tag">Adopted</span>}
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
   </>);
}

export default Dog;
