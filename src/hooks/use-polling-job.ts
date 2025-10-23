import { useFetchJob } from "@/api/queries/fetch-job";
import { useEffect } from "react";

export function usePollingJob(jobId: string) {
  const { invalidate } = useFetchJob(jobId);
  useEffect(() => {
    const id = setInterval(() => {
      invalidate();
    }, 5_000);
    return () => {
      clearInterval(id);
    };
  }, []);
}
