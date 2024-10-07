import { User } from "next-auth";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type UserOmittedProps = "accessToken" | "refreshToken";

export interface ModifiedUser extends Omit<User, UserOmittedProps> {}
interface DetailStore {
  user: ModifiedUser | null;
  fetching: boolean;
  setFetching: (fetching: boolean) => void;
  setUser: (user: ModifiedUser | null) => void;
}

export const useUserStore = create<DetailStore>()(
  persist(
    (set) => ({
      user: null, // Initial state of the user is null.
      setUser: (user) => set({ user }), // Method to update the user state.
      fetching: false, // Initial state of fetching is false.
      setFetching: (fetching) => set({ fetching }), // Method to update the fetching state.
    }),
    {
      name: "user-bundo-storage-bundo-app",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
