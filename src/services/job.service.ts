import { supabase } from "@/supabase/instance";
import { Tables } from "@/types/database";

export type JobWithImages = Tables<"jobs"> & {
  images: Tables<"job_images">[];
};
export async function fetchJobsWithDetails() {
  const { data } = await supabase.from("jobs").select("*");
  const jobs: JobWithImages[] = (data || []).map((j) => ({
    ...j,
    images: [],
  }));
  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    const job_images = await fetchJobImages(job.id);
    jobs[i].images = job_images;
  }
  return jobs;
}
export async function fetchJobs() {
  const { data } = await supabase.from("jobs").select("id,name,status");

  return data;
}

export async function fetchJobImages(jobId: string) {
  const { data } = await supabase
    .from("job_images")
    .select("*")
    .eq("job_id", jobId);
  return data || [];
}

export async function createJob({
  packId,
  name,
}: {
  packId: string;
  name: string;
}) {
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user) return;
  const formData = new FormData();
  formData.append("userId", user.id);
  formData.append("packId", packId);
  formData.append("name", name);

  const res = await fetch("/api/job-create", {
    method: "POST",
    body: formData,
  });

  const result = await res.json();

  if (!res.ok) throw new Error(result.error || "Unknown error");
  return result as { jobId: string };
}

export async function getJobById(jobId: string) {
  const response = await fetch(`/api/job-by-id?jobId=${jobId}`);
  const data = await response.json();
  const job = data.job as Tables<"jobs"> | null;
  if (!job) throw new Error("Job not found");

  return job;
}
export async function uploadJobImages(jobId: string, images: File[]) {
  const formData = new FormData();
  formData.append("jobId", jobId);
  images.forEach((file) => formData.append("images", file));

  const res = await fetch("/api/job-upload-images", {
    method: "POST",
    body: formData,
  });

  const result = await res.json();

  if (!res.ok) throw new Error(result.error || "Unknown error");
  return result as { jobId: string };
}
