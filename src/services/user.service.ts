import { supabase } from "@/supabase/instance";

export async function fetchUserData() {
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session?.user) return null;
  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("id", sessionData.session?.user.id)
    .single();
  return user;
}
