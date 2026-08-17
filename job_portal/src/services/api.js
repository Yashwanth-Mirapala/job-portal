import axios from "axios";

const api = axios.create({
  baseURL: "https://job-portal-59ue.onrender.com",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
