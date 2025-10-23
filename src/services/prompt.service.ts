import { supabase } from "@/supabase/instance";

export async function getPromptPacks() {
  const res = await supabase.from("prompt_packs").select("*");
  return res.data;
}
