import React, { useEffect, useState } from 'react';
import '../styles/LandscapeView.css'; // Reuse existing styles

const BrowseSolutions = () => {
  const [solutions, setSolutions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch all solutions from the PHP database
    const fetchSolutions = async () => {
      try {
        // Replace this with your actual backend API URL
        const response = await fetch('http://your-backend-url/all-solutions.php');
        const data = await response.json();
        setSolutions(data);
      } catch (error) {
        console.error('Error fetching all solutions:', error);
        setSolutions(Array(20).fill('Placeholder Solution')); // Fallback to placeholders
      } finally {
        setIsLoading(false);
      }
    };

    fetchSolutions();
  }, []);

  return (
    <section className="landscape-section">
      <div className="landscape-header">
        <h2>Browse All Energy & Climate Solutions</h2>
        <p>Explore the full repository of open source solutions designed for real-world impact.</p>
      </div>
      {isLoading ? (
        <p>Loading solutions...</p>
      ) : (
        <div className="landscape-boxes">
          {solutions.map((solution, index) => (
            <div className="landscape-box" key={index}>
              {solution}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default BrowseSolutions;
