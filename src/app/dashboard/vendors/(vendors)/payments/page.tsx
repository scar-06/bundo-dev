"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CreditCardGreenFilledIcon } from "@/assets";
import { QUERY_KEYS } from "@/utils";
import { useQuery } from "@tanstack/react-query";
// eslint-disable-next-line import/no-extraneous-dependencies
import _debounce from "lodash.debounce";

import { getPayments } from "@/lib/app/user/services";
import useTableParams from "@/lib/common/fetcher";
import queryClient from "@/lib/reactQuery/queryClient";
import GoBack from "@/components/goBack";
import VendorsEmptyState from "@/app/dashboard/customers/(customers)/_components/vendorsEmptyState";

import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function DemoPage() {
  const searchparams = useSearchParams();
  const reference = searchparams.get("reference");

  const { tableParams, setTableParams } = useTableParams();
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(0);

  const { data, isFetching: isFetchingHistory } = useQuery(
    {
      queryKey: [
        QUERY_KEYS.PAYMENTS,
        {
          keyword: searchText,
          page: tableParams.pagination.pageNumber + 1,
          limit: tableParams.pagination.pageSize,
        },
      ],
      queryFn: getPayments,
      enabled: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
    queryClient,
  );

  const {
    data: verifyPaymentData,
    isFetching: isVerifyingPayment,
    isSuccess,
    status,
  } = useQuery(
    {
      queryKey: [
        QUERY_KEYS.VERIFY_PAYMENT,
        {
          reference,
        },
      ],
      queryFn: getPayments,
      enabled: !!reference,
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
    <div className="container mx-auto mb-20  pb-20">
      <div className="mb-8 max-w-[150px]">
        <GoBack text="My Payments" noMargin />
      </div>
      {data?.data && data?.data?.transactions.length < 1 ? (
        <div className="flex min-h-[calc(100vh_-_300px)] w-full  flex-col items-center justify-center gap-3">
          <VendorsEmptyState
            descriptionOne="No Payment History Yet"
            icon={<CreditCardGreenFilledIcon />}
          />
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={(data?.data?.transactions as any) ?? []}
          onChange={handleSearch}
          currentPage={tableParams.pagination.pageNumber}
          totalPages={tableParams.pagination.totalPage!}
          setCurrentPage={setCurrentPage}
          icon={
            <div className="flex h-[71px] w-[71px] items-center justify-center rounded-full bg-[#FAF8F3]">
              <CreditCardGreenFilledIcon />
            </div>
          }
          description="No Payment  Yet"
          isLoading={isFetchingHistory}
        />
      )}
    </div>
  );
}
