import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 1. Verify Session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const userId = session.user.id;

    // 2. Fetch from Express Backend
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/MyBorrow`,
      {
        method: "GET",
        headers: {
          "x-internal-secret": process.env.INTERNAL_API_SECRET,
          "x-user-id": userId,
        },
        cache: "no-store",
      },
    );

    // 3. Backend Response
    const result = await response.json();

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch (error) {
    console.error("MyBorrow Route Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch MyBorrow",
      },
      { status: 500 },
    );
  }
}
