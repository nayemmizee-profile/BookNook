"use client";

import { authClient } from "@/lib/auth-client";
import {
  BookOpen,
  CalendarDays,
  Check,
  Clock,
  Mail,
  Pencil,
  ShieldAlert,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfileClient({ user }) {
  const router = useRouter();

  const [name, setName] = useState(user.name || "");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const initial = (user.name || "U").charAt(0).toUpperCase();

  const formattedDate = (date) => {
    if (!date) return "Not available";

    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  };

  const handleCancel = () => {
    setName(user.name || "");
    setIsEditing(false);
    setError("");
    setMessage("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedName = name.trim();

    if (!updatedName) {
      setError("Name cannot be empty.");
      return;
    }

    if (updatedName.length < 2) {
      setError("Name must be at least 2 characters.");
      return;
    }

    if (updatedName === user.name) {
      setIsEditing(false);
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { data, error: updateError } = await authClient.updateUser({
        name: updatedName,
      });

      if (updateError) {
        throw new Error(updateError.message || "Failed to update name.");
      }

      setName(data?.user?.name || updatedName);
      setMessage("Your name has been updated successfully!");
      setIsEditing(false);

      // Refresh server component data
      router.refresh();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F3F7F8] px-4 py-12 md:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[3px] text-[#359FA0]">
            Account Settings
          </p>

          <h1 className="text-3xl font-bold text-[#142D32] md:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your personal information and account details.
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-3xl border border-[#DCE8E9] bg-white shadow-sm">
          {/* Cover */}
          <div className="relative h-36 bg-gradient-to-r from-[#142D32] via-[#237477] to-[#359FA0] md:h-48">
            <div className="absolute -bottom-12 left-8 flex h-28 w-28 items-center justify-center rounded-full border-[6px] border-white bg-[#E1F3F2] text-4xl font-bold text-[#237477] shadow-lg md:left-12 md:h-32 md:w-32 md:text-5xl">
              {initial}
            </div>
          </div>

          {/* User Info */}
          <div className="px-6 pb-8 pt-16 md:px-12">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
              <div>
                <h2 className="text-2xl font-bold text-[#142D32]">
                  {user.name}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  BookNook Library Member
                </p>
              </div>

              {!isEditing && (
                <button
                  onClick={() => {
                    setMessage("");
                    setError("");
                    setIsEditing(true);
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#237477] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#142D32]"
                >
                  <Pencil size={16} />
                  Edit Profile
                </button>
              )}
            </div>

            {/* Feedback */}
            {message && (
              <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                {message}
              </div>
            )}

            {error && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Edit Form */}
            {isEditing && (
              <form
                onSubmit={handleUpdate}
                className="mt-8 rounded-2xl border border-[#DCE8E9] bg-[#F8FBFB] p-5 md:p-6"
              >
                <h3 className="mb-5 font-bold text-[#142D32]">
                  Edit Your Name
                </h3>

                <label className="mb-2 block text-sm font-semibold text-gray-600">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[#142D32] outline-none transition focus:border-[#359FA0] focus:ring-2 focus:ring-[#359FA0]/20"
                />

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 rounded-xl bg-[#237477] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#142D32] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Check size={17} />
                    {loading ? "Saving..." : "Save Changes"}
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={loading}
                    className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-100"
                  >
                    <X size={17} />
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Account Details */}
            <div className="mt-10">
              <h3 className="mb-5 text-lg font-bold text-[#142D32]">
                Personal Information
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                {/* Name */}
                <InfoCard
                  icon={<UserRound />}
                  label="Full Name"
                  value={user.name}
                />

                {/* Email */}
                <InfoCard
                  icon={<Mail />}
                  label="Email Address"
                  value={user.email}
                />

                {/* Verification */}
                <InfoCard
                  icon={user.emailVerified ? <ShieldCheck /> : <ShieldAlert />}
                  label="Email Verification"
                  value={user.emailVerified ? "Verified" : "Not Verified"}
                  verified={user.emailVerified}
                />

                {/* Created */}
                <InfoCard
                  icon={<CalendarDays />}
                  label="Member Since"
                  value={formattedDate(user.createdAt)}
                />

                {/* Updated */}
                <InfoCard
                  icon={<Clock />}
                  label="Last Updated"
                  value={formattedDate(user.updatedAt)}
                />

                {/* Account Type */}
                <InfoCard
                  icon={<BookOpen />}
                  label="Account"
                  value="BookNook Member"
                />
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-8 rounded-2xl bg-[#EAF4F4] p-5">
              <div className="flex gap-3">
                <ShieldCheck className="mt-1 shrink-0 text-[#237477]" />

                <div>
                  <h4 className="font-bold text-[#142D32]">
                    Your Account Security
                  </h4>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Your email address and account information are protected.
                    Currently, only your name can be modified from this profile
                    page.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Reusable Information Card
function InfoCard({ icon, label, value, verified }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-[#E4ECEC] bg-white p-5 transition hover:border-[#359FA0] hover:shadow-sm">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF4F4] text-[#237477]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
          {label}
        </p>

        <p className="mt-1 break-all text-sm font-semibold text-[#142D32]">
          {value || "Not available"}
        </p>

        {typeof verified === "boolean" && (
          <span
            className={`mt-2 inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${
              verified
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {verified ? "Verified" : "Pending Verification"}
          </span>
        )}
      </div>
    </div>
  );
}
