import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const location = useLocation();
  const [user, setUser] = useState(localStorage.getItem("user"));

  useEffect(() => {
    const sync = () => setUser(localStorage.getItem("user"));
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  return (
    <>
      <Navbar key={`${location.pathname}-${user ? "auth" : "guest"}`} />
      <main><AppRoutes /></main>
      <footer className="footer">© 2026 JobPortal · Built with React, Redux Toolkit & JSON Server</footer>
    </>
  );
}
