"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import CustomToast from "@/components/toast";

import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ImagePlus,
  Link as LinkIcon,
  LoaderCircle,
  Mail,
  UserRound,
} from "lucide-react";
import Image from "next/image";

export default function AddBookForm({ user }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    totalCopies: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form submit handler
  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate image URL
    try {
      const imageUrl = new URL(formData.image);

      if (!["http:", "https:"].includes(imageUrl.protocol)) {
        throw new Error("Invalid image URL");
      }
    } catch {
      setToast({
        message: "Please enter a valid image URL.",
        type: "error",
      });
      return;
    }

    try {
      setLoading(true);

      // Prepare book data
      const bookData = {
        ...formData,
        totalCopies: Number(formData.totalCopies),

        userName: user?.name,
        userEmail: user?.email,
        userId: user?.id,
      };

      // Send POST request to Express Backend
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/AddBook`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookData),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add book.");
      }

      // Success toast
      setToast({
        message: "Your book has been successfully added!",
        type: "success",
      });

      // Reset form
      setFormData({
        title: "",
        author: "",
        category: "",
        totalCopies: "",
        description: "",
        image: "",
      });

      // Navigate after success
      setTimeout(() => {
        router.push(`/books/${result._Id}`);
        router.refresh();
      }, 1500);
    } catch (error) {
      setToast({
        message: error.message || "Something went wrong.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="overflow-hidden rounded-3xl border border-[#D9D0BE] bg-white shadow-xl">
      {/* Header */}
      <div className="bg-[#102A43] px-6 py-10 text-white sm:px-10">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-7 flex items-center gap-2 text-sm text-slate-300 transition hover:text-white"
        >
          <ArrowLeft size={17} />
          Back
        </button>

        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-[#D9B56D] p-3 text-[#102A43]">
            <BookOpen size={28} />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[3px] text-[#D9B56D]">
              BookNook Library
            </p>

            <h1 className="mt-1 text-3xl font-bold sm:text-4xl">
              Add New Book
            </h1>
          </div>
        </div>

        <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300">
          Share a new book with your library community. Fill in the details
          below to add your favorite book.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8 p-6 sm:p-10">
        {/* Contributor Information */}
        <div>
          <h2 className="mb-4 text-lg font-bold text-[#102A43]">
            Contributor Information
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl border border-[#E7E0D3] bg-[#FAF8F3] p-4">
              <UserRound className="text-[#B08A42]" />

              <div className="min-w-0">
                <p className="text-xs text-gray-500">Your Name</p>
                <p className="truncate font-semibold text-[#102A43]">
                  {user.name || "Unnamed User"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-[#E7E0D3] bg-[#FAF8F3] p-4">
              <Mail className="text-[#B08A42]" />

              <div className="min-w-0">
                <p className="text-xs text-gray-500">Your Email</p>
                <p className="truncate font-semibold text-[#102A43]">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-[#EAE4D8]" />

        {/* Book Information */}
        <div>
          <h2 className="mb-5 text-lg font-bold text-[#102A43]">
            Book Information
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Book Title */}
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-[#102A43]">
                Book Title *
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter book title"
                required
                maxLength={150}
                className="w-full rounded-xl border border-[#DDD5C7] px-4 py-3 outline-none transition focus:border-[#B08A42] focus:ring-2 focus:ring-[#D9B56D]/20"
              />
            </div>

            {/* Author */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#102A43]">
                Author Name *
              </label>

              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter author name"
                required
                maxLength={100}
                className="w-full rounded-xl border border-[#DDD5C7] px-4 py-3 outline-none transition focus:border-[#B08A42] focus:ring-2 focus:ring-[#D9B56D]/20"
              />
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#102A43]">
                Category *
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-[#DDD5C7] bg-white px-4 py-3 outline-none transition focus:border-[#B08A42] focus:ring-2 focus:ring-[#D9B56D]/20"
              >
                <option value="">Select category</option>
                <option value="Fiction">Fiction</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="Kids">Kids</option>
                <option value="Others">Others</option>
              </select>
            </div>

            {/* Number of Copies */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#102A43]">
                Number of Copies *
              </label>

              <input
                type="number"
                name="totalCopies"
                value={formData.totalCopies}
                onChange={handleChange}
                placeholder="Enter available copies"
                min="1"
                step="1"
                required
                className="w-full rounded-xl border border-[#DDD5C7] px-4 py-3 outline-none transition focus:border-[#B08A42] focus:ring-2 focus:ring-[#D9B56D]/20"
              />

              <p className="mt-2 text-xs text-gray-500">
                Enter how many copies of this book are available.
              </p>
            </div>

            {/* Image URL */}
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-[#102A43]">
                Book Cover Image URL *
              </label>

              <div className="relative">
                <LinkIcon
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B08A42]"
                />

                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/book-cover.jpg"
                  required
                  className="w-full rounded-xl border border-[#DDD5C7] py-3 pl-12 pr-4 outline-none transition focus:border-[#B08A42] focus:ring-2 focus:ring-[#D9B56D]/20"
                />
              </div>

              <p className="mt-2 text-xs text-gray-500">
                Paste a direct image URL from any image hosting website.
              </p>

              {/* Image Preview */}
              {formData.image && (
                <div className="mt-5 overflow-hidden rounded-2xl border border-[#E7E0D3] bg-[#FAF8F3] p-4">
                  <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#102A43]">
                    <ImagePlus size={18} />
                    Image Preview
                  </p>

                  <Image
                    src={formData.image}
                    alt="Book cover preview"
                    width={100}
                    height={100}
                    className="mx-auto max-h-64 rounded-xl object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                    onLoad={(e) => {
                      e.currentTarget.style.display = "block";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-[#102A43]">
                Short Description *
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write a short description about this book..."
                rows={5}
                required
                maxLength={1000}
                className="w-full resize-none rounded-xl border border-[#DDD5C7] px-4 py-3 outline-none transition focus:border-[#B08A42] focus:ring-2 focus:ring-[#D9B56D]/20"
              />

              <p className="mt-1 text-right text-xs text-gray-400">
                {formData.description.length}/1000 characters
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="border-t border-[#EAE4D8] pt-6">
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#102A43] px-6 py-4 font-bold text-white shadow-lg transition hover:bg-[#1B4568] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <LoaderCircle className="animate-spin" size={20} />
                Adding Your Book...
              </>
            ) : (
              <>
                <CheckCircle2 size={20} />
                Add Book to Library
              </>
            )}
          </button>

          <p className="mt-4 text-center text-xs text-gray-500">
            Your book will be added to the BookNook Library collection.
          </p>
        </div>
      </form>

      {/* Custom Toast */}
      {toast && (
        <CustomToast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  );
}
