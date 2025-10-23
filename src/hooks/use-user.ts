"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/supabase/instance";
import type { User } from "@supabase/supabase-js";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) => {
        const sessionData = data.session?.user;
        setUser(sessionData ?? null);
      })
      .finally(() => setLoading(false));
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}
