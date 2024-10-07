"use client";

import { useState } from "react";
import Image from "next/image";
import { CloseIcon, CreditCardGreenFilledIcon } from "@/assets";
import { QUERY_KEYS } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
// eslint-disable-next-line import/no-extraneous-dependencies
import _debounce from "lodash.debounce";

import {
  getOrdersForVendors,
  getUserOrderDetails,
} from "@/lib/app/user/services";
import useTableParams from "@/lib/common/fetcher";
import queryClient from "@/lib/reactQuery/queryClient";
import { useAmount } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import GoBack from "@/components/goBack";
import DotLoader from "@/components/loaders/dotLoader";
import PageLoader from "@/components/loaders/pageLoader";

import { columns, ITransactionItem } from "./columns";
import { DataTable } from "./data-table";

export default async function DemoPage() {
  const { tableParams, setTableParams } = useTableParams();
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [trackingId, setTrackingId] = useState("");

  const { data, isFetching: isFetchingHistory } = useQuery(
    {
      queryKey: [
        QUERY_KEYS.GET_ORDERS_VENDOR,
        {
          keyword: searchText,
          page: tableParams.pagination.pageNumber + 1,
          limit: tableParams.pagination.pageSize,
        },
      ],
      queryFn: getOrdersForVendors,
      enabled: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
    queryClient,
  );

  const getOrderDetail = data?.data?.allOrders?.filter(
    (item) => item?.trackingId === trackingId,
  );

  const { data: orderDetailsData, isFetching } = useQuery(
    {
      queryKey: [
        QUERY_KEYS.ORDER_DETAILS,
        {
          trackingId,
        },
      ],
      queryFn: getUserOrderDetails,
      enabled: !!trackingId,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
    queryClient,
  );

  const { convertToAmountInNaira } = useAmount();

  const handleSearch = _debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
    },
    1000,
  );

  const orderDetails = [
    {
      label: "Order Item",
      value: getOrderDetail?.[0]?.productName || "",
    },
    {
      label: "Order ID",
      value: getOrderDetail?.[0]?.orderId || "",
    },

    {
      label: "Tracking No",
      value: orderDetailsData?.data?.trackingId,
    },
    {
      label: "Tracking Url",
      value: (
        <div>
          <a
            className="  text-semibold text-primary-400 underline"
            href={orderDetailsData?.data?.trackingUrl ?? "#"}
          >
            Track
          </a>
        </div>
      ),
    },
    {
      label: "Amount",
      value: convertToAmountInNaira(getOrderDetail?.[0]?.cost || 0),
    },
    {
      label: "Date",
      value: format(orderDetailsData?.data?.createdAt || 0, "dd/MM/yyyy"),
    },
    {
      label: "Time",
      value: format(
        new Date(orderDetailsData?.data?.createdAt || 0),
        "hh:mm a",
      ),
    },
    {
      label: "Customer Name",
      value: getOrderDetail?.[0]?.customerName,
    },
    {
      label: "Status of order",
      value: getOrderDetail?.[0]?.status,
    },
  ];

  return (
    <div className="container mx-auto min-h-screen pb-8">
      <div className="mb-8 ">
        <GoBack text="Manage Orders" noMargin />
      </div>
      {(data?.data?.allOrders?.length as number) > 0 ? (
        <DataTable
          columns={columns}
          data={data?.data?.allOrders ?? []}
          onChange={handleSearch}
          currentPage={tableParams.pagination.pageNumber}
          totalPages={tableParams.pagination.totalPage!}
          setCurrentPage={setCurrentPage}
          onRowItemClick={(val: any) => {
            setTrackingId(val?.original?.trackingId);
            setIsOpenDetailsModal(true);
          }}
          icon={
            <div className="flex h-[71px] w-[71px] items-center justify-center rounded-full bg-[#FAF8F3]">
              <CreditCardGreenFilledIcon />
            </div>
          }
          description="No Ordered Item Yet"
          isLoading={isFetchingHistory}
          className="cursor-pointer"
        />
      ) : (
        <div className="flex min-h-[calc(100vh_-_200px)] w-full  flex-col items-center justify-center gap-3">
          <span>No orders yet</span>
          <div className="flex h-[71px] w-[71px] items-center justify-center rounded-full bg-[#FAF8F3]">
            <CreditCardGreenFilledIcon />
          </div>
        </div>
      )}
      <div>
        <Modal
          isOpen={isOpenDetailsModal}
          closeModal={() => {
            setTrackingId("");
            setIsOpenDetailsModal(false);
          }}
        >
          <div
            className="hideScrollBar flex w-full max-w-[400px]  flex-col  items-center justify-center  gap-6 overflow-y-auto rounded-[40px] border-[1px] border-[#0000001A] bg-white px-[30px] py-[20px] font-tv2SansDisplay shadow-xl "
            style={{
              boxShadow:
                "0px 0px 1px 0px #091E424F, 0px 8px 12px 0px #091E4226",
            }}
          >
            <span className="font-tv2SansDisplay text-lg">
              Order Information
            </span>
            {isFetchingHistory || isFetching ? (
              <div className="py-10">
                <DotLoader />
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3">
                  <Image
                    src={getOrderDetail?.[0]?.productPicture || ""}
                    height={50}
                    width={100}
                    alt="Product Image"
                  />
                  <span className="text-sm sm:text-base">
                    {getOrderDetail?.[0]?.productName}
                  </span>
                </div>
                <div>
                  {orderDetails?.map((v) => {
                    return (
                      <div
                        className="flex w-full flex-col justify-between"
                        key={Math.random()}
                      >
                        <div className="my-3 grid w-full grid-cols-2">
                          <div className="flex justify-start">
                            <span className="text-sm font-semibold">
                              {v?.label}
                            </span>
                          </div>
                          <div className="flex justify-start">
                            <span className="max-w-full break-words break-all text-xs">
                              {v?.value}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <Button
              className="w-full"
              variant="default"
              onClick={() => {
                setTrackingId("");
                setIsOpenDetailsModal(false);
              }}
            >
              Close
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
