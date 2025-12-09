import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Discover SDSU Campus Life</h1>
          <p className="hero-subtitle">
            Your one-stop destination for all campus events, gatherings, and student activities. 
            Never miss out on what's happening at San Diego State University.
          </p>
          <div className="hero-buttons">
            <Link to="/event" className="btn btn-primary">Browse Events</Link>
            <Link to="/user" className="btn btn-secondary">Join Community</Link>
          </div>
        </div>
    </section>
      );
}

export default Home;
