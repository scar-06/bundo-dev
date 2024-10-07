"use client";

import React from "react";
import { usePathname } from "next/navigation";

import cn from "@/lib/utils";

import ManageProducts from "../_components/manageProducts";

function VendorsStoreFrontLayout({ children }: { children: React.ReactNode }) {
  const loc = usePathname();
  const isInnerPage = loc.split("/").length > 4;
  return (
    <div className=" flex w-full gap-[127px]">
      <div
        className={cn(
          "  w-full max-w-[582px]  sm:p-6 ",
          isInnerPage ? "hidden md:block" : "",
        )}
      >
        <ManageProducts />
      </div>
      <div
        className={cn(
          "w-full max-w-[380px]",
          isInnerPage ? "" : "!hidden md:!block",
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default VendorsStoreFrontLayout;
