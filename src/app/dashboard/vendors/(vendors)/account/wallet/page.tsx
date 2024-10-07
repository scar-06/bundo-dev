"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CreditCardFilledIcon,
  CreditCardGreenFilledIcon,
  GreenLocationIcon,
  PayBankAcctIcon,
  ViewBankAcctIcon,
  WalletIcon,
} from "@/assets";
import { useUserStore } from "@/store/user.store";
import { QUERY_KEYS } from "@/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
// eslint-disable-next-line import/no-extraneous-dependencies
import _debounce from "lodash.debounce";
import { useStore } from "zustand";

import { getWallet, getWalletHistory } from "@/lib/app/vendors/services";
import { useAmount } from "@/lib/utils";
import GoBack from "@/components/goBack";
import VendorsEmptyState from "@/app/dashboard/customers/(customers)/_components/vendorsEmptyState";

import { DataTable } from "../../orders/data-table";
import SelectDropDown, { IBankAccount } from "./_components/selectDropDown";
import { columns, IWalletTransactionItem } from "./column";

const filterItems = [
  { label: "This Month", value: "monthly" },
  { label: "This Day", value: "daily" },
  { label: "This Week", value: "weekly" },
];

export default function Wallet() {
  const { user } = useStore(useUserStore, (state) => state);
  const [moneyFilter, setMoneyFilter] = useState({
    label: "This Month",
    value: "monthly",
  });

  const [searchText, setSearchText] = React.useState("");

  const handleMoneyFilterChange = (newFilter: any) => {
    setMoneyFilter(newFilter);
  };

  const queryClient = useQueryClient();
  const {
    data: dataItems,
    isFetching,
    isError,
  } = useQuery(
    {
      queryKey: [QUERY_KEYS.PRODUCTS, { range: moneyFilter?.value }],
      queryFn: getWallet,
      enabled: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
    queryClient,
  );

  const { data: walletHistory, isFetching: isFetchingHistory } = useQuery(
    {
      queryKey: [QUERY_KEYS.WALLET_HISTORY, { keyword: searchText }],
      queryFn: getWalletHistory,
      enabled: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
    queryClient,
  );

  const handleSearch = _debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
    },
    1000,
  );

  const get5WalletHistories = walletHistory?.data?.histories.slice(0, 5);

  const { convertToAmount, convertToAmountInNaira } = useAmount();

  return (
    <div className="w-full  lg:px-16 xlg:px-0">
      <div className="flex items-center justify-between">
        <div className="flex w-full max-w-sm">
          <GoBack text="Wallet" noMargin />
        </div>
      </div>
      <div className="mb-3 mt-6 flex justify-between">
        <div className="flex items-center gap-3">
          <div className="isolate flex aspect-square w-[clamp(50px,_8vw,_50px)] items-center justify-center rounded-full border-[1px] border-[#0000007A]">
            <span className="font-bold text-[#000]">
              {user?.firstName?.slice(0, 1)}
            </span>
          </div>
          <span className="text-[12px]">{`Hi ${user?.firstName}!`}</span>
        </div>
        <div className="hidden gap-4 lg:flex xlg:flex">
          <Link
            className="flex cursor-pointer items-center gap-2 rounded-lg border-[1px] border-[#0000001A] px-6 py-1 shadow-sm shadow-[#0000000D] hover:bg-[#F5FBFE]"
            href="/dashboard/vendors/account/wallet/view_bank_account"
          >
            <span className="text-[12px] font-semibold">
              View all Bank Account
            </span>
          </Link>
          <Link
            className="flex cursor-pointer items-center gap-2 rounded-lg border-[1px] border-[#0000001A] px-6 py-1 shadow-sm shadow-[#0000000D] hover:bg-[#F5FBFE]"
            href="/dashboard/vendors/account/wallet/pay_to_bank_account"
          >
            <span className="text-[12px] font-semibold">
              Pay to my Bank Account
            </span>
          </Link>
          {/* <div className="flex cursor-pointer items-center gap-2 rounded-lg border-[1px] border-[#0000001A] px-3 py-1 shadow-sm shadow-[#0000000D]">
            <SelectDropDown
              variant="plain"
              onFilterChange={handleFilterChange}
              currentFilter={currentFilter}
              title="Pay to my Bank Account"
            />
          </div> */}
          <Link
            className="flex cursor-pointer items-center gap-2 rounded-lg border-[1px] border-[#0000001A] px-6 py-1 shadow-sm shadow-[#0000000D] hover:bg-[#F5FBFE]"
            href="/dashboard/vendors/account/wallet/add_bank_account"
          >
            <span className="text-[12px] font-semibold">
              Add a Bank Account
            </span>
            <div className="isolate flex aspect-square h-[24px] w-[clamp(24px,_3vw,_24px)] items-center justify-center rounded-full bg-[#34A853]  py-3 text-[#fff]">
              +
            </div>
          </Link>
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div
          style={{
            backgroundImage: "url('/bundoPatterns.png')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "repeat",
            backgroundOrigin: "padding-box",
          }}
          className="my-6 flex h-[211px] w-full flex-col items-center justify-center rounded-[20px] bg-[#34A853] px-5 text-[#fff] lg:w-[clamp(280px,_8vw,_280px)] xlg:w-[clamp(340px,_8vw,_340px)]"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[12px]">Available balance</span>
            <div className="flex flex-col gap-1">
              <div className="relative">
                <span className="text-4xl font-semibold">
                  <span className="text-[14px]">NGN</span>
                  {convertToAmount(dataItems?.data?.wallet?.main_bal ?? 0)}
                </span>
              </div>
              <div className="flex justify-center gap-1 rounded-[20px] bg-[#FFFFFF57] px-2 py-1 text-[13px]">
                <span>Book balance</span>
                <span>
                  {convertToAmountInNaira(
                    dataItems?.data?.wallet?.book_bal ?? 0,
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundImage: "url('/bundoPatterns.png')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "repeat",
            backgroundOrigin: "padding-box",
          }}
          className="my-6 hidden h-[211px] w-[clamp(280px,_8vw,_280px)] flex-col  items-center rounded-[20px] bg-[#34A853] px-5 text-[#fff] lg:flex xlg:flex xlg:w-[clamp(340px,_8vw,_340px)]"
        >
          <div className="my-4 flex w-full justify-end">
            <SelectDropDown
              onFilterChange={handleMoneyFilterChange}
              currentFilter={moneyFilter}
              items={filterItems}
              identify="This month"
              variant="white"
            />
          </div>
          <div className="flex w-full flex-col items-center gap-2">
            <span className="text-[12px]">Money in</span>
            <div className="flex flex-col gap-1">
              <div className="relative">
                <span className="text-4xl font-semibold">
                  <span className="text-[14px]">NGN</span>
                  {convertToAmount(dataItems?.data?.analytics?.maoneyIn?.[0])}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundImage: "url('/bundoPatterns.png')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "repeat",
            backgroundOrigin: "padding-box",
          }}
          className="my-6 hidden h-[211px] flex-col items-center rounded-[20px] bg-[#34A853] px-5 text-[#fff] lg:flex lg:w-[clamp(280px,_8vw,_280px)] xlg:flex xlg:w-[clamp(340px,_8vw,_340px)]"
        >
          <div className="my-4 flex w-full justify-end">
            <SelectDropDown
              onFilterChange={handleMoneyFilterChange}
              currentFilter={moneyFilter}
              items={filterItems}
              identify="This month"
              variant="white"
            />
          </div>
          <div className="flex w-full flex-col items-center gap-2">
            <span className="text-[12px]">Money out</span>
            <div className="flex flex-col gap-1">
              <div className="relative">
                <span className="text-4xl font-semibold">
                  <span className="text-[14px]">NGN</span>
                  {convertToAmount(
                    dataItems?.data?.analytics?.moneyOut?.[0]?.total ?? 0,
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-full w-full items-center justify-between gap-2 lg:hidden xlg:hidden">
        <Link
          href="/dashboard/vendors/account/wallet/pay_to_bank_account"
          className="mb-6 mt-3 flex cursor-pointer flex-col items-center gap-2"
        >
          <div className="flex h-[48px] w-[clamp(49px,_5vw,_49px)] items-center justify-center rounded-lg border-[1px] border-[#D9D9D9CC] p-3">
            <div className="isolate flex aspect-square h-[25px] w-[clamp(25px,_5vw,_25px)] items-center justify-center rounded-full bg-[#34A853] p-[6px]">
              <PayBankAcctIcon />
            </div>
          </div>
          <span className=" whitespace-nowrap text-center text-[9px] font-medium">
            Pay to my Bank Account
          </span>
        </Link>
        <Link
          href="/dashboard/vendors/account/wallet/add_bank_account"
          className="mb-6 mt-3 flex flex-col items-center gap-2"
        >
          <div className="flex h-[48px] w-[clamp(49px,_5vw,_49px)] items-center justify-center rounded-lg border-[1px] border-[#D9D9D9CC] p-3">
            <div className="isolate flex aspect-square h-[24px] w-[clamp(24px,_3vw,_24px)] items-center justify-center rounded-full bg-[#34A853] py-3 text-[#fff]">
              +
            </div>
          </div>
          <span className="whitespace-nowrap text-center text-[9px] font-medium">
            Add a bank account
          </span>
        </Link>
        <Link
          href="/dashboard/vendors/account/wallet/view_bank_account"
          className="mb-6 mt-3 flex flex-col items-center gap-2"
        >
          <div className="flex h-[48px] w-[clamp(49px,_5vw,_49px)] items-center justify-center rounded-lg border-[1px] border-[#D9D9D9CC] p-3">
            <div className="isolate flex aspect-square h-[25px] w-[clamp(25px,_5vw,_25px)] items-center justify-center rounded-full bg-[#34A853] p-[6px]">
              <ViewBankAcctIcon />
            </div>
          </div>
          <span className="whitespace-nowrap text-center text-[9px] font-medium">
            View all bank accounts
          </span>
        </Link>
      </div>
      <div className="mb-6 flex items-center justify-between">
        <span className="text-[12px]">Wallet History</span>
        <Link href="/dashboard/vendors/account/wallet/all_transaction">
          <button className="text-[12px] underline">see all</button>
        </Link>
      </div>
      <div className="hidden w-full lg:block xlg:block">
        <DataTable
          columns={columns}
          data={get5WalletHistories ?? []}
          filterBy={false}
          items={["This month", "This year"]}
          identify="This month"
          isPagination={false}
          onChange={handleSearch}
          showSearchFilter={false}
          isLoading={isFetchingHistory}
          icon={
            <div className="flex h-[71px] w-[71px] items-center justify-center rounded-full bg-[#FAF8F3]">
              <CreditCardGreenFilledIcon />
            </div>
          }
          description="No Wallet History Yet"
        />
      </div>
      <div className="flex flex-col gap-4 lg:hidden xlg:hidden">
        {get5WalletHistories && get5WalletHistories?.length < 1 ? (
          <div className="mb-28 mt-6">
            <VendorsEmptyState
              icon={<CreditCardGreenFilledIcon />}
              descriptionOne="No Wallet History Yet"
            />
          </div>
        ) : (
          get5WalletHistories?.map((v) => (
            <div
              className="flex w-full items-center justify-between"
              key={Math.random()}
            >
              <div className="flex gap-2">
                <div className="isolate flex aspect-square h-[43px] w-[clamp(43px,_8vw,_43px)] items-center justify-center rounded-full bg-[#F3D9D9] text-[#fff]">
                  <CreditCardFilledIcon />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[12px]">{v?.remark}</span>
                  <span className="text-[10px] text-[#AAAAAA]">
                    {format(new Date(v?.createdAt), "dd MMMM, yyyy • hh:mm a")}
                  </span>
                </div>
              </div>
              <span className="text-base font-semibold">
                {v?.transactionType === "Debit"
                  ? `-${convertToAmountInNaira(v?.amount)}`
                  : v?.transactionType === "Credit" &&
                    `+${convertToAmountInNaira(v?.amount)}`}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
