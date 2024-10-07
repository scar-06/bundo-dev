"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AccountIcon, NewSearchIcon, OrdersIcon, StoreIcon } from "@/assets";
import { useVendorBusinessStore } from "@/store/business.store";
import { useUserStore } from "@/store/user.store";

import cn from "@/lib/utils";
import { useGetBusiness } from "@/hooks/useGetBusiness";
import { useGetLoggedInUser } from "@/hooks/useGetLoggedInUser";
import useStore from "@/hooks/useStateFromStore";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import PageLoader from "@/components/loaders/pageLoader";
import MobileNav from "@/components/navigation/mobileNav";
import SideNav from "@/components/navigation/sideNav";

import TopNav from "./topNav";

const NavigationTab = [
  { title: "Store", icon: <StoreIcon />, path: "/dashboard/vendors" },
  {
    title: "MarketPlace",
    icon: <NewSearchIcon />,
    path: "/dashboard/vendors/marketplace",
  },
  { title: "Orders", icon: <OrdersIcon />, path: "/dashboard/vendors/orders" },
  {
    title: "Account",
    icon: <AccountIcon />,
    path: "/dashboard/vendors/account",
  },
];

function VendorsLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isInStorePage = pathname === "/dashboard/vendors";
  const { isSuccess, isFetching: isLoading, refetch } = useGetLoggedInUser();
  const user = useStore(useUserStore, (state) => state, [isSuccess]);
  const business = useStore(useVendorBusinessStore, (state) => state);
  const lastLogoutTime = user?.user?.lastLogOutTime === null;
  const [firstTimer, setFirstTimer] = useState(lastLogoutTime);
  const isStatusVerified = user?.user?.vendorId?.status !== "VERIFIED";

  const { isFetching } = useGetBusiness();
  if (isFetching) {
    return <PageLoader />;
  }

  return (
    <>
      <div className="w-full font-tv2SansDisplay">
        <TopNav name={user?.user?.firstName ?? ""} />
        <div
          className={cn(
            "mt-20 flex w-full  justify-between",
            isInStorePage ? "" : "px-6 lg:px-0",
          )}
        >
          <SideNav navItems={NavigationTab} />

          <div className="  flex w-full  lg:w-full ">
            <main className="mx-auto w-full max-w-screen-xxlg scroll-mx-0 pt-[10px] sm:pt-[40px] ">
              {children}
            </main>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 w-full">
          <MobileNav NavigationTab={NavigationTab} />
        </div>
      </div>
      <Modal
        isOpen={firstTimer}
        showCloseIcon={false}
        closeModal={() => setFirstTimer(false)}
      >
        <div
          className="hideScrollBar z-[100] flex  w-screen max-w-[504px] flex-col items-center justify-center gap-8 overflow-y-auto rounded-[40px] bg-white px-[44px] py-[49px] "
          style={{
            boxShadow: "0px 0px 1px 0px #091E424F, 0px 8px 12px 0px #091E4226",
          }}
        >
          <span className="relative isolate ml-1 flex aspect-square w-[clamp(72px,_8vw,_72px)] items-center justify-center rounded-full">
            <Image
              src={business?.business?.business?.business_profile_picture ?? ""}
              alt="brand logo"
              fill
              priority
              className="rounded-full  object-cover"
            />
          </span>
          <h3 className="w-[90%] text-center text-sm">
            Welcome to your Store, <b>{business?.business?.business.name}</b>{" "}
            Start doing business the <b>Bundo</b> way!
          </h3>
          <div className="flex w-full max-w-[300px] items-center justify-center gap-6">
            <Button
              size={"sm"}
              className="w-full"
              onClick={() => setFirstTimer(false)}
            >
              Continue to my Store
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default VendorsLayoutWrapper;
