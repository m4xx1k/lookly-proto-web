import { useFetchJobImages } from "@/api/queries/fetch-job-images";
import { usePollingJob } from "@/hooks/use-polling-job";
import { imageUrl } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";
import Image from "next/image";

export const JobPending = ({ jobId }: { jobId: string }) => {
  const { data: jobImages } = useFetchJobImages(jobId);
  usePollingJob(jobId);
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <LoaderIcon className="animate-spin size-8" />
        <h2 className="font-bold text-3xl">Wait a moment...</h2>
      </div>
      <div className="space-y-2">
        <h3>Your uploads:</h3>
        <div className="flex items-center gap-4 overflow-auto">
          {jobImages &&
            jobImages.length > 0 &&
            jobImages
              .filter((img) => img.kind === "input")
              .map((img) => (
                <Image
                  key={img.id}
                  src={imageUrl(img.storage_path)}
                  width={256}
                  height={256}
                  alt="job image"
                  className="h-64 w-64 object-contain rounded shadow p-1 bg-slate-400"
                />
              ))}
        </div>
      </div>
    </div>
  );
};
