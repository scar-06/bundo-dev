import React from "react";

import SkeletonLoader from "../skeletonLoader";

function StoreCardGridProductVendorLoader() {
  return (
    <div className="hideScrollBar h-screen max-h-[531px] w-full cursor-move overflow-y-auto">
      <div className="grid grid-cols-3 gap-[2px]">
        {Array(15)
          .fill(0)
          .map((i) => (
            <span
              key={Math.random()}
              className="aspect-square w-full items-center justify-center overflow-hidden "
            >
              <SkeletonLoader className="h-full w-full" />
            </span>
          ))}
      </div>
    </div>
  );
}

export default StoreCardGridProductVendorLoader;
