"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CloseIcon, ErrorAlertIcon, SuccessIcon } from "@/assets";
import { useUserStore } from "@/store/user.store";
import { QUERY_KEYS } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LoaderIcon } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { useStore } from "zustand";

import { SendOTPSchema } from "@/lib/app";
import { createBankCredentialstValidationSchema } from "@/lib/app/products/schema";
import {
  addBankAccount,
  getListSupportedBanks,
  IUpdatWithdrawaleAccount,
  UpdateWithdrawalAccountRes,
  verifyBankAccount,
} from "@/lib/app/vendors/services";
import queryClient from "@/lib/reactQuery/queryClient";
import useOtp from "@/hooks/useOtp";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import FormTextInput from "@/components/forms/formTextInput";
import { MultiSearchSelect } from "@/components/forms/multiSelect";
import GoBack from "@/components/goBack";
import { notify } from "@/app/(root)/_components/notifications/notify";
import Otp from "@/app/auth/_components/otp";

import SelectDropDown, { IBankAccount } from "../_components/selectDropDown";

export default function BankAccount() {
  const { user } = useStore(useUserStore, (state) => state);
  const [currentFilter, setCurrentFilter] = useState("");
  const [otpData, setOTPData] = useState<SendOTPSchema | null>(null);
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [mutatedata, setMutateData] = useState<IUpdatWithdrawaleAccount | null>(
    null,
  );
  const [showErrorModal, setShowErrorModal] = useState("");

  const handleFilterChange = (newFilter: IBankAccount) => {
    setCurrentFilter(newFilter.bankName);
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(createBankCredentialstValidationSchema),
  });

  const { bankName, accountNumber } = methods.watch();

  const { data, isFetching } = useQuery(
    {
      queryKey: [QUERY_KEYS.PAYMENT_FACILITATOR],
      queryFn: async () => getListSupportedBanks(),
      enabled: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 3,
    },
    queryClient,
  );

  const {
    data: verifyData,
    isFetching: isVerifyingData,
    error,
    isError,
  } = useQuery(
    {
      queryKey: [
        QUERY_KEYS.VERIFY_ACCOUNT,
        {
          accountNumber,
          bankCode: bankName?.value,
        },
      ],
      queryFn: async (params) =>
        verifyBankAccount({
          ...params,
        }),

      enabled: accountNumber?.length > 9 && !!bankName,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 3,
    },
    queryClient,
  );

  const {
    mutate,
    isPending,
    isSuccess,
    isError: isMutateError,
  } = useMutation({
    mutationFn: async (data: IUpdatWithdrawaleAccount) =>
      await addBankAccount({ ...data }),
    onSuccess: async (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.WITHDRAWAL_ACCOUNT],
      });
      setShowSuccessModal(true);
      setShowOtp(false);
      methods.reset();
    },
    onError: async (err) => {
      setShowErrorModal(
        err?.message || "Error while adding withdrawal account",
      );
      setShowOtp(false);
      methods.reset();
    },
  });

  const banksOptions = data?.data?.map(
    (bank: { bankName: string; bankCode: string }) => ({
      label: bank?.bankName,
      value: bank?.bankCode,
    }),
  );

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
    otpId: otpData?.otpId ?? "",
    otpFor: "sendOTP",
    purpose: "OTP",
  });

  useEffect(() => {
    if (
      isOtpVerified &&
      otpVerifyingResData?.status === "success" &&
      mutatedata
    ) {
      mutate(mutatedata);
    }
  }, [isOtpVerified, mutatedata]);

  useEffect(() => {
    if (isError) {
      notify.error(error);
    }
  }, [isError]);

  return (
    <div className="w-full lg:px-16 xlg:px-0">
      <div className="w-full">
        <div className="flex w-full max-w-md items-center justify-between pr-4">
          {" "}
          <GoBack text="Add a Bank Account" noMargin />
        </div>
        <div className="mb-6  hidden w-full  justify-end gap-4  lg:flex xlg:flex">
          <Link
            className="flex cursor-pointer items-center gap-2 rounded-lg border-[1px] border-[#0000001A] px-6 py-4 shadow-sm shadow-[#0000000D]"
            href="/dashboard/vendors/account/wallet/view_bank_account"
          >
            {" "}
            <span className="text-[12px] font-semibold">
              View all Bank Account
            </span>
          </Link>
          <Link
            className="flex cursor-pointer items-center gap-2 rounded-lg border-[1px] border-[#0000001A] px-6 py-4 shadow-sm shadow-[#0000000D]"
            href="/dashboard/vendors/account/wallet/pay_to_bank_account"
          >
            <span className="text-[12px] font-semibold">
              Pay to my Bank Account
            </span>
          </Link>
        </div>
        <div className="h-full w-full md:my-14">
          {showOtp && otpData?.otpId ? (
            <div className="w-full px-[-20px]">
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
                otpId={otpData?.otpId ?? ""}
                signUpStatus={false}
                otpFor={"verifyPhone"}
                buttonTxt="VERIFY OTP"
                width="100%"
              />
            </div>
          ) : (
            <div className="h-full w-full">
              {isSuccess && showSuccessModal ? (
                <div className="flex h-full w-full flex-col items-center justify-center ">
                  <div className="flex h-[300px] w-[350px] flex-col items-center gap-3 rounded-md p-6 shadow-lg">
                    <div
                      className="my-3 flex w-full cursor-pointer justify-end"
                      onClick={() => {
                        setShowSuccessModal(false);
                        methods.reset({});
                      }}
                    >
                      <CloseIcon />
                    </div>
                    <SuccessIcon />
                    <span className="text-[17px] font-medium">
                      Bank account saved successfully
                    </span>
                  </div>
                </div>
              ) : isMutateError && showErrorModal ? (
                <div className="flex h-full w-full flex-col items-center justify-center ">
                  <div className="flex h-[300px] w-[350px] flex-col items-center gap-3 rounded-md p-6 shadow-lg">
                    <div
                      className="my-3 flex w-full cursor-pointer justify-end"
                      onClick={() => {
                        setShowErrorModal("");
                        methods.reset({});
                      }}
                    >
                      <CloseIcon />
                    </div>
                    <div className="flex h-full w-full flex-col items-center ">
                      <div className="my-8">
                        <ErrorAlertIcon />
                        <span className="text-medium text-[15px]">Oopps!</span>
                      </div>

                      <span className="text-center text-[12px] text-[#808080]">
                        {showErrorModal}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className=" flex w-full justify-center ">
                  <div className="w-[458px] border-[#D9D9D9] md:border-[1px] md:p-6 ">
                    <FormProvider {...methods}>
                      <form
                        onSubmit={methods.handleSubmit(() => {
                          if (
                            (user?.vendorId?.phoneNumber?.length as number) < 1
                          ) {
                            return notify.error({
                              message:
                                "Please complete phone number verification on store",
                            });
                          }
                          setOTPData({
                            otpId: `${user?.vendorId?.phoneNumber}`,
                          });
                          handleResend(`${user?.vendorId?.phoneNumber}`);
                          setShowOtp(true);
                          return setMutateData({
                            bankName: bankName?.label,
                            accountName: verifyData?.data?.account_name ?? "",
                            accountNumber:
                              verifyData?.data?.account_number ?? "",
                            bankCode: bankName?.value,
                          });
                        })}
                      >
                        <div className=" mt-8 flex w-full flex-col gap-6">
                          {/* <AccordionInputWrapper title="Select Bank"> */}
                          <MultiSearchSelect
                            name="bankName"
                            label="Select Bank"
                            isMulti={false}
                            onChange={(value) =>
                              methods.setValue(
                                "bankName",
                                value as { label: string; value: string },
                              )
                            }
                            isSearchable
                            options={banksOptions || []}
                            isLoading={isFetching}
                          />
                          <div>
                            <FormTextInput
                              name="accountNumber"
                              labelText="Account Number"
                              placeholder="Account Number"
                              type="text"
                            />
                            {isVerifyingData ? (
                              <div className="mt-2 w-full justify-center">
                                <LoaderIcon />
                              </div>
                            ) : (
                              <div className="flex w-full items-center bg-[#FCFBF8] py-2">
                                {verifyData?.data?.account_name &&
                                  bankName?.label && (
                                    <span className="text-[12px]">
                                      {verifyData?.data?.account_name} -{" "}
                                      {accountNumber}
                                    </span>
                                  )}
                              </div>
                            )}
                          </div>

                          <Button
                            type="submit"
                            className="mt-8"
                            disabled={
                              !methods.formState.isValid ||
                              isError ||
                              isVerifyingData ||
                              !verifyData?.data?.account_name
                            }
                            loading={isPending}
                          >
                            REQUEST OTP
                          </Button>
                        </div>
                      </form>
                    </FormProvider>
                  </div>
                </div>
              )}
            </div>
            // <div className="h-full w-full">
            //   {isSuccess && showSuccessModal ? (
            //     <div className="flex h-full w-full flex-col items-center justify-center ">
            //       <div className="flex h-[300px] w-[350px] flex-col items-center gap-3 rounded-md p-6 shadow-lg">
            //         <div
            //           className="my-3 flex w-full cursor-pointer justify-end"
            //           onClick={() => {
            //             setShowSuccessModal(false);
            //             methods.reset({});
            //           }}
            //         >
            //           <CloseIcon />
            //         </div>
            //         <SuccessIcon />
            //         <span className="text-[17px] font-medium">
            //           Bank account saved successfully
            //         </span>
            //       </div>
            //     </div>
            //   ) : isMutateError && showErrorModal ? (
            //     <div className="flex h-full w-full flex-col items-center justify-center ">
            //       <div className="flex h-[300px] w-[350px] flex-col items-center gap-3 rounded-md p-6 shadow-lg">
            //         <div
            //           className="my-3 flex w-full cursor-pointer justify-end"
            //           onClick={() => {
            //             setShowErrorModal("");
            //             methods.reset({});
            //           }}
            //         >
            //           <CloseIcon />
            //         </div>
            //         <div className="flex h-full w-full flex-col items-center ">
            //           <div className="my-8">
            //             <ErrorAlertIcon />
            //             <span className="text-medium text-[15px]">Oopps!</span>
            //           </div>

            //           <span className="text-center text-[12px] text-[#808080]">
            //             {showErrorModal}
            //           </span>
            //         </div>
            //       </div>
            //     </div>
            //   ) : (
            //   <div className=" flex w-full justify-center ">
            //     <div className="w-[458px] border-[#D9D9D9] md:border-[1px] md:p-6 ">
            //       <FormProvider {...methods}>
            //         <form
            //           onSubmit={methods.handleSubmit(() => {
            //             setOTPData({ otpId: `+234${user?.phoneNumber}` });
            //             handleResend(`+234${user?.phoneNumber}`);
            //             setShowOtp(true);
            //             return setMutateData({
            //               bankName: bankName?.label,
            //               accountName: verifyData?.data?.account_name ?? "",
            //               accountNumber:
            //                 verifyData?.data?.account_number ?? "",
            //               bankCode: bankName?.value,
            //             });
            //           })}
            //         >
            //           <div className=" mt-8 flex w-full flex-col gap-6">
            //             {/* <AccordionInputWrapper title="Select Bank"> */}
            //             <MultiSearchSelect
            //               name="bankName"
            //               label="Select Bank"
            //               isMulti={false}
            //               onChange={(value) =>
            //                 methods.setValue(
            //                   "bankName",
            //                   value as { label: string; value: string },
            //                 )
            //               }
            //               isSearchable
            //               options={banksOptions || []}
            //               isLoading={isFetching}
            //             />
            //             <div>
            //               <FormTextInput
            //                 name="accountNumber"
            //                 labelText="Account Number"
            //                 placeholder="Account Number"
            //                 type="text"
            //               />
            //               {isVerifyingData ? (
            //                 <div className="mt-2 w-full justify-center">
            //                   <LoaderIcon />
            //                 </div>
            //               ) : (
            //                 <div className="flex w-full items-center bg-[#FCFBF8] py-2">
            //                   {verifyData?.data?.account_name &&
            //                     bankName?.label && (
            //                       <span className="text-[12px]">
            //                         {verifyData?.data?.account_name} -{" "}
            //                         {accountNumber}
            //                       </span>
            //                     )}
            //                 </div>
            //               )}
            //             </div>

            //             <Button
            //               type="submit"
            //               className="mt-8"
            //               disabled={
            //                 !methods.formState.isValid ||
            //                 isError ||
            //                 isVerifyingData ||
            //                 !verifyData?.data?.account_name
            //               }
            //               loading={isSuccess}
            //             >
            //               REQUEST OTP
            //             </Button>
            //           </div>
            //         </form>
            //       </FormProvider>
            //     </div>
            //   </div>
            // )}
            // </div>
          )}
        </div>
      </div>
    </div>
  );
}
