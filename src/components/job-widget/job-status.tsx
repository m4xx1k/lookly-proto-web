import { cn } from "@/lib/utils";
import { Tables } from "@/types/database";
import React from "react";

export const JobStatus = ({
  job,
  variant = "badge",
}: {
  job: Pick<Tables<"jobs">, "status">;
  variant?: "icon" | "badge";
}) => {
  const bg = cn({
    "bg-green-500": job.status === "done",
    "bg-yellow-600": job.status === "pending",
    "bg-blue-600": job.status === "processing",
    "bg-orange-950": job.status === "draft",
    "bg-red-600": job.status === "failed",
  });
  const animate = cn({
    "animate-pulse": job.status === "pending" || job.status === "processing",
  });

  if (variant === "icon") {
    return <div className={cn("h-4 w-4 rounded-full", bg, animate)}></div>;
  }
  return (
    <div
      className={cn(
        "h-10 w-40  flex items-center justify-center font-bold text-xl rounded-xl shadow tracking-wide",
        bg,
        animate
      )}
    >
      {job.status.toUpperCase()}
    </div>
  );
};
