"use client";

import {
  AlertCircle,
  AlertTriangle,
  BookMarked,
  BookOpen,
  CheckCircle2,
  Edit3,
  Image as ImageIcon,
  Library,
  Loader2,
  Plus,
  RefreshCw,
  Save,
  Search,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const initialForm = {
  title: "",
  author: "",
  category: "",
  description: "",
  image: "",
  totalCopies: 1,
};

export default function MyBooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  // Edit modal
  const [editModal, setEditModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [updating, setUpdating] = useState(false);

  // Delete modal
  const [deleteModal, setDeleteModal] = useState(false);
  const [deletingBook, setDeletingBook] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Toast
  const [toast, setToast] = useState(null);

  // Toast notification
  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  // Fetch My Books
  const fetchMyBooks = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/my-books");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to load books");
      }

      setBooks(data.books || []);
    } catch (error) {
      console.error("MyBooks Error:", error);
      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBooks();
  }, []);

  // Open Edit Modal
  const handleEdit = (book) => {
    setSelectedBook(book);

    setFormData({
      title: book.title || "",
      author: book.author || "",
      category: book.category || "",
      description: book.description || "",
      image: book.image || "",
      totalCopies: book.totalCopies ?? 1,
    });

    setEditModal(true);
  };

  // Form Input Handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "totalCopies" ? value : value,
    }));
  };

  // Update Book
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selectedBook) return;

    try {
      setUpdating(true);

      const res = await fetch(`/api/my-books/${selectedBook._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          totalCopies: Number(formData.totalCopies),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update book");
      }

      // Update UI without reloading
      setBooks((prev) =>
        prev.map((book) =>
          book._id === selectedBook._id
            ? {
                ...book,
                ...formData,
                totalCopies: Number(formData.totalCopies),
              }
            : book,
        ),
      );

      setEditModal(false);
      setSelectedBook(null);
      setFormData(initialForm);

      showToast("Book updated successfully!");
    } catch (error) {
      console.error("Update Error:", error);
      showToast(error.message || "Failed to update book.", "error");
    } finally {
      setUpdating(false);
    }
  };

  // Open Delete Confirmation
  const handleDeleteClick = (book) => {
    setDeletingBook(book);
    setDeleteModal(true);
  };

  // Delete Book
  const handleDelete = async () => {
    if (!deletingBook) return;

    try {
      setDeleting(true);

      const res = await fetch(`/api/my-books/${deletingBook._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete book");
      }

      // Remove from UI
      setBooks((prev) => prev.filter((book) => book._id !== deletingBook._id));

      setDeleteModal(false);
      setDeletingBook(null);

      showToast("Book deleted successfully!");
    } catch (error) {
      console.error("Delete Error:", error);
      showToast(error.message || "Failed to delete book.", "error");
    } finally {
      setDeleting(false);
    }
  };

  // Filter Books
  const filteredBooks = books.filter((book) => {
    const search = searchTerm.toLowerCase();

    return (
      book.title?.toLowerCase().includes(search) ||
      book.author?.toLowerCase().includes(search) ||
      book.category?.toLowerCase().includes(search)
    );
  });

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F1E5] p-6 md:p-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 h-10 w-64 animate-pulse rounded-lg bg-[#E6DDCC]" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-80 animate-pulse rounded-2xl bg-[#E6DDCC]"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F1E5] px-4 py-8 text-[#102A43] sm:px-6 md:px-10 md:py-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <section className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-[#B28B49]">
              <Library size={17} />
              Personal Library
            </div>

            <h1 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
              My <span className="text-[#B28B49]">Books</span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-7 text-[#64748B] sm:text-base">
              Manage your collection, update book details, and keep your
              personal library organized.
            </p>
          </div>

          <Link
            href="/add-book"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#102A43] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#102A43]/15 transition hover:-translate-y-1 hover:bg-[#1C405F]"
          >
            <Plus size={19} />
            Add New Book
          </Link>
        </section>

        {/* Statistics */}
        <section className="mb-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center gap-4 rounded-2xl border border-[#E8DFCF] bg-white p-5 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#F5EBD7] text-[#B28B49]">
              <BookOpen size={27} />
            </div>

            <div>
              <p className="text-sm font-medium text-[#64748B]">Total Books</p>
              <h2 className="mt-1 text-3xl font-black">{books.length}</h2>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-[#E8DFCF] bg-white p-5 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#E8F3EE] text-[#29845D]">
              <BookMarked size={27} />
            </div>

            <div>
              <p className="text-sm font-medium text-[#64748B]">Total Copies</p>
              <h2 className="mt-1 text-3xl font-black">
                {books.reduce(
                  (total, book) => total + (Number(book.totalCopies) || 0),
                  0,
                )}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-[#E8DFCF] bg-white p-5 shadow-sm sm:col-span-2 lg:col-span-1">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#EAF0F8] text-[#4776AC]">
              <UserRound size={27} />
            </div>

            <div>
              <p className="text-sm font-medium text-[#64748B]">
                Collection Status
              </p>
              <h2 className="mt-1 text-lg font-black">Your Personal Library</h2>
            </div>
          </div>
        </section>

        {/* Books Section Header */}
        <section className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-black sm:text-2xl">Your Collection</h2>
            <p className="mt-1 text-sm text-[#64748B]">
              {filteredBooks.length} books found in your library
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full sm:max-w-xs">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
            />

            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-[#E8DFCF] bg-white py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-[#94A3B8] focus:border-[#B28B49] focus:ring-2 focus:ring-[#B28B49]/10"
            />
          </div>
        </section>

        {/* Error State */}
        {error && (
          <div className="mb-6 flex flex-col items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 p-5 sm:flex-row sm:items-center">
            <p className="flex items-center gap-2 text-sm text-red-600">
              <AlertCircle size={19} />
              {error}
            </p>

            <button
              onClick={fetchMyBooks}
              className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
            >
              <RefreshCw size={15} />
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!error && filteredBooks.length === 0 && (
          <div className="rounded-3xl border border-dashed border-[#D7C9AE] bg-white/70 px-5 py-16 text-center">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#F5EBD7] text-[#B28B49]">
              <BookOpen size={38} />
            </div>

            <h3 className="text-2xl font-black">
              {searchTerm ? "No Books Found" : "Your Library is Empty"}
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#64748B]">
              {searchTerm
                ? "Try searching with another book title, author or category."
                : "You haven't added any books yet. Start building your personal collection today."}
            </p>

            {!searchTerm && (
              <Link
                href="/add-book"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#102A43] px-6 py-3 font-bold text-white transition hover:bg-[#1C405F]"
              >
                <Plus size={18} />
                Add Your First Book
              </Link>
            )}
          </div>
        )}

        {/* Book Cards */}
        {!error && filteredBooks.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.map((book) => (
              <article
                key={book._id}
                className="group overflow-hidden rounded-2xl border border-[#E8DFCF] bg-white shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-[#EFE8DA]">
                  {book.image ? (
                    <img
                      src={book.image}
                      alt={book.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[#B28B49]">
                      <ImageIcon size={48} />
                    </div>
                  )}

                  <span className="absolute left-4 top-4 rounded-full bg-[#102A43]/90 px-4 py-1.5 text-xs font-bold text-white backdrop-blur">
                    {book.category || "Uncategorized"}
                  </span>

                  <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#102A43] shadow-sm">
                    {book.totalCopies ?? 1} Copies
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="line-clamp-1 text-xl font-black text-[#102A43]">
                    {book.title}
                  </h3>

                  <p className="mt-2 flex items-center gap-2 text-sm text-[#64748B]">
                    <UserRound size={15} className="text-[#B28B49]" />
                    {book.author}
                  </p>

                  <p className="mt-4 line-clamp-2 min-h-10 text-sm leading-6 text-[#64748B]">
                    {book.description || "No description available."}
                  </p>

                  <div className="my-5 border-t border-[#F0E9DD]" />

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(book)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#D9B56D] bg-[#FBF7EE] py-3 text-sm font-bold text-[#92702F] transition hover:bg-[#F5EBD7]"
                    >
                      <Edit3 size={16} />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteClick(book)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* =====================================
          EDIT BOOK MODAL
      ====================================== */}
      {editModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#102A43]/70 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !updating) {
              setEditModal(false);
            }
          }}
        >
          <div className="my-auto w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between bg-[#102A43] px-6 py-5 text-white">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D9B56D]">
                  Book Management
                </p>
                <h2 className="mt-1 text-xl font-black">Update Book Details</h2>
              </div>

              <button
                type="button"
                disabled={updating}
                onClick={() => setEditModal(false)}
                className="rounded-full bg-white/10 p-2 transition hover:bg-white/20"
              >
                <X size={21} />
              </button>
            </div>

            {/* Edit Form */}
            <form onSubmit={handleUpdate} className="space-y-5 p-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold">
                    Book Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter book title"
                    className="w-full rounded-xl border border-[#E8DFCF] px-4 py-3 text-sm outline-none focus:border-[#B28B49]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    Author Name *
                  </label>
                  <input
                    type="text"
                    name="author"
                    required
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="Enter author name"
                    className="w-full rounded-xl border border-[#E8DFCF] px-4 py-3 text-sm outline-none focus:border-[#B28B49]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    Category *
                  </label>
                  <input
                    type="text"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g. Fiction"
                    className="w-full rounded-xl border border-[#E8DFCF] px-4 py-3 text-sm outline-none focus:border-[#B28B49]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold">
                    Total Copies *
                  </label>
                  <input
                    type="number"
                    name="totalCopies"
                    required
                    min="1"
                    value={formData.totalCopies}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#E8DFCF] px-4 py-3 text-sm outline-none focus:border-[#B28B49]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-bold">
                    Book Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/book.jpg"
                    className="w-full rounded-xl border border-[#E8DFCF] px-4 py-3 text-sm outline-none focus:border-[#B28B49]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-bold">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Write something about this book..."
                    className="w-full resize-none rounded-xl border border-[#E8DFCF] px-4 py-3 text-sm outline-none focus:border-[#B28B49]"
                  />
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex flex-col-reverse gap-3 border-t border-[#F0E9DD] pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  disabled={updating}
                  onClick={() => setEditModal(false)}
                  className="rounded-xl border border-[#E8DFCF] px-6 py-3 text-sm font-bold text-[#64748B] hover:bg-[#F7F1E5]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={updating}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#102A43] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#1C405F] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {updating ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={17} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================
          DELETE CONFIRMATION MODAL
      ====================================== */}
      {deleteModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#102A43]/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-7 text-center shadow-2xl">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
              <AlertTriangle size={32} />
            </div>

            <h2 className="text-2xl font-black text-[#102A43]">
              Delete This Book?
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#64748B]">
              Are you sure you want to delete{" "}
              <span className="font-bold text-[#102A43]">
                "{deletingBook?.title}"
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">
              <button
                disabled={deleting}
                onClick={() => {
                  setDeleteModal(false);
                  setDeletingBook(null);
                }}
                className="flex-1 rounded-xl border border-[#E8DFCF] px-5 py-3 text-sm font-bold text-[#64748B] transition hover:bg-[#F7F1E5]"
              >
                Cancel
              </button>

              <button
                disabled={deleting}
                onClick={handleDelete}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-600 disabled:opacity-60"
              >
                {deleting ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={17} />
                    Yes, Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================
          CUSTOM TOAST
      ====================================== */}
      {toast && (
        <div className="fixed right-4 top-5 z-[100] w-[calc(100%-2rem)] max-w-sm animate-in slide-in-from-right-5 fade-in duration-300">
          <div
            className={`flex items-center gap-3 rounded-2xl border bg-white p-4 shadow-2xl ${
              toast.type === "success" ? "border-green-200" : "border-red-200"
            }`}
          >
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                toast.type === "success"
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {toast.type === "success" ? (
                <CheckCircle2 size={23} />
              ) : (
                <AlertCircle size={23} />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-black text-[#102A43]">
                {toast.type === "success" ? "Success!" : "Something went wrong"}
              </h4>
              <p className="mt-1 break-words text-xs text-[#64748B]">
                {toast.message}
              </p>
            </div>

            <button
              onClick={() => setToast(null)}
              className="text-[#94A3B8] hover:text-[#102A43]"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
