import React from "react";
import { SearchIcon } from "@/assets";

import { Input } from "@/components/ui/input";

type Props = {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  text?: string;
};
function MarketplaceSearch({ handleSearch, text }: Props) {
  return (
    <div className="container flex items-center justify-center px-6 sm:px-0">
      <div className="flex w-full max-w-[530px] flex-col items-center gap-4">
        <h3 className="text-xs  font-semibold text-tertiary-pale-950  md:text-sm">
          {text ? (
            <span className="text-[12px] font-semibold md:text-sm ">
              Find <span className="hidden md:inline-flex">new</span> vendors in
              our virtual marketplace 🛍🛒
            </span>
          ) : (
            " Discover cool vendors near you 🛍🛒"
          )}
        </h3>
        <div
          tabIndex={0}
          className="group  flex h-[53px] w-full items-center gap-2 rounded-[5px] border border-[#c8c8c8] bg-[rgba(222,_242,_251,_0.30)]  px-[10px]"
        >
          <span className="">
            <SearchIcon className="transition-all duration-500 ease-in-out group-focus-within:text-primary-500 group-hover:stroke-primary-500  group-hover:text-primary-300" />
          </span>
          <Input
            onChange={handleSearch}
            placeholder="Search for vendors and products...."
            className="h-full border-none bg-transparent text-[11px] outline-none md:text-xs"
          />
        </div>
      </div>
    </div>
  );
}

export default MarketplaceSearch;
