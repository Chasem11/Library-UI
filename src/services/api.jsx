import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000", 
});

export const getBooks = () => api.get("/books");
export const getMovies = () => api.get("/movies");
export const rentItem = (data) => api.post("/rentItem", data);
export const returnItem = (data) => api.post("/returnItem", data);

export default api;
