import React, { useState, useEffect } from "react";
import { getBooks } from "../services/api";
import Navbar from "../components/Navbar";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBooks();
        setBooks(response.data);
      } catch (err) {
        setError("Failed to load books. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <h2>Available Books</h2>
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
        {books.length > 0 ? (
          <ul className="list-group">
            {books.map((book) => (
              <li key={book.item_id} className="list-group-item">
                {book.title}
              </li>
            ))}
          </ul>
        ) : (
          <p>No books available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Books;
