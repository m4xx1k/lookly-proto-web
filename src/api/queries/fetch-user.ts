import { fetchUserData } from "@/services/user.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
export const USER_QUERY_KEY = "user";
export function useFetchUser() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: [USER_QUERY_KEY],
    queryFn: () => fetchUserData(),
  });
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
  };
  return { ...query, invalidate };
}
