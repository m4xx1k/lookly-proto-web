import { getJobById } from "@/services/job.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
export const JOB_BY_ID_QUERY_KEY = "jobById";
export function useFetchJob(jobId: string) {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: [JOB_BY_ID_QUERY_KEY, jobId],
    queryFn: () => getJobById(jobId),
  });
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: [JOB_BY_ID_QUERY_KEY, jobId] });
  };
  return { ...query, invalidate };
}
