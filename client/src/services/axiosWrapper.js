import axios from "axios";

const HOST =
  window.location.hostname === "localhost"
    ? import.meta.env.VITE_BACKEND_URL
    : import.meta.env.VITE_PUBLIC_SERVER_URL;

export const axiosWrapper = axios.create({
  baseURL: HOST,
  withCredentials: true,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});
