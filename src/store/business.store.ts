import { create } from "zustand";

import { GetBusinessRes } from "@/lib/app/vendors/services";

interface VendorBusinessStore {
  business: GetBusinessRes | null;
  fetching: boolean;
  setFetching: (fetching: boolean) => void;
  setBusiness: (business: GetBusinessRes | null) => void;
}

export const useVendorBusinessStore = create<VendorBusinessStore>((set) => ({
  business: null, // Initial state of the user is null.
  setBusiness: (business) => set({ business }), // Method to update the user state.
  fetching: false, // Initial state of fetching is false.
  setFetching: (fetching) => set({ fetching }), // Method to update the fetching state.
}));
