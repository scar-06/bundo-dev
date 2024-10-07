"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signupSelectItems } from "@/mocks/data";
import { formatNigerianPhoneNumber } from "@/utils/helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { useUpdateEffect } from "usehooks-ts";

import { SignupFormSchema, signupSchema, signupUser } from "@/lib/app";
import cn from "@/lib/utils";
import useOtp from "@/hooks/useOtp";
import { Button } from "@/components/ui/button";
import AuthWrapper from "@/components/auth/authWrapper";
import FormTextInput from "@/components/forms/formTextInput";
import MobilePhone from "@/components/forms/mobilePhone";
import { SelectScrollable } from "@/components/forms/select";
import { notify } from "@/app/(root)/_components/notifications/notify";

import Otp from "../_components/otp";
import { ApplicationRoutes } from "../../../../routes";

function SignUp() {
  const [data, setData] = useState<SignupFormSchema | null>(null);
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
    isOtpVerified,
  } = useOtp({
    emailOtpData: {
      email: data?.email as string,
      firstName: data?.firstName as string,
      lastName: data?.lastName as string,
      route: "SIGNUP",
    },
    otpFor: "email",
  });
  const [showOtp, setShowOtp] = useState<boolean>(false);

  const router = useRouter();
  // Form hook
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(signupSchema),
  });
  // Signup Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: SignupFormSchema) =>
      await signupUser({
        ...formData,
      }),
    // If signup is successful
    onSuccess: async () => {
      router.replace(ApplicationRoutes.AUTH_SIGN_IN);
      notify.success({
        message: "Account created successfully",
        subtitle: `Welcome to Bundo, please login 😁`,
      });
    },
    onError: async (err) =>
      notify.error({
        message: "Unable to signup",
        subtitle: err?.message,
      }),
  });

  useUpdateEffect(() => {
    if (isOtpVerified && data) {
      mutate(data);
    }
  }, [isOtpVerified]);

  console.log(data);
  return (
    <AuthWrapper hideSlider wrapperFor="buyer">
      <div className="mx-[auto] mb-[64px]  flex h-fit w-full max-w-[489px] flex-col rounded-3xl bg-white px-[14px] py-[29px]">
        <h3 className="mx-auto  mb-1 w-[80%]  max-w-[280px] text-center text-lg font-semibold text-tertiary-pale-950">
          Create your Account
        </h3>
        <span className="mx-auto text-xs font-light">
          Welcome to the easiest way to buy
        </span>
        {showOtp ? (
          <Otp
            otp={otp}
            timer={timer}
            isTimerRunning={isTimerRunning}
            handleChange={handleChange}
            handleResend={() =>
              handleResend(data?.email, {
                email: data?.email as string,
                firstName: data?.firstName as string,
                lastName: data?.lastName as string,
                route: "SIGNUP",
              })
            }
            isSendingOtp={isSendingOtp}
            isVerifyingOtp={isVerifyingOtp}
            verifyMutation={verifyMutation}
            otpSentResData={otpSentResData}
            otpId={data?.email as string}
            signUpStatus={isPending}
            buttonTxt={isPending ? "Completing account creation" : "Enter otp"}
            otpFor={"email"}
            setShowOtp={setShowOtp}
          />
        ) : (
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(async (data) => {
                await handleResend("", {
                  email: data?.email as string,
                  firstName: data?.firstName as string,
                  lastName: data?.lastName as string,
                  route: "SIGNUP",
                });
                setShowOtp(true);
                return setData({
                  email: data?.email ?? "",
                  pin: data?.pin ?? "",
                  pinConfirmation: data?.pinConfirmation ?? "",
                  firstName: data?.firstName ?? "",
                  lastName: data?.lastName ?? "",
                  socialAdz: data?.socialAdz ?? "",
                });
              })}
              className="flex w-full flex-col items-center px-0 xsm:px-6 xlg:px-0"
            >
              <div className="mx-[auto] mb-7 mt-7 flex w-[95%] flex-col gap-4 xsm:w-[90%]">
                <div className=" relative grid w-full gap-4  xsm:grid-cols-2 mxxs:grid-cols-1 ">
                  <FormTextInput
                    name="firstName"
                    labelText="First Name"
                    placeholder="Michael"
                    type="text"
                  />

                  <FormTextInput
                    name="lastName"
                    labelText="Last Name"
                    placeholder="Okon"
                    type="text"
                  />
                </div>
                <div className=" flex w-full flex-col">
                  <FormTextInput
                    name="email"
                    labelText="Email Address"
                    placeholder="Michaelokon@gmail.com"
                    type="email"
                  />
                </div>

                <FormTextInput
                  name="pin"
                  labelText="Password"
                  placeholder="**********"
                  type="password"
                  showInputRequirements
                  showIndidcator
                />
                <FormTextInput
                  name="pinConfirmation"
                  labelText="Confirm Password"
                  placeholder="**********"
                  type="password"
                />
                <div className="flex flex-col items-start gap-2">
                  <span className="cursor-pointer text-xs text-tertiary-pale-950">
                    How did you hear about us?
                  </span>
                  <SelectScrollable
                    name="socialAdz"
                    selectItems={signupSelectItems}
                  />
                </div>
                <div className="flex items-start gap-2">
                  <label
                    className="relative flex cursor-pointer items-center rounded-full"
                    htmlFor="agreeToTerms"
                  >
                    <input
                      type="checkbox"
                      className=" peer  relative h-5 w-5 cursor-pointer appearance-none rounded border-2 border-gray-300 transition-all checked:border-2 checked:border-green-600 checked:bg-transparent"
                      id="agreeToTerms"
                      {...methods.register("agreeToTerms")}
                    />
                    <span className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-green-600 opacity-0 transition-opacity peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        stroke-width="1"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </label>
                  <label
                    htmlFor="agreeToTerms"
                    className="cursor-pointer text-[13px]"
                  >
                    By continuing, you agree to our{" "}
                    <Link
                      className="text-green-700"
                      href="/about/terms-and-conditions"
                    >
                      Terms and Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      className="text-green-700"
                      href="/about/terms-and-conditions"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>
              <div
                // href={"/dashboard/customers"}
                className={cn("mx-auto h-fit w-[95%] xsm:w-[90%]")}
              >
                <Button
                  variant={"plain"}
                  size={"plain"}
                  disabled={isSendingOtp || !methods.formState.isValid}
                  loading={isSendingOtp}
                  type="submit"
                  className={cn(
                    "mb-6 h-[54px] w-full bg-primary-500 font-medium  text-white hover:bg-primary-700",
                  )}
                >
                  {isSendingOtp
                    ? "Sending OTP..."
                    : "CONTINUE CREATING ACCOUNT"}
                </Button>
              </div>
            </form>
          </FormProvider>
        )}{" "}
      </div>
      <div className="mb-4 pb-6 text-center text-white ">
        Already have a Bundo account?{" "}
        <Link href="/auth/login" className="text-[#FDE74C] underline">
          Log In
        </Link>
      </div>
    </AuthWrapper>
  );
}

export default SignUp;
