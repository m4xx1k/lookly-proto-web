"use client";
import { CreateJobForm } from "@/components/create-job";

export default function Dashboard() {
  return (
    <div className="flex grow pt-[20vh] justify-center">
      <CreateJobForm />
    </div>
  );
}
