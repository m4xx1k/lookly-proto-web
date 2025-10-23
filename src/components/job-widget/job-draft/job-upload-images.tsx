"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { Tables } from "@/types/database";
import { useJobUploadImages } from "@/api/mutations/job-upload-images";
import { Button } from "@/components/ui/button";

const schema = z.object({
  images: z
    .array(z.instanceof(File))
    .min(1, "You must upload at least one image"),
});

type FormValues = z.infer<typeof schema>;

export function JobUploadImages({ job }: { job: Tables<"jobs"> }) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const images = form.watch("images") || [];
  const { uploadImages } = useJobUploadImages(job.id);
  const onSubmit = async (values: FormValues) => {
    await uploadImages(values.images);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    form.setValue("images", files, { shouldValidate: true });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 ">
      <div>
        <label className="block text-sm font-medium mb-1">Upload Images</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="border p-2 rounded w-full"
        />
        {form.formState.errors.images && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.images.message}
          </p>
        )}
        {images.length > 0 && (
          <div className="mt-2 grid grid-cols-3 gap-2">
            {images.map((img, i) => (
              <Image
                key={i}
                src={URL.createObjectURL(img)}
                alt="preview"
                className="size-32 min-w-32 min-h-32 max-w-32 max-h-32 bg-slate-600 w-full object-contain rounded p-0.5 mb-2"
                width={128}
                height={128}
              />
            ))}
          </div>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={form.formState.isSubmitting || !form.formState.isValid}
        className="h-12 w-full text-xl bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {form.formState.isSubmitting ? "Uploading..." : "Upload Images"}
      </Button>
    </form>
  );
}
