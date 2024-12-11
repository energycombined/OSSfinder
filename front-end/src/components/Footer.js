import React from 'react';
import '../styles/footer.css';
import logo from '../assets/energy-combined-logo.png';
import { FaTwitter, FaFacebookF, FaMastodon } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src={logo} alt="Energy Combined Logo" className="footer-logo-image" />
      </div>
      <div className="footer-links">
        <div className="footer-column">
          <a href="/terms-of-use" className="footer-link">Terms of Use</a>
          <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
          <a href="/faq" className="footer-link">FAQ</a>
        </div>
        <div className="footer-column">
          <a href="/contact-us" className="footer-link">Contact Us</a>
          <p className="footer-connect">Connect with us!</p>
          <div className="footer-social-icons">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaTwitter />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaFacebookF />
            </a>
            <a href="https://mastodon.social" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaMastodon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
