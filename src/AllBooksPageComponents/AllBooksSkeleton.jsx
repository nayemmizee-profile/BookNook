import { Suspense } from "react";

import AllBooksPage from "@/app/books/page";
import "./AllBooks.css";

function LatestBooksSkeleton() {
  return (
    <section className="latest-books-section">
      <div className="latest-books-container">
        <div className="latest-books-heading">
          <span>BOOKNOOK COLLECTION</span>
          <h2>
            Latest <strong>Books</strong>
          </h2>
          <p>Loading our latest collection...</p>
        </div>

        <div className="latest-books-grid">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div className="latest-book-skeleton" key={item}>
              <div className="skeleton-cover" />
              <div className="skeleton-details">
                <div />
                <div />
                <div />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function LatestBooks() {
  return (
    <Suspense fallback={<LatestBooksSkeleton />}>
      <AllBooksPage />
    </Suspense>
  );
}
