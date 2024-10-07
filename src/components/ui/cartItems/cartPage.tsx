"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { womanInBundoEmptyCart } from "@/assets";
import { useCartStore } from "@/store/cart.store";
import { Item, useCheckoutStore } from "@/store/checkout.store";
import { useServerCartStore } from "@/store/serverCart.store";
import { useUserStore } from "@/store/user.store";
import { QUERY_KEYS } from "@/utils";
import { createCartData, formatCurrency } from "@/utils/helpers";
import { useQueryClient } from "@tanstack/react-query";
import { useStore } from "zustand";

import { removeCartItemsByVendorsServer } from "@/lib/app/orders/services";
import cn from "@/lib/utils";
import { useGetServerCart } from "@/hooks/useGetServerCart";
import GoBack from "@/components/goBack";
import { Typography } from "@/components/typography";
import { notify } from "@/app/(root)/_components/notifications/notify";

import { Button } from "../button";
import { Modal } from "../modal";
import CartItemCard from "./cartItemCard";
import EmptyCart from "./emptyCart";

function CartPage() {
  const router = useRouter();
  const { addToCheckout, clearCart: clearCheckout } = useStore(
    useCheckoutStore,
    (state) => state,
  );
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const queryClient = useQueryClient();
  const user = useStore(useUserStore, (state) => state);
  const role = user.user?.role;
  const isLoggedIn = !!role;
  const [showAuthReq, setShowAuthReq] = useState(false);
  const { cart, getGroupedCartByVendorId } = useStore(
    useCartStore,
    (state) => state,
  );
  const cs = useGetServerCart(!!user.user?.role);
  const serverCartData = useStore(
    useServerCartStore,
    (state) => state.serverCart,
  );
  const [selectedVendorId, setSelectedVendorId] = useState<string | null>(null);
  const localCartProducts = cart?.map((cartItem) => ({
    ...cartItem.business,
    ...cartItem.item,
    quantity: cartItem.quantity,
  }));
  const serverCartProducts = serverCartData?.cart;
  const cartItems = serverCartProducts;
  const groupedCartItemsLocal = getGroupedCartByVendorId();
  // @ts-expect-error
  const groupedCartItems = createCartData(cartItems ?? []);

  const dataToUse = isLoggedIn
    ? selectedVendorId === null
      ? cartItems ?? []
      : groupedCartItems
          .filter(
            (item) =>
              (item.items[0]?.business.businessId as string) ===
              selectedVendorId,
          )
          .map((item) => item.items.map((item) => item.item))
          .flat()
    : selectedVendorId === null
      ? localCartProducts ?? []
      : groupedCartItemsLocal
          .filter(
            (item) =>
              (item.items[0]?.business._id as string) === selectedVendorId,
          )
          .map((item) =>
            item.items.map((item) => ({
              ...item.item,
              quantity: item.quantity,
            })),
          )
          .flat();

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await removeCartItemsByVendorsServer({
        id: selectedVendorId as string,
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SERVER_CART],
      });
      setSelectedVendorId(null);
      notify.success({ message: "products removed successfully" });
      setShowModal(false);
    } catch (error) {
      notify.error({
        message: "Unable to delete product",
      });
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    clearCheckout();
  }, []);
  // @ts-expect-error
  const activeVendor = dataToUse[0]?.businessName;
  const itemsLength = dataToUse.length;
  const getTotalPrice =
    dataToUse.reduce((acc, item) => {
      return acc + Number(item?.cost) * item.quantity;
    }, 0) ?? 0;

  const handleProceedToCheckout = () => {
    addToCheckout(dataToUse as Item);
    router.push(`/dashboard/${role}s/checkout`);
  };
  return itemsLength === 0 ? (
    <EmptyCart
      isCart
      path={!isLoggedIn ? "/marketplace" : `/dashboard/${role}s/marketplace`}
    />
  ) : (
    <>
      <div className=" container w-full px-6">
        <div className="w-[100px] ">
          <GoBack text="Go back" />
        </div>
        <div className="mx-auto mt-7 w-full max-w-[480px] ">
          <div className="mb-4 flex flex-col gap-[8px] rounded-[20px] bg-[#F8F8F8] px-[15px] py-[24px] sm:px-[30px]">
            <Typography variant="body-4" className="text-sm" fontWeight="bold">
              {`  Vendors you've shopped from`}
            </Typography>
            <Typography
              className="text-xs font-normal !text-[#A19B92]"
              fontWeight={"regular"}
            >
              Click on any of them to see specific items you have added from
              them. You can also checkout per vendor you select
            </Typography>
            <div className="hideScrollBar  mt-6 flex w-full overflow-x-scroll">
              <div className="mx-auto inline-flex w-fit cursor-pointer gap-6">
                {(user?.user?.role
                  ? groupedCartItems
                  : groupedCartItemsLocal
                ).map((_, index) => (
                  <div
                    className={cn(
                      "relative isolate aspect-square w-[clamp(51px,_8vw,_71px)] rounded-full border-2 border-solid  ",

                      _?.items[0]?.item.businessId === selectedVendorId
                        ? "border-green-600"
                        : "border-transparent",
                    )}
                    key={Math.PI * Math.random()}
                    onClick={() => {
                      _?.items[0]?.item.businessId === selectedVendorId
                        ? setSelectedVendorId(null)
                        : setSelectedVendorId(
                            _.items[0].item.businessId as string,
                          );
                    }}
                  >
                    <span className="absolute right-0 top-0 z-[1] rounded-full bg-[#FF4D4F] p-[5px_10px] text-xs text-white">
                      {_?.items.length}
                    </span>
                    <Image
                      src={
                        _?.items[0]?.business
                          ?.business_profile_picture as string
                      }
                      alt="random food"
                      className="  rounded-full object-cover"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 860px) 50vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[20px] bg-[#F8F8F8] px-[15px] py-[24px] sm:px-[30px] ">
            <Typography className="mb-5" fontWeight="bold">
              {selectedVendorId
                ? `All items from ${activeVendor}`
                : "All Items in your bag"}
            </Typography>
            <div className=" hideScrollBar max-h-[250px] cursor-move overflow-y-auto md:max-h-[450px]">
              <div className="flex w-full flex-col gap-2">
                {dataToUse.map((item) => (
                  <CartItemCard item={item} key={`card element`} />
                ))}
              </div>
            </div>
            {selectedVendorId && (
              <button
                onClick={() => setShowModal(!showModal)}
                className="mx-auto mt-5 flex items-center justify-center gap-2 "
              >
                <span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="19.3959"
                      height="19.3959"
                      transform="translate(0.5)"
                      fill="white"
                      fillOpacity="0.01"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.1978 17.7805C14.6612 17.7805 18.2795 14.1622 18.2795 9.69882C18.2795 5.23546 14.6612 1.61719 10.1978 1.61719C5.73448 1.61719 2.11621 5.23546 2.11621 9.69882C2.11621 14.1622 5.73448 17.7805 10.1978 17.7805ZM9.05979 9.71126L7.86791 10.9102C7.79096 10.985 7.72967 11.0744 7.68762 11.1731C7.64557 11.2718 7.62359 11.3779 7.62298 11.4852C7.62236 11.5925 7.64312 11.6988 7.68403 11.798C7.72495 11.8972 7.7852 11.9872 7.86129 12.0629C7.93737 12.1385 8.02776 12.1983 8.12718 12.2386C8.22659 12.279 8.33305 12.2992 8.44034 12.2979C8.54763 12.2967 8.6536 12.2741 8.75207 12.2315C8.85055 12.1889 8.93955 12.1271 9.01389 12.0498L10.2001 10.8565L11.3632 12.0247C11.5144 12.1767 11.7198 12.2624 11.9342 12.2629C12.1486 12.2634 12.3544 12.1788 12.5064 12.0276C12.6583 11.8763 12.744 11.6709 12.7445 11.4566C12.7451 11.2422 12.6604 11.0364 12.5092 10.8844L11.3396 9.71021L12.5375 8.50515C12.6843 8.35232 12.7652 8.14793 12.7628 7.936C12.7604 7.72408 12.6748 7.52158 12.5246 7.37215C12.3743 7.22271 12.1713 7.13829 11.9594 7.13707C11.7474 7.13585 11.5435 7.21794 11.3915 7.36564L10.199 8.56523L8.9856 7.34708C8.8335 7.19951 8.62952 7.11759 8.4176 7.11897C8.20568 7.12035 8.00278 7.20491 7.85261 7.35445C7.70244 7.50398 7.61701 7.70652 7.61474 7.91843C7.61246 8.13034 7.69351 8.33467 7.84043 8.4874L9.05979 9.71126Z"
                      fill="#504E49"
                    />
                  </svg>
                </span>
                <Typography
                  variant="body-7"
                  className="font-normal text-[#808080]"
                  fontWeight={"regular"}
                >
                  {"Remove this items from your cart"}
                </Typography>
              </button>
            )}
          </div>

          <div className="mt-[30px] flex w-full flex-col gap-6 md:mt-[60px] md:gap-12">
            <Typography
              variant="body-7"
              className=" flex w-full items-center justify-between border-b border-solid  border-[#C9C2B6] px-2 pb-6 "
              fontWeight="semi-bold"
            >
              <span>TOTAL AMOUNT</span>
              <span> {formatCurrency(getTotalPrice)}</span>
            </Typography>
            {isLoggedIn ? (
              <Button onClick={handleProceedToCheckout} className="w-full">
                Proceed to checkout
              </Button>
            ) : (
              <Button onClick={() => setShowAuthReq(true)} className="w-full">
                Proceed to checkout
              </Button>
            )}
          </div>
        </div>
      </div>
      <Modal isOpen={showModal} closeModal={() => setShowModal(false)}>
        <ConfirmDeleteOrdersDialog
          deleting={deleting}
          handleDelete={handleDelete}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </Modal>
      <Modal isOpen={showAuthReq} closeModal={() => setShowAuthReq(false)}>
        <div
          className={`hideScrollBar flex w-full  max-w-[473px] flex-col items-center justify-center gap-2 overflow-y-auto rounded-[17px] bg-white px-[44px] py-[49px] `}
          style={{
            boxShadow: "0px 0px 1px 0px #091E424F, 0px 8px 12px 0px #091E4226",
          }}
        >
          <div className="flex h-fit min-h-[300px] w-full flex-col items-center  justify-center gap-6 ">
            <div className="relative h-[clamp(107px,_5vw,_157px)]  w-[clamp(83px,_5vw,_121px)]">
              <Image src={womanInBundoEmptyCart} fill alt="woman in bundo" />
            </div>
            <p className="text-center text-sm text-tertiary-pale-950 sm:text-base">
              {` Log In or Create an Account to proceed to checkout`}
            </p>
            <div className="flex w-full flex-col items-center justify-between gap-4 sm:w-fit sm:flex-row">
              <Link href="/auth/login" className="w-full sm:w-fit">
                <Button variant="deep-green" className="w-full">
                  Login to your account
                </Button>
              </Link>
              <Link href="/auth/onboarding" className="w-full sm:w-fit">
                <Button variant="light-green" className="w-full">
                  Create your account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CartPage;

interface ConfirmDialogProps {
  deleting: boolean;
  handleDelete: () => void;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  confirmationMessage?: string;
}

function ConfirmDeleteOrdersDialog({
  deleting,
  handleDelete,
  showModal,
  setShowModal,
  confirmationMessage = "Are you sure you want to remove this vendor and their items from your cart?",
}: ConfirmDialogProps) {
  return (
    <div
      className={`hideScrollBar flex w-full  max-w-[473px] flex-col items-center justify-center gap-2 overflow-y-auto rounded-[17px] bg-white px-[44px] py-[49px] `}
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
            fill="#34A853"
          />
        </svg>

        <Typography
          variant="body-1"
          className=" text-xl !font-bold md:!text-2xl"
          fontWeight={"bold"}
        >
          Remove from Cart
        </Typography>
      </div>

      <h3 className="w-full text-center">{confirmationMessage}</h3>
      <div className="mt-6 flex w-full max-w-[300px] items-center justify-center gap-6">
        {deleting ? (
          <Button variant="destructive" className="w-full" disabled loading>
            Deleting
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              className="text-green w-full border-primary-600 hover:border-transparent hover:bg-green-500 hover:text-white"
              onClick={() => setShowModal(!showModal)}
            >
              No
            </Button>
            <Button
              className="w-full hover:bg-green-500"
              onClick={handleDelete}
            >
              YES
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
