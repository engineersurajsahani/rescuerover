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
            src="https://media.istockphoto.com/id/1073535242/video/lovely-puppy-labrador-running-to-the-camera-on-the-lawn-4k.mp4?s=mp4-640x640-is&k=20&c=zx5NdVhxUJP2QZogPtKEx0ULqyPRKknpjv-RlDeRIKc="
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="overlay">
        <div className="content">
          <h1 className="display-4">Welcome to RescueRover.org</h1>
          <p className="lead">
            We have been dedicated to rescuing and rehoming pets for over 15 years.
          </p>
          {!token && (
            <div className="button-group">
              <Link to="/login" className="btn btn-primary me-3">Login</Link>
              <Link to="/register" className="btn btn-secondary">Sign Up</Link>
            </div>
          )}
        </div>

        {token && (
          <div className="new-friend-section mt-5">
            <h2 className="display-5">Find Your New Best Friend</h2>
            <p className="lead">Choose from our rescued pets below to find your forever companion.</p>
            <div className="button-group mt-3">
              <Link to="/dogs" className="btn btn-success me-3">Explore Dogs</Link>
              <Link to="/cats" className="btn btn-warning">Explore Cats</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
