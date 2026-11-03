import { Suspense } from "react";
import BookList from "./Booklist";

async function NewArrivalsContent() {
  let books;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/AllBooks`,
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    books = data;
  } catch (error) {
    console.error("Book fetching error:", error);
  }

  return <BookList books={books} />;
}

function NewArrivalsSkeleton() {
  return (
    <section className="new-arrivals-section">
      <div className="arrivals-container">
        <div className="arrivals-header">
          <div>
            <span className="section-label">DISCOVER YOUR NEXT READ</span>
            <h2>
              New <span>Arrivals</span>
            </h2>
            <p>Loading latest books...</p>
          </div>
        </div>

        <div className="arrivals-grid">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div className="arrival-card" key={item}>
              <div className="book-image-wrapper skeleton-loader" />
              <div className="book-content">
                <div className="skeleton-loader skeleton-text" />
                <div className="skeleton-loader skeleton-text" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function NewArrivals() {
  return (
    <Suspense fallback={<NewArrivalsSkeleton />}>
      <NewArrivalsContent />
    </Suspense>
  );
}
