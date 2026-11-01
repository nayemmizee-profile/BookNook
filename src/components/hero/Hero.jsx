import { Suspense } from "react";
import HeroSlider from "./heroClient";

// API থেকে ডেটা আনার Component
async function HeroData() {
  let books;

  try {
    const response = await fetch(`${process.env.API_URL}/AllBooks`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }

    const data = await response.json();

    books = data;
  } catch (error) {
    console.error("Books fetching error:", error);
  }

  return <HeroSlider books={books} />;
}

// Loading UI
function HeroLoading() {
  return (
    <section className="flex min-h-[500px] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-teal-500" />
        <p className="mt-4 text-gray-500">Loading featured books...</p>
      </div>
    </section>
  );
}

// Main Hero Component
export default function Hero() {
  return (
    <Suspense fallback={<HeroLoading />}>
      <HeroData />
    </Suspense>
  );
}
