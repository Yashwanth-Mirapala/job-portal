import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/jobs/${id}`).then((r) => setForm(r.data)).catch(() => setError("Job not found."));
  }, [id]);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    try {
      await api.put(`/jobs/${id}`, form);
      navigate("/jobs");
    } catch {
      setError("Could not update the job.");
    }
  }

  if (!form) return <div className="page-shell"><div className="state-card">{error || "Loading..."}</div></div>;

  return (
    <div className="page-shell narrow">
      <div className="form-header"><span className="eyebrow">MANAGE LISTING</span><h1>Edit job</h1><p>Keep the opportunity information accurate and up to date.</p></div>
      <form className="form-card" onSubmit={submit}>
        {error && <div className="alert error">{error}</div>}
        <div className="form-grid">
          <label>Job title<input name="title" value={form.title} onChange={update} required /></label>
          <label>Company<input name="company" value={form.company} onChange={update} required /></label>
          <label>Location<input name="location" value={form.location} onChange={update} required /></label>
          <label>Job type<input name="type" value={form.type} onChange={update} required /></label>
          <label>Category<input name="category" value={form.category} onChange={update} required /></label>
          <label>Experience<input name="experience" value={form.experience} onChange={update} required /></label>
          <label>Salary<input name="salary" value={form.salary} onChange={update} required /></label>
        </div>
        <label>Job description<textarea name="description" value={form.description} onChange={update} required /></label>
        <div className="form-actions"><button type="button" className="btn btn-outline" onClick={() => navigate("/jobs")}>Cancel</button><button className="btn btn-primary">Save Changes</button></div>
      </form>
    </div>
  );
}
