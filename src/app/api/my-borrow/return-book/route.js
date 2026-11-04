import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function PATCH(request) {
  try {
    // 1. Verify session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Please login first." },
        { status: 401 },
      );
    }

    // 2. Get borrow ID
    const { borrowId } = await request.json();

    if (!borrowId) {
      return NextResponse.json(
        { success: false, message: "Borrow ID is required." },
        { status: 400 },
      );
    }

    // 3. Send request to Express
    const response = await fetch(`${process.env.API_URL}/ReturnBook`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": session.user.id,
        "x-internal-secret": process.env.INTERNAL_API_SECRET,
      },
      body: JSON.stringify({ borrowId }),
      cache: "no-store",
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Return Book API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      { status: 500 },
    );
  }
}
