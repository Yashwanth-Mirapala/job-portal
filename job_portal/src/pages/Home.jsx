import { Link } from "react-router-dom";

export default function Home() {
  const user = localStorage.getItem("user");

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <span className="eyebrow">SMARTER JOB SEARCH</span>
          <h1>Find a job that fits <span>your future.</span></h1>
          <p>
            Discover opportunities, save your favorites, and connect your skills
            with companies looking for talent.
          </p>
          <div className="hero-actions">
            <Link to="/jobs" className="btn btn-primary btn-large">Explore Jobs →</Link>
            {!user && <Link to="/register" className="btn btn-light btn-large">Create Account</Link>}
            {user && <Link to="/add-job" className="btn btn-light btn-large">Post a Job</Link>}
          </div>
          <div className="hero-stats">
            <div><strong>8+</strong><span>Live Jobs</span></div>
            <div><strong>7</strong><span>Categories</span></div>
            <div><strong>100%</strong><span>Responsive</span></div>
          </div>
        </div>
        <div className="hero-orb orb-one" />
        <div className="hero-orb orb-two" />
      </section>

      <section className="feature-section">
        <div className="section-heading">
          <span className="eyebrow">WHY JOBPORTAL</span>
          <h2>Everything you need to find the right opportunity</h2>
        </div>
        <div className="feature-grid">
          <div className="feature-card"><span>🔎</span><h3>Smart Search</h3><p>Search by title, company, location, category, or job type.</p></div>
          <div className="feature-card"><span>♥</span><h3>Save Jobs</h3><p>Keep interesting opportunities in one place for later.</p></div>
          <div className="feature-card"><span>⚡</span><h3>Easy Posting</h3><p>Authenticated users can quickly create and manage listings.</p></div>
        </div>
      </section>
    </div>
  );
}
