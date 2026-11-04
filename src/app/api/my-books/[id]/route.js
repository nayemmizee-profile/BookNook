import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

// Reusable authentication
async function verifyUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return null;
  }

  return session.user.id;
}

// Reusable Express API request
async function forwardRequest(id, method, body = null) {
  const userId = await verifyUser();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "");

  const response = await fetch(`${baseUrl}/MyBooks/${encodeURIComponent(id)}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "x-internal-secret": process.env.INTERNAL_API_SECRET,
      "x-user-id": userId,
    },
    ...(body !== null && {
      body: JSON.stringify(body),
    }),
    cache: "no-store",
  });

  // Read response safely
  const responseText = await response.text();

  let result;

  try {
    result = responseText ? JSON.parse(responseText) : {};
  } catch {
    console.error("Express returned non-JSON:", responseText);

    return NextResponse.json(
      { message: "Express API returned an invalid response." },
      { status: 502 },
    );
  }

  return NextResponse.json(result, {
    status: response.status,
  });
}

// PUT: Update Book
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    return await forwardRequest(id, "PUT", body);
  } catch (error) {
    console.error("Update MyBook Error:", error);

    return NextResponse.json(
      { message: "Failed to update book" },
      { status: 500 },
    );
  }
}

// DELETE: Delete Book
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    return await forwardRequest(id, "DELETE");
  } catch (error) {
    console.error("Delete MyBook Error:", error);

    return NextResponse.json(
      { message: "Failed to delete book" },
      { status: 500 },
    );
  }
}
