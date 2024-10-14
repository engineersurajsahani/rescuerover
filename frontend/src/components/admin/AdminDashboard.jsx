import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
  return (
    <div className="admin-dashboard container">
      <h2 className="dashboard-title">Admin Dashboard</h2>
      <p className="dashboard-intro">
        Welcome to the Admin Dashboard. Here you can manage all aspects of the system, including pets, products, and orders. Use the links below to navigate to the respective management sections.
      </p>
      <nav className="admin-nav">
        <Link to="/admin/pets" className="admin-nav-link">
          Manage Pets
        </Link>
        <Link to="/admin/products" className="admin-nav-link">
          Manage Products
        </Link>
        <Link to="/admin/orders" className="admin-nav-link">
          View All Orders
        </Link>
      </nav>
    </div>
  );
}

export default AdminDashboard;
