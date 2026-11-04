import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // 1. Verify Better Auth session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login first.",
        },
        { status: 401 },
      );
    }

    // 2. Get book ID
    const { bookId } = await request.json();

    if (!bookId) {
      return NextResponse.json(
        {
          success: false,
          message: "Book ID is required.",
        },
        { status: 400 },
      );
    }

    // 3. Send request to Express backend
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Borrow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": session.user.id,
        "x-internal-secret": process.env.INTERNAL_API_SECRET,
      },
      body: JSON.stringify({ bookId }),
      cache: "no-store",
    });

    // 4. Read backend response
    const responseText = await response.text();

    let data;

    try {
      data = JSON.parse(responseText);
    } catch {
      console.error("Express returned non-JSON:", responseText);

      return NextResponse.json(
        {
          success: false,
          message: "Express backend returned an invalid response.",
        },
        { status: 502 },
      );
    }

    // 5. Return response
    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Borrow API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal server error.",
      },
      { status: 500 },
    );
  }
}
