import React from "react";
import { JobUploadImages } from "./job-upload-images";
import { Tables } from "@/types/database";

export const JobDraft = ({ job }: { job: Tables<"jobs"> }) => {
  return (
    <div className="max-w-md mx-auto w-full flex flex-col items-center">
      <h2 className="text-3xl font-semibold text-center">
        You need to upload images for your generation
      </h2>
      <JobUploadImages job={job} />
    </div>
  );
};
