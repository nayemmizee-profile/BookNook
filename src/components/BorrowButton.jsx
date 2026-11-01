"use client";

import { ArrowUpRight } from "lucide-react";

export default function BorrowButton({ bookId }) {
  return (
    <button type="button" className="borrow-book-btn" data-book-id={bookId}>
      Borrow This Book
      <ArrowUpRight size={19} />
    </button>
  );
}
