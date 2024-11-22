import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: baseURL, 
  withCredentials: true, // Include credentials for cross-origin requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include authentication tokens if needed
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    const csrfToken = localStorage.getItem("csrf_token"); // Adjust based on where you're storing the token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (csrfToken) {
      config.headers["X-CSRF-TOKEN"] = csrfToken; // Laravel expects this header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Export API functions
export const getBooks = () => api.get("/availableBooks");
export const getMovies = () => api.get("/availableMovies");
export const rentItem = (data) => api.post("/rentItem", data);
export const returnItem = (data) => api.post("/returnItem", data);
export const login = (data) => api.post("/login", data);
export const register = (data) => api.post("/createUser", data);

export default api;

