import React from "react";
import Link from "next/link";
import { FullLogo } from "@/assets";

import cn from "@/lib/utils";

import AuthWrapperSlider from "./authWrapperSlider";

function AuthWrapper({
  children,
  wrapperFor,
  hideSlider,
}: {
  children: React.ReactNode;
  wrapperFor: "buyer" | "vendor";
  hideSlider?: boolean;
}) {
  return (
    <section className="flex w-full justify-between ">
      {!hideSlider && <AuthWrapperSlider wrapperFor={wrapperFor} />}
      <div className=" mx-auto flex h-fit w-full max-w-[600px] flex-1 flex-col  pb-6">
        <div
          className={cn(
            ` mb-[64px]  mt-[50px] flex flex-col items-center gap-3 rounded py-3 `,
          )}
        >
          <Link href="/">
            <FullLogo />
          </Link>
          <small className=" mx-auto text-white">Simplifying Retail</small>
        </div>
        <div className=" mx-auto w-[95%] ssm:w-full">{children}</div>
      </div>
    </section>
  );
}

export default AuthWrapper;
