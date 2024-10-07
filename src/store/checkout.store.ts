import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Item = {
  productId: string;
  picture: string;
  productName: string;
  cost: string;
  description: string;
  unit_weight: string;
  quantity: number;
  businessId: string;
  businessName: string;
  business_profile_picture: string;
  businessAddressCode: number;
  categoryId: number;
  pickupDate: string;
  _id: string;
}[];

export interface CheckoutItem {
  item: Item;
}

interface DetailCheckoutStore {
  checkout: CheckoutItem | null;
  addToCheckout: (item: Item) => void;
  getCheckoutTotalSum: () => number;
  getGroupedCheckoutByVendorId: () => { businessId: string; items: Item }[];
  clearCart: () => void;
}

export const useCheckoutStore = create<DetailCheckoutStore>()(
  persist(
    (set, get) => ({
      checkout: null,
      addToCheckout: (item) => {
        set({
          checkout: {
            item,
          },
        });
      },
      getGroupedCheckoutByVendorId: () => {
        const { checkout } = get();
        if (!checkout) return [];

        // Grouping items by businessId
        const groupedByVendor = checkout.item.reduce(
          (acc, item) => {
            if (!acc[item.businessId]) {
              acc[item.businessId] = [];
            }
            acc[item.businessId].push(item);
            return acc;
          },
          {} as { [key: string]: Item },
        );

        // Transforming the result into the desired format
        const result = Object.keys(groupedByVendor).map((businessId) => ({
          businessId,
          items: groupedByVendor[businessId],
        }));

        return result;
      },
      getCheckoutTotalSum: () => {
        const { checkout } = get();
        if (!checkout) return 0;

        // Calculating the total sum
        const totalSum = checkout.item.reduce((sum, item) => {
          return sum + parseFloat(item.cost) * item.quantity;
        }, 0);

        return totalSum;
      },
      clearCart: () => {
        set({ checkout: null });
      },
    }),
    {
      name: "checkout-bundo-storage-bundo-app",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ checkout: state.checkout }),
    },
  ),
);
