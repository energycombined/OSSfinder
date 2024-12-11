import React from 'react';
import '../styles/SuccessStories.css';

const SuccessStories = () => {
  const stories = [
    { name: "Alice Johnson", quote: "Implementing renewable energy solutions cut our costs by 30% and boosted sustainability." },
    { name: "Michael Smith", quote: "The tools from this portal helped us optimize forest management strategies effortlessly." },
    { name: "Linda Green", quote: "Climate modeling data transformed how we plan our environmental policies." },
    { name: "David Brown", quote: "A brilliant platform that bridges innovation with real-world application." },
    { name: "Emma Wilson", quote: "Market simulations gave us a clear edge in the energy sector." },
    { name: "James Davis", quote: "Our team now develops cleaner solutions faster than ever before." },
    { name: "Sophia Lee", quote: "This platform is an invaluable resource for sustainable innovation." },
    { name: "Daniel Garcia", quote: "We found new partners and tools to drive impactful climate action." },
    { name: "Olivia Martinez", quote: "The curated solutions here are game-changing for small businesses." },
    { name: "Liam Nguyen", quote: "Our policies improved drastically with the insights gained here." },
  ];

  return (
    <section className="success-stories-section">
      <h2>Success Stories</h2>
      <p>Real-world impact statements from organizations or individuals who successfully implemented solutions from the portal.</p>
      <div className="carousel">
        {stories.map((story, index) => (
          <div className="carousel-item" key={index}>
            <blockquote>"{story.quote}"</blockquote>
            <p className="author">- {story.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuccessStories;
