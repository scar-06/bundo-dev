"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MarkActiveIcon,
  MarkInactiveIcon,
  vendorProductOnboardingPic,
  vendorServiceOnboardingPic,
} from "@/assets";

import cn from "@/lib/utils";
import { Button } from "@/components/ui/button";
import AuthWrapper from "@/components/auth/authWrapper";

function SellersSignUpOnboarding() {
  const [selected, setSelected] = useState<
    null | "product_vendor" | "service_vendor"
  >(null);
  const signUpLink =
    (selected === "product_vendor"
      ? "/auth/signup/vendor/onboarding/product_vendor"
      : "/auth/signup/vendor/onboarding/service_vendor") ?? "";
  return (
    <AuthWrapper hideSlider wrapperFor="vendor">
      <form className="flex w-full flex-col items-center">
        <div className="mx-[auto] mb-[64px]  flex h-fit w-full max-w-[411px] flex-col rounded-3xl bg-white px-[clamp(15px,_5vw,_34px)] py-[35px] md:w-full">
          <h3 className="mx-auto w-full   text-center text-[19px] font-bold text-tertiary-pale-950">
            Which Category do you fall into?
          </h3>
          <span className="mx-auto text-xs">Select a category</span>
          <div
            role="button"
            tabIndex={0}
            className="mx-[auto] mb-4 mt-14 flex w-full flex-col gap-6"
          >
            <div
              className={cn(
                "relative flex h-[112px] w-full cursor-pointer items-center gap-4 rounded-xl bg-[rgba(222,242,251,0.4)] px-[13px] transition-all duration-500 ease-in-out",
                selected === "product_vendor"
                  ? " shadow-lg shadow-[#DEF2FB] ring-2 ring-tertiary-deep-green-900"
                  : "ring-0 ring-transparent",
              )}
              onClick={() => setSelected("product_vendor")}
            >
              <span className="absolute right-[8px] h-[30px] w-[30px] mxs:right-[4px] mxs:top-[6px] ">
                {selected === "product_vendor" ? (
                  <MarkActiveIcon />
                ) : (
                  <MarkInactiveIcon />
                )}
              </span>

              <div className=" h-[82px] w-[53px]  rounded-xl  ">
                <Image
                  src={vendorServiceOnboardingPic}
                  className="object-cover"
                  alt=" options buyer"
                />
              </div>
              <div className="w-[70%] ">
                <h3 className="">I sell products or goods</h3>
                <i className=" m-0 max-w-[199px]  !font-lato text-xs   text-[#606F5C]">
                  {"(Food vendors are excluded from this category)"}
                </i>
              </div>
            </div>
            <div
              role="button"
              tabIndex={0}
              className={cn(
                "relative flex h-[112px] w-full cursor-pointer items-center  gap-4 rounded-xl bg-[rgba(241,233,219,0.5)] px-[13px] transition-all duration-500 ease-in-out",
                selected === "service_vendor"
                  ? " shadow-lg shadow-[#F1E9DB] ring-2 ring-tertiary-deep-green-900"
                  : "ring-0 ring-transparent",
              )}
              onClick={() => setSelected("service_vendor")}
            >
              <span className="absolute right-[8px] h-[30px] w-[30px] mxs:right-[4px] mxs:top-[6px] ">
                {selected === "service_vendor" ? (
                  <MarkActiveIcon />
                ) : (
                  <MarkInactiveIcon />
                )}
              </span>
              <div className=" rounded-x h-[82px] w-[53px]   ">
                <Image
                  src={vendorProductOnboardingPic}
                  className="object-cover"
                  alt=" options vendor"
                />
              </div>
              <div className="w-[70%]">
                <h3 className="">I offer services to people</h3>
                <i className=" max-w-[199px] !font-lato text-[12px] font-normal  text-[#606F5C]">
                  {
                    "(All Digital or Physical services are included in this category)"
                  }
                </i>
              </div>
            </div>
          </div>
        </div>
        <Link
          href={signUpLink}
          className={cn(
            "flex w-full items-center justify-center ",
            selected === null && " pointer-events-none",
          )}
        >
          <Button
            variant={"plain"}
            size={"plain"}
            disabled={selected === null}
            className="mb-6 h-[50px] w-full max-w-[411px] bg-primary-500 font-medium  text-white hover:bg-primary-700"
          >
            CONTINUE
          </Button>
        </Link>
        <div className="mb-4 pb-6 text-white ">
          Already have a Bundo account?{" "}
          <Link href="/auth/login" className="text-[#FDE74C] underline">
            Log In
          </Link>
        </div>
      </form>
    </AuthWrapper>
  );
}

export default SellersSignUpOnboarding;
