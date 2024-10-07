import React from "react";
import { CloseIcon, logo } from "@/assets";
import { formatCurrency } from "@/utils/helpers";

import { IDeliveryLocation, Order } from "@/lib/app/orders/services";
import GoBack from "@/components/goBack";
import { Typography } from "@/components/typography";
import ImageWrapper from "@/app/dashboard/vendors/(vendors)/_components/ImageWrapper";

import { Button } from "../button";
import { Modal } from "../modal";

type Props = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  estimatedTotal: number;
  roundTotal: number;
  discountedTotal: number;
  discount: number;
  cartTotal: number;
  address: IDeliveryLocation;
  orders: Order[];
  isPending: boolean;
  handleCheckout: () => Promise<void> | void;
};
function ReviewOrders({
  cartTotal,
  roundTotal,
  estimatedTotal,
  address,
  openModal,
  orders,
  discountedTotal,
  discount,
  setOpenModal,
  isPending,
  handleCheckout,
}: Props) {
  return (
    <Modal isOpen={openModal} closeModal={() => setOpenModal(false)}>
      <div className="hideScrollBar isolate mx-auto flex h-[95%] w-[95%] flex-col items-center rounded-xl  bg-white  px-4 py-4 font-tv2SansDisplay md:w-full md:max-w-[500px]">
        <div
          className="fixed right-0 top-0 z-[10] flex w-fit cursor-pointer justify-start rounded-full bg-white p-4 shadow-lg"
          onClick={() => setOpenModal(false)}
        >
          <CloseIcon />
        </div>
        <div className=" w-[90vw] px-6 py-4 md:w-[500px]">
          <div className={"flex w-full flex-col"}>
            <span
              className="w-[200px]"
              onClick={() => setOpenModal(!openModal)}
            >
              {" "}
              <GoBack text="Review your order" path="#" />
            </span>
            <div className="mx-auto mt-[20px]  w-[100%] rounded-md bg-[#f8f8f8] py-8 ">
              <div className="mx-auto mt-[0px] flex w-[95%] flex-col gap-6 md:gap-12">
                <Typography
                  variant="body-7"
                  className=" flex w-full items-center justify-between border-b border-solid  border-[#C9C2B6]  pb-2 "
                  fontWeight="bold"
                >
                  <span>Total Items in Cart</span>
                  <span> {formatCurrency(cartTotal ?? 0)}</span>
                </Typography>
              </div>
              {/* // orders list  */}
              <div className="hideScroolBar mx-auto my-[20px] grid h-[200px] w-[95%] grid-cols-1 gap-2 rounded-[20px]  border border-solid border-[#C9C2B6] p-2 sm:grid-cols-2 ">
                {orders
                  ?.map((a) => a.orders)
                  .flat()
                  .map((order) => {
                    return (
                      <div
                        key={order?.productId}
                        className="flex h-fit w-full  items-center justify-between bg-[#FCFBF8] p-2"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative h-[clamp(30px,_5vw,_40px)] w-[clamp(30px,_5vw,_40px)] overflow-hidden rounded-[5px] ">
                            <ImageWrapper
                              src={order?.picture}
                              fallbackSrc={logo}
                              alt="random food"
                              fill
                              className="aspect-square object-cover "
                            />
                          </div>
                          <Typography
                            color={"tertiary-deep-green-900"}
                            variant="body-9"
                            className={"!text-[#1A542A]"}
                          >
                            {order?.productName}
                          </Typography>
                        </div>
                        <span className="h-fit rounded-sm bg-tertiary-deep-green-950 p-[6px_7px] text-xs font-semibold text-white">
                          {formatCurrency(Number(order?.cost) * order.quantity)}
                        </span>
                      </div>
                    );
                  })}
              </div>

              <div className="mx-auto mt-[0px] flex w-[95%] flex-col gap-6 md:gap-12">
                <Typography
                  variant="body-7"
                  className=" flex w-full items-center justify-between border-b border-solid  border-[#C9C2B6]  pb-2 "
                  fontWeight="bold"
                >
                  <span>Total Delivery Estimate</span>
                  <span> {formatCurrency(estimatedTotal ?? 0)}</span>
                </Typography>
              </div>

              {/* // deliveryLoc  */}

              <div className="mx-auto mt-[20px] flex w-[95%] flex-col">
                <div className="mb-2">
                  <Typography fontWeight={"bold"}>Delivering to:</Typography>
                </div>
                <div className="mb-4">
                  <Typography className=" !text-sm  !font-medium">
                    {address.firstName + " " + address.lastName}
                  </Typography>
                  <Typography className="!text-sm">
                    {address?.address}
                  </Typography>
                  <Typography className="!text-sm">
                    +{address.phoneNumber.replace("+", "")}
                  </Typography>
                </div>

                <div className="mx-auto mt-[0px] flex w-[100%] flex-col gap-6 md:gap-12">
                  <Typography
                    variant="body-6"
                    className=" flex w-full items-center justify-between pb-2  "
                    fontWeight="bold"
                  >
                    <span className="text-red-500">DISCOUNT APPLIED</span>
                    <span className="text-red-500">
                      {" "}
                      -{formatCurrency(discount ?? 0)}
                    </span>
                  </Typography>
                </div>
                <div className="mx-auto mt-[0px] flex w-[100%] flex-col gap-6 md:gap-12">
                  <Typography
                    variant="body-6"
                    className=" flex w-full items-center justify-between border-b border-solid  border-[#C9C2B6]  pb-3 "
                    fontWeight="bold"
                  >
                    <span>TOTAL AMOUNT</span>
                    <span> {formatCurrency(discountedTotal ?? 0)}</span>
                  </Typography>
                </div>
              </div>
            </div>
            <div className="mt-[20px]">
              <Button
                loading={isPending}
                disabled={isPending}
                className="w-full"
                onClick={() => {
                  setOpenModal(false);
                  handleCheckout();
                }}
              >
                {isPending ? "Initiating payment..." : "Proceed to checkout"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ReviewOrders;
