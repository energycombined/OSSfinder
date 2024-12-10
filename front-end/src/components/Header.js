import React from 'react';
import '../styles/header.css'; 
import logo from '../assets/energy-combined-logo.png';

const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <img src={logo} alt="Energy Combined Logo" className="logo" />
        <span className="logo-caption">Open Source Solutions for a Sustainable Future</span>
      </div>
      <nav className="navbar">
        <ul className="nav-links">
          <li className="nav-item active">Home</li>
          <li className="nav-item">Browse Solutions</li>
          <li className="nav-item">Community</li>
          <li className="nav-item">Resources</li>
          <li className="nav-item">About Us</li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
