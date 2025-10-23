import { fetchJobs } from "@/services/job.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
export const JOBS_QUERY_KEY = "jobs";
export function useFetchJobs() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: [JOBS_QUERY_KEY],
    queryFn: () => fetchJobs(),
  });
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: [JOBS_QUERY_KEY] });
  };
  return { ...query, invalidate };
}
