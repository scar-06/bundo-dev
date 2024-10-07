import React from "react";
import Link from "next/link";
import { CartIcon } from "@/assets";
import { useCartStore } from "@/store/cart.store";
import { useServerCartStore } from "@/store/serverCart.store";
import { useStore } from "zustand";

function CartCountBtn({
  userType,
  noLink,
}: {
  userType: string;
  noLink?: boolean;
}) {
  const { cartCount } = useStore(useCartStore, (state) => state);
  const itemsCount = cartCount();
  const serverCartData = useStore(
    useServerCartStore,
    (state) => state.serverCart,
  );
  const cartLength = serverCartData?.cart?.length;
  return (
    <div>
      {noLink ? (
        <div className=" flex items-center gap-1">
          <span className="cursor-pointer">
            <CartIcon />
          </span>
          <span className="rounded-full bg-[#FF4D4F] p-[5px_10px] text-xs text-white">
            {cartLength ?? itemsCount}
          </span>
        </div>
      ) : (
        <Link
          href={`/dashboard/${userType}/cart`}
          className="ml-4 flex items-center gap-1"
        >
          <span className="cursor-pointer">
            <CartIcon />
          </span>
          <span className="rounded-full bg-[#FF4D4F] p-[5px_10px] text-xs text-white">
            {cartLength ?? itemsCount}
          </span>
        </Link>
      )}
    </div>
  );
}

export default CartCountBtn;
