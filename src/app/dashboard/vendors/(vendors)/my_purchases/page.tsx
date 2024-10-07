"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CloseIcon, CreditCardGreenFilledIcon } from "@/assets";
import { QUERY_KEYS } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
// eslint-disable-next-line import/no-extraneous-dependencies
import _debounce from "lodash.debounce";

import { cancelOrder, cancelOrderReqData } from "@/lib/app/orders/services";
import { getUserOrderDetails, getUserOrders } from "@/lib/app/user/services";
import useTableParams from "@/lib/common/fetcher";
import queryClient from "@/lib/reactQuery/queryClient";
import { useAmount } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import GoBack from "@/components/goBack";
import DotLoader from "@/components/loaders/dotLoader";
import { Typography } from "@/components/typography";
import { notify } from "@/app/(root)/_components/notifications/notify";

import { columns, ITransactionItem } from "./columns";
import { DataTable } from "./data-table";

export default async function MyPurchases() {
  const { tableParams, setTableParams } = useTableParams();
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [order, setOrderData] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const { data, isFetching: isFetchingHistory } = useQuery(
    {
      queryKey: [
        QUERY_KEYS.GET_PURCHASES,
        {
          keyword: searchText,
          page: tableParams.pagination.pageNumber + 1,
          limit: tableParams.pagination.pageSize,
        },
      ],
      queryFn: getUserOrders,
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
        QUERY_KEYS.GET_ORDERS_VENDOR,
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
  const handleSearch = _debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
    },
    1000,
  );
  const { convertToAmountInNaira } = useAmount();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: { batchId: string }) =>
      await cancelOrder({ ...data }),
    onSuccess: async (data) => {
      if (data?.status === "success") {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_PURCHASES],
        });
        notify.success({ message: "Shipment successfully cancelled" });
        setShowDialog(false);
        setOrderData({});
      }
    },
    onError: async (err) =>
      notify.error({
        message: "Unable to cancel shipment",
        subtitle: err?.message,
      }),
  });
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
      label: "Vendor",
      value: getOrderDetail?.[0]?.businessName,
    },
    {
      label: "Status of order",
      value: getOrderDetail?.[0]?.status,
    },
  ];
  if (isFetchingHistory) {
    return (
      <div className="m-auto flex h-screen w-full items-center justify-center">
        <DotLoader />
      </div>
    );
  }

  return (
    <div className="container mx-auto pb-10 ">
      <div className="mb-8">
        <GoBack text="My Purchases" noMargin />
      </div>
      {!data?.data?.allOrders.length ? (
        <DataTable
          columns={columns}
          data={data?.data?.allOrders ?? []}
          onChange={handleSearch}
          currentPage={tableParams.pagination.pageNumber}
          totalPages={tableParams.pagination.totalPage!}
          setCurrentPage={setCurrentPage}
          icon={
            <div className="flex h-[71px] w-[71px] items-center justify-center rounded-full bg-[#FAF8F3]">
              <CreditCardGreenFilledIcon />
            </div>
          }
          onRowItemClick={(val: any) => {
            setOrderData(val?.original);
            setTrackingId(val?.original?.trackingId);
            setIsOpenDetailsModal(true);
          }}
          description="No Purchased Item Yet"
          isLoading={isFetchingHistory}
          className="cursor-pointer"
        />
      ) : (
        <div className="flex min-h-[calc(100vh_-_160px)] w-full  flex-col items-center justify-center gap-3">
          <span>No Purchased Item Yet</span>
          <div className="flex h-[71px] w-[71px] items-center justify-center rounded-full bg-[#FAF8F3]">
            <CreditCardGreenFilledIcon />
          </div>
        </div>
      )}
      <div>
        <Modal
          isOpen={isOpenDetailsModal}
          closeModal={() => {
            setIsOpenDetailsModal(false);
          }}
        >
          <div
            className="hideScrollBar flex w-full max-w-[400px]  flex-col items-center  justify-center gap-6 overflow-y-auto rounded-[40px] border-[1px] border-[#0000001A] bg-white px-[30px] py-[20px] shadow-xl "
            style={{
              boxShadow:
                "0px 0px 1px 0px #091E424F, 0px 8px 12px 0px #091E4226",
            }}
          >
            <span className="text-lg font-semibold">Order Information</span>
            <div className="flex items-center gap-2">
              <Image
                src={getOrderDetail?.[0]?.productPicture || ""}
                height={50}
                width={100}
                alt="Product Image"
              />
              <span className="text-sm sm:text-base ">
                {getOrderDetail?.[0]?.productName}
              </span>
            </div>
            <div>
              {orderDetails?.map((v) => {
                return (
                  <div
                    className=" justify-betwenn flex  w-full flex-col "
                    key={Math.random()}
                  >
                    <div className=" my-3 grid w-full grid-cols-2 break-words  ">
                      <div className="flex justify-start ">
                        <span className="text-sm font-semibold">
                          {v?.label}
                        </span>
                      </div>
                      <div className="flex  flex-wrap justify-start break-words">
                        <span className="max-w-full break-words break-all text-xs">
                          {v?.value}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex w-full items-center justify-between gap-2 ">
              {getOrderDetail?.[0]?.status.toLowerCase() === "placed" && (
                <button
                  className=" ring-solid w-full cursor-pointer rounded-lg py-[14px] text-xs font-semibold text-green-600 ring-[1px] ring-green-600 hover:bg-green-600 hover:text-white"
                  onClick={() => {
                    setShowDialog(true);
                    return setIsOpenDetailsModal(false);
                  }}
                >
                  Cancel order
                </button>
              )}
              {getOrderDetail?.[0]?.status.toLowerCase() === "delivered" && (
                <Link
                  // @ts-expect-error
                  href={`/dashboard/vendors/my_purchases/request-claim/${order?._id}`}
                  className=" ring-solid w-full cursor-pointer rounded-lg py-[14px] text-xs font-semibold text-green-600 ring-[1px] ring-green-600 hover:bg-green-600 hover:text-white"
                  onClick={() => setIsOpenDetailsModal(false)}
                >
                  Request return
                </Link>
              )}
              <a
                href={orderDetailsData?.data?.trackingUrl ?? "#"}
                target="_blank"
                className=" ring-solid w-full cursor-pointer rounded-lg bg-green-600 py-[14.5px] text-xs font-semibold text-white ring-[1px] ring-green-600 hover:bg-transparent hover:text-green-600"
                onClick={() => setIsOpenDetailsModal(false)}
              >
                Track
              </a>
            </div>
          </div>
        </Modal>
        <Modal isOpen={showDialog} closeModal={() => setShowDialog(false)}>
          <ConfirmCancelOrderDialog
            canceling={isPending}
            // @ts-expect-error
            handleDelete={() => mutate({ batchId: order?.batchId })}
            showModal={showDialog}
            setShowModal={(show: boolean) => {
              setShowDialog(show);
              setOrderData({});
            }}
          />
        </Modal>
      </div>
    </div>
  );
}

interface ConfirmDialogProps {
  canceling: boolean;
  handleDelete: () => void;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  confirmationMessage?: string;
}
function ConfirmCancelOrderDialog({
  canceling,
  handleDelete,
  showModal,
  setShowModal,
  confirmationMessage = "Are you sure you want to cancel your order",
}: ConfirmDialogProps) {
  return (
    <div
      className={`hideScrollBar flex w-full  max-w-[473px] flex-col items-center justify-center gap-2 overflow-y-auto rounded-[17px] bg-white px-[44px] py-[49px] `}
      style={{
        boxShadow: "0px 0px 1px 0px #091E424F, 0px 8px 12px 0px #091E4226",
      }}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <Typography
          variant="body-1"
          className=" text-xl !font-bold md:!text-2xl"
          fontWeight={"bold"}
        >
          Cancel Order
        </Typography>
      </div>

      <h3 className="w-full text-center">{confirmationMessage}</h3>
      <div className="mt-6 flex w-full max-w-[300px] items-center justify-center gap-6">
        {canceling ? (
          <Button variant="destructive" className="w-full" disabled loading>
            Canceling
          </Button>
        ) : (
          <>
            <Button className="w-full" onClick={() => setShowModal(!showModal)}>
              No
            </Button>
            <Button
              className="w-full "
              onClick={handleDelete}
              variant={"destructive"}
            >
              YES
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
