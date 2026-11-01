"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ReadingListContext = createContext(null);

const STORAGE_KEY = "bookshelf-reading-list";

export function ReadingListProvider({ children }) {
  const [readingList, setReadingList] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // Load saved books after mounting
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);
        setReadingList(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.error("Reading list loading error:", error);
    } finally {
      setHydrated(true);
    }
  }, []);

  // Save only after initial loading
  useEffect(() => {
    if (!hydrated) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(readingList));
    } catch (error) {
      console.error("Reading list saving error:", error);
    }
  }, [readingList, hydrated]);

  const getBookId = (book) => String(book?._id || book?.id || "");

  // Add book
  const addBook = (book) => {
    if (!book?._id && !book?.id) return;

    setReadingList((previous) => {
      const exists = previous.some(
        (item) => getBookId(item) === getBookId(book),
      );

      if (exists) return previous;

      return [...previous, book];
    });
  };

  // Remove book
  const removeBook = (bookOrId) => {
    const id =
      typeof bookOrId === "object" ? getBookId(bookOrId) : String(bookOrId);

    setReadingList((previous) =>
      previous.filter((book) => getBookId(book) !== id),
    );
  };

  // Clear shelf
  const clearReadingList = () => {
    setReadingList([]);
  };

  // Check book
  const isInReadingList = (bookId) =>
    readingList.some((book) => getBookId(book) === String(bookId));

  const value = {
    readingList,
    addBook,
    removeBook,
    clearReadingList,
    isInReadingList,
    totalBooks: readingList.length,
  };

  return (
    <ReadingListContext.Provider value={value}>
      {children}
    </ReadingListContext.Provider>
  );
}

export function useReadingList() {
  const context = useContext(ReadingListContext);

  if (!context) {
    throw new Error("useReadingList must be used inside ReadingListProvider");
  }

  return context;
}
