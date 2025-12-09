import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import ReactUser from './ReactUser.jsx';
import ReactEvent from './ReactEvent.jsx';
import ReactAdmin from './ReactAdmin.jsx';
import './App.css';

function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Campus Event Finder</Link>
      <div className="nav-links">
        <Link 
          to="/" 
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
        >
          Home
        </Link>
        <Link 
          to="/user" 
          className={`nav-link ${location.pathname === '/user' ? 'active' : ''}`}
        >
          User Registration
        </Link>
        <Link 
          to="/event" 
          className={`nav-link ${location.pathname === '/event' ? 'active' : ''}`}
        >
          Events
        </Link>
        {/* Admin link is hidden from main navigation as requested */}
      </div>
    </nav>
  );
}

function Home() {
  return (
    <div className="home-hero">
      <h2>Welcome to SDSU Campus Event Finder</h2>
      <p>
        Discover what's happening on campus. Join events, meet new people, and stay connected with your university community.
      </p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<ReactUser />} />
            <Route path="/event" element={<ReactEvent />} />
            <Route path="/admin" element={<ReactAdmin />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App

