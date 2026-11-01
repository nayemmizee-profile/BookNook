"use client";

import { authClient } from "@/lib/auth-client";
import { BookOpen, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  // Email & Password Login
  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.email.trim() || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    console.log("Login Form Data:", {
      email: formData.email,
      passwordLength: formData.password.length,
    });

    try {
      const { data, error } = await authClient.signIn.email({
        email: formData.email.trim(),
        password: formData.password,
      });

      console.log("Login Response:", data);
      console.log("Login Error:", error);

      if (error) {
        setError(error.message || "Invalid email or password.");
        return;
      }

      console.log("Logged In User:", data?.user);

      setSuccess("Login successful! Redirecting...");

      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Login Exception:", err);

      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    setError("");
    setGoogleLoading(true);

    try {
      console.log("Starting Google Login...");

      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      console.log("Google Login Response:", result);

      if (result?.error) {
        setError(result.error.message || "Google login failed.");
        setGoogleLoading(false);
      }
    } catch (err) {
      console.error("Google Login Exception:", err);

      setError("Google authentication failed.");

      setGoogleLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#071510] px-4 py-12 flex items-center justify-center text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-emerald-500/10 blur-[120px] rounded-full" />

      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-500/10 blur-[120px] rounded-full" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex justify-center items-center gap-2 mb-8">
          <div className="bg-emerald-500 p-2 rounded-xl">
            <BookOpen size={26} className="text-black" />
          </div>

          <span className="text-2xl font-bold">
            Book<span className="text-emerald-400">Nook</span>
          </span>
        </Link>

        {/* Login Card */}
        <div className="bg-[#10251B]/90 border border-emerald-900/60 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          {/* Heading */}
          <div className="text-center mb-8">
            <p className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-2">
              Welcome Back
            </p>

            <h1 className="text-3xl font-bold">Sign In</h1>

            <p className="text-gray-400 text-sm mt-2">
              Sign in to continue your reading journey.
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

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="w-full bg-[#071510] border border-gray-700 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-emerald-400 transition"
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
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="w-full bg-[#071510] border border-gray-700 rounded-xl py-3.5 pl-12 pr-12 outline-none focus:border-emerald-400 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3.5 rounded-xl transition duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
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
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading || googleLoading}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-semibold py-3 rounded-xl hover:bg-gray-200 transition disabled:opacity-50"
          >
            {googleLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <FcGoogle size={22} />
            )}
            Continue with Google
          </button>

          {/* Register Link */}
          <p className="text-center text-gray-400 text-sm mt-7">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-emerald-400 font-semibold hover:text-emerald-300"
            >
              Create Account
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 text-xs mt-6">
          © 2026 BookNook Library. All rights reserved.
        </p>
      </div>
    </main>
  );
}
