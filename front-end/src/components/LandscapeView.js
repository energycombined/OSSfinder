import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/LandscapeView.css';

const LandscapeView = () => {
  const [solutions, setSolutions] = useState([]);
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    // Simulate fetching data from the PHP database with placeholders
    const fetchSolutions = async () => {
      try {
        // Replace this with your actual backend API URL
        const response = await fetch('http://your-backend-url/solutions.php');
        const data = await response.json();
        setSolutions(data);
      } catch (error) {
        console.error('Error fetching solutions:', error);
        setSolutions(Array(10).fill('Placeholder Solution')); // Fallback to placeholders
      }
    };

    fetchSolutions();
  }, []);

  const handleExploreClick = () => {
    navigate('/browse-solutions'); // Navigate to Browse Solutions page
  };

  return (
    <section className="landscape-section">
      <div className="landscape-header">
        <h2>Discover 4,400+ Open Source Energy & Climate Solutions</h2>
        <p>Classified and curated for real-world use cases to drive sustainable change.</p>
      </div>
      <div className="landscape-boxes">
        {solutions.map((solution, index) => (
          <div className="landscape-box" key={index}>
            {solution}
          </div>
        ))}
      </div>
      <div className="landscape-footer">
        <button className="explore-button" onClick={handleExploreClick}>
          Explore All Solutions
        </button>
      </div>
    </section>
  );
};

export default LandscapeView;
