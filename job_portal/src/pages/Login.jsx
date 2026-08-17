import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [form, setForm] = useState({ email:"", password:"" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  async function submit(e) {
    e.preventDefault();
    setError("");
    try {
      const response = await api.get(`/users?email=${encodeURIComponent(form.email)}&password=${encodeURIComponent(form.password)}`);
      if (!response.data.length) {
        setError("Invalid email or password.");
        return;
      }
      localStorage.setItem("user", JSON.stringify(response.data[0]));
      navigate(location.state?.from || "/jobs", { replace: true });
      window.location.reload();
    } catch {
      setError("Unable to connect to the backend.");
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">JP</div>
        <span className="eyebrow">WELCOME BACK</span>
        <h1>Sign in to JobPortal</h1>
        <p>Access saved jobs and manage your listings.</p>
        {error && <div className="alert error">{error}</div>}
        <form onSubmit={submit}>
          <label>Email<input type="email" value={form.email} onChange={(e) => setForm({...form,email:e.target.value})} placeholder="you@example.com" required /></label>
          <label>Password<input type="password" value={form.password} onChange={(e) => setForm({...form,password:e.target.value})} placeholder="Your password" required /></label>
          <button className="btn btn-primary btn-full">Sign In</button>
        </form>
        <p className="auth-switch">Don't have an account? <Link to="/register">Create one</Link></p>
      </div>
    </div>
  );
}
