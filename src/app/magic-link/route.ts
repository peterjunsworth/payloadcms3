import type { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { email } = await req.json();
  const normailizedEmail = (email ? email.toLowerCase() : "");
  const forgotPassword = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: normailizedEmail,
    }),
  });
  return forgotPassword;
}