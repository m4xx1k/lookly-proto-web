import { adminSupabase } from "@/supabase/admin";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const userId = formData.get("userId") as string;
    const packId = formData.get("packId") as string;
    const name = formData.get("name") as string;

    if (!userId || !packId || !name)
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    const { data: user } = await adminSupabase
      .from("users")
      .select("balance")
      .eq("id", userId)
      .single();
    const { data: pack } = await adminSupabase
      .from("prompt_packs")
      .select("token_price")
      .eq("id", packId)
      .single();
    if (!user || !pack)
      return NextResponse.json(
        { error: "Invalid user or pack" },
        { status: 400 }
      );
    if (user.balance! < pack.token_price!) {
      return NextResponse.json(
        { error: "Insufficient balance" },
        { status: 402 }
      );
    }

    // 1️⃣ створюємо джобу зі статусом "draft"
    const { data: job, error: jobError } = await adminSupabase
      .from("jobs")
      .insert({
        user_id: userId,
        pack_id: packId,
        name: name,
        status: "draft",
      })
      .select()
      .single();

    if (jobError || !job)
      return NextResponse.json({ error: jobError?.message }, { status: 500 });
    await adminSupabase
      .from("users")
      .update({
        balance: user.balance! - pack.token_price!,
      })
      .eq("id", userId);

    return NextResponse.json({ success: true, jobId: job.id });
  } catch (err: unknown) {
    console.error(err);
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
