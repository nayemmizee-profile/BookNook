"use client";

import { useEffect, useState } from "react";

export default function MyBooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBooks = async () => {
      try {
        const res = await fetch("/api/my-books");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message);
        }

        setBooks(data.books);
      } catch (error) {
        console.error("MyBooks Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBooks();
  }, []);

  if (loading) return <p>Loading MyBooks...</p>;

  return (
    <div>
      <h1></h1>

      <p> {books.length}</p>

      {books.map((book) => (
        <div key={book._id}>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
        </div>
      ))}
    </div>
  );
}
