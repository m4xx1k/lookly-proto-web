import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { toastApiError } from "../handle-error-message";
import { createJob } from "@/services/job.service";
import { useFetchJobs } from "../queries/fetch-jobs";
import { useFetchUser } from "../queries/fetch-user";
const CREATE_JOB_KEY = "create-job";
export function useJobCreate() {
  const { invalidate } = useFetchJobs();
  const { invalidate: invalidateUser } = useFetchUser();
  const { mutateAsync, ...rest } = useMutation({
    mutationKey: [CREATE_JOB_KEY],
    mutationFn: createJob,
    onError: toastApiError,
    onSuccess: () => {
      invalidate();
      invalidateUser();
      toast.success("Your generation created successfully!");
    },
  });
  return { createJob: mutateAsync, ...rest };
}
