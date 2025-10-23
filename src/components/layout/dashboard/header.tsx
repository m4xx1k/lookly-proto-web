"use client";
import React from "react";
import { supabase } from "@/supabase/instance";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFetchUser } from "@/api/queries/fetch-user";

export const DashboardHeader = () => {
  const router = useRouter();
  const { data: user } = useFetchUser();
  if (!user) return null;
  const insufficientBalance = user.balance! <= 0;
  return (
    <header className="h-16 w-full bg-slate-800 flex rounded-xl shadow-xl items-center px-6">
      <h2 className="text-2xl font-medium text-slate-50">
        👋 Welcome back, <span className="italic">{user?.email}</span>
      </h2>
      <div className="ml-auto flex items-center gap-4">
        <div
          className={cn(
            insufficientBalance
              ? "bg-gray-500 text-white"
              : "bg-green-600 text-white",
            "px-4 py-2 rounded-xl font-medium text-lg"
          )}
        >
          {user?.balance ?? 0} tokens {insufficientBalance ? "😢" : "💸"}
        </div>
        <Button
          size="icon-lg"
          variant={"destructive"}
          className="ml-auto justify-self-end rounded-xl"
          onClick={() => supabase.auth.signOut().then(() => router.push("/"))}
        >
          <LogOut />
        </Button>
      </div>
    </header>
  );
};
