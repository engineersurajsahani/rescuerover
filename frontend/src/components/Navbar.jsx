import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUsername = localStorage.getItem('username');
    const savedUserType = localStorage.getItem('userType'); // Get user type from localStorage

    if (token) {
      setIsLoggedIn(true);
      setUsername(savedUsername || '');
      setUserType(savedUserType || ''); // Set user type
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userType'); // Clear user type
    setIsLoggedIn(false);
    setUsername('');
    setUserType(''); // Reset user type
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img 
            src={`${process.env.PUBLIC_URL}/images/logo/logo.jpeg`} 
            alt="Rescue Rover Logo" 
            style={{ width: '150px', height: 'auto' }} 
          />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/products">Our Products</Link>
                </li>
                {userType === 'user' && (
                  <li className="nav-item">
                  <Link className="nav-link" to="/orders">My Orders</Link>
                </li>
                )}
                
                <li className="nav-item">
                  <Link className="nav-link" to="/collaboration">Collaboration</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/story">Our Story</Link>
                </li>
                {userType === 'user' && (
                  <li className="nav-item">
                  <Link className="nav-link" to="/feedback">Feedback</Link>
                </li>
                )}
                
                {userType === 'admin' && ( // Conditional rendering for admin
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">Admin Dashboard</Link>
                  </li>
                )}
                <li className="nav-item">
                  <span className="nav-link">{username}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
