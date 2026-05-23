import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://micro-task-server-three.vercel.app",
});

axiosSecure.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosSecure;
