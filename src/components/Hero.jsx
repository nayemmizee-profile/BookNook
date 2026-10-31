"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

import {
  ArrowUpRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./hero.css";

const slides = [
  {
    id: 1,
    number: "01",
    eyebrow: "YOUR NEXT CHAPTER BEGINS HERE",
    title: "Discover Stories That Stay With You.",
    highlight: "Stay With You.",
    description:
      "Explore a world of captivating stories, timeless classics, and inspiring ideas. Find the perfect book for every moment.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=2000&q=90",
    theme: "slide-one",
    tag: "EXPLORE THE WORLD OF BOOKS",
  },
  {
    id: 2,
    number: "02",
    eyebrow: "A JOURNEY THROUGH KNOWLEDGE",
    title: "Read More. Dream Bigger. Become More.",
    highlight: "Become More.",
    description:
      "Every page holds a new perspective. Discover books that challenge your thinking and inspire your imagination.",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=2000&q=90",
    theme: "slide-two",
    tag: "KNOWLEDGE STARTS WITH A PAGE",
  },
  {
    id: 3,
    number: "03",
    eyebrow: "FIND YOUR NEXT FAVORITE BOOK",
    title: "Your Next Great Adventure Awaits.",
    highlight: "Adventure Awaits.",
    description:
      "From unforgettable fiction to meaningful discoveries, find the books that make every reading moment special.",
    image:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=2000&q=90",
    theme: "slide-three",
    tag: "OPEN A BOOK. OPEN A NEW WORLD.",
  },
];

export default function Hero() {
  return (
    <section className="bn-hero">
      {/* Decorative Background */}
      <div className="bn-hero-noise" />
      <div className="bn-hero-orb bn-orb-one" />
      <div className="bn-hero-orb bn-orb-two" />

      <div className="bn-hero-wrapper">
        <Swiper
          modules={[Autoplay, EffectFade, Navigation, Pagination]}
          effect="fade"
          fadeEffect={{
            crossFade: true,
          }}
          speed={1100}
          loop={true}
          autoplay={{
            delay: 5500,
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
            renderBullet: (index, className) => {
              return `<span class="${className}">
                <span class="bn-bullet-progress"></span>
              </span>`;
            },
          }}
          className="bn-hero-swiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className={`bn-slide ${slide.theme}`}>
                {/* Background Image */}
                <div
                  className="bn-slide-image"
                  style={{
                    backgroundImage: `url("${slide.image}")`,
                  }}
                />

                <div className="bn-slide-overlay" />
                <div className="bn-slide-grid" />

                {/* Slide Content */}
                <div className="bn-slide-container">
                  <div className="bn-slide-content">
                    <div className="bn-eyebrow">
                      <span className="bn-eyebrow-icon">
                        <Sparkles size={14} />
                      </span>

                      {slide.eyebrow}
                    </div>

                    <div className="bn-slide-heading">
                      <span className="bn-slide-number">/ {slide.number}</span>

                      <h1>
                        {slide.title.split(slide.highlight)[0]}
                        <span>{slide.highlight}</span>
                      </h1>
                    </div>

                    <p className="bn-slide-description">{slide.description}</p>

                    <div className="bn-slide-actions">
                      <Link href="/books" className="bn-browse-btn">
                        <BookOpen size={19} />

                        <span>Browse Books</span>

                        <ArrowUpRight size={18} />
                      </Link>

                      <div className="bn-slide-note">
                        <span className="bn-note-line" />
                        <span>{slide.tag}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Visual */}
                  <div className="bn-slide-visual">
                    <div className="bn-visual-circle" />

                    <div className="bn-visual-ring bn-ring-one" />
                    <div className="bn-visual-ring bn-ring-two" />

                    <div className="bn-visual-card">
                      <div className="bn-visual-card-top">
                        <Sparkles size={17} />
                        <span>THE BOOKNOOK EXPERIENCE</span>
                      </div>

                      <div className="bn-visual-icon">
                        <BookOpen size={55} strokeWidth={1} />
                      </div>

                      <div className="bn-visual-card-bottom">
                        <span>READ</span>
                        <span className="bn-card-dot" />
                        <span>EXPLORE</span>
                        <span className="bn-card-dot" />
                        <span>GROW</span>
                      </div>
                    </div>

                    <div className="bn-floating-icon bn-floating-one">
                      <Sparkles size={21} />
                    </div>

                    <div className="bn-floating-icon bn-floating-two">
                      <BookOpen size={20} />
                    </div>
                  </div>
                </div>

                {/* Bottom Label */}
                <div className="bn-slide-bottom">
                  <span>BOOKNOOK</span>
                  <span className="bn-bottom-divider" />
                  <span>THE HOME OF GREAT STORIES</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Slider Controls */}
        <div className="bn-slider-controls">
          <button className="bn-hero-prev" aria-label="Previous slide">
            <ChevronLeft size={21} />
          </button>

          <div className="bn-hero-pagination" />

          <button className="bn-hero-next" aria-label="Next slide">
            <ChevronRight size={21} />
          </button>
        </div>

        {/* Side Decoration */}
        <div className="bn-side-label">
          <span>SCROLL TO EXPLORE</span>
          <span className="bn-side-line" />
        </div>
      </div>
    </section>
  );
}
