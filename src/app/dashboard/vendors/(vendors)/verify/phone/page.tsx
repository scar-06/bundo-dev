"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { QUERY_KEYS } from "@/utils";
import { formatNigerianPhoneNumber } from "@/utils/helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { useUpdateEffect } from "usehooks-ts";
import * as Yup from "yup";

import { getPhoneValidationSchema } from "@/lib/app";
import { updateVendor, UpdateVendorSchema } from "@/lib/app/vendors/services";
import cn from "@/lib/utils";
import { useGetLoggedInUser } from "@/hooks/useGetLoggedInUser";
import useOtp from "@/hooks/useOtp";
import { Button } from "@/components/ui/button";
import MobilePhone from "@/components/forms/mobilePhone";
import GoBack from "@/components/goBack";
import { notify } from "@/app/(root)/_components/notifications/notify";
import Otp from "@/app/auth/_components/otp";

function PhoneVerification() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { refetch } = useGetLoggedInUser();
  const [data, setData] = useState<UpdateVendorSchema | null>(null);
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
    otpId: data?.phoneNumber ?? "",
    otpFor: "verifyPhone",
    purpose: "VERIFY",
  });
  const [showOtp, setShowOtp] = useState<boolean>(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: UpdateVendorSchema) =>
      await updateVendor({ ...data }),
    onSuccess: async (data) => {
      if (data?.status === "success") {
        notify.success({ message: "store updated successfully" });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.BUSINESS, QUERY_KEYS.USER],
        });
        refetch();
        router.push("/dashboard/vendors");
      }
    },
    onError: async (err) =>
      notify.error({
        message: "Error while updating vendor",
        subtitle: err?.message,
      }),
  });
  // Form hook
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(
      Yup.object().shape({
        phoneNumber: getPhoneValidationSchema(),
      }),
    ),
  });
  useUpdateEffect(() => {
    if (isOtpVerified && data) {
      mutate({
        phoneNumber: formatNigerianPhoneNumber(data.phoneNumber as string),
      });
    }
  }, [isOtpVerified]);
  return (
    <div className="">
      <div className="max-w-[70px]">
        {" "}
        <GoBack text="Back" />
      </div>
      <div className="mx-auto flex w-full max-w-[600px]  items-center justify-center pb-6 pt-10">
        <div className=" flex h-fit w-full flex-col items-center gap-[10px]">
          <h3>Verify phone number</h3>
          {showOtp ? (
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
              otpId={data?.phoneNumber ?? ""}
              signUpStatus
              otpFor={"verifyPhone"}
              setShowOtp={setShowOtp}
              width="w-full"
              buttonTxt={isPending ? "Verifying phone number" : "Enter otp"}
            />
          ) : (
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(async (data) => {
                  await handleResend(data?.phoneNumber);
                  setShowOtp(true);
                  return setData({
                    phoneNumber: data.phoneNumber ?? "",
                  });
                })}
                className="flex w-full flex-col items-center gap-8"
              >
                <MobilePhone name="phoneNumber" label="Input phone number" />
                <Button
                  variant={"plain"}
                  size={"plain"}
                  type="submit"
                  disabled={
                    isPending || !methods.formState.isValid || isSendingOtp
                  }
                  loading={isPending || isSendingOtp}
                  className={cn(
                    "mb-6 h-[54px] w-full bg-primary-500 font-medium  text-white hover:bg-primary-700",
                  )}
                >
                  {isPending || isSendingOtp ? "Verifying" : "Verify"}
                </Button>
              </form>
            </FormProvider>
          )}
        </div>
      </div>
    </div>
  );
}

export default PhoneVerification;
