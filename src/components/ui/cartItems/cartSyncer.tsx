"use client";

import React, { useEffect } from "react";
import { CartItem, useCartStore } from "@/store/cart.store";
import { useUserStore } from "@/store/user.store";
import { QUERY_KEYS } from "@/utils";
import { addDaysToDate } from "@/utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useStore } from "zustand";

import { syncCart, SyncCartReqData } from "@/lib/app/orders/services";
import { useGetServerCart } from "@/hooks/useGetServerCart";

function CartSyncer() {
  const user = useStore(useUserStore, (state) => state.user);
  const cs = useGetServerCart(!!user?.role);

  const { cart, clearCart } = useStore(useCartStore, (state) => state);
  const queryClient = useQueryClient();
  const { mutate: syncCartMutate, isPending: isSyncingCart } = useMutation({
    mutationFn: async (data: SyncCartReqData) => await syncCart(data),
    onSuccess: async (response) => {
      if (response?.status === "success") {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.SERVER_CART],
        });
        return clearCart();
      }
    },
  });

  useEffect(() => {
    if ((cart?.length as number) > 0 && user?._id) {
      const items = (cart as CartItem[])?.map((item) => ({
        productId: item.item._id as string,
        cost: item.item.cost as string,
        description: item.item.description as string,
        picture: (item.item.pictures as string[])[0],
        productName: item.item.name as string,
        quantity: item.quantity as number,
        businessId: item.business?._id as string,
        businessName: item.business.name as string,
        business_profile_picture: item.business
          .business_profile_picture as string,
        unit_weight: item?.item.weight,
        pickupDate: addDaysToDate(Number(item?.business?.daysUntilPickup)),
        businessAddressCode: item?.business?.addressCode as number,
        categoryId: item?.business?.categoryId as number,
      }));
      syncCartMutate({
        // @ts-expect-error
        data: items,
      });
    }
  }, [user, cart?.length]);
  return <div className="hidden" />;
}

export default CartSyncer;
