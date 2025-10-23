import { supabase } from "@/supabase/instance";

export async function ensureUserRecord() {
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  if (!user) return;

  // перевіримо, чи вже є запис у public.users
  const { data: existing } = await supabase
    .from("users")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (!existing) {
    await supabase.from("users").insert({
      id: user.id,
      email: user.email,
    });
  }
}
