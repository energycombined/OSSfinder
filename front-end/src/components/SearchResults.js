import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/SearchResults.css';

const SearchResults = () => {
  const location = useLocation();
  const searchResults = location.state?.results || []; // Get results from state

  return (
    <section className="results-section">
      <h1>Search Results</h1>
      {searchResults.length === 0 ? (
        <p>No results found. Please try another search.</p>
      ) : (
        <table className="results-table">
          <thead>
            <tr>
              <th>URL</th>
              <th>Name of the Project</th>
              <th>Topics</th>
              <th>Activity</th>
              <th>Most Recent Activity</th>
              <th>Use Cases</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((result, index) => (
              <tr key={index}>
                <td>
                  <a href={result.url} target="_blank" rel="noopener noreferrer">
                    {result.url}
                  </a>
                </td>
                <td>{result.name}</td>
                <td>{result.topics}</td>
                <td>{result.activity}</td>
                <td>{result.useCases}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default SearchResults;
