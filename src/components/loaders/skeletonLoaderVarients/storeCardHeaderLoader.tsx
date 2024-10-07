import React from "react";

import SkeletonLoader from "../skeletonLoader";

function StoreCardHeaderLoader() {
  return (
    <div className="w-full pb-8">
      <div className="mb-1 flex items-start justify-between">
        <span className="relative isolate ml-1 flex aspect-square w-[clamp(72px,_8vw,_72px)] items-center justify-center rounded-full">
          <SkeletonLoader className="h-full w-full rounded-full " />
        </span>
        <div className="flex items-center gap-2">
          <span className="flex">
            <SkeletonLoader className="h-4 w-4" />
          </span>
          <span className="rounded-full bg-[#D6EEDD] p-[6.5px_13px] text-xs font-bold">
            <SkeletonLoader className="h-4 w-16" />
          </span>
          <SkeletonLoader className="w-8 rounded-full bg-[#D6EEDD] p-2 hover:shadow-md" />
        </div>
      </div>
      <div className="mt-3 flex flex-col text-[12px]">
        <span className="mb-1 text-lg font-semibold">
          <SkeletonLoader className="h-4 w-2/4" />
        </span>
        <span className="mt-2 flex flex-col gap-1">
          <SkeletonLoader className="h-1 w-full" />
          <SkeletonLoader className="h-1 w-full" />
          <SkeletonLoader className="h-1 w-full" />
          <SkeletonLoader className="h-1 w-full" />
          <SkeletonLoader className="h-1 w-full" />
          <SkeletonLoader className="h-1 w-full" />
          <SkeletonLoader className="h-1 w-[95%]" />
          <SkeletonLoader className="h-1 w-[65%]" />
        </span>
        {Array(2)
          .fill(0)
          .map((i) => (
            <div
              className="mt-2 flex w-full items-center gap-2  p-1"
              key={Math.random() * 4}
            >
              <span>
                <SkeletonLoader className="h-6 w-8" />
              </span>

              <SkeletonLoader className="h-3 w-[70%]" />
            </div>
          ))}
      </div>
    </div>
  );
}

export default StoreCardHeaderLoader;
