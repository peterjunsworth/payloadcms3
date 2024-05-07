"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { v4 } from "uuid";

export default function Verify({ 
    token
}: { 
    token: String
}) {

  const router = useRouter();
  const uuid = v4();

  useEffect(() => {
    console.log('####################');
    console.log(token);
    console.log(uuid);
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
      console.log(userData);
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
      console.log(json);
      if (json?.token) {
        router.push('/dashboard');
      }
    }
    if (token) verifyUser();
  }, [token, router, uuid]);

  return (
    <div>
      <h1>Verifying...</h1> 
    </div>
  );
}
