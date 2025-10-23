import { adminSupabase } from "@/supabase/admin";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const jobId = formData.get("jobId") as string;
    const files = formData.getAll("images") as File[];

    if (!jobId || files.length === 0)
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );

    if (files.length > 4) {
      return NextResponse.json(
        { error: "You can upload a maximum of 4 images per generation." },
        { status: 400 }
      );
    }

    const { data: job, error: jobError } = await adminSupabase
      .from("jobs")
      .select("*")
      .eq("id", jobId)
      .single();

    if (jobError || !job)
      return NextResponse.json({ error: jobError?.message }, { status: 500 });

    for (const file of files) {
      const fileId = crypto.randomUUID();
      const path = `inputs/${job.id}/${fileId}-${file.name}`;
      const arrayBuffer = await file.arrayBuffer();

      const { data: uploadData, error: uploadError } =
        await adminSupabase.storage
          .from("images")
          .upload(path, Buffer.from(arrayBuffer), {
            contentType: file.type,
          });

      if (uploadError)
        return NextResponse.json(
          { error: uploadError.message },
          { status: 500 }
        );

      const { data, error: imgError } = await adminSupabase
        .from("job_images")
        .insert({
          job_id: job.id,
          kind: "input",
          storage_path: uploadData.path,
          mime: file.type,
        });
      console.log("image insert data:", data);
      if (imgError)
        return NextResponse.json({ error: imgError.message }, { status: 500 });
    }

    const { error: updateError } = await adminSupabase
      .from("jobs")
      .update({ status: "pending", total_inputs: files.length })
      .eq("id", job.id);

    if (updateError)
      return NextResponse.json({ error: updateError.message }, { status: 500 });

    return NextResponse.json({ success: true, jobId: job.id });
  } catch (err: unknown) {
    console.error(err);
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
