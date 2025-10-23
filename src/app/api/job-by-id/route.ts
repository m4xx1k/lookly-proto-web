import { adminSupabase } from "@/supabase/admin";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get("jobId") as string;

    if (!jobId)
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );

    // 1️⃣ створюємо джобу зі статусом "draft"
    const { data: job, error: jobError } = await adminSupabase
      .from("jobs")
      .select("*")
      .eq("id", jobId)
      .single();

    if (jobError || !job)
      return NextResponse.json({ error: jobError?.message }, { status: 500 });

    return NextResponse.json({ success: true, job }, { status: 200 });
  } catch (err: unknown) {
    console.error(err);
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
