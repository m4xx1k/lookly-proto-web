import { JobDraft } from "./job-draft";
import { useFetchJob } from "@/api/queries/fetch-job";
import { JobStatus } from "./job-status";
import { JobPending } from "./job-pending";
import { JobDone } from "./job-done";
import { JobDownload } from "./job-download";

export const JobWidget = ({ jobId }: { jobId: string }) => {
  const { data: job } = useFetchJob(jobId);
  if (!job) return null;
  return (
    <div className="flex grow flex-col gap-6">
      <div className="space-y-2">
        <div className="flex gap-2 items-center justify-between">
          <h2 className="text-4xl font-bold tracking-wide">{job.name} </h2>
          <div className="flex gap-2 items-center">
            <JobStatus job={job} />
            <JobDownload job={job} />
          </div>
        </div>
      </div>
      <div className="flex grow flex-col">
        {job?.status === "draft" && <JobDraft job={job} />}
        {job?.status === "pending" ||
          (job?.status === "processing" && <JobPending jobId={job.id} />)}
        {job?.status === "done" && <JobDone jobId={job.id} />}
      </div>

      <div className="flex justify-between text-sm text-gray-500 mt-4">
        <div>ID: {job.id}</div>
        <div>Created at: {new Date(job.created_at!).toLocaleString()}</div>
      </div>
    </div>
  );
};
