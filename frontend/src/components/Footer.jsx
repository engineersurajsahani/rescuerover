import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container text-center">
        <p className="mb-1">Founded by Archita Pandey</p>
        <p className="mb-1">RescueRover.org is proudly a</p>
        <p className="mb-1">Indian organization (not for profit)</p>
        <p className="mb-1">Our contact number is 7977034969</p>
        <p className="mb-0">Our email id: <a href="mailto:architapandey262004@gmail.com" className="text-light">architapandey262004@gmail.com</a></p>
      </div>
    </footer>
  );
}

export default Footer;
