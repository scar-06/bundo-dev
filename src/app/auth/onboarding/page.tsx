"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MarkActiveIcon,
  MarkInactiveIcon,
  onBuyerPic,
  onVendorPic,
} from "@/assets";

import cn from "@/lib/utils";
import { Button } from "@/components/ui/button";
import AuthWrapper from "@/components/auth/authWrapper";

function Onboarding() {
  const [selected, setSelected] = useState<null | "vendor" | "buyer">(null);
  const signUpLink =
    (selected === "vendor"
      ? "/auth/signup/vendor/onboarding"
      : "/auth/signup") ?? "";
  return (
    <AuthWrapper wrapperFor="buyer">
      <form className="flex w-full flex-col items-center">
        <div className="mx-[auto] mb-[64px]  flex h-fit w-full max-w-[411px] flex-col rounded-3xl bg-white px-[clamp(15px,_5vw,_34px)] py-[35px] md:w-full">
          <h3 className="mx-auto w-[80%]  max-w-[280px] text-center text-[19px] font-bold text-tertiary-pale-950">
            Select an Account Type
          </h3>
          <span className="mx-auto text-xs">
            Select which one fits your needs
          </span>
          <div
            role="button"
            tabIndex={0}
            className="mx-[auto] mb-4 mt-14 flex w-full flex-col gap-6"
          >
            <div
              className={cn(
                "relative flex h-[112px] w-full cursor-pointer items-center gap-4 rounded-xl bg-[rgba(214,_238,_221,_0.50)] px-[13px] transition-all duration-500 ease-in-out",
                selected === "vendor"
                  ? " shadow-lg shadow-[rgba(214,_238,_221,_0.50)] ring-2 ring-tertiary-deep-green-900"
                  : "ring-0 ring-transparent",
              )}
              onClick={() => setSelected("vendor")}
            >
              <span className=" absolute right-[8px] h-[30px] w-[30px] mxs:right-[4px] mxs:top-[6px] ">
                {selected === "vendor" ? (
                  <MarkActiveIcon />
                ) : (
                  <MarkInactiveIcon />
                )}
              </span>

              <div className=" h-[82px] w-[53px]  rounded-xl  ">
                <Image
                  src={onBuyerPic}
                  className="object-cover"
                  alt=" options buyer"
                />
              </div>
              <p className=" max-w-[199px] text-xs font-medium text-tertiary-deep-green-950 md:text-sm">
                I want to put my Business on Bundo, get new customers and make
                more money{" "}
              </p>
            </div>
            <div
              role="button"
              tabIndex={0}
              className={cn(
                "relative flex h-[112px] w-full cursor-pointer items-center  gap-4 rounded-xl bg-[#FFFADB] px-[13px] transition-all duration-500 ease-in-out",
                selected === "buyer"
                  ? " shadow-lg shadow-[#FFFADB] ring-2 ring-tertiary-deep-green-900"
                  : "ring-0 ring-transparent",
              )}
              onClick={() => setSelected("buyer")}
            >
              <span className="absolute right-[8px] h-[30px] w-[30px] mxs:right-[4px] mxs:top-[6px] ">
                {selected === "buyer" ? (
                  <MarkActiveIcon />
                ) : (
                  <MarkInactiveIcon />
                )}
              </span>
              <div className=" rounded-x h-[82px]  w-[53px] ">
                <Image
                  src={onVendorPic}
                  className="object-cover"
                  alt=" options vendor"
                />
              </div>
              <p className=" max-w-[199px] text-xs font-medium text-tertiary-deep-green-950 md:text-sm">
                I want to find vendors on Bundo, buy easily and seamlessly{" "}
              </p>
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

export default Onboarding;
