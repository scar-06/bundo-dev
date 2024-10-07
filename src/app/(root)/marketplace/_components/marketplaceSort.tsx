"use client";

import React, { useState } from "react";
import { CrossCircleIcon } from "@/assets";

import { categoriesResponseItem } from "@/lib/app/category/services";
import cn from "@/lib/utils";

export function SelectOptionBtn({
  text,
  onClick,
  selectedItem,
  disabled,
}: {
  text: string;
  onClick?: (item: any) => void;
  selectedItem?: any[];
  disabled?: boolean;
}) {
  const [select, setSelect] = useState(false);
  const handleClick = () => {
    setSelect(!select);
  };
  // bg-[#E0E0E0]
  return (
    <button
      onClick={onClick || handleClick}
      disabled={disabled}
      className={cn(
        "whitespace-nowrap rounded-full border border-primary-500 p-[8px_15px] text-[11px] font-medium outline-none transition-all ease-in-out remove-tap-highlight",
        (selectedItem?.includes(text) && !disabled) || select
          ? "bg-primary-500 text-white"
          : disabled
            ? "bg-[#E0E0E0]"
            : "bg-transparent",
      )}
    >
      {text}
    </button>
  );
}
function MarketplaceSort({
  items,
  filters,
  setFilters,
}: {
  items: categoriesResponseItem[];
  filters: any[];
  setFilters: (selectedCategory: string) => void;
}) {
  return (
    // ml-6
    <div className="xlg:ml-0">
      <div className="hideScrollBar w-full flex-col gap-4 overflow-x-auto ">
        <div className=" flex w-fit cursor-move gap-2 py-1 xlg:ml-[calc(_(100vw_-_1200px)_/_2)] ">
          {items?.map((_) => (
            <SelectOptionBtn
              text={_.category}
              key={Math.random()}
              onClick={() => {
                setFilters(_?.category);
              }}
              selectedItem={filters}
              disabled={filters.length > 2 && !filters?.includes(_?.category)}
            />
          ))}
        </div>
      </div>
      <div className=" ml-4 xlg:ml-0">
        <div className="hideScrollBar mt-2 flex w-full items-center gap-5 overflow-x-auto">
          {filters?.map((v) => (
            <div key={Math.random()} className="flex  items-center gap-1">
              <span className="text-nowrap text-mxs-body-7 text-primary-500 sm:text-body-7">
                {v}
              </span>
              <span className="cursor-pointer" onClick={() => setFilters(v)}>
                <CrossCircleIcon />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MarketplaceSort;
