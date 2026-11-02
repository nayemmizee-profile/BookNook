import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: ["/AllBooks/:id*"],
};
