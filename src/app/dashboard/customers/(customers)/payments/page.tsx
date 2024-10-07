"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CreditCardGreenFilledIcon } from "@/assets";
import { QUERY_KEYS } from "@/utils";
import { useQuery } from "@tanstack/react-query";
// eslint-disable-next-line import/no-extraneous-dependencies
import _debounce from "lodash.debounce";

import { getPayments } from "@/lib/app/user/services";
import useTableParams from "@/lib/common/fetcher";
import queryClient from "@/lib/reactQuery/queryClient";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import GoBack from "@/components/goBack";

import { columns, ITransactionItem } from "./columns";
import { DataTable } from "./data-table";

export default async function DemoPage() {
  const searchparams = useSearchParams();
  const reference = searchparams.get("reference");
  const { tableParams, setTableParams } = useTableParams();
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [verifyPayment, setVerifyPayment] = useState(false);

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
    status,
    isSuccess,
  } = useQuery(
    {
      queryKey: [
        QUERY_KEYS.VERIFY_PAYMENT,
        {
          reference,
        },
      ],
      queryFn: getPayments,
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
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8 max-w-[180px]">
        <GoBack text="My Payments" />
      </div>
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
    </div>
  );
}
