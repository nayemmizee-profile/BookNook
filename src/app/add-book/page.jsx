import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import AddBookForm from "./AddBookForm";

// Authentication এবং Session Verification
async function AddBookContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // User login না থাকলে login page-এ পাঠাবে
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-[#F7F1E5] px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <AddBookForm user={session.user} />
      </div>
    </main>
  );
}

// Loading UI
function AddBookLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F1E5]">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
        <p className="mt-4 text-gray-600">Loading Add Book Page...</p>
      </div>
    </div>
  );
}

// Main Page
export default function AddBookPage() {
  return (
    <Suspense fallback={<AddBookLoading />}>
      <AddBookContent />
    </Suspense>
  );
}
