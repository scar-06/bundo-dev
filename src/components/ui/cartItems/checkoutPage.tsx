"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Item, useCheckoutStore } from "@/store/checkout.store";
import { useUserStore } from "@/store/user.store";
import { APP_CONFIG } from "@/utils";
import { formatCurrency } from "@/utils/helpers";
import { useMutation } from "@tanstack/react-query";
import { useStore } from "zustand";

import {
  IDeliveryLocation,
  initCheckout,
  InitCheckoutReqData,
  Order,
  OrderItem,
} from "@/lib/app/orders/services";
import cn from "@/lib/utils";
import GoBack from "@/components/goBack";
import { Typography } from "@/components/typography";
import { notify } from "@/app/(root)/_components/notifications/notify";

import { Button } from "../button";
import { Modal } from "../modal";
import CustomerProtectionBanner from "./customerProtectionBanner";
import DeliveryDetails from "./deliveryDetails";
import DiscountContainer from "./discountContainer";
import EmptyCart from "./emptyCart";
import LogisticsContainer from "./logisticsContainer";
import ReviewOrders from "./reviewOrders";

function accumulateDeliveryEstimates(orders: Order[]): number {
  return orders.reduce((sum, order) => sum + order.deliveryEstimate, 0);
}
function accumulateOrderDeliveryEstimates(orders: OrderItem[]): number {
  return orders.reduce(
    (sum, order) => sum + Number(order.cost) * order.quantity,
    0,
  );
}

function CheckoutPageComponent() {
  const user = useStore(useUserStore, (state) => state.user);
  const role = user?.role;
  const checkoutStore = useStore(useCheckoutStore, (state) => state);

  const groupedCheckoutData = checkoutStore.getGroupedCheckoutByVendorId();

  const [selectedDeleiveryAddressId, setSelectedDeleiveryAddressId] =
    useState("");
  const [deliveryLoc, setDeliveryLoc] = useState<IDeliveryLocation | null>(
    null,
  );
  const [orders, setOrders] = useState<Order[]>([]);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [discount, setDiscount] = useState<number>(0);

  const getCartTotalSum = accumulateOrderDeliveryEstimates(
    orders.map((a) => a.orders).flat(),
  );
  const deliveryTotal = accumulateDeliveryEstimates(orders);

  const roundTotal = getCartTotalSum + deliveryTotal;

  const handleApplyDiscount = (value: number) => {
    setDiscount(value);
  };

  const discountedTotal = roundTotal - discount;

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: InitCheckoutReqData) =>
      await initCheckout(formData),
    onSuccess: async (response) => {
      // @ts-expect-error
      const { authorization_url } = response?.data;
      window.open(authorization_url, "_self");
    },
  });

  const handleCheckout = async () => {
    if (selectedDeleiveryAddressId === "" && !deliveryLoc) {
      notify.error({
        message: "Please select a delivery location",
      });
      return;
    }
    mutate({
      amount: roundTotal.toFixed(2).toString(),
      deliveryLocation: deliveryLoc as IDeliveryLocation,
      orders: orders,
      callbackUrl: `${APP_CONFIG.siteBaseUrl}dashboard/${role}s/${
        role === "vendor" ? "my_purchases" : "purchases"
      }`,
    });
  };

  const handleProceedConfrim = () => {
    setShowConfirmation(false);
    handleCheckout();
  };
  return groupedCheckoutData.length < 1 ? (
    <EmptyCart path={`/dashboard/${role}s/marketplace`} isCart />
  ) : (
    <>
      <div className=" w-ful container mb-20">
        <div className="w-[100px] ">
          <GoBack text="Go back" path={`/dashboard/${role}s/cart`} />
        </div>
        <div className="mx-auto mt-7 w-full max-w-[835px]">
          {/* delivery info and estimates  */}
          <div className="mb-4 rounded-[20px] bg-[#F8F8F8] px-[15px] py-[24px] sm:px-[30px]">
            {/* Delivery info */}
            <DeliveryDetails
              selectedDeleiveryAddressId={selectedDeleiveryAddressId}
              setSelectedDeleiveryAddressId={setSelectedDeleiveryAddressId}
              setDeliveryLoc={setDeliveryLoc}
            />
            {/* estimates per vendor  */}
            {selectedDeleiveryAddressId !== "" && (
              <LogisticsContainer
                data={groupedCheckoutData}
                addressCode={selectedDeleiveryAddressId}
                setOrders={setOrders}
                orders={orders}
              />
            )}
          </div>
          {/* order preview */}
          {orders?.length > 0 && (
            <ReviewOrders
              openModal={showOrderDetails}
              setOpenModal={setShowOrderDetails}
              address={deliveryLoc as IDeliveryLocation}
              orders={orders}
              roundTotal={roundTotal}
              discountedTotal={discountedTotal}
              discount={discount} // Pass the discounted total here
              cartTotal={getCartTotalSum}
              estimatedTotal={accumulateDeliveryEstimates(orders)}
              isPending={isPending}
              handleCheckout={
                orders?.length < groupedCheckoutData.length
                  ? () => {
                      setShowOrderDetails(false);
                      setShowConfirmation(true);
                    }
                  : handleCheckout
              }
            />
          )}

          {/* customer protection banner  */}
          <CustomerProtectionBanner />

          {/* discount coupon component  */}
          {/* <DiscountContainer
            applyDiscount={handleApplyDiscount}
            orderTotal={getCartTotalSum}
          /> */}

          {/* checkout trigger btn  */}
          {groupedCheckoutData?.length > 0 &&
            deliveryLoc &&
            orders?.length > 0 && (
              <div className="mt-[30px] flex w-full flex-col gap-6 md:mt-[60px] md:gap-12">
                <Typography
                  variant="body-7"
                  className=" flex w-full items-center justify-between border-b border-solid  border-[#C9C2B6] px-2 pb-6 "
                  fontWeight="semi-bold"
                >
                  <span>TOTAL AMOUNT TO PAY</span>
                  <span> {formatCurrency(discountedTotal)}</span>
                </Typography>

                <Button
                  loading={isPending}
                  disabled={isPending}
                  className="w-full"
                  onClick={
                    orders?.length < groupedCheckoutData.length
                      ? () => {
                          setShowConfirmation(true);
                        }
                      : () => setShowOrderDetails(true)
                  }
                >
                  {isPending ? "Initiating payment..." : "Proceed to checkout"}
                </Button>
              </div>
            )}
        </div>
      </div>
      <Modal
        isOpen={showConfirmation}
        closeModal={() => setShowConfirmation(false)}
      >
        <ConfirmProceedToOrdersCheckoutDialog
          handleDelete={handleProceedConfrim}
          showModal={showConfirmation}
          setShowModal={setShowConfirmation}
          failedOrders={() => {
            const successOrderIds = orders.map((order) => order.businessId);
            const fOrders = groupedCheckoutData.filter(
              (order) => !successOrderIds.includes(order.businessId),
            );
            return fOrders;
          }}
        />
      </Modal>
    </>
  );
}

export default CheckoutPageComponent;

interface ConfirmDialogProps {
  handleDelete: () => void;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  confirmationMessage?: string;
  failedOrders: () => {
    businessId: string;
    items: Item;
  }[];
}
function ConfirmProceedToOrdersCheckoutDialog({
  failedOrders,
  handleDelete,
  showModal,
  setShowModal,
  confirmationMessage = "Delivery is currently unavailable for the following vendor(s) so checkout cannot be completed now for items purchased from the vendor(s)",
}: ConfirmDialogProps) {
  return (
    <div
      className={`hideScrollBar flex w-full  max-w-[473px] flex-col items-center justify-center gap-2 overflow-y-auto rounded-[17px] bg-white px-[20px] py-[49px] `}
      style={{
        boxShadow: "0px 0px 1px 0px #091E424F, 0px 8px 12px 0px #091E4226",
      }}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <svg
          width="39"
          height="40"
          viewBox="0 0 39 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M30.8778 11.9396H26.0015V10.3142C26.0015 8.58986 25.3165 6.93612 24.0972 5.71681C22.8779 4.4975 21.2241 3.8125 19.4998 3.8125C17.7754 3.8125 16.1217 4.4975 14.9024 5.71681C13.6831 6.93612 12.9981 8.58986 12.9981 10.3142V11.9396H8.12177C7.69068 11.9396 7.27724 12.1109 6.97242 12.4157C6.66759 12.7206 6.49634 13.134 6.49634 13.5651V31.4448C6.49634 32.7381 7.01009 33.9784 7.92457 34.8929C8.83905 35.8073 10.0794 36.3211 11.3726 36.3211H27.6269C28.9202 36.3211 30.1605 35.8073 31.075 34.8929C31.9895 33.9784 32.5032 32.7381 32.5032 31.4448V13.5651C32.5032 13.134 32.332 12.7206 32.0271 12.4157C31.7223 12.1109 31.3089 11.9396 30.8778 11.9396ZM16.2489 10.3142C16.2489 9.45204 16.5914 8.62517 17.2011 8.01551C17.8107 7.40586 18.6376 7.06336 19.4998 7.06336C20.362 7.06336 21.1888 7.40586 21.7985 8.01551C22.4081 8.62517 22.7506 9.45204 22.7506 10.3142V11.9396H16.2489V10.3142ZM29.2524 31.4448C29.2524 31.8759 29.0811 32.2893 28.7763 32.5942C28.4714 32.899 28.058 33.0702 27.6269 33.0702H11.3726C10.9415 33.0702 10.5281 32.899 10.2233 32.5942C9.91845 32.2893 9.7472 31.8759 9.7472 31.4448V15.1905H12.9981V16.8159C12.9981 17.247 13.1693 17.6605 13.4741 17.9653C13.779 18.2701 14.1924 18.4414 14.6235 18.4414C15.0546 18.4414 15.468 18.2701 15.7728 17.9653C16.0777 17.6605 16.2489 17.247 16.2489 16.8159V15.1905H22.7506V16.8159C22.7506 17.247 22.9219 17.6605 23.2267 17.9653C23.5315 18.2701 23.945 18.4414 24.3761 18.4414C24.8072 18.4414 25.2206 18.2701 25.5254 17.9653C25.8302 17.6605 26.0015 17.247 26.0015 16.8159V15.1905H29.2524V31.4448Z"
            fill="#DE350B"
          />
        </svg>

        <Typography
          variant="body-1"
          className=" text-xl !font-bold md:!text-2xl"
          fontWeight={"bold"}
        >
          Delivery Unavailable
        </Typography>
      </div>

      <h3 className="mt-2 w-[90%] text-center text-sm ">
        {confirmationMessage}
      </h3>

      <div>
        <div className="hideScrollBar  mt-6 flex w-full overflow-x-scroll">
          <div className="mx-auto inline-flex w-fit cursor-pointer gap-6">
            {failedOrders()?.map((_) => (
              <div
                className="flex items-center gap-2 py-2 "
                key={_?.businessId}
              >
                <div
                  className={cn(
                    "relative  aspect-square w-[clamp(45px,_8vw,_51px)] rounded-full border-2 border-solid  ",
                  )}
                  key={Math.PI * Math.random()}
                >
                  <span className="absolute right-[-10px] top-[-10px] z-[1] rounded-full bg-[#FF4D4F] p-[5px_10px] text-xs text-white">
                    {_?.items.length}
                  </span>
                  <Image
                    src={_?.items[0]?.business_profile_picture}
                    alt="random food"
                    className="  rounded-full object-cover"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 860px) 50vw, 25vw"
                  />
                </div>
                <Typography fontWeight="semi-bold">
                  {_?.items[0]?.businessName}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex w-full max-w-[90%] items-center justify-center gap-6">
        <div className="flex w-full flex-col-reverse gap-2">
          <Button
            variant="outline"
            className="text-green w-full border-primary-600 hover:border-transparent hover:bg-green-500 hover:text-white"
            onClick={() => setShowModal(!showModal)}
          >
            Go Back
          </Button>
          <Button className="w-full hover:bg-green-500" onClick={handleDelete}>
            PROCEED TO CHECKOUT OTHER ITEMS
          </Button>
        </div>
      </div>
    </div>
  );
}
