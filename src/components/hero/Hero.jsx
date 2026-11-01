import HeroSlider from "./heroClient";

export default async function Hero() {
  let books = [];

  try {
    const response = await fetch("http://localhost:9000/AllBooks", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }

    const data = await response.json();

    books = Array.isArray(data) ? data : data.books || data.data || [];
  } catch (error) {
    console.error("Hero books fetch error:", error);
  }

  return <HeroSlider books={books} />;
}
