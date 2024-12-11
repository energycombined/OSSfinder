import React from 'react';
import { NavLink } from 'react-router-dom';
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
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/browse-solutions"
              className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
            >
              Browse Solutions
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/community"
              className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
            >
              Community
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/resources"
              className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
            >
              Resources
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about-us"
              className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
            >
              About Us
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
