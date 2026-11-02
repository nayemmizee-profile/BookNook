"use client";

import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Copy,
  Hash,
  Layers,
  Mail,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import "./AllBooks.css";

export default function AllBooksPageUI({ books = [] }) {
  const sortedBooks = [...books].sort(
    (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
  );

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className="latest-books-section">
      <div className="latest-books-container">
        {/* Header */}
        <div className="latest-books-heading">
          <div className="latest-heading-label">
            <BookOpen size={16} />
            BOOKNOOK LIBRARY
          </div>

          <h2>
            Latest <strong>Books</strong>
          </h2>

          <p>
            Discover every recently added book in our growing library
            collection.
          </p>

          <div className="latest-stats">
            <div>
              <BookOpen size={19} />
              <span>Total Books</span>
              <strong>{sortedBooks.length}</strong>
            </div>

            <div>
              <Layers size={19} />
              <span>Latest Collection</span>
              <strong>All Books</strong>
            </div>
          </div>
        </div>

        {/* Books */}
        {sortedBooks.length > 0 ? (
          <div className="latest-books-grid">
            {sortedBooks.map((book, index) => (
              <article
                className="latest-book-card"
                key={book._id || book.id}
                style={{
                  "--card-index": index,
                }}
              >
                {/* Cover */}
                <div className="latest-book-cover">
                  {book.image && (
                    <Image
                      src={book.image}
                      alt={book.title || "Book cover"}
                      fill
                      sizes="(max-width: 600px) 100vw,
                             (max-width: 1000px) 50vw,
                             33vw"
                      className="latest-cover-image"
                    />
                  )}

                  <span className="latest-category">
                    {book.category || "Uncategorized"}
                  </span>

                  <span className="latest-number">#{index + 1}</span>
                </div>

                {/* Details */}
                <div className="latest-book-details">
                  <div className="latest-book-title">
                    <h3>{book.title}</h3>
                    <span>By {book.author}</span>
                  </div>

                  <div className="latest-description">
                    <p>{book.description || "No description available."}</p>
                  </div>

                  {/* Added By */}
                  <div className="latest-info-box">
                    <div className="latest-info-heading">
                      <UserRound size={16} />
                      <span>Added By</span>
                    </div>

                    <p>{book.userName || "Unknown User"}</p>

                    <div className="latest-email">
                      <Mail size={14} />
                      <span>{book.userEmail || "No email available"}</span>
                    </div>
                  </div>

                  {/* Extra Information */}
                  <div className="latest-book-meta">
                    <div>
                      <CalendarDays size={16} />
                      <section>
                        <span>Added On</span>
                        <strong>{formatDate(book.createdAt)}</strong>
                      </section>
                    </div>

                    <div>
                      <Copy size={16} />
                      <section>
                        <span>Total Copies</span>
                        <strong>{book.totalCopies ?? 0} Copies</strong>
                      </section>
                    </div>

                    <div>
                      <Hash size={16} />
                      <section>
                        <span>Book ID</span>
                        <strong className="latest-book-id">
                          {book._id || book.id || "N/A"}
                        </strong>
                      </section>
                    </div>
                  </div>
                  <Link
                    href={`/AllBooks/${book._id || book.id}`}
                    className="latest-view-details"
                  >
                    <span>View Book Details</span>
                    <ArrowUpRight size={18} />
                  </Link>
                  {/* Footer */}
                  <div className="latest-card-footer">
                    <span>
                      <BookOpen size={15} />
                      BookNook Collection
                    </span>

                    <span className="latest-card-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="latest-empty">
            <BookOpen size={45} />
            <h3>No Books Found</h3>
            <p>New books will appear here when added to the library.</p>
          </div>
        )}
      </div>
    </section>
  );
}
