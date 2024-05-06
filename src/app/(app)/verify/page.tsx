"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { v4 } from "uuid";

export default function Verify() {

  const router = useRouter();
  const [searchParams] = useSearchParams();
  const [_tokenParam, token] = searchParams || [];
  const uuid = v4();

  useEffect(() => {
    const verifyUser = async () => {
      const resetPassword = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password: uuid,
        }),
      });
      const userData = await resetPassword.json();
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData?.user?.email,
          password: uuid,
        }),
      })
      const json = await res.json();
      if (json?.token) {
        router.push('/dashboard');
      }
    }
    if (token) verifyUser();
  }, [token, router, uuid]);

  return (
    <>
      Logging In
    </>
  );
}
