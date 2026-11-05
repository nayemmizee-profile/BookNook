"use client";

import {
  ArrowUpRight,
  BookOpen,
  Heart,
  LibraryBig,
  Mail,
  MapPin,
  Send,
} from "lucide-react";

import Link from "next/link";
import { Suspense } from "react";
import "./Footer.css";
import "./FooterYear.jsx";
import FooterYear from "./FooterYear.jsx";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "All Books", href: "/books" },
  { name: "My Books", href: "/my-books" },
  { name: "My Borrows", href: "/my-borrows" },
];

const categories = [
  { name: "Fiction", href: "/books?category=Fiction" },
  { name: "Science", href: "/books?category=Science" },
  { name: "Philosophy", href: "/books?category=Philosophy" },
  { name: "Romance", href: "/books?category=Romance" },
];

export default function Footer() {
  return (
    <footer className="booknook-footer">
      {/* TOP DECORATIVE LINE */}
      <div className="footer-top-line"></div>

      <div className="footer-container">
        {/* MAIN FOOTER */}
        <div className="footer-main">
          {/* BRAND COLUMN */}
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              <div className="footer-logo-icon">
                <BookOpen size={25} />
              </div>

              <span>
                Book<span>Nook</span>
              </span>
            </Link>

            <p className="footer-description">
              A little corner for every reader. Discover new stories, build your
              personal collection and make every page count.
            </p>

            <div className="footer-location">
              <MapPin size={16} />
              <span>Made for book lovers, everywhere.</span>
            </div>

            {/* SOCIAL LINKS */}
            <div className="footer-socials">
              <a href="mailto:hello@booknook.com" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="footer-column">
            <h3>Quick Links</h3>

            <ul>
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <ArrowUpRight size={14} />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CATEGORIES */}
          <div className="footer-column">
            <h3>Explore Genres</h3>

            <ul>
              {categories.map((category) => (
                <li key={category.name}>
                  <Link href={category.href}>
                    <ArrowUpRight size={14} />
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div className="footer-newsletter">
            <div className="newsletter-icon">
              <Send size={21} />
            </div>

            <h3>A Note for Book Lovers.</h3>

            <p>
              Stay inspired. Discover new reads and never miss a great story.
            </p>

            <a
              href="mailto:hello@booknook.com?subject=BookNook%20Updates"
              className="newsletter-btn"
            >
              Get in Touch
              <ArrowUpRight size={17} />
            </a>

            <span className="newsletter-note">
              <Heart size={12} />
              Made with love for readers
            </span>
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className="footer-bottom">
          <p>
            ©{" "}
            <Suspense fallback="2026">
              <FooterYear />
            </Suspense>{" "}
            <strong>BookNook.</strong>
            All rights reserved.
          </p>

          <div className="footer-bottom-center">
            <LibraryBig size={15} />
            <span>Every book has a story.</span>
          </div>

          <div className="footer-legal">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <span></span>
            <Link href="/terms">Terms of Use</Link>
          </div>
        </div>
      </div>

      {/* BACKGROUND DECORATION */}
      <div className="footer-glow footer-glow-one"></div>
      <div className="footer-glow footer-glow-two"></div>
    </footer>
  );
}
