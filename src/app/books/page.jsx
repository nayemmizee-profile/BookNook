import { connection } from "next/server";
import { Suspense } from "react";

import AllBooksPageUI from "@/AllBooksPageComponents/AllBooksPage_UI";

async function AllBooksData() {
  await connection();

  let books = [];

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      throw new Error("API URL is missing");
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
    console.error("All Books fetching error:", error);
  }

  return <AllBooksPageUI books={books} />;
}

function BooksLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />

        <p className="mt-4 text-gray-500">Loading books...</p>
      </div>
    </div>
  );
}

export default function AllBooksPage() {
  return (
    <Suspense fallback={<BooksLoading />}>
      <AllBooksData />
    </Suspense>
  );
}
