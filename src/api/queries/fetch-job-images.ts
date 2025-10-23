import { fetchJobImages } from "@/services/job.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
export const JOB_IMAGES_BY_ID_QUERY_KEY = "jobImagesById";
export function useFetchJobImages(jobId: string) {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: [JOB_IMAGES_BY_ID_QUERY_KEY, jobId],
    queryFn: () => fetchJobImages(jobId),
  });
  const invalidate = () => {
    queryClient.invalidateQueries({
      queryKey: [JOB_IMAGES_BY_ID_QUERY_KEY, jobId],
    });
  };
  return { ...query, invalidate };
}
