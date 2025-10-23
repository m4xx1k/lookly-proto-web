import { useFetchJobImages } from "@/api/queries/fetch-job-images";
import { imageUrl } from "@/lib/utils";
import Image from "next/image";
import React, { useMemo } from "react";

export const JobDone = ({ jobId }: { jobId: string }) => {
  const { data } = useFetchJobImages(jobId);

  const jobImagesOutputs = useMemo(() => {
    if (!data) return null;

    const inputs = data.filter((img) => img.kind === "input");
    const outputs = data.filter((img) => img.kind === "output");

    return inputs.map((input) => ({
      input,
      outputs: outputs.filter((output) => output.source_image_id === input.id),
    }));
  }, [data]);
  console.log("jobImagesOutputs", jobImagesOutputs);

  if (!jobImagesOutputs) return null;

  return (
    <div className="space-y-6 w-full ">
      <h2 className="font-bold text-4xl text-center mb-4">
        Job completed successfully!
      </h2>

      <div className="grid gap-8">
        {jobImagesOutputs.map(({ input, outputs }) => (
          <div key={input.id} className="p-4 flex gap-4">
            <div className="">
              <h3 className="font-semibold text-lg mb-2">Input</h3>
              <div className="flex gap-4 mb-4">
                <Image
                  width={256}
                  height={256}
                  src={imageUrl(input.storage_path)}
                  alt="input"
                  className="size-56 object-contain rounded-xl bg-slate-400"
                />
              </div>
            </div>
            <div className="">
              <h4 className="font-medium mb-2">Generated outputs</h4>
              {outputs.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {outputs.map((out) => (
                    <Image
                      width={256}
                      height={256}
                      key={out.id}
                      src={imageUrl(out.storage_path)}
                      alt="output"
                      className="size-56 object-contain rounded-xl bg-slate-400"
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  No outputs found for this input.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
