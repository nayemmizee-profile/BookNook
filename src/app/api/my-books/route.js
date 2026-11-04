import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Verify session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Get user ID
    const userId = session.user.id;

    // Fetch MyBooks from Express
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/MyBooks`, {
      method: "GET",
      headers: {
        "x-internal-secret": process.env.INTERNAL_API_SECRET,
        "x-user-id": userId,
      },
      cache: "no-store",
    });

    const result = await response.json();

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch (error) {
    console.error("MyBooks Route Error:", error);

    return NextResponse.json(
      { message: "Failed to fetch MyBooks" },
      { status: 500 },
    );
  }
}
