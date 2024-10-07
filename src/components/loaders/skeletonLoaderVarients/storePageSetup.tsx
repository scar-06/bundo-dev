import React from "react";

import SkeletonLoader from "../skeletonLoader";

function StorePageSetupLoader() {
  return (
    <div className="mx-auto mt-[40px] w-full max-w-[486px]  pb-8">
      <SkeletonLoader className="h-2 w-1/4 rounded bg-primary-200" />
      <SkeletonLoader className="w-4/4 mt-6 h-1 rounded bg-primary-200" />
      <SkeletonLoader className="mt-1 h-1 w-3/4 rounded bg-primary-200" />

      <div className="mt-4 space-y-2">
        {Array(5)
          .fill(0)
          .map((_) => (
            <div
              key={_}
              className=" animate-pulse rounded border border-dashed border-tertiary-deep-green-800 bg-white p-1"
            >
              <SkeletonLoader className=" h-10 w-full rounded bg-primary-300 " />
            </div>
          ))}
      </div>

      <SkeletonLoader className="mt-2 h-16 w-full animate-pulse rounded bg-primary-300" />

      <SkeletonLoader className="mt-4 h-5 w-full rounded bg-primary-300" />
    </div>
  );
}

export default StorePageSetupLoader;
