import React, { useState, useEffect } from "react";
import { getMovies } from "../services/api";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies().then((response) => setMovies(response.data));
  }, []);

  return (
    <div className="container mt-5">
      <h2>Available Movies</h2>
      <ul className="list-group">
        {movies.map((movie) => (
          <li key={movie.id} className="list-group-item">
            {movie.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
