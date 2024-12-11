import React, { useState } from 'react';
import '../styles/SearchSolutions.css';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchSolutions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [dropdownError, setDropdownError] = useState(false);

  const handleSearch = async () => {
    if (!selectedOption) {
      setDropdownError(true);
      return;
    }

    if (!searchQuery.trim()) {
      alert('Please enter a search query');
      return;
    }

    setIsLoading(true);

    try {
      // Replace with your actual backend endpoint
      const response = await fetch('http://your-backend-url/search.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: searchQuery,
          category: selectedOption,
        }),
      });

      if (!response.ok) {
        throw new Error('Error performing search');
      }

      const data = await response.json();

      // Process the response data as needed
      console.log('Search results:', data);
      alert('Search completed. Check console for results.');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to perform search. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
    setDropdownError(false); // Clear error when a valid option is selected
  };

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <section id="search-section" className="search-section">
      <div className="search-text">
        <p>
          Searches over <strong>4,400 climate solutions</strong> and lets you explore all the potential use cases (e.g.,
          scenario analysis for forest management, data analysis for environmental policy, energy market analysis, and
          market simulation).
        </p>
      </div>
      <div className="search-bar-container">
        <div className="search-bar-wrapper">
          <input
            type="text"
            placeholder="Search for climate solutions..."
            className="search-bar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={!selectedOption} // Disable input until an option is selected
          />
          {searchQuery && (
            <button className="delete-button" onClick={handleClear}>
              <FaTimes />
            </button>
          )}
          <button
            className="search-button"
            onClick={handleSearch}
            disabled={!selectedOption || isLoading} // Disable button until dropdown is selected
          >
            {isLoading ? (
              <span className="spinner"></span>
            ) : (
              <FaSearch />
            )}
          </button>
        </div>
        <select
          className={`dropdown ${dropdownError ? 'dropdown-error' : ''}`} // Add error class if no selection
          onChange={handleDropdownChange}
          value={selectedOption}
        >
          <option value="" disabled>
            Select type of company (required)
          </option>
          {Array.from({ length: 15 }).map((_, index) => (
            <option key={index} value={`placeholder-${index + 1}`}>
              Placeholder {index + 1}
            </option>
          ))}
        </select>
        {dropdownError && <p className="error-message">Please select an option from the dropdown</p>}
      </div>
    </section>
  );
};

export default SearchSolutions;
