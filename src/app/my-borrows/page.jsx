"use client";

import {
  AlertCircle,
  BookMarked,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  RotateCcw,
  Search,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import "./borrow.css";

export default function MyBorrowPage() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [returningId, setReturningId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch borrowed books
  const fetchMyBorrow = useCallback(async () => {
    try {
      setError("");

      const res = await fetch("/api/my-borrow", {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch borrowed books");
      }

      setBorrowedBooks(data.borrowedBooks || []);
    } catch (error) {
      console.error("MyBorrow Error:", error);
      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMyBorrow();
  }, [fetchMyBorrow]);

  // Return book
  const handleReturnBook = async (borrowId) => {
    const confirmed = window.confirm(
      "Are you sure you want to return this book?",
    );

    if (!confirmed) return;

    try {
      setReturningId(borrowId);

      const res = await fetch("/api/my-borrow/return-book", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ borrowId }),
      });

      const responseText = await res.text();

      console.log("Status:", res.status);
      console.log("Response:", responseText);

      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(`Invalid server response. Status: ${res.status}`);
      }

      if (!res.ok) {
        throw new Error(data.message || "Failed to return book.");
      }

      console.log(data.message);

      // Remove returned book from active list
      setBorrowedBooks((prev) => prev.filter((book) => book._id !== borrowId));
    } catch (error) {
      console.error("Return Book Error:", error);
      alert(error.message);
    } finally {
      setReturningId(null);
    }
  };

  // Date formatting
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Search
  const filteredBooks = borrowedBooks.filter((book) =>
    `${book.bookTitle} ${book.author || ""}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  const activeCount = borrowedBooks.length;

  if (loading) {
    return (
      <div className="borrow-page">
        <div className="borrow-container">
          <div className="borrow-skeleton" />
          <div className="borrow-skeleton" />
          <div className="borrow-skeleton" />
        </div>
      </div>
    );
  }

  return (
    <main className="borrow-page">
      <div className="borrow-container">
        {/* Header */}
        <section className="borrow-header">
          <div>
            <span className="borrow-eyebrow">
              <BookOpen size={15} />
              YOUR PERSONAL LIBRARY
            </span>

            <h1>
              My Borrowed <span>Books.</span>
            </h1>

            <p>
              Keep track of your reading journey and manage all your borrowed
              books in one place.
            </p>
          </div>

          <div className="borrow-header-icon">
            <BookMarked size={48} strokeWidth={1.2} />
          </div>
        </section>

        {/* Statistics */}
        <section className="borrow-stats">
          <div className="borrow-stat-card">
            <div className="stat-icon teal">
              <BookOpen size={22} />
            </div>
            <div>
              <span>Total Borrowed</span>
              <h2>{activeCount}</h2>
            </div>
          </div>

          <div className="borrow-stat-card">
            <div className="stat-icon orange">
              <Clock3 size={22} />
            </div>
            <div>
              <span>Currently Reading</span>
              <h2>{activeCount}</h2>
            </div>
          </div>

          <div className="borrow-stat-card">
            <div className="stat-icon green">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <span>Active Borrowings</span>
              <h2>{activeCount}</h2>
            </div>
          </div>
        </section>

        {/* Books Section */}
        <section className="borrow-content">
          <div className="borrow-content-header">
            <div>
              <h2>Borrowing History</h2>
              <p>Manage your currently borrowed books.</p>
            </div>

            <div className="borrow-search">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="borrow-message error-message">
              <AlertCircle size={20} />
              {error}
              <button onClick={fetchMyBorrow}>Retry</button>
            </div>
          )}

          {/* Empty State */}
          {!error && borrowedBooks.length === 0 && (
            <div className="borrow-empty">
              <div className="empty-icon">
                <BookOpen size={42} />
              </div>
              <h3>No Borrowed Books Yet!</h3>
              <p>
                You haven't borrowed any books. Explore the library and find
                your next favorite book.
              </p>
              <a href="/books" className="explore-btn">
                Explore Books
              </a>
            </div>
          )}

          {/* No Search Results */}
          {borrowedBooks.length > 0 && filteredBooks.length === 0 && (
            <div className="borrow-empty">
              <Search size={36} />
              <h3>No books found</h3>
              <p>Try searching with another book title.</p>
            </div>
          )}

          {/* Table */}
          {filteredBooks.length > 0 && (
            <div className="borrow-table-wrapper">
              <table className="borrow-table">
                <thead>
                  <tr>
                    <th>BOOK DETAILS</th>
                    <th>BORROW DATE</th>
                    <th>RETURN DATE</th>
                    <th>STATUS</th>
                    <th>ACTION</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredBooks.map((book) => (
                    <tr key={book._id}>
                      <td>
                        <div className="borrow-book-info">
                          <div className="borrow-book-image">
                            {book.image || book.bookImage ? (
                              <Image
                                src={book.image || book.bookImage}
                                alt={book.title || book.bookTitle}
                                width={55}
                                height={75}
                                unoptimized
                              />
                            ) : (
                              <BookOpen size={25} />
                            )}
                          </div>

                          <div>
                            <h3>{book.title || book.bookTitle}</h3>
                            <span>{book.author || "Unknown Author"}</span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="borrow-date">
                          <CalendarDays size={15} />
                          {formatDate(book.borrowDate)}
                        </div>
                      </td>

                      <td>
                        <div className="borrow-date">
                          <CalendarDays size={15} />
                          {formatDate(book.returnDate)}
                        </div>
                      </td>

                      <td>
                        <span className="borrow-status">
                          <span />
                          Borrowed
                        </span>
                      </td>

                      <td>
                        <button
                          className="return-btn"
                          disabled={returningId === book._id}
                          onClick={() => handleReturnBook(book._id)}
                        >
                          <RotateCcw size={15} />
                          {returningId === book._id
                            ? "Returning..."
                            : "Return Book"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Footer note */}
        {borrowedBooks.length > 0 && (
          <div className="borrow-note">
            <AlertCircle size={17} />
            <p>
              Please return your borrowed books before the specified return
              date.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
