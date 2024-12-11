import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../styles/boxes.css';

const Boxes = () => {
  const boxData = [
    {
      title: 'Discover Solutions',
      description: 'Empower your choices with tailored tools designed to meet your goals.',
      button: 'Learn More',
      link: '/browse-solutions', // Navigate to Browse Solutions page
    },
    {
      title: 'Save Time',
      description: 'Simplified search through a vast repository of cutting-edge tools and insights.',
      button: 'Explore Now',
      link: '/#search-section', // Navigate to Search section on Home page
    },
    {
      title: 'Collaborate',
      description: 'Connect with like-minded innovators and grow together in a thriving community.',
      button: 'Join Us',
      link: '/about-us', // Navigate to About Us page
    },
  ];

  return (
    <section className="boxes-section">
      {boxData.map((box, index) => (
        <div className="box" key={index}>
          <div className="box-inner">
            {/* Front Side */}
            <div className="box-front">
              <h3>{box.title}</h3>
            </div>
            {/* Back Side */}
            <div className="box-back">
              <p>{box.description}</p>
              {box.link.startsWith('/#') ? (
                // Use anchor link for in-page navigation
                <a href={box.link} className="box-button">
                  {box.button}
                </a>
              ) : (
                // Use Link for navigation to other pages
                <Link to={box.link} className="box-button">
                  {box.button}
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Boxes;
