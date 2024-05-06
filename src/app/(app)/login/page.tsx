"use client";

import { Button, Image, Input, Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {

  const [loginForm, setloginForm] = useState({
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setloginForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const response = await fetch("/magic-link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: loginForm.email}),
    });

    const data = await response.json();
    if (data) {
      toast.success("Check your email for magic link!");
    } else {
      toast.error("Issue with login, please try again");
    }
    setSubmitting(false);
  };

  return (
    <>
      <Toaster />

      <div
        className={`absolute top-0 inset-0 z-20 sm:m-auto flex sm:max-h-[500px] sm:w-[450px] w-full flex-col sm:rounded-[32px] bg-gradient-to-b from-white via-white/75 to-white/0 sm:via-white/95 sm:to-white/75 py-32 p-8 sm:p-8 sm:shadow-lg transition-all duration-200 ease-in-out`}
      >
        <h1 className="mt-8 text-center text-xl font-bold text-gray-900">
          Get started with Smover
        </h1>
        <p className="mt-2 text-center text-base text-gray-500">
          Enter your email to sign in or sign up.
        </p>
        <div className="mt-8 flex w-full flex-col gap-6">
          <Input
            name="email"
            type="email"
            isRequired
            placeholder="jon.doe@email.com"
            value={loginForm.email}
            onChange={handleInputChange}
            className="w-full text-center rounded-[16px] border border-gray-200"
            size="lg"
          />

          <Button
            onClick={handleSubmit}
            type="submit"
            variant="solid"
            color="primary"
            isLoading={submitting}
            className="p-8 rounded-[16px] text-center text-base text-white transition-all duration-250 ease-in-out"
          >
            ✨ Send Magic Link
          </Button>
          <Link
            href="mailto:help@kanvarta.com"
            className="-mt-3 w-full text-base rounded-[16px] p-3 text-center text-primary-700 transition-all duration-250 ease-in-out hover:underline cursor-pointer"
          >
            Having Trouble?
          </Link>
        </div>
      </div>
    </>
  );
}
