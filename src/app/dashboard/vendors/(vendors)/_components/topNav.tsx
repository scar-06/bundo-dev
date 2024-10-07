"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ACcountGreenIcon,
  AngleLeft,
  ArrowUpIcon,
  BundoLogo,
  BusinessWalletIcon,
  Close,
  FeedBackIcon,
  Hamburger,
  LogOutIcon,
  LoveGreenIcon,
  ManageUploadIcon,
  MobileBundoLogo,
  NotificationIcon,
  OrdersIcon,
  StoreIcon,
  WalletIcon,
} from "@/assets";
import { useVendorBusinessStore } from "@/store/business.store";
import { signOut } from "next-auth/react";
import { useStore } from "zustand";

import { GetBusinessRes } from "@/lib/app/vendors/services";
import { useLogout } from "@/hooks/useLogout";
import CartCountBtn from "@/components/ui/cartItems/cartCountBtn";
import Drawer from "@/components/drawer/drawer";
import { INavItem, INavItems } from "@/components/navigation/sideNav";

import PlanStatusComponent from "./planStatusCard";

type ITopNavtemType = INavItem & { count?: number };

type INavTypes = {
  topItems: ITopNavtemType[];
  bottomItems: INavItems;
}[];

function TopNav({ name }: { name: string }) {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const { logout } = useLogout();
  const business = useStore(useVendorBusinessStore, (state) => state.business);

  const navItems: INavTypes = [
    {
      topItems: [
        // {
        //   title: "Preview my Page",
        //   icon: <EyeIcon />,
        //   path: "/dashboard/vendors/preview/products",
        // },
        {
          title: "New Orders",
          icon: <OrdersIcon />,
          path: "/dashboard/vendors/orders",
        },
        {
          title: "Business Wallet",
          icon: <BusinessWalletIcon />,
          path: "/dashboard/vendors/account/wallet",
        },
        {
          title:
            business?.business.business_type !== "services"
              ? "Manage Products"
              : "Manage Services",
          icon: <ManageUploadIcon />,
          path: `/dashboard/vendors/manage_${
            business?.business.business_type !== "services"
              ? "products"
              : "services"
          }`,
        },
        {
          title: "Store Details",
          icon: <StoreIcon />,
          path: "/dashboard/vendors/account/store_details",
        },
        {
          title: "Upgrade my plan",
          icon: <ArrowUpIcon />,
          path: "/dashboard/vendors/account/upgrade_my_plan",
        },
        {
          title: "My Payments",
          icon: <WalletIcon />,
          path: "/dashboard/vendors/payments",
        },
        {
          title: "My Purchases",
          icon: <WalletIcon />,
          path: "/dashboard/vendors/my_purchases",
        },
        {
          title: "Favorite Vendors",
          icon: <LoveGreenIcon />,
          path: "/dashboard/vendors/favourite_vendors",
        },
        {
          title: "All Ads",
          icon: <FeedBackIcon />,
          path: "/dashboard/vendors/ads",
        },

        {
          title: "Account Details",
          icon: <ACcountGreenIcon />,
          path: "/dashboard/vendors/account/account_information",
        },
      ],
      bottomItems: [
        {
          title: "LOG OUT",
          icon: <LogOutIcon />,
          path: "",
          onClick: () => {
            logout();
          },
        },
      ],
    },
  ];
  return (
    <div className="fixed left-0 right-0 top-0 isolate z-[10] flex bg-[#F1E9DB] lg:w-full  xxlg:w-full">
      {/* desktop top nav  */}
      <div className=" mx-auto flex w-full max-w-screen-xxlg scroll-mx-0 pl-16 xxlg:mx-auto ">
        <nav className="mx-auto hidden h-[80px] w-full max-w-screen-xlg items-center justify-between lg:flex">
          <div className="flex items-center">
            <BundoLogo />
            <Link href="/dashboard/customers/notifications">
              <div className="relative flex">
                <NotificationIcon className="ml-[10px]" />
                <span className="absolute right-0 top-0 z-[1] rounded-full bg-[#FF4D4F] p-[0px_6px] text-xs text-white">
                  0
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center">
            <span className="text-[12px] font-bold ">{name}</span>
            <div className="isolate ml-1 flex aspect-square w-[clamp(40px,_8vw,_50px)] items-center justify-center rounded-full bg-[#34A853]">
              <span className="font-bold text-[#fff]">{name.slice(0, 1)}</span>
            </div>
            <button
              className="ml-3"
              onClick={() => setShowMobileNav(!showMobileNav)}
            >
              {showMobileNav ? (
                <Close className="[&>*]:stroke-bundo-yellow [&>*]:fill-bundo-yellow" />
              ) : (
                <Hamburger className="[&>*]:stroke-bundo-white [&>*]:fill-bundo-white" />
              )}
            </button>
            <CartCountBtn userType="vendors" />
          </div>
        </nav>
      </div>

      {/* mobile top nav  */}
      <nav
        className={`container fixed top-0 isolate  z-50 bg-[#F1E9DB] px-6 py-4   lg:hidden `}
      >
        <div className="z-1 flex w-full  items-center justify-between">
          <div className="flex items-center">
            <Link href="/dashboard/vendors">
              <MobileBundoLogo />
            </Link>
            <div className="relative flex">
              <NotificationIcon className="ml-[10px]" />
              <span className="absolute right-0 top-0 z-[1] rounded-full bg-[#FF4D4F] p-[0px_6px] text-xs text-white">
                0
              </span>
            </div>
          </div>

          <div className="flex flex-row-reverse gap-2">
            <button onClick={() => setShowMobileNav(!showMobileNav)}>
              {showMobileNav ? (
                <Close className="[&>*]:stroke-bundo-yellow [&>*]:fill-bundo-yellow" />
              ) : (
                <Hamburger className="[&>*]:stroke-bundo-white [&>*]:fill-bundo-white" />
              )}
            </button>
            <CartCountBtn userType="vendors" />
          </div>
        </div>
      </nav>

      <Drawer
        open={showMobileNav}
        onClose={() => setShowMobileNav(false)}
        title=""
        selector="bundo-app-portal"
      >
        <div className="hideScrollBar m-0 h-screen w-full overflow-y-auto  py-6 pb-20">
          <div className=" flex h-[80px] w-full items-center justify-between ">
            <div className="flex items-center gap-2 pl-3">
              {" "}
              <div className="isolate ml-1 flex aspect-square w-[clamp(35px,_8vw,_50px)] items-center justify-center rounded-full bg-[#34A853]">
                <span className="font-bold text-[#fff]">
                  {name.slice(0, 1)}
                </span>
              </div>
              <PlanStatusComponent data={business as GetBusinessRes} />
            </div>
          </div>
          {navItems.map((prop) => (
            <div
              className="flex flex-col justify-between gap-8 pb-4"
              key={Math.PI * Math.random()}
            >
              <div className="flex flex-col " key={Math.PI * Math.random()}>
                {prop.topItems.map((val) =>
                  val.onClick ? (
                    <button
                      onClick={() => {
                        val.onClick && val.onClick();
                        val.title === "LOG OUT" && logout();
                      }}
                      key={val.title}
                      className=" mx-6 flex  cursor-pointer items-center justify-between  border-b-[1px] border-solid border-[#C9C2B6]  hover:bg-[rgba(222,_242,_251,_0.30)]"
                    >
                      <span
                        className="my-4 text-[11px] font-medium"
                        key={Math.PI * Math.random()}
                      >
                        {val.title}
                      </span>
                      <span className=" text-green-600">{val.icon}</span>
                    </button>
                  ) : (
                    <Link
                      className="group mx-2 flex cursor-pointer items-center justify-between border-b-[1px] border-[#C9C2B6] p-3 hover:bg-[rgba(222,_242,_251,_0.30)] "
                      key={Math.PI * Math.random()}
                      href={val.path}
                      onClick={() => setShowMobileNav(false)}
                    >
                      <div className="flex items-center gap-2">
                        <span className=" text-green-600">{val.icon}</span>
                        <span
                          key={Math.PI * Math.random()}
                          className="mx-2 text-[12px] font-medium"
                        >
                          {val.title}
                        </span>
                        {val.count && (
                          <span className="rounded-full bg-[#FF4D4F] p-[5px_15px] text-sm text-white">
                            {val.count}
                          </span>
                        )}
                      </div>
                      <span className=" transition-all ease-in-out group-hover:scale-[1.5]">
                        <AngleLeft />
                      </span>
                    </Link>
                  ),
                )}
              </div>
              <div className="flex flex-col">
                {prop.bottomItems.map((val) =>
                  val.onClick ? (
                    <button
                      onClick={() => {
                        val.onClick && val.onClick();
                        val.title === "LOG OUT" && logout();
                      }}
                      key={val.title}
                      className=" mx-6 flex  cursor-pointer items-center justify-between  border-b-[1px] border-solid border-[#C9C2B6]  hover:bg-[rgba(222,_242,_251,_0.30)]"
                    >
                      <span
                        className="my-4 text-[11px] font-medium"
                        key={Math.PI * Math.random()}
                      >
                        {val.title}
                      </span>
                      <span className=" text-green-600">{val.icon}</span>
                    </button>
                  ) : (
                    <Link
                      href={val.path}
                      key={val.title}
                      className=" mx-6 flex cursor-pointer items-center justify-between border-b-[1px] border-[#C9C2B6] hover:bg-[rgba(222,_242,_251,_0.30)]"
                    >
                      <span
                        className="my-4 text-[11px] font-medium"
                        key={Math.PI * Math.random()}
                      >
                        {val.title}
                      </span>
                      <span className=" text-green-600">{val.icon}</span>
                    </Link>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </Drawer>
    </div>
  );
}

export default TopNav;
