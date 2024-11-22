import React, { useState, useEffect } from "react";
import { getMovies } from "../services/api";
import Navbar from "../components/Navbar";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); 

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getMovies();
        setMovies(response.data);
      } catch (err) {
        setError("Failed to load books. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <h2>Available Movies</h2>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <h2>Available Books</h2>
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar/>
      <div className="container mt-5">
        <h2>Available Books</h2>
        {movies.length > 0 ? (
          <ul className="list-group">
            {movies.map((movie) => (
              <li key={movie.item_id} className="list-group-item">
                {movie.title}
              </li>
            ))}
          </ul>
        ) : (
          <p>No movies available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Movies;
