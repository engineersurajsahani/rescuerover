import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PetsManagement.css';

function PetsManagement() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch pets from the server
    fetch('http://localhost:4000/api/pets')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch pets.');
        }
        return response.json();
      })
      .then((data) => {
        setPets(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching pets:', error);
        setError('Failed to load pets. Please try again later.');
        setLoading(false);
      });
  }, []);

  const handleDelete = (petId) => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      fetch(`http://localhost:4000/api/pets/${petId}`, { method: 'DELETE' })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to delete pet.');
          }
          setPets(pets.filter((pet) => pet._id !== petId));
        })
        .catch((error) => {
          console.error('Error deleting pet:', error);
          alert('Failed to delete pet. Please try again.');
        });
    }
  };

  if (loading) {
    return <div className="loader">Loading pets...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="pets-management">
      <h2>Manage Pets</h2>
      <Link to="/admin/pets/new" className="btn btn-primary">
        Add New Pet
      </Link>
      {pets.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Adopted</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => (
              <tr key={pet._id}>
                <td>{pet.name}</td>
                <td>{pet.category}</td>
                <td>{pet.adopted}</td>
                <td>
                  <Link to={`/admin/pets/${pet._id}`} className="btn btn-edit">
                    Edit
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(pet._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No pets found. Please add some pets.</p>
      )}
    </div>
  );
}

export default PetsManagement;
