import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { signupSuccessCustomer } from "@/assets";
import { getCookie } from "cookies-next";

import { useGetLoggedInUser } from "@/hooks/useGetLoggedInUser";
import { Button } from "@/components/ui/button";

import { UserInfoProps } from "../../../../next-auth";

type Props = {
  redirectToUrl: string;
  image?: string | StaticImageData;
};
function SignUpSuccessWelcome({
  redirectToUrl,
  image = signupSuccessCustomer,
}: Props) {
  const cookieVal = getCookie("auth_token");

  const data =
    cookieVal !== undefined
      ? (JSON.parse(cookieVal) as UserInfoProps)
      : ({} as UserInfoProps);
  const { isSuccess: isGettedLoggedUser, isFetching } = useGetLoggedInUser();

  return (
    <div className="mx-[auto] mb-[64px]  flex h-fit w-full max-w-[489px] flex-col rounded-3xl bg-white px-[14px] py-[29px]">
      <div className="mx-[auto] mt-[20px] flex h-fit w-full max-w-[489px] flex-col rounded-3xl">
        <div className="mx-auto flex w-[85%] flex-col">
          <div className="relative mx-auto flex h-[108px] w-[118px] flex-col items-start gap-2">
            <Image
              src={image}
              alt="signup image"
              fill
              className=" object-contain"
            />
          </div>
          <h3 className=" mx-auto my-[12px] text-lg font-bold capitalize ">
            welcome to bundo!
          </h3>
          <p className=" mx-auto mb-[35px] max-w-[347px] text-center text-[13px] font-light leading-6 ">
            {`Let’s go on this journey together, shall we? 🚀 With Bundo, your easy
          retail-business journey just begun! Go ahead and set up your Business
          page, upload your products, get found by customers in your location
          and beyond, explore other vendors in the marketplace, receive orders
          and enjoy easy retail from start to finish!`}
          </p>
          <Link href={redirectToUrl}>
            <Button disabled={isFetching} className="w-full cursor-pointer">
              {isFetching ? "Fetching User" : "Continue"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUpSuccessWelcome;
