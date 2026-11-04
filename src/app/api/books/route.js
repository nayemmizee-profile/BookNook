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
        { message: "Please login first." },
        { status: 401 },
      );
    }

    // 2. Get frontend data
    const body = await request.json();

    const { title, author, category, description, image } = body;

    // 3. Validate required fields
    if (!title || !author || !category || !description || !image) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 },
      );
    }

    // 4. Validate image URL
    let imageUrl;

    try {
      imageUrl = new URL(image);

      if (!["http:", "https:"].includes(imageUrl.protocol)) {
        throw new Error("Invalid image URL");
      }
    } catch {
      return NextResponse.json(
        { message: "Please provide a valid image URL." },
        { status: 400 },
      );
    }

    // 5. Send data to Express backend
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/AddBook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-internal-secret": process.env.INTERNAL_API_SECRET,
      },
      body: JSON.stringify({
        title,
        author,
        category,
        description,
        image: imageUrl.href,

        // Authenticated user information
        userName: session.user.name,
        userEmail: session.user.email,
        userId: session.user.id,
      }),
      cache: "no-store",
    });

    // 6. Get backend response
    const result = await response.json();

    // 7. Return response to frontend
    return NextResponse.json(result, {
      status: response.status,
    });
  } catch (error) {
    console.error("Add Book API Error:", error);

    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 },
    );
  }
}
