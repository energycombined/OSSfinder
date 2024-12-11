import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Boxes from './components/Boxes';
import SearchSolutions from './components/SearchSolutions';
import LandscapeView from './components/LandscapeView';
import SuccessStories from './components/SuccessStories';
import SubmitSolution from './components/SubmitSolution';
import ScrollToTopButton from './components/ScrollToTopButton';
import BrowseSolutions from './components/BrowseSolutions'; // New page
import Community from './components/Community'; // New page
import Resources from './components/Resources'; // New page
import AboutUs from './components/AboutUs'; // New page
import SearchResults from './components/SearchResults'; // New page
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            {/* Home Page */}
            <Route
              path="/"
              element={
                <>
                  <Boxes />
                  <SearchSolutions />
                  <LandscapeView />
                  <SuccessStories />
                  <SubmitSolution />
                  <ScrollToTopButton />
                </>
              }
            />
            {/* Other Pages */}
            <Route path="/browse-solutions" element={<BrowseSolutions />} />
            <Route path="/community" element={<Community />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/about-us" element={<AboutUs />} />

            <Route path="/" element={<SearchSolutions />} />
            <Route path="/search-results" element={<SearchResults />} /> {/* New page */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
