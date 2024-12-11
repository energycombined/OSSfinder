import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Boxes from './components/Boxes';
import SearchSolutions from './components/SearchSolutions';
import LandscapeView from './components/LandscapeView';
import SuccessStories from './components/SuccessStories';
import SubmitSolution from './components/SubmitSolution';
import ScrollToTopButton from './components/ScrollToTopButton';
import './styles/App.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        {/* Other components or page content */}
        <Boxes />
        <SearchSolutions />
        <LandscapeView />
        <SuccessStories />
        <SubmitSolution />
        <ScrollToTopButton />
      </main>
      <Footer />
    </div>
  );
}

export default App;
