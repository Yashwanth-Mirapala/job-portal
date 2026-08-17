import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../features/favoriteSlice";

export default function JobCard({ job, onDelete }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const saved = favorites.some((item) => item.id === job.id);
  const user = localStorage.getItem("user");

  return (
    <article className="job-card">
      <div className="job-card-top">
        <div className="company-logo">{(job.company || "J").charAt(0).toUpperCase()}</div>
        <div className="job-heading">
          <h3>{job.title}</h3>
          <p>{job.company}</p>
        </div>
        <span className="tag">{job.type}</span>
      </div>

      <div className="job-meta">
        <span>📍 {job.location}</span>
        <span>💼 {job.experience}</span>
        <span>₹ {job.salary}</span>
      </div>

      <span className="category-tag">{job.category}</span>

      <p className="job-summary">
        {(job.description || "No description available.").slice(0, 120)}
        {(job.description || "").length > 120 ? "..." : ""}
      </p>

      <div className="card-actions">
        <Link to={`/jobs/${job.id}`} className="btn btn-primary">View Details</Link>
        {user && (
          <button
            type="button"
            className={`btn ${saved ? "btn-saved" : "btn-outline"}`}
            onClick={() => dispatch(toggleFavorite(job))}
          >
            {saved ? "♥ Saved" : "♡ Save"}
          </button>
        )}
        {user && (
          <Link to={`/edit-job/${job.id}`} className="btn btn-outline">Edit</Link>
        )}
        {user && (
          <button type="button" className="btn btn-danger" onClick={() => onDelete(job.id)}>
            Delete
          </button>
        )}
      </div>
    </article>
  );
}
