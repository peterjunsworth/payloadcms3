import type { NextRequest, NextResponse } from "next/server";
import qs from 'qs';
import { v4 } from "uuid";

export async function POST(req: NextRequest, res: NextResponse) {
  const { email } = await req.json();
  const normailizedEmail = (email ? email.toLowerCase() : "");

  console.log(normailizedEmail);

  const stringifiedQuery = qs.stringify(
    {
      where: {
        email: {
          equals: normailizedEmail,
        }
      }, // ensure that `qs` adds the `where` property, too!
    },
    { addQueryPrefix: true },
  )
  const userResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users${stringifiedQuery}`)
  const user = await userResponse.json();

  console.log(user);

  if (user?.totalDocs === 0) {
    const uuid = v4();
    const req = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: normailizedEmail,
        password: uuid,
      }),
    })
    const data = await req.json();
  }

  console.log("BEFORE");

  const forgotPassword = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: normailizedEmail,
    }),
  });

  console.log("AFTER");
  const prom = await forgotPassword.json();
  console.log(prom);

  setTimeout(() => {
    console.log("SLEEPING");
    return Response.json({ success: true });
  }, 3000)

  
}