import { ArrowRight, ArrowUpRight, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import "./bookList.css";

const BookList = ({ books = [] }) => {
  const latestBooks = [...books]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 14);

  return (
    <section className="new-arrivals-section">
      <div className="arrivals-container">
        {/* Header */}
        <div className="arrivals-header">
          <div>
            <span className="section-label">DISCOVER YOUR NEXT READ</span>

            <h2>
              New <span>Arrivals</span>
            </h2>

            <p>
              Explore the latest books added to our collection. Find your next
              favorite read.
            </p>
          </div>

          <div className="sort-box">
            <SlidersHorizontal size={17} />
            <span>Sort by:</span>
            <strong>Newest First</strong>
          </div>
        </div>

        {/* Book Grid */}
        {latestBooks.length > 0 ? (
          <div className="arrivals-grid">
            {latestBooks.map((book, index) => (
              <article
                key={book._id || book.id}
                className="arrival-card"
                style={{ "--card-index": index }}
              >
                {/* Book Image */}
                <div className="book-image-wrapper">
                  <span className="new-badge">NEW</span>

                  <Image
                    src={book.image}
                    alt={book.title || "Book cover"}
                    width={500}
                    height={500}
                    className="book-cover"
                  />

                  <div className="image-overlay">
                    <span>Recently Added</span>
                  </div>
                </div>

                {/* Book Information */}
                <div className="book-content">
                  <div className="book-meta">
                    <span>{book.category}</span>

                    <span>
                      {book.createdAt
                        ? new Date(book.createdAt).getFullYear()
                        : "New"}
                    </span>
                  </div>

                  <h3 title={book.title}>{book.title}</h3>

                  <p className="book-author">
                    By <span>{book.author}</span>
                  </p>

                  <Link
                    href={`/AllBooks/${book._id || book.id}`}
                    className="view-details-btn"
                  >
                    View Details
                    <ArrowUpRight size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-books">
            <h3>No books available yet</h3>
            <p>New books will appear here when added to the library.</p>
          </div>
        )}

        {/* See All */}
        <div className="see-all-wrapper">
          <div className="see-all-line" />

          <Link href="/AllBooks" className="see-all-btn">
            See All Books
            <ArrowRight size={19} />
          </Link>

          <div className="see-all-line" />
        </div>
      </div>
    </section>
  );
};

export default BookList;
