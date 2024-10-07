"use client";

import { useState } from "react";
import Link from "next/link";
import { CreditCardFilledIcon, CreditCardGreenFilledIcon } from "@/assets";
import { useUserStore } from "@/store/user.store";
import { QUERY_KEYS } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";

import {
  DeleteWithdrawalAccountSchema,
  getWallet,
  getWithdrawalAccounts,
  removeWithdrawalAccount,
} from "@/lib/app/vendors/services";
import useStore from "@/hooks/useStateFromStore";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import GoBack from "@/components/goBack";
import PageLoader from "@/components/loaders/pageLoader";
import { notify } from "@/app/(root)/_components/notifications/notify";

import SelectDropDown, { IBankAccount } from "../_components/selectDropDown";
import ConfirmDialog from "../../../_components/confirmDialog";
import { EmptyState } from "./emptyState";

export default function ViewBankAccount() {
  const user = useStore(useUserStore, (state) => state);

  const [deleteId, setDeleteID] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const queryClient = useQueryClient();
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

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ _id }: DeleteWithdrawalAccountSchema) =>
      await removeWithdrawalAccount({ _id }),
    onSuccess: async (data) => {
      if (data?.status === "success") {
        notify.success({ message: "Bank account has been removed" });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.BUSINESS],
        });
        queryClient.refetchQueries({
          queryKey: [QUERY_KEYS.WITHDRAWAL_ACCOUNT],
        });

        setOpenDeleteModal(false);
        setDeleteID("");
      }
    },

    onError: async (err) => {
      notify.error({
        message: "Error while deleting a bank account",
        subtitle: err?.message,
      });
      setOpenDeleteModal(false);
    },
  });
  if (isFetching) {
    return <PageLoader />;
  }

  return (
    <div className="w-full lg:px-16 xlg:px-0">
      <div className="flex w-full max-w-md items-center justify-between pr-4">
        <div className="max-w-[250px]">
          {" "}
          <GoBack text="View all bank accounts" />
        </div>
      </div>
      <div className="my-6 hidden h-full w-full justify-end gap-4 lg:flex xlg:flex">
        <Link
          className="flex cursor-pointer items-center gap-2 rounded-lg border-[1px] border-[#0000001A] px-6 py-1 shadow-sm shadow-[#0000000D]"
          href="/dashboard/vendors/account/wallet/pay_to_bank_account"
        >
          <span className="text-[12px] font-semibold">
            Pay to my Bank Account
          </span>
        </Link>
        <Link
          className="flex cursor-pointer items-center gap-2 rounded-lg border-[1px] border-[#0000001A] px-6 py-3 shadow-sm shadow-[#0000000D]"
          href="/dashboard/vendors/account/wallet/add_bank_account"
        >
          {" "}
          <span className="text-[12px] font-semibold">Add a Bank Account</span>
          <div className="isolate flex aspect-square h-[24px] w-[clamp(24px,_3vw,_24px)] items-center justify-center rounded-full bg-[#34A853] py-3 text-[#fff]">
            +
          </div>
        </Link>{" "}
      </div>
      {!dataItems?.data?.length ? (
        <EmptyState
          icon={<CreditCardGreenFilledIcon />}
          description={`Hi ${user?.user?.firstName}, you haven’t added any bank accounts. Add a bank account to make easy withdrawals and manage your finances easily.`}
        />
      ) : (
        <div className="my-6">
          {deleteId ? (
            dataItems?.data?.map(
              (v) =>
                v?.accountNumber === deleteId && (
                  <div
                    key={v?.accountNumber}
                    className="mt-18 fle flex h-full w-full items-center justify-center"
                  >
                    <div className="mt-10  w-[clamp(453px,_8vw,_453px)] border-[1px] border-[#D9D9D9] px-6 pt-6">
                      <div className="flex w-full items-center justify-between">
                        <div className="flex gap-2">
                          <div className="isolate flex aspect-square h-[43px] w-[clamp(43px,_8vw,_43px)] items-center justify-center rounded-full bg-[#F3D9D9] text-[#fff]">
                            <CreditCardFilledIcon />
                          </div>
                          <div className="flex flex-col gap-2">
                            <span className="text-[12px]">
                              {v?.accountName || "--"}
                            </span>
                            <span className="text-[10px] text-[#AAAAAA]">
                              {v?.accountNumber || "--"}
                            </span>
                          </div>
                        </div>
                        <span className="my-1 flex text-sm font-semibold">
                          {v?.bankName || "--"}
                        </span>
                      </div>
                      <div className="mt-3 w-full border-[1px] border-[#D9D9D9]" />
                      <Button
                        className="my-6 w-full p-5"
                        onClick={() => setOpenDeleteModal(true)}
                      >
                        REMOVE ACCOUNT
                      </Button>
                    </div>
                  </div>
                ),
            )
          ) : (
            <>
              <span className=" text-[12px] font-semibold">Bank accounts</span>
              {isFetching ? (
                <PageLoader />
              ) : (
                <div className="my-3 flex max-w-lg flex-col rounded-lg lg:border-[1px] lg:border-[#D9D9D9] lg:p-6 lg:shadow-lg">
                  {dataItems?.data?.map(
                    ({ accountName, accountNumber, bankName }) => {
                      return (
                        <div
                          key={Math.random()}
                          className="flex cursor-pointer flex-col justify-center gap-2 py-3"
                          onClick={() => setDeleteID(accountNumber)}
                        >
                          <div className="flex gap-2">
                            <div className="isolate flex aspect-square h-[43px] w-[clamp(43px,_8vw,_43px)] items-center justify-center rounded-full bg-[#F3D9D9] text-[#fff]">
                              <CreditCardFilledIcon />
                            </div>
                            <div className="flex flex-col gap-2">
                              <span className="text-[12px]">
                                {accountName || "--"}
                              </span>
                              <span className="text-[10px] text-[#AAAAAA]">
                                {accountNumber || "--"}
                              </span>
                            </div>
                          </div>
                          <span className="my-1 flex text-sm font-semibold">
                            {bankName || "--"}
                          </span>
                          <div className="my-2 border-[1px] border-[#D9D9D9]" />
                        </div>
                      );
                    },
                  )}
                </div>
              )}
            </>
          )}
          <Modal
            isOpen={openDeleteModal}
            closeModal={() => setOpenDeleteModal(false)}
          >
            <ConfirmDialog
              deleting={false}
              handleDelete={() => mutate({ _id: deleteId })}
              showModal={openDeleteModal}
              setShowModal={() => setOpenDeleteModal(false)}
              width="md:w-[504px]"
            />
          </Modal>
        </div>
      )}
    </div>
  );
}
