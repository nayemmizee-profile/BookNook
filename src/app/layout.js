import Navbar from "@/components/Navbar";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { ReadingListProvider } from "../../Context/ReadingListContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BookNook",
  description: "A Small Online Library",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ReadingListProvider>
          <Suspense fallback={<div className="h-20 w-full" />}>
            <Navbar />
          </Suspense>

          {children}
        </ReadingListProvider>
      </body>
    </html>
  );
}
