"use client";
import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";
import { ensureUserRecord } from "@/supabase/ensure-user-record";

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    ensureUserRecord();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-600">
        Checking session...
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}
