import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  const favorites = useSelector((state) => state.favorites);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const linkClass = ({ isActive }) => `nav-link${isActive ? " active" : ""}`;

  return (
    <header className="navbar">
      <Link className="brand" to="/">
        <span className="brand-mark">JP</span>
        <span>Job<span>Portal</span></span>
      </Link>

      <nav className="nav-links">
        <NavLink to="/" className={linkClass}>Home</NavLink>
        <NavLink to="/jobs" className={linkClass}>Jobs</NavLink>
        {user && <NavLink to="/add-job" className={linkClass}>Post a Job</NavLink>}
        {user && (
          <NavLink to="/favorites" className={linkClass}>
            Saved <span className="nav-count">{favorites.length}</span>
          </NavLink>
        )}
      </nav>

      <div className="nav-actions">
        {user ? (
          <>
            <span className="user-chip">Hi, {user.name}</span>
            <Link className="btn btn-outline nav-btn" to="/logout">Logout</Link>
          </>
        ) : (
          <>
            <Link className="nav-link" to="/login">Login</Link>
            <Link className="btn btn-primary nav-btn" to="/register">Register</Link>
          </>
        )}
      </div>
    </header>
  );
}
