import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './PetsForm.css';

function PetsForm() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [adopted, setAdopted] = useState('No');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Fetch existing pet data for editing
      setLoading(true);
      fetch(`http://localhost:4000/api/pets/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch pet data.');
          }
          return response.json();
        })
        .then((data) => {
          setName(data.name);
          setAge(data.age);
          setDescription(data.description);
          setImageUrl(data.imageUrl);
          setCategory(data.category);
          setSubcategory(data.subcategory);
          setAdopted(data.adopted);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching pet data:', error);
          setError('Failed to load pet data. Please try again.');
          setLoading(false);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const petData = {
      name,
      age,
      description,
      imageUrl,
      category,
      subcategory,
      adopted,
    };

    const requestOptions = {
      method: id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(petData),
    };

    const url = id
      ? `http://localhost:4000/api/pets/${id}`
      : 'http://localhost:4000/api/pets';

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to ${id ? 'update' : 'create'} pet.`);
        }
        return response.json();
      })
      .then(() => {
        setLoading(false);
        navigate('/admin/pets');
      })
      .catch((error) => {
        console.error(`Error ${id ? 'updating' : 'creating'} pet:`, error);
        setError(`Failed to ${id ? 'update' : 'create'} pet. Please try again.`);
        setLoading(false);
      });
  };

  return (
    <div className="pets-form">
      <h2>{id ? 'Edit Pet' : 'Add New Pet'}</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="subcategory">Subcategory:</label>
          <input
            type="text"
            id="subcategory"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="adopted">Adopted:</label>
          <select
            id="adopted"
            value={adopted}
            onChange={(e) => setAdopted(e.target.value)}
            required
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : id ? 'Update Pet' : 'Create Pet'}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate('/admin/pets')}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default PetsForm;
