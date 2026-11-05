"use client";

import { ArrowLeft, ArrowUpRight, BookOpen, Home, SearchX } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import "./not-found.css";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="not-found-page">
      {/* Background decoration */}
      <div className="nf-background">
        <div className="nf-orb nf-orb-one" />
        <div className="nf-orb nf-orb-two" />
        <div className="nf-grid" />

        <div className="nf-particles">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>
      </div>

      <section className="nf-content">
        {/* Top brand */}
        <Link href="/" className="nf-brand">
          <span className="nf-brand-icon">
            <BookOpen size={21} />
          </span>
          <span>Book Nook</span>
        </Link>

        {/* Error illustration */}
        <div className="nf-illustration">
          <div className="nf-error-number">
            <span>4</span>

            <div className="nf-book-zero">
              <div className="nf-book-page nf-page-left" />
              <div className="nf-book-page nf-page-right" />
              <BookOpen className="nf-book-icon" size={66} />
            </div>

            <span>4</span>
          </div>

          <div className="nf-floating-label">
            <SearchX size={15} />
            <span>PAGE NOT FOUND</span>
          </div>

          <div className="nf-shadow" />
        </div>

        {/* Message */}
        <div className="nf-message">
          <p className="nf-eyebrow">
            <span /> LOST IN THE LIBRARY?
          </p>

          <h1>
            Oops! This page
            <br />
            <span>has gone missing.</span>
          </h1>

          <p className="nf-description">
            Looks like this book has been misplaced. The page you are looking
            for doesn't exist, may have been moved, or is temporarily
            unavailable.
          </p>
        </div>

        {/* Actions */}
        <div className="nf-actions">
          <Link href="/" className="nf-home-button">
            <Home size={18} />
            Back to Home
            <ArrowUpRight size={17} />
          </Link>

          <button
            type="button"
            className="nf-back-button"
            onClick={() => router.back()}
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>

        {/* Footer */}
        <div className="nf-footer">
          <span>404</span>
          <span className="nf-footer-line" />
          <span>Every great story starts somewhere.</span>
        </div>
      </section>
    </main>
  );
}
