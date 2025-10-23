import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { toastApiError } from "../handle-error-message";
import { uploadJobImages } from "@/services/job.service";
import { useFetchJob } from "../queries/fetch-job";
const JOB_UPLOAD_IMAGES_KEY = "job-upload-images";
export function useJobUploadImages(jobId: string) {
  const { invalidate } = useFetchJob(jobId);
  const { mutateAsync, ...rest } = useMutation({
    mutationKey: [JOB_UPLOAD_IMAGES_KEY],
    mutationFn: (images: File[]) => uploadJobImages(jobId, images),
    onError: toastApiError,
    onSuccess: () => {
      toast.success("Images uploaded successfully");
      invalidate();
    },
  });
  return { uploadImages: mutateAsync, ...rest };
}
