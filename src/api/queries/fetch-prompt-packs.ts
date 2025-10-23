import { getPromptPacks } from "@/services/prompt.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
export const PROMPT_PACKS_QUERY_KEY = "promptPacks";
export function useFetchPromptPacks() {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: [PROMPT_PACKS_QUERY_KEY],
    queryFn: () => getPromptPacks(),
  });
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: [PROMPT_PACKS_QUERY_KEY] });
  };
  return { ...query, invalidate };
}
