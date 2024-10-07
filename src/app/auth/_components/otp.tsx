"use client";

import React from "react";
import { APP_CONFIG } from "@/utils";
import { formatNigerianPhoneNumber } from "@/utils/helpers";
import { UseMutateFunction } from "@tanstack/react-query";
import { MdEditSquare } from "react-icons/md";
import ReactOtpInput from "react-otp-input";

import {
  OTPVerifyRes,
  OTPVerifySchema,
  SendOTPRes,
  verifyInitResetPasswordOTPSchema,
} from "@/lib/app";
import { ResProps } from "@/lib/common";
import { Button } from "@/components/ui/button";

type Props = {
  otpId: string;
  otpFor?: "resetPassword" | "verifyPhone" | "tempPassword" | "email";
  otp: string;
  signUpStatus?: boolean;
  timer: string;
  isTimerRunning: boolean;
  handleChange: (value: string) => void;
  handleResend: (otpPin?: string | undefined) => void;
  isSendingOtp: boolean;
  isVerifyingOtp: boolean;
  verifyMutation: UseMutateFunction<
    ResProps<OTPVerifyRes>,
    Error,
    verifyInitResetPasswordOTPSchema | OTPVerifySchema,
    unknown
  >;
  otpSentResData: ResProps<SendOTPRes> | undefined;
  buttonTxt?: string;
  setShowOtp?: React.Dispatch<React.SetStateAction<boolean>>;
  width?: string;
  route?: "FORGOT_PASSWORD";
};

function Otp({
  otpId,
  otpFor,
  otp,
  timer,
  isTimerRunning,
  handleChange,
  handleResend,
  isSendingOtp,
  isVerifyingOtp,
  verifyMutation,
  otpSentResData,
  signUpStatus,
  buttonTxt,
  setShowOtp,
  width = "",
  route,
}: Props) {
  const handleVerifyClick = () => {
    // @ts-expect-error
    otpSentResData?.pinId
      ? verifyMutation(
          otpFor === "verifyPhone" || otpFor === "tempPassword"
            ? {
                pin: otp,
                // @ts-expect-error
                pin_id: otpSentResData?.pinId,
                channel: "phone",
              }
            : {
                pin: otp,
                email: formatNigerianPhoneNumber(otpId),
                // @ts-expect-error
                pin_id: otpSentResData?.pinId,
                channel: "email",
              },
        )
      : null;
  };

  const renderButtonText = () => {
    if (isSendingOtp) return "Sending OTP";
    if (isVerifyingOtp) return "Verifying OTP";
    if (otpSentResData?.data?.pinId) return "Hold on...";
    return signUpStatus
      ? buttonTxt || "Completing account creation..."
      : "CONTINUE";
  };

  return (
    <div className="mx-[auto] mt-[20px] flex h-fit w-full max-w-[489px] flex-col rounded-3xl">
      {/* disables-es-lint */}
      <div className={`${width || "w-[85%]"} mx-auto flex  flex-col`}>
        <div className="flex w-full flex-col items-start gap-2">
          <h2 className="text-base font-bold text-tertiary-deep-green-950">
            Enter OTP
          </h2>
          <p className="text-xs font-light text-tertiary-pale-950">
            Kindly provide the 6-digit OTP sent to your{" "}
            {otpFor === "email" ? "email" : "phone number"}
          </p>
          <div className="flex w-full items-center justify-between">
            <b className="text-primary-500">
              {otpFor === "email" ? otpId : `${otpId}`}
            </b>
            {setShowOtp && (
              <button
                onClick={() => setShowOtp(false)}
                className="border-sold flex items-center gap-1 rounded-sm  py-1 text-green-600 transition-all duration-150 ease-in-out hover:scale-[1.25]"
              >
                <MdEditSquare />
                <span>Edit</span>
              </button>
            )}
          </div>
        </div>
        <div>
          <ReactOtpInput
            value={otp}
            onChange={handleChange}
            inputType="number"
            numInputs={6}
            renderInput={(props) => (
              <input
                disabled={
                  // @ts-expect-error
                  isSendingOtp || isVerifyingOtp || !otpSentResData?.pinId
                }
                {...props}
                className=" disabled:cursor-not-allowed"
              />
            )}
            shouldAutoFocus
            containerStyle={"opt-container"}
          />
        </div>

        <Button
          className="w-full cursor-pointer"
          disabled={isSendingOtp || isVerifyingOtp || otp.length < 6}
          loading={isSendingOtp || isVerifyingOtp}
          onClick={handleVerifyClick}
        >
          {renderButtonText()}
        </Button>
      </div>
      <div className="mx-auto mt-6 flex w-fit flex-col items-center gap-1">
        <p>If you did not receive the code</p>
        <Button
          variant={"plain"}
          onClick={() => {
            route === "FORGOT_PASSWORD"
              ? // @ts-expect-error
                handleResend("", {
                  email: otpId,
                  route: "FORGOT_PASSWORD",
                })
              : handleResend(`${otpId}`);
          }}
          disabled={isTimerRunning}
          loading={isSendingOtp}
          className="text-primary-500 ring-1 ring-primary-500 hover:bg-primary-400 hover:text-white hover:ring-0"
        >
          RESEND OTP
        </Button>
        <p className="flex items-center gap-1 text-sm font-semibold text-primary-500">
          <span>Time to resend:</span>
          <span>{`${timer}`}</span>
        </p>
      </div>
    </div>
  );
}

export default Otp;
