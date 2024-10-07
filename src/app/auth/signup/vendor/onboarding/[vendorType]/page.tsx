"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signupSuccessVendor } from "@/assets";
import { signupSelectItems } from "@/mocks/data";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { FormProvider, useForm } from "react-hook-form";
import { useUpdateEffect } from "usehooks-ts";

import {
  SigninFormSchema,
  SignupFormSchema,
  signupSchema,
  signupUser,
  signUserIn,
} from "@/lib/app";
import cn from "@/lib/utils";
import useOtp from "@/hooks/useOtp";
import { Button } from "@/components/ui/button";
import AuthWrapper from "@/components/auth/authWrapper";
import FormTextInput from "@/components/forms/formTextInput";
import { SelectScrollable } from "@/components/forms/select";
import { notify } from "@/app/(root)/_components/notifications/notify";
import Otp from "@/app/auth/_components/otp";
import SignUpSuccessWelcome from "@/app/auth/_components/signUpSuccessWelcome";

function ProductVendor() {
  const loc = usePathname();
  const vendorType: string = loc.split("/")[5];
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
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  // Form hook
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(signupSchema),
  });

  const { mutate: mutateSignIn } = useMutation({
    mutationFn: async (formData: SigninFormSchema) =>
      await signUserIn({ ...formData }),
    onSuccess: async (response) => {
      if (response?.status === "success") {
        // @ts-expect-error
        const user = response?.result as UserInfoProps;
        // Set the auth token in a cookie
        setCookie("auth_token", user, {
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });
        notify.success({
          message: "Login successful",
          subtitle: "Welcome back champ",
        });
        setIsSuccess(true);
      } else {
        notify.error({
          message: "Unable to sign in",
          subtitle: response.error?.message || "An error occurred",
        });
      }
    },
    onError: (err) => {
      console.error(err);
      notify.error({
        message: "Unable to sign in",
        subtitle: err?.message || "An unexpected error occurred",
      });
    },
  });
  // Signup Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: SignupFormSchema) =>
      await signupUser(
        {
          ...formData,
        },
        "signup-vendor",
      ),
    // If signup is successful
    onSuccess: async () => {
      notify.success({
        message: "Account created successfully",
        subtitle: `logging in 😁`,
      });
      mutateSignIn({
        pin: data?.pin as string,
        username: data?.email as string,
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

  return (
    <AuthWrapper hideSlider wrapperFor="vendor">
      {isSuccess ? (
        <SignUpSuccessWelcome
          image={signupSuccessVendor}
          redirectToUrl={`/auth/signup/vendor/onboarding/${vendorType}/create_business`}
        />
      ) : (
        <>
          <div className="mx-[auto] mb-[64px]  flex h-fit w-full max-w-[489px] flex-col rounded-3xl bg-white px-[14px] py-[29px]">
            <span className="mx-auto text-xs font-light">Step 1/2</span>
            <h3 className="mx-auto  mb-1 w-[80%]  max-w-[280px] text-center text-lg font-semibold text-tertiary-pale-950">
              Personal Information
            </h3>
            {showOtp && data?.email ? (
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
                otpId={data?.email ?? ""}
                signUpStatus={isPending}
                buttonTxt={
                  isPending ? "Completing account creation" : "Enter otp"
                }
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
                      business_type:
                        vendorType === "service_vendor"
                          ? "services"
                          : "products",
                    });
                  })}
                  className="flex w-full flex-col items-center px-0 xsm:px-6 xlg:px-0"
                >
                  <div className="mx-[auto] mb-7 mt-7 flex w-[95%] flex-col gap-4 xsm:w-[90%]">
                    <div className=" relative grid w-full gap-4  xsm:grid-cols-2 mxxs:grid-cols-1">
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

                    {/* <MobilePhone name="phoneNumber" /> */}
                    <FormTextInput
                      name="pin"
                      labelText="Choose Password"
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
                      type="submit"
                      loading={isSendingOtp}
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
        </>
      )}
    </AuthWrapper>
  );
}

export default ProductVendor;
