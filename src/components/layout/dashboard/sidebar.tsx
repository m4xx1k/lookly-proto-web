"use client";
import { useFetchJobs } from "@/api/queries/fetch-jobs";
import { JobStatus } from "@/components/job-widget/job-status";
import Link from "next/link";
import React from "react";

export const DashboardSidebar = () => {
  const { data } = useFetchJobs();
  return (
    <div className="min-w-52 w-52 h-[calc(100vh-2rem)] bg-slate-800 rounded-xl p-4	 shadow overflow-auto">
      <Link href="/dashboard">
        <h1 className="text-4xl font-bold mb-8 italic tracking-widest">
          LOOKLY
        </h1>
      </Link>
      <h2 className="text-xl font-semibold mb-4">Your Generations</h2>
      {data?.map((job) => (
        <Link
          href={`/dashboard/job/${job.id}`}
          key={job.name}
          className="flex items-center gap-1 bg-slate-600 border-2 border-transparent hover:border-slate-400 shadow mb-2 p-2 rounded-xl text-slate-50 w-full truncate"
        >
          <JobStatus job={job} variant="icon" />
          <span className="text-lg font-semibold">{job.name}</span>
        </Link>
      ))}
    </div>
  );
};
