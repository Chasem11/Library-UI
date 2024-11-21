import React, { useState, useEffect } from "react";
import { getBooks } from "../services/api";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks().then((response) => setBooks(response.data));
  }, []);

  return (
    <div className="container mt-5">
      <h2>Available Books</h2>
      <ul className="list-group">
        {books.map((book) => (
          <li key={book.id} className="list-group-item">
            {book.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;
