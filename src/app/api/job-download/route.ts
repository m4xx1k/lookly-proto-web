import { adminSupabase } from "@/supabase/admin";
import JSZip from "jszip";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get("jobId");
  if (!jobId)
    return NextResponse.json({ error: "jobId required" }, { status: 400 });

  // дістаємо всі output-зображення для job
  const { data: inputImages, error } = await adminSupabase
    .from("job_images")
    .select("*")
    .eq("job_id", jobId)
    .eq("kind", "input");

  if (error || !inputImages?.length) {
    return NextResponse.json({ error: "No images found" }, { status: 404 });
  }

  const zip = new JSZip();

  // додаємо всі файли в архів
  for (const input of inputImages) {
    const inputFolder = zip.folder(`input_${input.id}`);
    if (!inputFolder) continue;

    const { data: inputFile } = await adminSupabase.storage
      .from("images")
      .download(input.storage_path);
    if (!inputFile) continue;
    const inputArrayBuffer = await inputFile.arrayBuffer();
    inputFolder.file(`input_${input.id}.png`, inputArrayBuffer);

    const { data: outputImages, error: outputError } = await adminSupabase
      .from("job_images")
      .select("*")
      .eq("source_image_id", input.id)
      .eq("kind", "output");
    if (outputError || !outputImages?.length) {
      continue;
    }
    for (const output of outputImages) {
      const { data: outputFile } = await adminSupabase.storage
        .from("images")
        .download(output.storage_path);
      if (!outputFile) continue;
      const outputArrayBuffer = await outputFile.arrayBuffer();

      inputFolder.file(`output_${output.id}.png`, outputArrayBuffer);
    }
  }

  const content = await zip.generateAsync({ type: "arraybuffer" });

  return new NextResponse(content, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${jobId}.zip"`,
    },
  });
}
