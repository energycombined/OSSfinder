import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        {/* Other components or page content */}
      </main>
      <Footer />
    </div>
  );
}

export default App;