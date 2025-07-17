import axios from "axios";
import { BASE_URL } from "./constants";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    const access = localStorage.getItem("access");
    console.log("noooo", access);

    config.headers.Authorization = `Bearer ${access}`;
    console.log("hui", config.headers);
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refresh")
    ) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          "https://basyukcoach.ru/api/token/refresh/",
          {
            refresh: localStorage.getItem("refresh"),
          }
        );
        localStorage.setItem("access", res.data.access);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.access}`;
        return api(originalRequest);
      } catch (err) {
        console.error("Token refresh failed:", err);
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
