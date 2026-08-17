import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import JobCard from "../components/JobCard";

const categories = ["All", "Frontend", "Backend", "Full Stack", "Design", "Analytics"];
const types = ["All", "Full Time", "Part Time", "Internship", "Remote", "Hybrid"];

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("All");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = localStorage.getItem("user");

  useEffect(() => {
    let mounted = true;
    api.get("/jobs")
      .then((response) => mounted && setJobs(response.data))
      .catch(() => mounted && setError("Unable to connect to the backend. Start JSON Server on port 3000."))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  async function deleteJob(id) {
    if (!window.confirm("Delete this job listing?")) return;
    try {
      await api.delete(`/jobs/${id}`);
      setJobs((current) => current.filter((job) => job.id !== id));
    } catch {
      setError("The job could not be deleted.");
    }
  }

  const filteredJobs = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return [...jobs]
      .filter((job) => {
        const haystack = [job.title, job.company, job.location, job.category].join(" ").toLowerCase();
        return !normalized || haystack.includes(normalized);
      })
      .filter((job) => category === "All" || job.category === category)
      .filter((job) => type === "All" || job.type === type)
      .sort((a, b) => {
        if (sort === "salary-high") return Number.parseFloat(b.salary) - Number.parseFloat(a.salary);
        if (sort === "salary-low") return Number.parseFloat(a.salary) - Number.parseFloat(b.salary);
        return String(a.id).localeCompare(String(b.id), undefined, { numeric: true });
      });
  }, [jobs, query, category, type, sort]);

  return (
    <div className="page-shell">
      <section className="page-header">
        <div>
          <span className="eyebrow">OPPORTUNITIES</span>
          <h1>Find your next job</h1>
          <p>Browse, filter and save roles that match your career goals.</p>
        </div>
        {user && <Link to="/add-job" className="btn btn-primary">+ Post a Job</Link>}
      </section>

      <section className="filter-panel">
        <div className="search-box">
          <span>⌕</span>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search jobs, companies, locations..." />
        </div>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          {types.map((item) => <option key={item}>{item}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="salary-high">Salary: High to Low</option>
          <option value="salary-low">Salary: Low to High</option>
        </select>
      </section>

      {error && <div className="alert error">{error}</div>}
      {loading ? (
        <div className="state-card">Loading jobs...</div>
      ) : filteredJobs.length ? (
        <div className="jobs-grid">
          {filteredJobs.map((job) => <JobCard key={job.id} job={job} onDelete={deleteJob} />)}
        </div>
      ) : (
        <div className="state-card">
          <h2>No jobs found</h2>
          <p>Try a different search or clear your filters.</p>
          <button className="btn btn-outline" onClick={() => { setQuery(""); setCategory("All"); setType("All"); }}>Clear Filters</button>
        </div>
      )}
    </div>
  );
}
