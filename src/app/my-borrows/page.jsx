"use client";

import { useEffect, useState } from "react";

export default function MyBorrowPage() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBorrow = async () => {
      try {
        const res = await fetch("/api/my-borrow");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message);
        }

        setBorrowedBooks(data.borrowedBooks);
      } catch (error) {
        console.error("MyBorrow Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBorrow();
  }, []);

  if (loading) return <p>Loading Borrowed Books...</p>;

  return (
    <div>
      <h1></h1>

      <p> {borrowedBooks.length}</p>

      {borrowedBooks.map((book) => (
        <div key={book._id}>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
        </div>
      ))}
    </div>
  );
}
