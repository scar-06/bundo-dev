// @ts-nocheck

import React, { useState } from "react";
import { logo, MinusIcon, PlusCircleIcon, PlusIcon } from "@/assets";
import { useCartStore } from "@/store/cart.store";
import { useUserStore } from "@/store/user.store";
import { QUERY_KEYS } from "@/utils";
import { formatCurrency, ProductInput } from "@/utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import { useStore } from "zustand";

import {
  incrementCartItem,
  removeCartItemServer,
} from "@/lib/app/orders/services";
import { Business, Product } from "@/lib/app/vendors/services";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Typography } from "@/components/typography";
import { notify } from "@/app/(root)/_components/notifications/notify";
import ImageWrapper from "@/app/dashboard/vendors/(vendors)/_components/ImageWrapper";

type Props = {
  item:
    | ProductInput
    | (Partial<Product> & Partial<Business> & { quantity: number });
};
function CartItemCard({ item }: Props) {
  const queryClient = useQueryClient();
  const [openOutOfStockModal, setOpenOutOfStockModal] = useState(false);
  const { removeFromCart, incrementQuantity, decrementQuantity } = useStore(
    useCartStore,
    (state) => state,
  );
  const user = useStore(useUserStore, (state) => state.user);
  const isLoggedIn = !!user?.role;
  const { mutate: incrementCartItemMutate, isPending: incrementingCart } =
    useMutation({
      mutationFn: async (formData: { productId: string; quantity: number }) =>
        await incrementCartItem(formData),
      onSuccess: async (response) => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.SERVER_CART],
        });
      },
    });
  const { mutate: removeCartItemMutate, isPending: removingCart } = useMutation(
    {
      mutationFn: async (formData: { id: string }) =>
        await removeCartItemServer(formData),
      onSuccess: async (response) => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.SERVER_CART],
        });
      },
    },
  );
  const isLoading = removingCart || incrementingCart;
  return (
    <div className="flex w-full cursor-pointer items-center justify-between gap-2 font-tv2SansDisplay ">
      {isLoggedIn ? (
        <button
          disabled={isLoading}
          // @ts-expect-error
          onClick={() => removeCartItemMutate({ id: item?.productId })}
        >
          {isLoading ? (
            <LoaderIcon />
          ) : (
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
                fill="#e75339"
              />
            </svg>
          )}
        </button>
      ) : (
        <button onClick={() => removeFromCart(item?._id as string)}>
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
        </button>
      )}
      <div className="flex w-full items-center  justify-between bg-[#FCFBF8] p-2">
        <div className="flex items-center gap-3">
          <div className="relative h-[clamp(54px,_5vw,_60px)] w-[clamp(58px,_5vw,_65px)] overflow-hidden rounded-[5px] ">
            <ImageWrapper
              // @ts-expect-error
              src={item?.picture}
              fallbackSrc={logo}
              alt="random food"
              fill
              className="aspect-square object-cover "
            />
          </div>
          <Typography color={"tertiary-deep-green-900"} variant="body-9">
            {item?.productName || item?.name}
          </Typography>
        </div>
        <span className="h-fit rounded-sm bg-tertiary-deep-green-950 p-[6px_7px] text-xs font-semibold text-white">
          {formatCurrency(Number(item?.cost) * item.quantity)}
        </span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <button
          disabled={isLoading}
          onClick={() => {
            !isLoggedIn
              ? item?.quantity + 1 > item.productQuantity
                ? setOpenOutOfStockModal(true)
                : incrementQuantity(item._id)
              : item?.quantity + 1 > item.productQuantity
                ? setOpenOutOfStockModal(true)
                : incrementCartItemMutate({
                    productId: item.productId,
                    quantity: +1,
                  });
          }}
        >
          {incrementingCart ? (
            <LoaderIcon />
          ) : (
            <PlusCircleIcon className="cursor-pointer" />
          )}
        </button>
        <span className=" text-sm font-medium text-tertiary-deep-green-600">
          X{item.quantity}
        </span>

        <button
          disabled={isLoading}
          onClick={() =>
            !isLoggedIn
              ? item?.quantity === 1
                ? removeFromCart(item?._id as string)
                : decrementQuantity(item?._id as string)
              : item?.quantity === 1
                ? removeCartItemMutate({ id: item.productId })
                : incrementCartItemMutate({
                    productId: item.productId,
                    quantity: -1,
                  })
          }
        >
          {isLoading ? (
            <LoaderIcon />
          ) : (
            <MinusIcon className="cursor-pointer" />
          )}
        </button>
      </div>
      <Modal
        isOpen={openOutOfStockModal}
        closeModal={() => {
          setOpenOutOfStockModal(false);
        }}
      >
        <div
          className="flex w-full   flex-col  items-center justify-center   gap-6 rounded-[40px]  border-[1px] border-[#0000001A] bg-white px-10 py-6 font-tv2SansDisplay  shadow-xl md:w-[517px] md:px-20 "
          style={{
            boxShadow: "0px 0px 1px 0px #091E424F, 0px 8px 12px 0px #091E4226",
          }}
        >
          <div className="flex h-fit w-fit items-center justify-center rounded-full bg-[#DE350B]  p-3">
            <span className="text-[11px] font-bold text-white">
              {" "}
              INSUFFICIENT STOCK
            </span>
          </div>
          <span className=" text-xs font-semibold md:text-lg">
            {`Only ${
              item?.quantity === 1
                ? `${item.quantity} item`
                : `${item.quantity} items`
            }  left in stock`}
          </span>
          <span className="text-center text-xs  md:text-lg">
            There are only{" "}
            {` ${
              item?.quantity === 1
                ? `${item.quantity} item`
                : `${item.quantity} items`
            }`}{" "}
            of this <br />
            product left in stock
          </span>

          <Button
            className="w-full text-sm md:text-lg"
            onClick={() => setOpenOutOfStockModal(false)}
            size="sm"
          >
            CONTINUE SHOPPING
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default CartItemCard;
