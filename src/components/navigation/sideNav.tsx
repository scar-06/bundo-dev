import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type INavItem = {
  path: string;
  title: string;
  icon: React.JSX.Element;
  onClick?: () => void;
};
export type INavItems = INavItem[];
function SideNav({
  navItems,
  // lightVariant = false,
}: {
  navItems: INavItems;
  // lightVariant: boolean;
}) {
  const currentPath = usePathname();

  // const textColor = `${
  //   lightVariant ? "text-bundo-black-a" : lightVariant ? "text-bundo-white" : ""
  // }`;
  const isLinkActive = (href: string) => currentPath === href;

  return (
    <div className=" sticky left-0 top-[80px] hidden h-[calc(100vh_-_80px)]  w-[140px] flex-col  lg:border-r-[1px] xxlg:block xlg:border-r-[1px]">
      <div className="mt-6">
        {navItems &&
          navItems.map((val) => (
            <Link
              href={val.path}
              key={Math.PI * Math.random()}
              className=" flex items-center py-4 pl-4  text-[#808080] transition-all duration-700 ease-in-out hover:bg-[rgba(222,_242,_251,_0.30)] hover:text-[#34A853]"
            >
              <span
                className={` ${
                  isLinkActive(val.path) ? "text-[#34A853]" : "none"
                }`}
              >
                {val.icon}
              </span>
              <span
                className={`mx-2 text-[12px] xxlg:hidden xlg:block ${
                  isLinkActive(val.path) ? "font-medium text-[#34A853]" : "none"
                }`}
              >
                {val.title}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default SideNav;
