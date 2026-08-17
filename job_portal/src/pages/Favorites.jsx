import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFavorite } from "../features/favoriteSlice";

export default function Favorites() {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  return (
    <div className="page-shell">
      <section className="page-header">
        <div><span className="eyebrow">YOUR SHORTLIST</span><h1>Saved jobs</h1><p>Keep track of roles you want to revisit.</p></div>
        <Link to="/jobs" className="btn btn-outline">Browse Jobs</Link>
      </section>

      {favorites.length ? (
        <div className="jobs-grid">
          {favorites.map((job) => (
            <article className="job-card" key={job.id}>
              <div className="job-card-top">
                <div className="company-logo">{(job.company || "J").charAt(0).toUpperCase()}</div>
                <div className="job-heading"><h3>{job.title}</h3><p>{job.company}</p></div>
              </div>
              <div className="job-meta"><span>📍 {job.location}</span><span>💼 {job.experience}</span><span>₹ {job.salary}</span></div>
              <span className="category-tag">{job.category}</span>
              <div className="card-actions">
                <Link to={`/jobs/${job.id}`} className="btn btn-primary">View Details</Link>
                <button className="btn btn-danger" onClick={() => dispatch(removeFavorite(job.id))}>Remove</button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="state-card"><div className="empty-icon">♡</div><h2>Your saved jobs are empty</h2><p>Save a job from the Jobs page and it will appear here.</p><Link to="/jobs" className="btn btn-primary">Find Jobs</Link></div>
      )}
    </div>
  );
}
