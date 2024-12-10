import React from 'react';
import '../styles/boxes.css';

const Boxes = () => {
  const boxData = [
    {
      title: 'Discover Solutions',
      description: 'Empower your choices with tailored tools designed to meet your goals.',
      button: 'Learn More', // Placeholder button title
    },
    {
      title: 'Save Time',
      description: 'Simplified search through a vast repository of cutting-edge tools and insights.',
      button: 'Explore Now', // Placeholder button title
    },
    {
      title: 'Collaborate',
      description: 'Connect with like-minded innovators and grow together in a thriving community.',
      button: 'Join Us', // Placeholder button title
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
              <button>{box.button}</button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Boxes;
