import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProfileClient from "./ProfileUI";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Login না থাকলে login page-এ পাঠাবে
  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user;

  return (
    <ProfileClient
      user={{
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt?.toISOString?.() ?? null,
        updatedAt: user.updatedAt?.toISOString?.() ?? null,
      }}
    />
  );
}
