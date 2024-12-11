import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Boxes from './components/Boxes';
import SearchSolutions from './components/SearchSolutions';
import './styles/App.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        {/* Other components or page content */}
        <Boxes />
        <SearchSolutions />
      </main>
      <Footer />
    </div>
  );
}

export default App;
