import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Corrected import
import message from '../../helper/message';
import './Login.css'; 

function Login() {
  const [emailPrefix, setEmailPrefix] = useState(''); // Change to store the part before @gmail.com
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      window.location.href = '/';
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = `${emailPrefix}@gmail.com`; // Construct the complete email

    try {
      const res = await axios.post('http://localhost:4000/api/auth/login', { email, password });
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);

        const decodedToken = jwtDecode(res.data.token);
        localStorage.setItem('userId', decodedToken.id);
        localStorage.setItem('username', decodedToken.username);
        localStorage.setItem('email', decodedToken.email);
        localStorage.setItem('userType', decodedToken.userType);

        message("Login Successful", "Welcome back!", "success", "OK");
        
        // Redirect based on userType
        if (decodedToken.userType === 'admin') {
          window.location.href = '/admin';
        } else {
          window.location.href = '/';
        }
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Login failed';
      message("Login Failed", errorMsg, "error", "OK");
      console.error(errorMsg);
    }
  };

  return (
    <div className="register-container"> 
      <div className="row">
        <div className="col-md-6">
          <div className="card custom-card"> 
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your email prefix"
                      value={emailPrefix}
                      onChange={(e) => setEmailPrefix(e.target.value)}
                      required
                    />
                    <span className="input-group-text">@gmail.com</span>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
