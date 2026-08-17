import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const initial = { title:"", company:"", location:"", type:"Full Time", category:"Frontend", experience:"Fresher", salary:"", description:"" };

export default function AddJob() {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setError("");
    try {
      await api.post("/jobs", form);
      navigate("/jobs");
    } catch {
      setError("Could not create the job. Make sure JSON Server is running.");
    }
  }

  return (
    <div className="page-shell narrow">
      <div className="form-header"><span className="eyebrow">RECRUITING</span><h1>Post a new job</h1><p>Share a clear opportunity with potential candidates.</p></div>
      <form className="form-card" onSubmit={submit}>
        {error && <div className="alert error">{error}</div>}
        <div className="form-grid">
          <label>Job title<input name="title" value={form.title} onChange={update} placeholder="e.g. Frontend Developer" required /></label>
          <label>Company<input name="company" value={form.company} onChange={update} placeholder="Company name" required /></label>
          <label>Location<input name="location" value={form.location} onChange={update} placeholder="e.g. Hyderabad" required /></label>
          <label>Job type<select name="type" value={form.type} onChange={update}><option>Full Time</option><option>Part Time</option><option>Internship</option><option>Remote</option><option>Hybrid</option></select></label>
          <label>Category<select name="category" value={form.category} onChange={update}><option>Frontend</option><option>Backend</option><option>Full Stack</option><option>Design</option><option>Analytics</option></select></label>
          <label>Experience<input name="experience" value={form.experience} onChange={update} placeholder="e.g. 2 Years" required /></label>
          <label>Salary<input name="salary" value={form.salary} onChange={update} placeholder="e.g. 8 LPA" required /></label>
        </div>
        <label>Job description<textarea name="description" value={form.description} onChange={update} placeholder="Describe responsibilities, skills and requirements..." required /></label>
        <div className="form-actions"><button type="button" className="btn btn-outline" onClick={() => navigate("/jobs")}>Cancel</button><button className="btn btn-primary">Publish Job</button></div>
      </form>
    </div>
  );
}
