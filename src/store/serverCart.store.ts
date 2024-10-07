import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { GetCartFromServerRes } from "@/lib/app/orders/services";

interface ServerCartStore {
  serverCart: GetCartFromServerRes | null;
  fetching: boolean;
  setFetching: (fetching: boolean) => void;
  setServerCart: (serverCart: GetCartFromServerRes | null) => void;
  isInCart: (productId: string) => boolean;
}

export const useServerCartStore = create<ServerCartStore>()(
  persist(
    (set, get) => ({
      serverCart: null, // Initial state of the user is null.
      setServerCart: (serverCart) => set({ serverCart }), // Method to update the user state.
      fetching: false, // Initial state of fetching is false.
      setFetching: (fetching) => set({ fetching }), // Method to update the fetching state.
      isInCart: (productId) => {
        const { serverCart } = get();
        return (
          serverCart?.cart.some((item) => item.productId === productId) || false
        );
      },
    }),
    {
      name: "serverCart-bundo-storage-bundo-app",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ serverCart: state.serverCart }),
    },
  ),
);
