import AllBooksPageUI from "@/AllBooksPageComponents/AllBooksPage_UI";

async function AllBooksPage() {
  let books = [];

  try {
    const response = await fetch(`${process.env.API_URL}/AllBooks`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    // API যদি সরাসরি array দেয়
    // অথবা { books: [...] } আকারে দেয়
    books = Array.isArray(data) ? data : data.books || data.data || [];
  } catch (error) {
    console.error("Latest books fetching error:", error);
  }

  return <AllBooksPageUI books={books} />;
}

export default AllBooksPage;
