"use client";

import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart.store";
import { useServerCartStore } from "@/store/serverCart.store";
import { useUserStore } from "@/store/user.store";
import { deleteCookie, getCookies } from "cookies-next";
import { useStore } from "zustand";

import { notify } from "@/app/(root)/_components/notifications/notify";

import { ApplicationRoutes } from "../../routes";

export const useLogout = () => {
  const router = useRouter();
  useUserStore();
  const { setUser } = useStore(useUserStore, (state) => state);
  const { clearCart } = useStore(useCartStore, (state) => state);
  const { setServerCart } = useStore(useServerCartStore, (state) => state);
  const logout = () => {
    // Get all cookies
    const allCookies = getCookies();
    // Delete each cookie
    Object.keys(allCookies).forEach((cookieName) => {
      deleteCookie(cookieName);
    });
    clearCart();
    setServerCart(null);
    setUser(null);

    notify.success({
      message: "Logged out successfully",
      subtitle: "You've been logged out.",
    });

    // Redirect to the login page
    router.push(ApplicationRoutes.AUTH_SIGN_IN);
  };

  return { logout };
};
