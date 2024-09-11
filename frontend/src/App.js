import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Dogs from './pages/Dog';
import DogDetail from './pages/DogDetail';
import Cats from './pages/Cat';
import CatDetail from './pages/CatDetail';
import Product from './pages/Product';
import ProductDetail from './pages/ProductDetail';
import CheckoutForm from './pages/CheckoutForm';
import Collaboration from './pages/Collaborator';
import CollaboratorDetail from './pages/CollaboratorDetail';
import Story from './pages/Story';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AdoptForm from './pages/AdoptForm';  
import Footer from './components/Footer';
import LeftOver from './pages/LeftOver';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dogs" element={<Dogs />} />
        <Route path="/dogs/:id" element={<DogDetail />} />
        <Route path="/cats" element={<Cats />} />
        <Route path="/cats/:id" element={<CatDetail />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/checkout/:id" element={<CheckoutForm />} />
        <Route path="/collaboration" element={<Collaboration />} />
        <Route path="/collaboration/:name" element={<CollaboratorDetail />} />
        <Route path="/story" element={<Story />} />
        <Route path="/adopt" element={<AdoptForm />} />
        <Route path="/leftover" element={<LeftOver />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
