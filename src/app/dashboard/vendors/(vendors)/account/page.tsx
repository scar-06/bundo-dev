"use client";

import Link from "next/link";
import {
  ACcountGreenIcon,
  AngleLeft,
  ArrowUpIcon,
  ChatInfoIcon,
  CopyIcon,
  DeleteAccountIcon,
  LockIcon,
  LogOutIcon,
  ReferalIcon,
  StoreIcon,
  SupportIcon,
  WalletIcon,
} from "@/assets";
import { useCartStore } from "@/store/cart.store";
import { useServerCartStore } from "@/store/serverCart.store";
import { useUserStore } from "@/store/user.store";
import { Settings } from "lucide-react";
import { signOut } from "next-auth/react";
import { useStore } from "zustand";

import { Button } from "@/components/ui/button";
import { INavItems } from "@/components/navigation/sideNav";
import GoBack from "@/app/dashboard/goBack";

type INavTypes = {
  topItems: INavItems;
  bottomItems: INavItems;
}[];

function Account() {
  const { setUser, user } = useStore(useUserStore, (state) => state);
  const { clearCart } = useStore(useCartStore, (state) => state);
  const { setServerCart } = useStore(useServerCartStore, (state) => state);
  const name = user?.firstName ?? "";
  const navItems: INavTypes = [
    {
      topItems: [
        {
          title: "Store Details",
          icon: <StoreIcon />,
          path: "/dashboard/vendors/account/store_details",
        },
        // {
        //   title: "Manage your Earnings",
        //   icon: <ReferalIcon />,
        //   path: "/dashboard/vendors/account/referral-wins",
        // },
        {
          title: "Account Information",
          icon: <ACcountGreenIcon />,
          path: "/dashboard/vendors/account/account_information",
        },
        {
          title: "Change Password",
          icon: <LockIcon />,
          path: "/dashboard/vendors/account/change_password",
        },
        {
          title: "Settings",
          icon: <Settings />,
          path: "/dashboard/vendors/account/settings",
        },
        // {
        //   title: "Payment",
        //   icon: <WalletIcon />,
        //   path: "/dashboard/vendors/account/payment",
        // },
        {
          title: "Upgrade my plan",
          icon: <ArrowUpIcon />,
          path: "/dashboard/vendors/account/upgrade_my_plan",
        },
        // { title: "Get Help", icon: <SupportIcon />, path: "" },
      ],
      bottomItems: [
        // {
        //   title: "App Information",
        //   icon: <ChatInfoIcon />,
        //   path: "",
        // },
        {
          title: "LOG OUT",
          icon: <LogOutIcon />,
          path: "",
          onClick: () => {
            clearCart();
            setServerCart(null);
            setUser(null);
            signOut();
          },
        },

        // { title: "Delete Account ", icon: <DeleteAccountIcon />, path: "" },
      ],
    },
  ];

  return (
    <div className=" w-full pb-24 ">
      <div className="flex w-full max-w-md items-center justify-between pr-4">
        <div className="max-w-[100px]">
          {" "}
          <GoBack text="Account" />
        </div>
        <div className="isolate flex aspect-square w-[clamp(50px,_8vw,_50px)] items-center justify-center rounded-full bg-[#34A853]">
          <span className="font-bold text-[#fff]">{name.slice(0, 1)}</span>
        </div>
      </div>
      <div className="hideScrollBar overflow-y-none  m-0 mt-4 max-w-md">
        {/* <div
          style={{
            backgroundImage: "url('/bundo-referal-pattern.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundOrigin: "padding-box",
          }}
          className="sr-only relative my-6 flex h-[246px] w-[clamp(100%,_8vw,_100%)] justify-between rounded-[20px] border-[3px] border-[#1111110F] bg-[#34A853] p-5 text-white lg:flex xlg:flex"
        >
          <div className="flex  flex-col ">
            <div className="flex w-full flex-col gap-3">
              <span className="text-2xl font-bold">Refer & Earn!</span>
              <span className="space-x-1 text-[10px] leading-[-1px]">
                Don’t miss out on earning extra money
                <br /> in your Bundo wallet! Copy your code <br /> and share to
                someone to sign up now!
              </span>
            </div>

            <div className="mt-3 flex h-[35px] w-fit items-center justify-center gap-2 rounded-lg bg-white px-3">
              <span className="text-xs font-bold text-[#2B8C45]">
                MICHAEL97sg
              </span>
              <div className="flex cursor-pointer items-center">
                <span className="text-[10px] text-[#2B8C45]">share</span>
                <CopyIcon />
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundImage: "url('/vendor-referral-voucher.png')",
              backgroundSize: "contain",
              backgroundPosition: "center right",
              backgroundRepeat: "no-repeat",
            }}
            className="absolute bottom-0 right-0 z-[-10px] h-[100%] w-[70%]"
          />
        </div> */}

        {navItems.map((prop) => (
          <div
            className="flex min-h-[calc(100vh_-_250px)] flex-col justify-between gap-4  pb-4"
            key={Math.PI * Math.random()}
          >
            <div className="flex flex-col " key={Math.PI * Math.random()}>
              {prop.topItems.map((val) =>
                val.onClick ? (
                  <Button
                    className="mx-2 flex cursor-pointer items-center border-b-[1px] border-[#C9C2B6] p-3 hover:bg-[rgba(222,_242,_251,_0.30)] "
                    key={Math.PI * Math.random()}
                    onClick={val.onClick}
                    variant={"plain"}
                  >
                    <span className=" text-green-600">{val.icon}</span>
                    <span
                      key={Math.PI * Math.random()}
                      className="mx-2 text-[12px] font-medium"
                    >
                      {val.title}
                    </span>
                  </Button>
                ) : (
                  <Link
                    className="group mx-2 flex cursor-pointer items-center justify-between border-b-[1px] border-[#C9C2B6] p-3 hover:bg-[rgba(222,_242,_251,_0.30)] "
                    key={Math.PI * Math.random()}
                    href={val.path}
                  >
                    <div className="flex items-center gap-2">
                      <span className=" text-green-600">{val.icon}</span>
                      <span
                        key={Math.PI * Math.random()}
                        className="mx-2 text-[12px] font-medium"
                      >
                        {val.title}
                      </span>
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
                    onClick={val.onClick}
                    key={val.title}
                    className=" mx-6 flex !w-full cursor-pointer items-center justify-between border-b-[1px] border-[#C9C2B6] px-2 hover:bg-[rgba(222,_242,_251,_0.30)]"
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
                    className=" mx-6 flex cursor-pointer  items-center justify-between border-b-[1px] border-[#C9C2B6] hover:bg-[rgba(222,_242,_251,_0.30)]"
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
    </div>
  );
}

export default Account;
