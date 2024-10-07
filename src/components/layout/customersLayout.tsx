"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  // AccountIcon,
  BundoLogo,
  CartIcon,
  Close,
  Hamburger,
  // HouseIcon,
  // LocationIcon,
  NewSearchIcon,
  NotificationIcon,
} from "@/assets";

type INavItems = {
  path: string;
  title: string;
  icon: string;
};

function CustomersLayout({
  name,
  lightVariant = false,
  NavItems,
}: {
  name: string;
  lightVariant: boolean;
  NavItems: INavItems[];
}) {
  const currentPath = usePathname();

  // const ref = useRef(null);
  const [showMobileNav, setShowMobileNav] = useState(true);
  // const currentPath = usePathname();

  const textColor = `${
    lightVariant ? "text-bundo-black-a" : lightVariant ? "text-bundo-white" : ""
  }`;

  const isLinkActive = (href: string) => currentPath === href;

  return (
    <div>
      <nav className=" hideScrollBar hidden lg:block">
        <div className="hideScrollBar flex items-center justify-between bg-[#F1E9DB] p-[10px] pl-[10.5rem] pr-[8rem]">
          <div className="hideScrollBar flex items-center">
            <BundoLogo />
            <div className="relative flex">
              <NotificationIcon className="ml-[10px]" />
              <span className="absolute right-0 top-0 z-[1] rounded-full bg-[#FF4D4F] p-[0px_6px] text-xs text-white">
                0
              </span>
            </div>
          </div>
          <span className="flex">
            <NewSearchIcon />
            <span className="text-[10px] text-[#8E8A87]">
              search for something
            </span>
          </span>
          <div className="flex items-center">
            <span className="text-[12px] font-bold ">Hi {name}! </span>
            <div
              className="isolate ml-1 flex aspect-square w-[clamp(50px,_8vw,_50px)] items-center justify-center rounded-full bg-[#34A853]"
              // key={Math.PI * Math.random()}
            >
              <span className="font-bold text-[#fff]">M</span>
            </div>
            <button onClick={() => setShowMobileNav(!showMobileNav)}>
              <Hamburger className="ml-2 cursor-pointer" />
            </button>
            <span className="ml-4 flex items-center gap-1">
              <CartIcon />
              <span className="rounded-full bg-[#FF4D4F] p-[5px_10px] text-xs text-white">
                0
              </span>
            </span>
          </div>
        </div>
        <div className="border-r-solid border-r-black-200 h-[100vh !important] w-[153px] border-r-[2px] px-6 pt-12">
          {NavItems &&
            NavItems.map((val) => (
              <Link
                href={val.path}
                key={Math.PI * Math.random()}
                className="mb-10 flex items-center text-[#808080]"
              >
                <span
                  className={` ${
                    isLinkActive(val.path) ? "text-[#34A853]" : "none"
                  }`}
                >
                  {val.icon}
                </span>
                <span className="mx-2 text-[12px]">{val.title}</span>
              </Link>
            ))}
        </div>
      </nav>
      <nav
        className={`container relative isolate bg-[#F1E9DB] px-3  py-6 lg:hidden ${"bg-transparent"}`}
      >
        <div className="z-1 flex w-full  items-center justify-between">
          <div className="flex items-center">
            <BundoLogo />
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
            <span className="flex items-center gap-1">
              <CartIcon />
              <span className="rounded-full bg-[#FF4D4F] p-[5px_10px] text-xs text-white">
                0
              </span>
            </span>
          </div>
        </div>
        <div
          className={`fixed left-0  grid w-full overflow-hidden  bg-inherit px-14 text-center transition-all duration-300 ease-in-out ${
            showMobileNav
              ? " top-[200px] h-[auto] grid-rows-[1fr] py-20  opacity-100"
              : " top-[-60px] h-0 grid-rows-[0fr] overflow-hidden opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-y-10">
              <Link
                href="/"
                className={`text-bundo-black-b text-lg ${
                  isLinkActive("/") ? " font-bold text-primary-500 " : ""
                }`}
                onClick={() => setShowMobileNav(false)}
                scroll={false}
              >
                Home
              </Link>
              <Link
                href="/marketplace"
                className={`text-bundo-black-b text-lg ${
                  isLinkActive("/marketplace")
                    ? " font-bold text-primary-500 "
                    : ""
                }`}
                onClick={() => setShowMobileNav(false)}
                scroll={false}
              >
                Marketplace
              </Link>
              <Link
                href="/businesses"
                className={`text-sm hover:text-primary-500 ${textColor}`}
                onClick={() => setShowMobileNav(false)}
                scroll={false}
              >
                About us
              </Link>
              <Link
                href="/#faqs"
                className={`text-sm hover:text-primary-500 ${textColor}`}
                onClick={() => setShowMobileNav(false)}
                scroll={false}
              >
                FAQs
              </Link>
              <a
                href="#faq"
                className={`text-sm hover:text-primary-500 ${textColor}`}
                onClick={() => setShowMobileNav(false)}
              >
                Careers
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default CustomersLayout;
