"use client";

import {
  ArrowUpRight,
  BookOpen,
  Coffee,
  Compass,
  Heart,
  Moon,
  Sparkles,
} from "lucide-react";

import Link from "next/link";
import "./ReadingCorner.css";

const readingMoods = [
  {
    id: "01",
    title: "Lost in Fiction",
    subtitle: "Stories that take you elsewhere.",
    category: "Fiction",
    icon: BookOpen,
    color: "fiction",
    emoji: "✦",
  },
  {
    id: "02",
    title: "Feed Your Mind",
    subtitle: "Knowledge is always in season.",
    category: "Science",
    icon: Sparkles,
    color: "knowledge",
    emoji: "✧",
  },
  {
    id: "03",
    title: "Midnight Thoughts",
    subtitle: "For the quiet and curious minds.",
    category: "Philosophy",
    icon: Moon,
    color: "midnight",
    emoji: "☾",
  },
  {
    id: "04",
    title: "A Cozy Escape",
    subtitle: "Slow down and enjoy the pages.",
    category: "Romance",
    icon: Heart,
    color: "cozy",
    emoji: "♡",
  },
];

export default function ReadingCorner() {
  return (
    <section className="reading-corner">
      <div className="reading-container">
        {/* HEADER */}
        <div className="reading-header">
          <div>
            <span className="reading-eyebrow">
              <Compass size={15} />
              FIND YOUR READING MOOD
            </span>

            <h2>
              What Are You
              <br />
              <span>In The Mood For?</span>
            </h2>
          </div>

          <p>
            Every mood has a story. Explore different worlds and discover
            something that speaks to you.
          </p>
        </div>

        {/* MOOD CARDS */}
        <div className="mood-grid">
          {readingMoods.map((mood) => {
            const Icon = mood.icon;

            return (
              <Link
                href={`/books?category=${mood.category}`}
                key={mood.id}
                className={`mood-card ${mood.color}`}
              >
                <div className="mood-card-top">
                  <span>{mood.id} / 04</span>
                  <ArrowUpRight size={21} />
                </div>

                <div className="mood-illustration">
                  <span className="mood-orbit"></span>
                  <span className="mood-symbol">{mood.emoji}</span>
                  <Icon size={52} strokeWidth={1.1} />
                </div>

                <div className="mood-card-content">
                  <span>{mood.category}</span>
                  <h3>{mood.title}</h3>
                  <p>{mood.subtitle}</p>
                </div>

                <div className="mood-card-bottom">
                  <span>EXPLORE COLLECTION</span>
                  <ArrowUpRight size={16} />
                </div>
              </Link>
            );
          })}
        </div>

        {/* BOTTOM BANNER */}
        <div className="reading-bottom">
          <div className="reading-bottom-icon">
            <Coffee size={25} />
          </div>

          <div>
            <h3>Your next favorite book is waiting.</h3>
            <p>Take a moment. Find a story. Get lost in it.</p>
          </div>

          <Link href="/books" className="reading-explore-btn">
            Explore Library
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
