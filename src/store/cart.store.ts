import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { Business, Product } from "@/lib/app/vendors/services";

export interface CartItem {
  item: Partial<Product>;
  quantity: number;
  business: Partial<Business>;
}

interface DetailCartStore {
  cart: CartItem[] | null;
  fetching: boolean;
  setFetching: (fetching: boolean) => void;
  addToCart: (
    product: Partial<Product>,
    business: Partial<Business>,
    quantity?: number,
  ) => void;
  removeFromCart: (productId: string) => void;
  removeMultipleFromCart: (items: CartItem[]) => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  getGroupedCartByVendorId: () => { items: CartItem[] }[];
  isInCart: (productId: string) => boolean;
  clearCart: () => void;
  cartCount: () => number;
}

export const useCartStore = create<DetailCartStore>()(
  persist(
    (set, get) => ({
      cart: [], // Initial state of the cart as an empty array.
      fetching: false,
      setFetching: (fetching) => set({ fetching }),
      addToCart: (product, business, quantity = 1) => {
        let { cart } = get();
        const existingItem = cart?.find(
          (item) => item?.item?._id === product._id,
        );
        if (existingItem) {
          // Increase quantity if item already exists
          set({
            cart: cart?.map((item) =>
              item?.item._id === product._id
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            ),
          });
        } else {
          // Add new item to cart
          if (!cart) {
            cart = [];
          }
          set({ cart: [...cart, { item: product, business, quantity }] });
        }
      },
      removeFromCart: (productId) => {
        const { cart } = get();
        const updatedCart = cart?.filter(
          (item) => item?.item?._id !== productId,
        );
        set({ cart: updatedCart });
      },
      removeMultipleFromCart: (items) => {
        const { cart } = get();
        const updatedCart = cart?.filter((item) => !items.includes(item));
        set({ cart: updatedCart });
      },
      incrementQuantity: (productId) => {
        const { cart } = get();
        set({
          cart: cart?.map((item) =>
            item.item._id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        });
      },
      decrementQuantity: (productId) => {
        const { cart } = get();
        set({
          cart: cart?.map((item) =>
            item.item._id === productId
              ? { ...item, quantity: Math.max(0, item.quantity - 1) }
              : item,
          ),
        });
      },
      getGroupedCartByVendorId: () => {
        const { cart } = get();
        // Initialize the array to ensure we never return undefined
        let groupedByVendor: { items: CartItem[] }[] = [];

        if (!cart) {
          // Return an empty array if there is no cart or it's empty
          return groupedByVendor;
        }

        // group by vendorId
        const tempGroup = cart.reduce(
          (acc, item) => {
            const vendorId = item.item.businessId as string;
            if (!acc[vendorId]) {
              acc[vendorId] = [];
            }
            acc[vendorId].push(item);
            return acc;
          },
          {} as Record<string, CartItem[]>,
        );

        // Convert grouped items into array of single-key records

        groupedByVendor = Object.entries(tempGroup).map(
          ([vendorId, items]) => ({
            items,
          }),
        );
        return groupedByVendor;
      },
      isInCart: (productId) => {
        const { cart } = get();
        return cart?.some((item) => item.item._id === productId) || false;
      },
      clearCart: () => {
        set({ cart: null });
      },
      cartCount: () => {
        const { cart } = get();
        return cart?.length || 0;
      },
    }),
    {
      name: "cart-bundo-storage-bundo-app",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cart: state.cart }),
    },
  ),
);
