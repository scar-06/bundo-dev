"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Close, FullLogo, Hamburger } from "@/assets";
import { getCookie } from "cookies-next";

import { useLogout } from "@/hooks/useLogout";
import usePageViewAnalytics from "@/hooks/usePageViewAnalytics";
import { Button } from "@/components/ui/button";
import CartCountBtn from "@/components/ui/cartItems/cartCountBtn";

import { UserInfoProps } from "../../../../next-auth";

const Role = {
  vendor: "vendor",
  buyer: "buyer",
};

function Navbar({ lightVariant = false }) {
  const { logout } = useLogout();
  const ref = useRef(null);
  const [scrolling, setScrolling] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const currentPath = usePathname();
  const cookieVal = getCookie("auth_token");

  const user =
    cookieVal !== undefined
      ? (JSON.parse(cookieVal) as UserInfoProps)
      : ({} as UserInfoProps);

  const textColor = lightVariant
    ? scrolling
      ? "text-bundo-black-a"
      : "text-bundo-white"
    : "";
  const logoColor =
    lightVariant || scrolling
      ? ""
      : lightVariant
        ? "[&>g>path]:fill-bundo-white"
        : "";

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 3);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isLinkActive = (href: string) => currentPath === href;

  // Initiate page view analytics
  usePageViewAnalytics();

  return (
    <header
      className={`fixed w-full bg-white ${
        scrolling ? "shadow-md" : ""
      } z-50 duration-300 ease-in-out`}
    >
      {/* Desktop Navbar */}
      <nav className="container hidden px-3 py-6 xxlg:block">
        <div className="flex items-center justify-between">
          <Link href="/">
            <FullLogo className={logoColor} />
          </Link>
          <div
            className="relative flex items-center gap-10 font-light"
            ref={ref}
          >
            {["/", "/about", "/#faqs", "/marketplace"].map((path) => (
              <Link
                key={path}
                href={path}
                className={`text-sm hover:text-primary-500 ${
                  isLinkActive(path) ? "font-bold text-primary-500" : textColor
                }`}
              >
                {path === "/"
                  ? "Home"
                  : path
                      .substring(1)
                      .replace("#faqs", "FAQs")
                      .replace("marketplace", "Marketplace")
                      .replace("about", "About us")}
              </Link>
            ))}
            <div className=" flex items-center gap-4">
              <Link href={"/marketplace/cart"}>
                <CartCountBtn
                  userType={user?.role === "customer" ? "customers" : "vendors"}
                  noLink
                />
              </Link>
            </div>
            {user?.firstName ? (
              <div className="flex items-center gap-4">
                <Link
                  href={
                    user?.role === Role.vendor
                      ? "/dashboard/vendors"
                      : "/dashboard/customers"
                  }
                  className="flex flex-row-reverse items-center gap-1"
                >
                  <div className="isolate ml-1 flex aspect-square w-[clamp(50px,_8vw,_50px)] items-center justify-center rounded-full bg-[#34A853]">
                    <span className="font-bold text-[#fff]">
                      {user?.firstName[0]}
                    </span>
                  </div>
                  <span className="text-[12px] font-bold">
                    {user?.firstName}
                  </span>
                </Link>
                <Button onClick={() => logout()} variant="deep-green">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link href="/auth/login">
                  <Button variant="deep-green">Log in to your account</Button>
                </Link>
                <Link href="/auth/onboarding">
                  <Button variant="light-green">Create your account</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav
        className={`container relative isolate px-6 py-4 xxlg:hidden ${
          showMobileNav
            ? "bg-tertiary-pale-100"
            : scrolling
              ? "bg-tertiary-white-100 shadow-md"
              : "bg-transparent"
        }`}
      >
        <div className="z-1 flex w-full items-center justify-between">
          <Link href="/">
            <FullLogo
              className={`-ml-8 scale-75 ${logoColor} ${
                showMobileNav ? "[&>g>path]:!fill-bundo-black-b" : ""
              }`}
            />
          </Link>
          <div className="flex flex-row-reverse gap-4">
            <button onClick={() => setShowMobileNav(!showMobileNav)}>
              {showMobileNav ? (
                <Close className="[&>*]:stroke-bundo-yellow [&>*]:fill-bundo-yellow" />
              ) : (
                <Hamburger className="[&>*]:stroke-bundo-white [&>*]:fill-bundo-white" />
              )}
            </button>
            <Link href={"/marketplace/cart"}>
              <CartCountBtn
                userType={user?.role === "customer" ? "customers" : "vendors"}
                noLink
              />
            </Link>
          </div>
        </div>
        <div
          className={`fixed left-0 grid w-full overflow-hidden bg-inherit px-6 text-center transition-all duration-300 ease-in-out ${
            showMobileNav
              ? "top-[72px] h-screen grid-rows-[1fr] py-20 opacity-100"
              : "top-[-60px] h-0 grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-y-10">
              {["/", "/marketplace", "/about", "/#faqs"].map((path) => (
                <Link
                  key={path}
                  href={path}
                  className={`${
                    isLinkActive(path)
                      ? "text-lg font-bold text-primary-500"
                      : "text-sm"
                  }`}
                  onClick={() => setShowMobileNav(false)}
                >
                  {path === "/"
                    ? "Home"
                    : path
                        .substring(1)
                        .replace("#faqs", "FAQs")
                        .replace("marketplace", "Marketplace")
                        .replace("about", "About us")}
                </Link>
              ))}
              {user?.firstName ? (
                <div className="flex w-full flex-col items-center gap-4">
                  <Link
                    href={
                      user?.role === Role.vendor
                        ? "/dashboard/vendors"
                        : "/dashboard/customers"
                    }
                    className="flex items-center gap-1"
                  >
                    <div className="isolate ml-1 flex aspect-square w-[clamp(50px,_8vw,_50px)] items-center justify-center rounded-full bg-[#34A853]">
                      <span className="font-bold text-[#fff]">
                        {user?.firstName[0]}
                      </span>
                    </div>
                    <span className="text-[12px] font-bold">
                      {user?.firstName}
                    </span>
                  </Link>
                  <Button
                    className="w-full"
                    onClick={() => {
                      logout();
                      setShowMobileNav(false);
                    }}
                    variant="deep-green"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="mx-auto flex w-[80%] flex-col-reverse gap-4">
                  <Link href="/auth/login" className="w-full">
                    <Button
                      onClick={() => setShowMobileNav(false)}
                      className="w-full"
                      variant="deep-green"
                    >
                      Log in to your account
                    </Button>
                  </Link>
                  <Link href="/auth/onboarding" className="w-full">
                    <Button
                      onClick={() => setShowMobileNav(false)}
                      className="w-full"
                      variant="light-green"
                    >
                      Create your account
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
