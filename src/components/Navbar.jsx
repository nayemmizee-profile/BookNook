"use client";

import { authClient } from "@/lib/auth-client";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  UserRound,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const publicLinks = [
  { name: "Home", href: "/" },
  { name: "All Books", href: "/books" },
];

const privateLinks = [
  { name: "Add Book", href: "/add-book" },
  { name: "My Books", href: "/my-books" },
  { name: "My Borrows", href: "/my-borrows" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  // Better Auth Session
  const { data: session, isPending } = authClient.useSession();

  // Logged-in User
  const user = session?.user || null;

  const isLoggedIn = Boolean(user);

  const handleLogout = async () => {
    try {
      console.log("Logging out...");

      const { error } = await authClient.signOut();

      if (error) {
        console.error("Logout Error:", error);
        return;
      }

      console.log("Logout successful!");

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout Failed:", error);
    }
  };

  useEffect(() => {
    console.log("Current Session:", session);
    console.log("Logged In User:", user);
  }, [session, user]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navLinks = isLoggedIn ? [...publicLinks, ...privateLinks] : publicLinks;

  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  const isActive = (href) => pathname === href;

  const linkStyle = (href) =>
    `relative py-2 text-sm font-medium transition-all duration-300
    ${
      isActive(href)
        ? "text-[#D9B56D]"
        : "text-[#F7F1E5]/75 hover:text-[#D9B56D]"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#D9B56D]/20 bg-[#102A43]/95 text-[#F7F1E5] shadow-lg shadow-[#102A43]/10 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8 lg:px-10">
        {/* Logo */}
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <Image
            src={"/BookNook Gothic Library .png"}
            alt="BookNook-Logo"
            width={100}
            height={100}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#D9B56D]/50 bg-[#ffffff] transition duration-300 group-hover:rotate-[-8deg] group-hover:bg-[#D9B56D]/20"
          ></Image>
          <div>
            <h1 className="font-serif text-2xl font-bold tracking-wide text-[#F7F1E5]">
              Book<span className="text-[#D9B56D]">Nook</span>
            </h1>
            <p className="text-[9px] uppercase tracking-[3px] text-[#D9B56D]/80">
              Read • Learn • Grow
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkStyle(link.href)}
            >
              {link.name}

              <span
                className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-[#D9B56D] transition-all duration-300 ${
                  isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </div>

        {/* Desktop Auth / Profile */}
        <div className="hidden items-center gap-3 lg:flex">
          {isPending ? (
            <p className="text-sm text-[#D9B56D]">Loading...</p>
          ) : !isLoggedIn ? (
            <>
              <Link
                href="/login"
                className="hover:text-blue-800 hover:py-1.5 px-4 hover:bg-blue-100 rounded-2xl "
              >
                Login
              </Link>

              <Link
                href="/register"
                className="py-2.5 px-4  b-2 bg-blue-600 hover:bg-emerald-700 rounded-2xl "
              >
                Join the Library
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-full border border-[#D9B56D]/30 bg-white/5 py-1.5 pl-2 pr-3 transition hover:bg-white/10"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D9B56D] font-bold text-[#102A43]">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <span className="max-w-24 truncate text-sm">
                  {user.name || "My Account"}
                </span>

                <ChevronDown
                  size={16}
                  className={`transition ${profileOpen ? "rotate-180" : ""}`}
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-14 w-52 overflow-hidden rounded-xl border border-[#D9B56D]/20 bg-[#142F49] p-2 shadow-2xl">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition hover:bg-white/10 hover:text-[#D9B56D]"
                  >
                    <UserRound size={17} />
                    My Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-red-300 transition hover:bg-red-500/10"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#D9B56D]/30 text-[#D9B56D] transition hover:bg-[#D9B56D]/10 lg:hidden"
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`overflow-hidden border-t border-[#D9B56D]/10 bg-[#102A43] transition-all duration-300 lg:hidden ${
          menuOpen
            ? "max-h-[600px] opacity-100"
            : "max-h-0 border-transparent opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-4 py-3 text-sm transition ${
                isActive(link.href)
                  ? "bg-[#D9B56D]/10 font-semibold text-[#D9B56D]"
                  : "text-[#F7F1E5]/80 hover:bg-white/5 hover:text-[#D9B56D]"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="my-2 border-t border-[#D9B56D]/20" />

          {!isLoggedIn ? (
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/login"
                className="rounded-lg border border-[#D9B56D]/40 py-3 text-center text-sm text-[#F7F1E5] transition hover:bg-white/5"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-[#D9B56D] py-3 text-center text-sm font-semibold text-[#102A43] transition hover:bg-[#E7C783]"
              >
                Register
              </Link>
            </div>
          ) : (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm hover:bg-white/5"
              >
                <LayoutDashboard size={17} />
                My Profile
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-lg px-4 py-3 text-left text-sm text-red-300 hover:bg-red-500/10"
              >
                <LogOut size={17} />
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
