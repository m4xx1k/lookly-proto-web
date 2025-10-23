"use client";
import { JobWidget } from "@/components/job-widget";
import { use } from "react";

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <div className="flex grow  ">
      <JobWidget jobId={id} />
    </div>
  );
}
