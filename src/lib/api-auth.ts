import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

type AdminAuthResult =
  | { authorized: true; session: Session }
  | { authorized: false; response: NextResponse };

export async function requireAdmin(): Promise<AdminAuthResult> {
  const session = await getServerSession(authOptions);

  if (!session?.user || !["admin", "editor"].includes(session.user.role)) {
    return {
      authorized: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    };
  }

  return {
    authorized: true,
    session
  };
}
