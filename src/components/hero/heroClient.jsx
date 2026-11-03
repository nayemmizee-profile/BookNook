"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Star,
} from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./hero.css";

const slides = [
  {
    eyebrow: "A WORLD OF STORIES",
    title: "Find Your Next",
    highlight: "Favorite Book.",
    description:
      "Explore a thoughtfully curated collection of books, discover new perspectives, and find stories worth remembering.",
    tag: "DISCOVER SOMETHING NEW",
  },
  {
    eyebrow: "READ. LEARN. GROW.",
    title: "Every Book Opens",
    highlight: "A New World.",
    description:
      "From timeless classics to modern masterpieces, discover books that inspire your imagination and expand your knowledge.",
    tag: "YOUR JOURNEY STARTS HERE",
  },
  {
    eyebrow: "YOUR PERSONAL BOOKSPACE",
    title: "Stories That",
    highlight: "Inspire You.",
    description:
      "Find your next adventure, explore different genres, and make every reading moment meaningful.",
    tag: "MAKE READING A HABIT",
  },
];

export default function HeroSlider({ books = [] }) {
  const [activeBook, setActiveBook] = useState(0);

  // Normalize API data
  const featuredBooks = useMemo(() => {
    if (!Array.isArray(books)) return [];

    return books
      .filter((book) => book && (book.title || book.name))
      .slice(0, 7)
      .map((book, index) => ({
        id: book._id || book.id || index,
        title: book.title || book.name || "Untitled Book",
        author: book.author || book.authorName || "Unknown Author",
        category: book.category || book.genre || book.type || "Featured Book",
        description:
          book.description ||
          "Discover this wonderful book and explore a new world of ideas.",
        image: book.image || "",
        rating: book.rating || book.averageRating || null,
      }));
  }, [books]);

  // Highlight a new book every second
  useEffect(() => {
    if (featuredBooks.length <= 1) return;

    const interval = setInterval(() => {
      setActiveBook((previous) => (previous + 1) % featuredBooks.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [featuredBooks.length]);

  // Reset index when API data changes
  useEffect(() => {
    setActiveBook(0);
  }, [featuredBooks.length]);

  const selectedBook = featuredBooks[activeBook];

  return (
    <section className="bn-hero">
      {/* Modern abstract background */}
      <div className="bn-background">
        <div className="bn-bg-blob bn-bg-blob-one" />
        <div className="bn-bg-blob bn-bg-blob-two" />
        <div className="bn-bg-grid" />
        <div className="bn-bg-circle" />
      </div>

      <div className="bn-hero-wrapper">
        <Swiper
          modules={[Autoplay, EffectFade, Navigation, Pagination]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={1000}
          loop={slides.length > 1}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            prevEl: ".bn-hero-prev",
            nextEl: ".bn-hero-next",
          }}
          pagination={{
            el: ".bn-hero-pagination",
            clickable: true,
          }}
          className="bn-hero-swiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="bn-slide">
                {/* LEFT CONTENT */}
                <div className="bn-slide-container">
                  <div className="bn-slide-content">
                    <div className="bn-eyebrow">
                      <span className="bn-eyebrow-icon">
                        <Sparkles size={15} />
                      </span>
                      {slide.eyebrow}
                    </div>

                    <div className="bn-heading">
                      <span className="bn-slide-number">0{index + 1} / 03</span>

                      <h1>
                        {slide.title}
                        <span>{slide.highlight}</span>
                      </h1>
                    </div>

                    <p className="bn-description">{slide.description}</p>

                    <div className="bn-actions">
                      <Link href="/books" className="bn-browse-btn">
                        <BookOpen size={19} />
                        <span>Explore Books</span>
                        <ArrowUpRight size={18} />
                      </Link>

                      <Link href="/about" className="bn-discover-link">
                        Discover More
                        <ArrowRight size={17} />
                      </Link>
                    </div>

                    <div className="bn-trust">
                      <span className="bn-trust-icon">
                        <Star size={14} fill="currentColor" />
                      </span>
                      <span>EXPLORE. DISCOVER. ENJOY.</span>
                    </div>
                  </div>

                  {/* RIGHT SIDE BOOK SHOWCASE */}
                  <div className="bn-book-showcase">
                    <div className="bn-showcase-heading">
                      <span className="bn-showcase-dot" />
                      <span>HANDPICKED FOR YOU</span>
                    </div>

                    {/* Active book information */}
                    {selectedBook ? (
                      <div className="bn-book-info" key={selectedBook.id}>
                        <div className="bn-info-top">
                          <span className="bn-info-category">
                            {selectedBook.category}
                          </span>

                          {selectedBook.rating && (
                            <span className="bn-info-rating">
                              <Star size={13} fill="currentColor" />
                              {selectedBook.rating}
                            </span>
                          )}
                        </div>

                        <h2>{selectedBook.title}</h2>

                        <p className="bn-info-author">
                          By {selectedBook.author}
                        </p>

                        <p className="bn-info-description">
                          {selectedBook.description}
                        </p>

                        <Link href="/books" className="bn-book-details">
                          Explore this book
                          <ArrowUpRight size={15} />
                        </Link>
                      </div>
                    ) : (
                      <div className="bn-book-info bn-empty-info">
                        <BookOpen size={32} />
                        <h2>Your next read awaits.</h2>
                        <p>Books from your collection will appear here.</p>
                      </div>
                    )}

                    {/* SEMICIRCLE BOOK ORBIT */}
                    <div className="bn-book-orbit">
                      <div className="bn-orbit-track" />
                      <div className="bn-orbit-track bn-orbit-track-inner" />

                      {featuredBooks.map((book, index) => {
                        const angle =
                          -75 +
                          (150 / Math.max(featuredBooks.length - 1, 1)) * index;

                        const radius = 205;
                        const x = Math.cos((angle * Math.PI) / 180) * radius;
                        const y = Math.sin((angle * Math.PI) / 180) * radius;

                        const isActive = activeBook === index;

                        return (
                          <button
                            type="button"
                            key={book.id}
                            className={`bn-orbit-book ${
                              isActive ? "is-active" : ""
                            }`}
                            style={{
                              "--book-x": `${x}px`,
                              "--book-y": `${y}px`,
                            }}
                            onClick={() => setActiveBook(index)}
                            aria-label={`Show ${book.title}`}
                            aria-pressed={isActive}
                          >
                            <span className="bn-book-cover">
                              {book.image ? (
                                <Image
                                  src={book.image}
                                  alt={book.title}
                                  fill
                                  sizes="110px"
                                  unoptimized
                                />
                              ) : (
                                <span className="bn-cover-placeholder">
                                  <BookOpen size={27} />
                                  <small>{book.title}</small>
                                </span>
                              )}
                            </span>

                            <span className="bn-book-active-dot" />
                          </button>
                        );
                      })}

                      {!featuredBooks.length && (
                        <div className="bn-orbit-empty">
                          <BookOpen size={42} />
                          <span>Books will appear here</span>
                        </div>
                      )}

                      <div className="bn-orbit-center">
                        <div className="bn-center-icon">
                          <BookOpen size={25} />
                        </div>
                        <span>BOOKNOOK</span>
                        <small>DISCOVER MORE</small>
                      </div>
                    </div>

                    {/* Carousel counter */}
                    {featuredBooks.length > 0 && (
                      <div className="bn-book-counter">
                        <span>{String(activeBook + 1).padStart(2, "0")}</span>
                        <span className="bn-counter-line" />
                        <span>
                          {String(featuredBooks.length).padStart(2, "0")}
                        </span>
                      </div>
                    )}

                    <div className="bn-showcase-footer">
                      <span>CURATED COLLECTION</span>
                      <span>01 SECOND / BOOK</span>
                    </div>
                  </div>
                </div>

                {/* BOTTOM LABEL */}
                <div className="bn-slide-bottom">
                  <span>BOOKNOOK</span>
                  <span className="bn-bottom-divider" />
                  <span>{slide.tag}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* SLIDER CONTROLS */}
        <div className="bn-slider-controls">
          <button
            className="bn-hero-prev"
            type="button"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="bn-hero-pagination" />

          <button
            className="bn-hero-next"
            type="button"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
