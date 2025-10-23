"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useFetchPromptPacks } from "@/api/queries/fetch-prompt-packs";
import { Input } from "../ui/input";
import { useJobCreate } from "@/api/mutations/job-create";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
});

type FormValues = z.infer<typeof schema>;

export function CreateJobForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  const { data: packs } = useFetchPromptPacks();
  const { createJob } = useJobCreate();
  const onSubmit = async (values: FormValues) => {
    const packId = packs?.[0]?.id;
    const result = await createJob({ name: values.name, packId: packId! });
    if (result) router.push("/dashboard/job/" + result.jobId);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full space-y-4 max-w-md"
    >
      <h3 className="text-4xl font-semibold mx-auto w-fit">
        Create new generation 🤖
      </h3>
      <Input
        {...form.register("name")}
        placeholder="Enter your generation name..."
        className="h-12 text-xl placeholder:text-xl placeholder:text-slate-300"
      />

      <Button
        type="submit"
        disabled={form.formState.isSubmitting || !form.formState.isValid}
        className="bg-blue-600 w-full text-xl h-12 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {form.formState.isSubmitting ? "🚀 Creating..." : "🚀 Let's go!"}
      </Button>
    </form>
  );
}
