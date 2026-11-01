import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  Library,
  Mail,
  Sparkles,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import BorrowButton from "@/components/BorrowButton";
import "./bookdetails.css";

async function BookDetailsContent({ params }) {
  const { id } = await params;

  let book;

  try {
    const response = await fetch(`${process.env.API_URL}/AllBooks/${id}`, {
      cache: "no-store",
    });

    if (response.status === 404) {
      notFound();
    }

    if (!response.ok) {
      throw new Error("Failed to fetch book details");
    }

    book = await response.json();
  } catch (error) {
    console.error("Book details error:", error);
    throw error;
  }

  if (!book) notFound();

  return (
    <main className="book-details-page">
      <div className="details-container">
        {/* Back Navigation */}
        <Link href="/books" className="back-link">
          <ArrowLeft size={18} />
          Back to Library
        </Link>

        {/* Main Book Details */}
        <section className="book-details-card">
          {/* Book Image */}
          <div className="details-image-section">
            <div className="details-image-wrapper">
              <Image
                src={book.image}
                alt={book.title}
                fill
                priority
                sizes="(max-width: 768px) 90vw, 450px"
                className="details-book-image"
              />
              <span className="details-category-badge">{book.category}</span>
            </div>

            <div className="image-caption">
              <Sparkles size={16} />
              <span>Discover your next favorite read</span>
            </div>
          </div>

          {/* Book Information */}
          <div className="details-content">
            <div className="details-top-label">
              <BookOpen size={17} />
              BOOK DETAILS
            </div>

            <h1>{book.title}</h1>

            <p className="details-author">
              Written by <span>{book.author}</span>
            </p>

            <div className="details-divider" />

            {/* Category and Copies */}
            <div className="details-info-grid">
              <div className="details-info-item">
                <div className="info-icon">
                  <Library size={19} />
                </div>
                <div>
                  <span>Category</span>
                  <strong>{book.category}</strong>
                </div>
              </div>

              <div className="details-info-item">
                <div className="info-icon">
                  <BookOpen size={19} />
                </div>
                <div>
                  <span>Total Copies</span>
                  <strong>{book.totalCopies}</strong>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="details-description">
              <h3>About This Book</h3>
              <p>{book.description}</p>
            </div>

            {/* Added By */}
            <div className="added-by-card">
              <h3>Added to Library By</h3>

              <div className="added-by-info">
                <div className="added-user-icon">
                  <UserRound size={22} />
                </div>

                <div className="added-user-details">
                  <strong>{book.userName}</strong>
                  <span>
                    <Mail size={14} />
                    {book.userEmail}
                  </span>
                </div>
              </div>
            </div>

            {/* Created Date */}
            {book.createdAt && (
              <div className="book-created-date">
                <CalendarDays size={17} />
                <span>
                  Added on{" "}
                  {new Date(book.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            )}

            {/* Borrow Button */}
            <BorrowButton bookId={book._id} />
          </div>
        </section>

        {/* Bottom Note */}
        <div className="details-footer-note">
          <BookOpen size={18} />
          <p>
            Every book opens a new world. Choose your next adventure and start
            reading today.
          </p>
        </div>
      </div>
    </main>
  );
}

function BookDetailsSkeleton() {
  return (
    <main className="book-details-page">
      <div className="details-container">
        <div className="details-loading">Loading book details...</div>
      </div>
    </main>
  );
}

export default function BookDetailsPage({ params }) {
  return (
    <Suspense fallback={<BookDetailsSkeleton />}>
      <BookDetailsContent params={params} />
    </Suspense>
  );
}
