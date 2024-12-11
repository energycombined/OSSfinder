import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import navigate hook
import '../styles/SearchSolutions.css';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchSolutions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [dropdownError, setDropdownError] = useState(false);

  const navigate = useNavigate(); // Initialize navigate hook

  // Full list of dropdown options
  const dropdownOptions = [
    "University",
    "Research Institute",
    "Research Institution",
    "Government",
    "Non-Profit",
    "Software Development Company",
    "Energy Company",
    "Environmental Organizations",
    "Tech Startups",
    "Forestry Companies",
    "Research Institutions",
    "Environmental NGOs",
    "Universities",
    "Open source",
    "Deltares",
    "Power Market Participants",
    "Energy Companies",
    "Public Sector",
    "Open Data Platform",
    "Renewable Energy Companies",
    "Consulting",
    "Energy",
    "Research",
    "Environmental Technology",
    "Software development",
    "Sustainability solutions",
    "Education",
    "Supply Chain Companies",
    "Energy Consulting",
    "Software Development",
    "Unknown",
    "Data Science Consulting",
    "Non-Profit Organization",
    "Open Source",
    "Data Analysis",
    "Water Treatment",
    "Environmental",
    "Open-source",
    "Software Company",
    "Government Agency",
    "Biotechnology",
    "Ecological Research",
    "Institutions",
    "Environmental organizations",
    "Academic Institutions",
    "Research Organizations",
    "Politecnico di Torino",
    "University Research",
    "Individual Developers",
    "Small Startups",
    "Agriculture Industry",
    "unknown",
    "Research and Development",
    "Open Source Project",
    "Community Driven",
    "Local Authority",
    "Academic",
    "Energy Solutions",
    "Non-Profit Organizations",
    "Government Agencies",
    "Commercial",
    "Aerospace Companies",
    "Engineering Consulting",
    "Wind Energy Industry",
    "University Research Institute",
    "Data Science",
    "Not specified",
    "不特定",
    "ACCESS-NRI",
    "Consulting Firms",
    "Research Organization",
    "Technology Companies",
    "Start-up",
    "Academic Institution",
    "Architecture Firms",
    "Real Estate Companies",
    "Private",
    "Research & Academic",
    "Consultancy",
    "Environmental Research and Data Analysis",
    "Sinergise",
    "Conservation Organizations",
    "Research Institutes",
    "Agricultural Company",
    "Environmental Monitoring Agency",
    "Space Agency",
  ];

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
      // Toggle between mock data and real endpoint
      const useMock = true; // Change to false to use real backend

      if (useMock) {
        // Simulate delay for mock data
        const mockResults = [
          {
            url: 'https://example.com/project1',
            name: 'Project 1',
            topics: 'Energy, Sustainability',
            activity: 90,
            useCases: 'Solar Panel Optimization',
          },
          {
            url: 'https://example.com/project2',
            name: 'Project 2',
            topics: 'Water, Conservation',
            activity: 85,
            useCases: 'Water Resource Management',
          },
        ];
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate('/search-results', { state: { results: mockResults } });
      } else {
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
        navigate('/search-results', { state: { results: data } });
      }
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
            placeholder="Search for your use case"
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
          {dropdownOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        {dropdownError && <p className="error-message">Please select an option from the dropdown</p>}
      </div>
    </section>
  );
};

export default SearchSolutions;
