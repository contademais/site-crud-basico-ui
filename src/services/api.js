import axios from "axios";

const api = axios.create({
  baseURL: "https://site-crud-basico.vercel.app",
});

export default api;
