"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Close, CloseIcon, ErrorAlertIcon, SuccessIcon } from "@/assets";
import { useUserStore } from "@/store/user.store";
import { QUERY_KEYS } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LoaderIcon } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from "uuid";
import { useStore } from "zustand";

import { SendOTPSchema } from "@/lib/app";
import {
  createBankCredentialstValidationSchema,
  payToBankAccounttValidationSchema,
} from "@/lib/app/products/schema";
import {
  addBankAccount,
  createWithdrawal,
  getListSupportedBanks,
  getWallet,
  getWithdrawalAccounts,
  ICreateWithdrawalSchema,
  IUpdatWithdrawaleAccount,
  UpdateWithdrawalAccountRes,
  verifyBankAccount,
} from "@/lib/app/vendors/services";
import queryClient from "@/lib/reactQuery/queryClient";
import { useAmount } from "@/lib/utils";
import useOtp from "@/hooks/useOtp";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import FormTextInput from "@/components/forms/formTextInput";
import { MultiSearchSelect } from "@/components/forms/multiSelect";
import GoBack from "@/components/goBack";
import { notify } from "@/app/(root)/_components/notifications/notify";
import Otp from "@/app/auth/_components/otp";

import SelectDropDown, { IBankAccount } from "../_components/selectDropDown";

export default function PayToBankAccount() {
  const idempotencyKey = uuidv4();
  const { user } = useStore(useUserStore, (state) => state);
  const [currentFilter, setCurrentFilter] = useState("");
  const [bankData, setBankData] = useState<any[]>([]);
  const [otpData, setOTPData] = useState<SendOTPSchema | null>(null);
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [mutatedata, setMutatetData] = useState<ICreateWithdrawalSchema | null>(
    null,
  );
  const [showErrorModal, setShowErrorModal] = useState(false);
  const handleFilterChange = (newFilter: IBankAccount) => {
    setCurrentFilter(newFilter.bankName);
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(payToBankAccounttValidationSchema),
  });

  const {
    data,
    isFetching: isFetchingWallet,
    isError: isErrorWallet,
  } = useQuery(
    {
      queryKey: [QUERY_KEYS.PRODUCTS],
      queryFn: getWallet,
      enabled: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
    queryClient,
  );

  const { bankName, amount } = methods.watch();

  const {
    data: dataItems,
    isFetching,
    isError,
  } = useQuery(
    {
      queryKey: [QUERY_KEYS.WITHDRAWAL_ACCOUNT],
      queryFn: getWithdrawalAccounts,
      enabled: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
    queryClient,
  );

  const {
    mutate,
    isPending,

    isSuccess,
    isError: isMutateError,
  } = useMutation({
    mutationFn: async (data: ICreateWithdrawalSchema) =>
      await createWithdrawal({ ...data }),
    onSuccess: async (data) => {
      setShowOtp(false);
      methods.reset();
      setShowSuccessModal(true);
      queryClient.refetchQueries({ queryKey: [QUERY_KEYS.WITHDRAWAL_ACCOUNT] });
    },
    onError: async (err) => {
      setShowErrorModal(true);
      setShowOtp(false);
      methods.reset();
    },
  });

  const banksOptions = dataItems?.data?.map(
    (bank: {
      bankName: string;
      accountNumber: string;
      accountName: string;
    }) => ({
      label: bank?.bankName,
      accountNumber: bank?.accountNumber,
      accountName: bank?.accountName,
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
    otpFor: "verifyPhone",
    purpose: "OTP",
  });

  const { main_bal } = data?.data?.wallet || {};

  const isValidate = (amount: number, walletBalance: number) => {
    if (amount > walletBalance || amount < 0) return true;
    return false;
  };

  useEffect(() => {
    if (
      isOtpVerified &&
      otpVerifyingResData?.status === "success" &&
      mutatedata
    ) {
      mutate(mutatedata);
    }
  }, [isOtpVerified]);

  useEffect(() => {
    if (bankName?.label) {
      methods.setValue("accountNumber", bankName?.accountNumber);
    }
  }, [bankName?.label]);
  return (
    <div className="w-full lg:px-16 xlg:px-0">
      <div className="w-full">
        <div className="flex w-full max-w-md items-center justify-between pr-4">
          <div className="max-w-[250px]">
            {" "}
            <GoBack text="Withdraw to bank account" />
          </div>
        </div>
        <div className="mb-6  hidden w-full  justify-end gap-4  lg:flex xlg:flex">
          <Link
            className="flex cursor-pointer items-center gap-2 rounded-lg border-[1px] border-[#0000001A] px-6 py-3 shadow-sm shadow-[#0000000D]"
            href="/dashboard/vendors/account/wallet/view_bank_account"
          >
            {" "}
            <span className="text-[12px] font-semibold">
              View all Bank Account
            </span>
          </Link>
          <Link
            className="flex cursor-pointer items-center gap-2 rounded-lg border-[1px] border-[#0000001A] px-6 py-3 shadow-sm shadow-[#0000000D]"
            href="/dashboard/vendors/account/wallet/add_bank_account"
          >
            <span className="text-[12px] font-semibold">
              Add a Bank Account
            </span>
            <div className="isolate flex aspect-square h-[24px] w-[clamp(24px,_3vw,_24px)] items-center justify-center rounded-full bg-[#34A853] py-3 text-[#fff]">
              +
            </div>
          </Link>
          {/* <div className="flex  cursor-pointer items-center gap-2 rounded-lg border-[1px] border-[#0000001A] px-3 py-1 shadow-sm shadow-[#0000000D]">
            <SelectDropDown
              variant="plain"
              // onFilterChange={(v) => {}}
              onFilterChange={handleFilterChange}
              currentFilter={currentFilter}
              title="Pay to my Bank Account"
            />{" "}
          </div>{" "} */}
        </div>
        <div className="h-full w-full md:my-14">
          {showOtp && otpData?.otpId ? (
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
            />
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
                      Payment successfull
                    </span>
                  </div>
                </div>
              ) : isMutateError && showErrorModal ? (
                <div className="flex h-full w-full flex-col items-center justify-center ">
                  <div className="flex h-[300px] w-[350px] flex-col items-center gap-3 rounded-md p-6 shadow-lg">
                    <div
                      className="my-3 flex w-full cursor-pointer justify-end"
                      onClick={() => {
                        setShowErrorModal(false);
                        methods.reset({});
                      }}
                    >
                      <CloseIcon />
                    </div>
                    <ErrorAlertIcon />
                    <div className="text-center">
                      <span className="text-[17px] font-medium">
                        Insufficient fund
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
                          setOTPData({
                            otpId: `+234${user?.vendorId?.phoneNumber}`,
                          });
                          handleResend(`+234${user?.vendorId?.phoneNumber}`);
                          setShowOtp(true);
                          return setMutatetData({
                            amount: Number(amount) ?? 0,
                            accountNumber: bankName?.accountNumber ?? "",
                            idKey: idempotencyKey,
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
                                value as {
                                  label: string;
                                  accountNumber: string;
                                  accountName: string;
                                },
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
                              disabled
                            />
                            {bankName?.accountName && (
                              <div className="flex w-full items-center bg-[#FCFBF8] pt-2">
                                <span className="text-[12px]">
                                  {bankName?.accountName} -{" "}
                                  {bankName?.accountNumber}
                                </span>
                              </div>
                            )}
                          </div>
                          <div>
                            <FormTextInput
                              name="amount"
                              labelText="Amount to pay"
                              placeholder="Amount to pay"
                              type="number"
                            />
                            {amount > main_bal! && (
                              <span className="text-xs text-red-400">
                                You have exceeded the amount in your wallet
                              </span>
                            )}
                          </div>

                          <Button
                            type="submit"
                            className="mt-8"
                            disabled={
                              !methods.formState.isValid ||
                              isError ||
                              isFetching ||
                              !bankName?.accountName ||
                              isValidate(
                                amount,
                                data?.data?.wallet?.main_bal ?? 0,
                              )
                            }
                            loading={isSendingOtp || isVerifyingOtp}
                          >
                            {isFetching ? "Verifying OTP..." : "REQUEST OTP"}
                          </Button>
                        </div>
                      </form>
                    </FormProvider>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
