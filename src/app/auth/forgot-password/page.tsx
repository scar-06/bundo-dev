"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";

import { passResetReqSchema, SendOTPSchema } from "@/lib/app";
import cn from "@/lib/utils";
import useOtp from "@/hooks/useOtp";
import { Button } from "@/components/ui/button";
import AuthWrapper from "@/components/auth/authWrapper";
import FormTextInput from "@/components/forms/formTextInput";
import { notify } from "@/app/(root)/_components/notifications/notify";

import Otp from "../_components/otp";
import { ApplicationRoutes } from "../../../../routes";

function ForgotPassword() {
  const [data, setData] = useState<SendOTPSchema | null>(null);
  const {
    otp,
    timer,
    isTimerRunning,
    handleChange,
    handleResend,
    isSendingOtp,
    isVerifyingOtp,
    verifyMutation,
    otpSentResData,
    otpVerifyingResData,

    isOtpVerified,
  } = useOtp({
    otpId: data?.otpId ?? "",
    emailOtpData: {
      email: data?.otpId as string,
      route: "FORGOT_PASSWORD",
    },
    otpFor: "email",
  });
  const [showOtp, setShowOtp] = useState<boolean>(false);

  const router = useRouter();
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(passResetReqSchema),
  });
  const redirectToChangePassword = () =>
    router.push(
      // @ts-expect-error
      `${ApplicationRoutes.AUTH_RESET_PASS}/?token=${otpVerifyingResData?.["x-reset-token"]}`,
    );
  useEffect(() => {
    // @ts-expect-error
    if (otpVerifyingResData?.["x-reset-token"]) {
      redirectToChangePassword();
      notify.success({ subtitle: "create a new password" });
    }
  }, [isOtpVerified]);
  return (
    <AuthWrapper hideSlider wrapperFor="buyer">
      <div className="mx-[auto] mb-[64px]  flex h-fit w-full max-w-[489px] flex-col rounded-3xl bg-white px-[14px] py-[29px]">
        <h3 className="mx-auto  mb-1 w-[80%]  max-w-[280px] text-center text-lg font-semibold text-tertiary-pale-950">
          Reset Login Password
        </h3>
        <span className="mx-auto text-center text-xs font-light">
          Reset your Password to <br />
          Continue enjoying buying with ease
        </span>
        {showOtp && data?.otpId ? (
          <Otp
            otp={otp}
            timer={timer}
            isTimerRunning={isTimerRunning}
            handleChange={handleChange}
            handleResend={handleResend}
            isSendingOtp={isSendingOtp}
            isVerifyingOtp={isVerifyingOtp}
            verifyMutation={verifyMutation}
            otpSentResData={otpSentResData}
            otpId={data?.otpId ?? ""}
            signUpStatus={false}
            otpFor={"email"}
            route={"FORGOT_PASSWORD"}
          />
        ) : (
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(async (data) => {
                setData({ otpId: `${data.email}` });
                await handleResend("", {
                  email: data?.email as string,
                  route: "FORGOT_PASSWORD",
                });
                setShowOtp(true);
              })}
              className="flex w-full flex-col items-center px-6 xlg:px-0"
            >
              <div className="mx-[auto]  mb-7 mt-7 flex w-[90%] flex-col gap-4">
                {/* <MobilePhone name="phoneNumber" /> */}
                <FormTextInput
                  name="email"
                  labelText="Email Address"
                  placeholder="eg: michaelokon@gmail.com"
                  type="email"
                />
              </div>
              <div className={cn("mx-auto h-fit w-[90%]")}>
                <Button
                  variant={"plain"}
                  size={"plain"}
                  type="submit"
                  disabled={!methods.formState.isValid}
                  loading={isSendingOtp || isVerifyingOtp}
                  className={cn(
                    "mb-6 h-[54px] w-full bg-primary-500 font-medium  text-white hover:bg-primary-700",
                  )}
                >
                  RESET PIN
                </Button>
              </div>
            </form>
          </FormProvider>
        )}{" "}
      </div>
      <div className="text-center text-white ">
        Already have a Bundo account?{" "}
        <Link href="/auth/login" className="text-[#FDE74C] underline">
          Log In
        </Link>
      </div>
    </AuthWrapper>
  );
}

export default ForgotPassword;
