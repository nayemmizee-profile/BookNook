"use client";

import { authClient } from "@/lib/auth-client";
import {
  BookOpen,
  Eye,
  EyeOff,
  Globe,
  Image as ImageIcon,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  // Password validation
  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }

    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }

    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }

    return "";
  };

  // Registration
  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const passwordError = validatePassword(formData.password);

    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    setLoading(true);

    // Check form data in console
    console.log("Registration Form Data:", {
      name: formData.name,
      email: formData.email,
      photoURL: formData.photoURL,
      passwordLength: formData.password.length,
    });

    try {
      const { data, error } = await authClient.signUp.email({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        image: formData.photoURL.trim() || undefined,
      });

      console.log("Better Auth Registration Response:", data);
      console.log("Better Auth Registration Error:", error);

      if (error) {
        setError(error.message || "Registration failed. Please try again.");
        return;
      }

      setSuccess("Registration successful! Redirecting to login...");

      console.log("User registered successfully:", data?.user);

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (err) {
      console.error("Registration Exception:", err);

      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google Authentication
  const handleGoogleLogin = async () => {
    setError("");
    setGoogleLoading(true);

    try {
      console.log("Starting Google Authentication...");

      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      console.log("Google Authentication Response:", result);

      if (result?.error) {
        setError(result.error.message || "Google login failed.");
        setGoogleLoading(false);
      }
    } catch (err) {
      console.error("Google Authentication Error:", err);

      setError("Google authentication failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#071510] px-4 py-12 text-white flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/10 blur-[120px] rounded-full" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex justify-center items-center gap-2 mb-8">
          <div className="bg-emerald-500 p-2 rounded-xl">
            <BookOpen size={26} className="text-black" />
          </div>

          <span className="text-2xl font-bold tracking-tight">
            Book<span className="text-emerald-400">Nook</span>
          </span>
        </Link>

        {/* Registration Card */}
        <div className="bg-[#10251B]/90 border border-emerald-900/60 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <div className="text-center mb-7">
            <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-2">
              Join Our Community
            </p>

            <h1 className="text-3xl font-bold">Create Account</h1>

            <p className="text-gray-400 text-sm mt-2">
              Create your account and discover your next favorite book.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Full Name
              </label>

              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  size={18}
                />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#071510] border border-gray-700 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-emerald-400 transition"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  size={18}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#071510] border border-gray-700 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-emerald-400 transition"
                />
              </div>
            </div>

            {/* Photo URL */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Profile Photo URL
                <span className="text-gray-500"> (Optional)</span>
              </label>

              <div className="relative">
                <ImageIcon
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  size={18}
                />

                <input
                  type="url"
                  name="photoURL"
                  placeholder="https://example.com/photo.jpg"
                  value={formData.photoURL}
                  onChange={handleChange}
                  className="w-full bg-[#071510] border border-gray-700 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-emerald-400 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Password
              </label>

              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  size={18}
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#071510] border border-gray-700 rounded-xl py-3 pl-12 pr-12 outline-none focus:border-emerald-400 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="mt-2 text-xs text-gray-400 space-y-1">
                <p>Password must contain:</p>
                <p
                  className={
                    formData.password.length >= 6 ? "text-emerald-400" : ""
                  }
                >
                  • At least 6 characters
                </p>
                <p
                  className={
                    /[A-Z]/.test(formData.password) ? "text-emerald-400" : ""
                  }
                >
                  • One uppercase letter (A-Z)
                </p>
                <p
                  className={
                    /[a-z]/.test(formData.password) ? "text-emerald-400" : ""
                  }
                >
                  • One lowercase letter (a-z)
                </p>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3.5 rounded-xl transition duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="h-px bg-gray-700 flex-1" />
            <span className="text-gray-500 text-xs">OR CONTINUE WITH</span>
            <div className="h-px bg-gray-700 flex-1" />
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading || googleLoading}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-semibold py-3 rounded-xl hover:bg-gray-200 transition disabled:opacity-50"
          >
            {googleLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Globe size={20} />
            )}
            Continue with Google
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-400 text-sm mt-7">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-emerald-400 font-semibold hover:text-emerald-300"
            >
              Login Now
            </Link>
          </p>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          © 2026 BookNook Library. All rights reserved.
        </p>
      </div>
    </main>
  );
}
