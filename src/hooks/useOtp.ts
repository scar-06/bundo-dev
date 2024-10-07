"use client";
"use strict";

import { useState } from "react";
import { APP_CONFIG } from "@/utils";
import { formatNigerianPhoneNumber } from "@/utils/helpers";
import { useMutation } from "@tanstack/react-query";

import {
  initResetPasswordOTP,
  OTPVerifySchema,
  sendOTP,
  SendOTPSchema,
  sendOTPToEmail,
  SendOTPToEmailSchema,
  verifyInitResetPasswordOTP,
  verifyInitResetPasswordOTPSchema,
  verifyOTP,
} from "@/lib/app";
import { notify } from "@/app/(root)/_components/notifications/notify";

import { useTimer } from "./useTimer";

type UseOtpProps = {
  otpFor?:
    | "resetPassword"
    | "verifyPhone"
    | "tempPassword"
    | "email"
    | "sendOTP";
  purpose?: "VERIFY" | "OTP";
  otpId?: string;
  emailOtpData?: SendOTPToEmailSchema;
};

const useOtp = ({
  otpId,
  otpFor,
  emailOtpData,
  purpose = "OTP",
}: UseOtpProps) => {
  const {
    isPending: isSendingOtp,
    data: otpSentResData,
    isSuccess: isOtpSent,
    mutateAsync: sentMutation,
  } = useMutation({
    mutationFn: async (data: SendOTPSchema | SendOTPToEmailSchema) => {
      if (otpFor === "resetPassword" || otpFor === "tempPassword") {
        return await initResetPasswordOTP(data as SendOTPSchema);
      } else if (otpFor === "email") {
        return await sendOTPToEmail(data as SendOTPToEmailSchema);
      } else {
        return await sendOTP(data as SendOTPSchema, purpose);
      }
    },
    retry: 1,
    onSuccess: async () => {
      notify.success({ message: "OTP  is sent successfully" });
    },
    onError: async (data) => {
      notify.error({ message: data.message });
    },
  });
  const {
    isPending: isVerifyingOtp,
    data: otpVerifyingResData,
    isSuccess: isOtpVerified,
    mutate: verifyMutation,
  } = useMutation({
    mutationFn: async (
      data: verifyInitResetPasswordOTPSchema | OTPVerifySchema,
    ) => {
      if (
        otpFor === "resetPassword" ||
        emailOtpData?.route === "FORGOT_PASSWORD"
      ) {
        return await verifyInitResetPasswordOTP(
          data as verifyInitResetPasswordOTPSchema,
        );
      }
      return await verifyOTP(data as OTPVerifySchema);
    },
    retry: 1,
    onSuccess: async (data) => {
      notify.success({ message: "OTP is verified" });
    },
    onError: async (err) =>
      notify.error({
        message: "Unable to send OTP",
        subtitle: err?.message,
      }),
  });
  const [otp, setOtp] = useState<string>("");
  const { count, minutes, seconds, startCountdown, resetCountdown } = useTimer(
    APP_CONFIG.otpCountDownTime,
  );

  const handleChange = (value: string) => {
    setOtp(value);
  };
  const handleResend = async (
    otpPin?: string,
    emailOtpData?: SendOTPToEmailSchema,
  ) => {
    otpFor === "email" || emailOtpData?.route === "FORGOT_PASSWORD"
      ? await sentMutation(emailOtpData as SendOTPToEmailSchema)
      : await sentMutation({
          otpId: otpPin
            ? formatNigerianPhoneNumber(otpPin)
            : formatNigerianPhoneNumber(otpId as string),
        });
    resetCountdown();
    startCountdown();
  };

  return {
    otp,
    timer: `${minutes} min : ${seconds} s`,
    isTimerRunning: count > 0,
    handleChange,
    handleResend,
    isSendingOtp,
    otpSentResData,
    isOtpSent,
    isVerifyingOtp,
    otpVerifyingResData,
    isOtpVerified,
    verifyMutation,
  };
};

export default useOtp;
