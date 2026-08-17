import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../services/api";
import { toggleFavorite } from "../features/favoriteSlice";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const saved = favorites.some((item) => item.id === id || String(item.id) === String(id));

  useEffect(() => {
    api.get(`/jobs/${id}`)
      .then((response) => setJob(response.data))
      .catch(() => setError("Job not found or backend is unavailable."));
  }, [id]);

  if (error) return <div className="page-shell"><div className="state-card error"><h2>{error}</h2><Link className="btn btn-primary" to="/jobs">Back to Jobs</Link></div></div>;
  if (!job) return <div className="page-shell"><div className="state-card">Loading job details...</div></div>;

  return (
    <div className="page-shell">
      <Link to="/jobs" className="back-link">← Back to jobs</Link>
      <article className="details-card">
        <div className="details-hero">
          <div className="company-logo large">{(job.company || "J").charAt(0).toUpperCase()}</div>
          <div><span className="category-tag">{job.category}</span><h1>{job.title}</h1><p>{job.company} · {job.location}</p></div>
          <div className="details-actions">
            <button className={`btn ${saved ? "btn-saved" : "btn-primary"}`} onClick={() => dispatch(toggleFavorite(job))}>{saved ? "♥ Saved" : "♡ Save Job"}</button>
            <Link className="btn btn-outline" to={`/edit-job/${job.id}`}>Edit</Link>
          </div>
        </div>

        <div className="details-grid">
          <div><span>Job Type</span><strong>{job.type}</strong></div>
          <div><span>Experience</span><strong>{job.experience}</strong></div>
          <div><span>Salary</span><strong>{job.salary}</strong></div>
          <div><span>Location</span><strong>{job.location}</strong></div>
        </div>

        <div className="description">
          <h2>About the role</h2>
          <p>{job.description}</p>
        </div>
      </article>
    </div>
  );
}
