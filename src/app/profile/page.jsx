import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import ProfileClient from "./ProfileUI";

async function ProfileContent() {
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

export default function ProfilePage() {
  return (
    <Suspense fallback={<div>Loading profile...</div>}>
      <ProfileContent />
    </Suspense>
  );
}
