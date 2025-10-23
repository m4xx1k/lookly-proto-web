import { Tables } from "@/types/database";
import React from "react";
import { Button } from "../ui/button";
import { Download } from "lucide-react";

export const JobDownload = ({ job }: { job: Tables<"jobs"> }) => {
  const handleDownload = () => {
    const url = `/api/job-download?jobId=${job.id}`;
    window.location.href = url;
  };
  if (job.status !== "done") return null;
  return (
    <Button
      onClick={handleDownload}
      size="icon-lg"
      className="bg-green-500 hover:bg-green-600 rounded-3xl"
    >
      <Download />
    </Button>
  );
};
