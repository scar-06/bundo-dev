import React, { ChangeEvent } from "react";
import { SearchIcon } from "@/assets";

import { Input } from "@/components/ui/input";
import SkeletonLoader from "@/components/loaders/skeletonLoader";
import MarketplaceSort, {
  SelectOptionBtn,
} from "@/app/(root)/marketplace/_components/marketplaceSort";

interface Props {
  isLoading: boolean;
  categoriesData: any;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  handleFilterButtonClick: (category: string) => void;
  filters: string[];
  text?: string;
}

function VendorSearch({
  isLoading,
  categoriesData,
  handleSearch,
  handleFilterButtonClick,
  filters,
  text,
}: Props) {
  return (
    <div className="flex w-full flex-col items-center text-sm font-semibold">
      <span className="text-[12px] font-semibold md:text-sm">
        {text ?? "Find vendors in our marketplace"} 🛍🛒
      </span>
      <div className="group mb-4 mt-2 flex h-[53px] w-full max-w-[600px] items-center gap-2 rounded-[5px] border border-[#c8c8c8] bg-[rgba(222,_242,_251,_0.30)] px-[10px] lg:w-full xlg:w-full">
        <span>
          <SearchIcon className="transition-all duration-500 ease-in-out group-focus-within:text-primary-500 group-hover:stroke-primary-500 group-hover:text-primary-300" />
        </span>
        <Input
          onChange={handleSearch}
          placeholder="Search for vendors and products....."
          className="h-full border-none bg-transparent text-[10px] font-normal outline-none md:text-sm"
        />
      </div>
      <div className=" mb-4 w-full flex-col  md:mb-12 [&>div>div>div]:xlg:!ml-[unset]">
        {isLoading ? (
          <div className="hideScrollBar flex w-full cursor-move gap-2 py-1">
            <div className="flex w-full items-center gap-4 overflow-x-auto">
              {Array(15)
                .fill(0)
                .map((_, index) => (
                  <SkeletonLoader
                    key={Math.random() * 10}
                    className="whitespace-nowrap rounded-full border border-primary-500 p-[18px_50px] text-sm outline-none transition-all ease-in-out remove-tap-highlight"
                  />
                ))}
            </div>
          </div>
        ) : (
          <MarketplaceSort
            items={categoriesData?.categories || []}
            filters={filters}
            setFilters={handleFilterButtonClick}
          />
        )}
      </div>
    </div>
  );
}

export default VendorSearch;
