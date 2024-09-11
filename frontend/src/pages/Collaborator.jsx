import React from 'react';
import { useNavigate } from 'react-router-dom';

const hotels = [
  {
    name: 'Flavor Street',
    image: `${process.env.PUBLIC_URL}/images/products/flavor-street.jpg`,
    years: 5,
    description: 'Provides leftover food for pets.'
  },
  {
    name: 'The Grand Table',
    image: `${process.env.PUBLIC_URL}/images/products/the-grand-table.jpg`,
    years: 3,
    description: 'Provides leftover food for pets.'
  },
  {
    name: 'Perfect Bites',
    image: `${process.env.PUBLIC_URL}/images/products/perfect-bites.jpg`,
    years: 7,
    description: 'Provides leftover food for pets.'
  }
];

function Collaborate() {
  const navigate = useNavigate();

  const handleClick = (hotelName) => {
    navigate(`/collaboration/${hotelName}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Our Collaborations</h2>
      <div className="row mb-4">
        {hotels.map((hotel, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <button
              className="btn btn-light"
              onClick={() => handleClick(hotel.name)}
              style={{ 
                backgroundImage: `url(${hotel.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '200px',
                width: '100%',
                border: 'none',
                color: 'white',
                textAlign: 'center',
                lineHeight: '200px',
                fontSize: '1.5rem'
              }}
            >
              {hotel.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Collaborate;
