import axios from "axios";
import { APP_BASE_API_URL, APP_PUBLIC_API_URL } from "../constants/authConstant";

const HOST =
  window.location.hostname === "localhost" ? APP_BASE_API_URL : APP_PUBLIC_API_URL;

export const axiosWrapper = axios.create({
  baseURL: HOST,
  withCredentials: true,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});
