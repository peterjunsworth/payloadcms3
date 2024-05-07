"use client";

import Verify from "../_components/verify";
import { useEffect, useState } from "react";

export default function VerifyPage() {

  const [token, setToken] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window?.location?.search);
    setToken(searchParams.get('token') || "")
  }, []);

  return (
    <Verify token={token} />
  );
}
