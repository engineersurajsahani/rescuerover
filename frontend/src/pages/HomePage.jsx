import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function Home() {
  const token = localStorage.getItem('token');

  return (
    <div className="home-container">
      <div className="video-background">
        <video autoPlay loop muted>
          <source
            src={`${process.env.PUBLIC_URL}/images/products/pet3.mp4`}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="overlay">
        <div className="content">
          <b><h1 className="display-4">Welcome to RescueRover.org</h1></b>
          <p className="lead">
            We have been dedicated to rescuing and rehoming pets for over 15 years.
          </p>
          <b><p className='lead1'>Explore our Adoptable Cats and Adoptable Dogs pages today, 
              and find out how you can make a difference in an animal’s life. 
              Together, we can help every pet find a place to call home.</p></b>
          {!token && (
            <div className="button-group">
              <Link to="/login" className="btn btn-primary me-3">Login</Link>
              <Link to="/register" className="btn btn-secondary">Sign Up</Link>
            </div>
          )}
        </div>

        {token && (
          <div className="new-friend-section mt-5">
            <h2 className="display-5 text-light">Find Your New Best Friend</h2>
            <p className="lead">Adopt. Love. Change a Life.</p>
            
            <div className="button-group mt-3">
              <Link to="/dogs" className="btn btn-primary me-3">Explore Dogs</Link>
              <Link to="/cats" className="btn btn-warning">Explore Cats</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
