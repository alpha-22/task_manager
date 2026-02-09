import axios from "axios";

export const api = axios.create({
  baseURL: "http://13.201.120.40:5000",
});
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
