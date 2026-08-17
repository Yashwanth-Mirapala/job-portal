import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const [form, setForm] = useState({ name:"", email:"", password:"", confirm:"" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    if (form.password !== form.confirm) return setError("Passwords do not match.");
    try {
      const exists = await api.get(`/users?email=${encodeURIComponent(form.email)}`);
      if (exists.data.length) return setError("An account with this email already exists.");
      await api.post("/users", { name: form.name, email: form.email, password: form.password });
      navigate("/login");
    } catch {
      setError("Unable to create the account.");
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">JP</div>
        <span className="eyebrow">GET STARTED</span>
        <h1>Create your account</h1>
        <p>Save opportunities and manage job listings.</p>
        {error && <div className="alert error">{error}</div>}
        <form onSubmit={submit}>
          <label>Full name<input value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} placeholder="Your name" required /></label>
          <label>Email<input type="email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} placeholder="you@example.com" required /></label>
          <label>Password<input type="password" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} placeholder="At least 6 characters" required /></label>
          <label>Confirm password<input type="password" value={form.confirm} onChange={(e)=>setForm({...form,confirm:e.target.value})} placeholder="Repeat password" required /></label>
          <button className="btn btn-primary btn-full">Create Account</button>
        </form>
        <p className="auth-switch">Already registered? <Link to="/login">Sign in</Link></p>
      </div>
    </div>
  );
}
