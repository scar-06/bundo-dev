"use client";

import React, { useEffect } from "react";
import { useVendorBusinessStore } from "@/store/business.store";
import { ModifiedUser, useUserStore } from "@/store/user.store";
import { useStore } from "zustand";

import { Business } from "@/lib/app/vendors/services";
import { generateChecklist } from "@/lib/utils";
import { useGetLoggedInUser } from "@/hooks/useGetLoggedInUser";
import { notify } from "@/app/(root)/_components/notifications/notify";

import PhoneVerification from "../../verify/phone/page";

function StoreDetailsLayout({ children }: { children: React.ReactNode }) {
  const { refetch } = useGetLoggedInUser();
  const user = useStore(useUserStore, (state) => state);
  const business = useStore(useVendorBusinessStore, (state) => state);
  const checkList = generateChecklist(
    user?.user as ModifiedUser,
    business?.business?.business as Business,
  );
  if (checkList[1].status === "none") {
    notify.error({
      message:
        "You need to complete your phone verification to view this section",
    });
    return <PhoneVerification />;
  }
  useEffect(() => {
    if (checkList[1].status === "completed") {
      refetch();
    }
    return () => {};
  }, [checkList[1].status, refetch]);
  return <>{children}</>;
}

export default StoreDetailsLayout;
