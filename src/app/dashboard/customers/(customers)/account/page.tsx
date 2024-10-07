"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ACcountGreenIcon,
  AccountIcon,
  AngleLeft,
  CopyIcon,
  HouseIcon,
  LockIcon,
  LogOutIcon,
  NewSearchIcon,
  ReferalIcon,
} from "@/assets";
import { useCartStore } from "@/store/cart.store";
import { useServerCartStore } from "@/store/serverCart.store";
import { useUserStore } from "@/store/user.store";
import { signOut, useSession } from "next-auth/react";
import { useStore } from "zustand";

import GoBack from "@/components/goBack";
import { INavItems } from "@/components/navigation/sideNav";

type INavTypes = {
  topItems: INavItems;
  bottomItems: INavItems;
}[];

const navItems: INavTypes = [
  {
    topItems: [
      {
        title: "Account Information",
        icon: <ACcountGreenIcon />,
        path: "/dashboard/customers/account/account-information",
      },
      {
        title: "Change Password",
        icon: <LockIcon />,
        path: "/dashboard/customers/account/change-password",
      },
      // { title: "Get Help", icon: <SupportIcon />, path: "" },
    ],
    bottomItems: [
      // {
      //   title: "App Information",
      //   icon: <ChatInfoIcon />,
      //   path: "",
      // },

      // { title: "Delete Account ", icon: <DeleteAccountIcon />, path: "" },
      {
        title: "LOG OUT",
        icon: <LogOutIcon />,
        path: "",
        onClick: async () => {
          await signOut();
        },
      },
    ],
  },
];

const NavigationTab = [
  { title: "Home", icon: <HouseIcon />, path: "/dashboard/customers" },
  {
    title: "MarketPlace",
    icon: <NewSearchIcon />,
    path: "/dashboard/customers/marketplace",
  },
  // { title: "Explore", icon: <LocationIcon />, path: "" },
  {
    title: "Account",
    icon: <AccountIcon />,
    path: "/dashboard/customers/account",
  },
];
function Account() {
  const currentPath = usePathname();
  const isLinkActive = (href: string) => currentPath === href;
  const { setUser, user } = useStore(useUserStore, (state) => state);
  const { clearCart } = useStore(useCartStore, (state) => state);
  const { setServerCart } = useStore(useServerCartStore, (state) => state);
  const navItems: INavTypes = [
    {
      topItems: [
        {
          title: "Account Information",
          icon: <ACcountGreenIcon />,
          path: "/dashboard/customers/account/account-information",
        },
        // {
        //   title: "Referal",
        //   icon: <ReferalIcon />,
        //   path: "/dashboard/customers/account/referral-wins",
        // },
        {
          title: "Change Password",
          icon: <LockIcon />,
          path: "/dashboard/customers/account/change-password",
        },
        // { title: "Get Help", icon: <SupportIcon />, path: "" },
      ],
      bottomItems: [
        // {
        //   title: "App Information",
        //   icon: <ChatInfoIcon />,
        //   path: "",
        // },

        // { title: "Delete Account ", icon: <DeleteAccountIcon />, path: "" },
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
      ],
    },
  ];
  return (
    <div className="mx-6 grid lg:mx-0">
      <div className="flex w-full flex-col text-sm ">
        <div className="w-fit px-4 md:px-0">
          <GoBack text="Account" />
        </div>
        <div className="hideScrollBar overflow-y-none m-0 max-w-md  ">
          {/* <div
            style={{
              backgroundImage: "url('/bundo-referal-pattern.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundOrigin: "padding-box",
            }}
            className="relative my-6  hidden h-[246px] w-[clamp(100%,_8vw,_100%)] justify-between rounded-[20px] border-[3px] border-[#1111110F] bg-[#34A853] p-5 text-white lg:flex xlg:flex"
          >
            <div className="flex w-full justify-between ">
              <div className="flex w-full flex-col gap-3">
                <span className="text-2xl font-bold">Refer & Win!</span>
                <span className="space-x-1 text-[10px] leading-[-1px]">
                  Don’t miss out on winning shopping <br /> vouchers! Copy your
                  code and share <br /> to someone to sign up now!
                </span>
              </div>

              <div className="flex w-full flex-col items-end">
                <div className="flex h-[35px] items-center justify-center gap-2 rounded-lg bg-white px-3">
                  <span className="text-xs font-bold text-[#2B8C45]">
                    MICHAEL97sg
                  </span>
                  <div className="flex cursor-pointer items-center">
                    <span className="text-[10px] text-[#2B8C45]">share</span>
                    <CopyIcon />
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundImage: "url('/referal-voucher.png')",
                backgroundSize: "contain",
                backgroundPosition: "bottom right",
                backgroundRepeat: "no-repeat",
              }}
              className="absolute bottom-0 right-0 z-[-10px] h-[100%] w-[70%]"
            />
          </div> */}

          {navItems.map((prop) => (
            <div
              className="mt-5 flex min-h-[calc(100vh_-_250px)] flex-col justify-between"
              key={Math.PI * Math.random()}
            >
              <div className="flex flex-col " key={Math.PI * Math.random()}>
                {prop.topItems.map((val) => (
                  <Link
                    href={val.path}
                    key={Math.PI * Math.random()}
                    className={` ${
                      isLinkActive(val.path) ? "text-[#34A853]" : "none"
                    }`}
                  >
                    <div className="group flex cursor-pointer items-center justify-between pr-2 hover:bg-[rgba(222,_242,_251,_0.30)]">
                      <div className="mx-2 flex items-center p-3 ">
                        <span>{val.icon}</span>
                        <span
                          key={Math.PI * Math.random()}
                          className="mx-2 text-[10px] font-medium md:text-xs"
                        >
                          {val.title}
                        </span>
                      </div>
                      <span className=" transition-all ease-in-out group-hover:scale-[1.2]">
                        <AngleLeft />
                      </span>
                    </div>
                    <div className="border-b-[1px] border-[#C9C2B6]" />
                  </Link>
                ))}
              </div>
              <div className=" p mb-6 flex flex-col">
                {prop.bottomItems.map((val) => (
                  <div
                    className=" cursor-pointer  pr-2 hover:bg-[rgba(222,_242,_251,_0.30)]"
                    key={Math.PI * Math.random()}
                  >
                    <div
                      onClick={() => {
                        val.onClick && val.onClick();
                        return val.title === "LOG OUT" && setUser(null);
                      }}
                      className=" group mb-3 ml-6 mt-5 flex items-end justify-between "
                    >
                      <span className="text-[11px] font-medium">
                        {val.title}
                      </span>
                      <span className="transition-all ease-in-out group-hover:scale-[1.2]">
                        {val.icon}
                      </span>
                    </div>
                    <div className="border-b-[1px] border-[#C9C2B6]" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed bottom-2 w-full border  lg:hidden xlg:hidden ">
        <div className="flex w-full justify-between px-10">
          {NavigationTab?.map((prop) => (
            <div
              key={Math.random() * Math.PI}
              className="flex flex-col items-center justify-center pt-2"
            >
              <span>{prop.icon}</span>
              <span className="text-[10px] font-medium md:text-xs">
                {prop.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Account;
