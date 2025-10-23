"use client";

import { supabase } from "@/supabase/instance";
import { ChromeIcon } from "lucide-react";

export default function Login() {
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center ">
      <div className="flex items-center flex-col rounded-2xl bg-slate-600 w-full max-w-md py-8 shadow-xl">
        <h1 className="mb-6 text-center text-4xl font-semibold">
          👋 Welcome to Lookly
        </h1>
        <button
          type="button"
          onClick={signInWithGoogle}
          className="flex cursor-pointer items-center justify-center gap-3 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-md transition hover:bg-blue-700 active:scale-[0.98]"
        >
          <ChromeIcon />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
