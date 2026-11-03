import { connection } from "next/server";
import { Suspense } from "react";

import AllBooksPageUI from "@/AllBooksPageComponents/AllBooksPage_UI";
import "./AllBooks.css";

// Loading Skeleton
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

// Fetch Books
async function LatestBooksData() {
  await connection();

  let books = [];

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      throw new Error("API URL is missing in environment variables");
    }

    const response = await fetch(`${apiUrl.replace(/\/$/, "")}/AllBooks`, {
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    books = Array.isArray(data) ? data : data?.books || data?.data || [];
  } catch (error) {
    console.error("Latest books fetching error:", error);
  }

  return <AllBooksPageUI books={books} />;
}

// Main Component
export default function LatestBooks() {
  return (
    <Suspense fallback={<LatestBooksSkeleton />}>
      <LatestBooksData />
    </Suspense>
  );
}
