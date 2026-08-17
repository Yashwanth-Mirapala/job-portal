import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("favoriteJobs");
    navigate("/login", { replace: true });
    window.location.reload();
  }, [navigate]);
  return null;
}
