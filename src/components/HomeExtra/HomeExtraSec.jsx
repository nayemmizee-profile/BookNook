"use client";

import {
  ArrowUpRight,
  BookMarked,
  BookOpen,
  Bookmark,
  Brain,
  LibraryBig,
  Quote,
  Sparkles,
  Users,
} from "lucide-react";

import Link from "next/link";
import "./HomeExtra.css";

const features = [
  {
    icon: LibraryBig,
    number: "01",
    title: "Explore Your Next Read",
    description:
      "Discover a world of books across different genres and find stories that inspire you.",
  },
  {
    icon: Bookmark,
    number: "02",
    title: "Build Your Collection",
    description:
      "Keep your favorite books organized and create your own personal reading collection.",
  },
  {
    icon: Brain,
    number: "03",
    title: "Track Your Progress",
    description:
      "Stay motivated, manage your reading list and make every reading session count.",
  },
];

export default function HomeExtraSections() {
  return (
    <main className="home-extra">
      {/* SECTION 01: WHY BOOKNOOK */}
      <section className="why-section">
        <div className="extra-container">
          <div className="section-heading">
            <span className="section-eyebrow">
              <Sparkles size={15} />
              THE BOOKNOOK EXPERIENCE
            </span>

            <h2>
              More Than Just <span>Books.</span>
              <br />A Better Way to Read.
            </h2>

            <p>
              Everything you need to discover, organize and enjoy your reading
              journey — all in one place.
            </p>
          </div>

          <div className="feature-grid">
            {features.map((item) => {
              const Icon = item.icon;

              return (
                <article className="feature-card" key={item.number}>
                  <div className="feature-top">
                    <span>{item.number}</span>
                    <Icon size={25} />
                  </div>

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>

                  <div className="feature-bottom">
                    <span>DISCOVER MORE</span>
                    <ArrowUpRight size={18} />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 02: QUOTE OF THE DAY */}
      <section className="quote-section">
        <div className="quote-card">
          <div className="quote-decoration">
            <Quote size={65} />
          </div>

          <span className="quote-label">
            <Sparkles size={14} />A LITTLE INSPIRATION
          </span>

          <h2>
            “A reader lives a thousand lives before he dies. The man who never
            reads lives only one.”
          </h2>

          <div className="quote-author">
            <span></span>
            <p>George R. R. Martin</p>
          </div>

          <div className="quote-book-icon">
            <BookOpen size={105} strokeWidth={0.7} />
          </div>
        </div>
      </section>

      {/* SECTION 03: READING COMMUNITY */}
      <section className="community-section">
        <div className="community-content">
          <div className="community-icon">
            <Users size={30} />
          </div>

          <span className="section-eyebrow">
            YOUR READING JOURNEY STARTS HERE
          </span>

          <h2>
            Every Great Journey
            <br />
            <span>Begins With a Book.</span>
          </h2>

          <p>
            Find your next favorite book, build your reading collection and make
            every page worth turning.
          </p>

          <div className="community-actions">
            <Link href="/books" className="community-btn">
              Explore Books
              <ArrowUpRight size={19} />
            </Link>

            <Link href="/my-books" className="community-link">
              My Reading List
              <BookMarked size={17} />
            </Link>
          </div>
        </div>

        <div className="community-visual">
          <div className="visual-circle circle-one"></div>
          <div className="visual-circle circle-two"></div>

          <div className="floating-book book-one">
            <BookOpen size={37} />
          </div>

          <div className="floating-book book-two">
            <LibraryBig size={30} />
          </div>

          <div className="floating-book book-three">
            <Bookmark size={27} />
          </div>

          <div className="community-main-icon">
            <BookOpen size={95} strokeWidth={1} />
            <span>BOOKNOOK</span>
          </div>
        </div>
      </section>
    </main>
  );
}
