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
      <h2 className="mb-4 text-dark">Our Collaborations</h2>
      <b><p className='lead5'>We’re thrilled to share our partnership with PerfectBites,The Grand Table,Flavor Street 
    who are generously providing their delicious leftovers to our adoptable dogs and cats.
     This collaboration ensures that our furry friends receive nutritious, tasty meals while they
      wait for their forever homes. Thanks to PerfectBites,The Grand Table,Flavor Street 's commitment to reducing food waste 
      and supporting animal welfare, our pets are enjoying extra special meals as they prepare to meet
       their new families.</p></b>
      <b><p className='lead6'>Every visit to PerfectBites,The Grand Table,Flavor Street  helps make a difference for our adoptable pets. 
        Thank you for supporting a cause that feeds both the body and the heart!</p></b>
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
                fontSize: '1rem'
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
