"use client";

import { useState } from "react";
import { CreditCardFilledIcon, CreditCardGreenFilledIcon } from "@/assets";
import { QUERY_KEYS } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
// eslint-disable-next-line import/no-extraneous-dependencies
import _debounce from "lodash.debounce";

import { getWalletHistory } from "@/lib/app/vendors/services";
import useTableParams from "@/lib/common/fetcher";
import queryClient from "@/lib/reactQuery/queryClient";
import { useAmount } from "@/lib/utils";
import GoBack from "@/components/goBack";
import VendorsEmptyState from "@/app/dashboard/customers/(customers)/_components/vendorsEmptyState";

import { DataTable } from "../../../orders/data-table";
import { columns, IWalletTransactionItem } from "../column";

export default async function AllTransaction() {
  const { tableParams, setTableParams } = useTableParams();
  const [currentFilter, setCurrentFilter] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchText, setSearchText] = useState("");
  const { convertToAmountInNaira } = useAmount();

  const { data: walletHistory, isFetching: isFetchingHistory } = useQuery(
    {
      queryKey: [
        QUERY_KEYS.WALLET_HISTORY,
        {
          keyword: searchText,
          page: tableParams.pagination.pageNumber + 1,
          limit: tableParams.pagination.pageSize,
        },
      ],
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
  return (
    <div className="w-full lg:px-0 xlg:px-0">
      {" "}
      <GoBack text="Transaction History" noMargin />
      <div className="hidden w-full  lg:block xlg:block ">
        <DataTable
          columns={columns}
          data={walletHistory?.data?.histories || []}
          filterBy={false}
          items={["This month", "Next month"]}
          identify="This month"
          onChange={handleSearch}
          currentPage={tableParams.pagination.pageNumber}
          totalPages={tableParams.pagination.totalPage!}
          setCurrentPage={setCurrentPage}
          icon={
            <div className="flex h-[71px] w-[71px] items-center justify-center rounded-full bg-[#FAF8F3]">
              <CreditCardGreenFilledIcon />
            </div>
          }
          description="No Wallet History Yet"
          isLoading={isFetchingHistory}
          hideFilter
        />
      </div>
      <div className="flex h-full w-full flex-col gap-4 lg:hidden xlg:hidden ">
        {walletHistory?.data?.histories?.length === 0 ? (
          <div className="py-36">
            <VendorsEmptyState
              icon={<CreditCardGreenFilledIcon />}
              descriptionOne="No Wallet History Yet"
            />
          </div>
        ) : (
          walletHistory?.data?.histories?.map((v) => (
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
