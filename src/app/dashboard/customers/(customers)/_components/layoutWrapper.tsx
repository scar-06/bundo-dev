"use client";

import { usePathname } from "next/navigation";
import {
  ACcountGreenIcon,
  AccountIcon,
  FeedBackIcon,
  HistoryIcon,
  HouseIcon,
  LogOutIcon,
  LoveGreenIcon,
  NewSearchIcon,
} from "@/assets";
import { useCartStore } from "@/store/cart.store";
import { useServerCartStore } from "@/store/serverCart.store";
import { useUserStore } from "@/store/user.store";
import { useStore } from "zustand";

import { useLogout } from "@/hooks/useLogout";
import MobileNav from "@/components/navigation/mobileNav";
import SideNav from "@/components/navigation/sideNav";

import TopNav, { INavTypes } from "./topNav";

const NavigationTab = [
  { title: "Home", icon: <HouseIcon />, path: "/dashboard/customers" },
  {
    title: "MarketPlace",
    icon: <NewSearchIcon />,
    path: "/dashboard/customers/marketplace",
  },
  {
    title: "Account",
    icon: <AccountIcon />,
    path: "/dashboard/customers/account",
  },
];

function CustomersLayoutWrapper({ children }: { children: React.ReactNode }) {
  const { logout } = useLogout();
  const { user } = useStore(useUserStore, (state) => state);

  const navItems: INavTypes = [
    {
      topItems: [
        {
          title: "My Account",
          icon: <ACcountGreenIcon />,
          path: "/dashboard/customers/account",
        },
        {
          title: "All Ads",
          icon: <FeedBackIcon />,
          path: "/dashboard/customers/allAds",
        },
        {
          title: "Favourite Vendors",
          icon: <LoveGreenIcon />,
          path: "/dashboard/customers/favourite_vendors",
        },
        {
          title: "My Purchases",
          icon: <HistoryIcon />,
          path: "/dashboard/customers/purchases",
        },
      ],
      bottomItems: [
        {
          title: "LOG OUT",
          icon: <LogOutIcon />,
          path: "",
          onClick: () => {
            logout(); // Call logout to clear cookies and redirect
          },
        },
      ],
    },
  ];

  const currentPath = usePathname();
  const isUrlParams = (href: any[]) =>
    href.some((val) => val.path === currentPath);

  return (
    <div className="w-full font-tv2SansDisplay">
      <TopNav name={user?.firstName ?? ""} navItems={navItems} />
      <div className="mt-20 flex w-full justify-between">
        {isUrlParams(NavigationTab) && <SideNav navItems={NavigationTab} />}

        <div className="mx-auto flex w-full lg:w-full xxlg:w-full">
          <main className="mx-auto w-full max-w-screen-xxlg scroll-mx-0 pt-[10px] sm:pt-[40px]">
            {children}
          </main>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 w-full">
        {isUrlParams(NavigationTab) && (
          <MobileNav NavigationTab={NavigationTab} />
        )}
      </div>
    </div>
  );
}

export default CustomersLayoutWrapper;
