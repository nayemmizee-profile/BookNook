"use client";

import { authClient } from "@/lib/auth-client";
import { ArrowUpRight, BookOpen, CalendarDays, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import "./BorrowButton.css";

function getDefaultReturnDate() {
  const date = new Date();
  date.setDate(date.getDate() + 14);

  return date.toISOString().split("T")[0];
}

export default function BorrowButton({ book }) {
  const { data: session, isPending: sessionLoading } = authClient.useSession();

  const [isOpen, setIsOpen] = useState(false);
  const [returnDate, setReturnDate] = useState(getDefaultReturnDate);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const user = session?.user;

  const borrowDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleBorrow = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!user) {
      setError("Please login before borrowing a book.");
      return;
    }

    if (!returnDate) {
      setError("Please select a return date.");
      return;
    }

    const selectedDate = new Date(`${returnDate}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate <= today) {
      setError("Return date must be after today.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/borrow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId: book._id,
          returnDate,
        }),
      });

      // Read response only once
      const responseText = await res.text();

      console.log("Status:", res.status);
      console.log("URL:", res.url);
      console.log("Response:", responseText);

      let result;

      try {
        result = JSON.parse(responseText);
      } catch {
        console.error("Invalid API response:", responseText);
        throw new Error(`Invalid server response. Status: ${res.status}`);
      }

      if (!res.ok) {
        throw new Error(result.message || "Failed to borrow this book.");
      }

      setSuccess(result.message || "Book borrowed successfully!");
    } catch (error) {
      console.error("Borrow Error:", error);
      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className="borrow-book-btn"
        onClick={() => {
          setError("");
          setSuccess("");
          setIsOpen(true);
        }}
      >
        Borrow This Book
        <ArrowUpRight size={19} />
      </button>

      {isOpen && (
        <div
          className="borrow-modal-overlay"
          onClick={() => !loading && setIsOpen(false)}
        >
          <div className="borrow-modal" onClick={(e) => e.stopPropagation()}>
            <div className="borrow-modal-header">
              <div>
                <span className="borrow-modal-label">
                  <BookOpen size={15} />
                  BOOK BORROWING
                </span>

                <h2>Borrow This Book</h2>
                <p>Confirm your information before borrowing.</p>
              </div>

              <button
                type="button"
                className="borrow-modal-close"
                onClick={() => setIsOpen(false)}
                disabled={loading}
                aria-label="Close modal"
              >
                <X size={21} />
              </button>
            </div>

            {sessionLoading ? (
              <p className="borrow-modal-message">
                Loading your account information...
              </p>
            ) : !user ? (
              <div className="borrow-modal-message">
                <p>Please login to borrow this book.</p>
                <a href="/login">Go to Login</a>
              </div>
            ) : (
              <form onSubmit={handleBorrow}>
                <div className="borrow-form-group">
                  <label htmlFor="borrow-name">Your Name</label>
                  <input
                    id="borrow-name"
                    type="text"
                    value={user.name || ""}
                    readOnly
                  />
                </div>

                <div className="borrow-form-group">
                  <label htmlFor="borrow-email">Your Email</label>
                  <input
                    id="borrow-email"
                    type="email"
                    value={user.email || ""}
                    readOnly
                  />
                </div>

                <div className="borrow-book-preview">
                  {book.image && (
                    <Image
                      src={book.image}
                      alt={book.title}
                      width={100}
                      height={100}
                    />
                  )}

                  <div>
                    <span>SELECTED BOOK</span>
                    <strong>{book.title}</strong>
                  </div>
                </div>

                <div className="borrow-date-grid">
                  <div className="borrow-form-group">
                    <label>
                      <CalendarDays size={15} />
                      Borrow Date
                    </label>

                    <input type="text" value={borrowDate} readOnly />
                  </div>

                  <div className="borrow-form-group">
                    <label htmlFor="return-date">
                      <CalendarDays size={15} />
                      Return Date
                    </label>

                    <input
                      id="return-date"
                      type="date"
                      value={returnDate}
                      min={getDefaultReturnDate()}
                      onChange={(e) => setReturnDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {error && <p className="borrow-form-error">{error}</p>}

                {success && <p className="borrow-form-success">{success}</p>}

                <button
                  type="submit"
                  className="confirm-borrow-btn"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Confirm Borrow"}
                  {!loading && <ArrowUpRight size={18} />}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
