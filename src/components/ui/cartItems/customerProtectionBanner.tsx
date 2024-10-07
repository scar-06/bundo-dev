import React from "react";
import Image from "next/image";
import { bundoMockup, InfoIndicatorIcon } from "@/assets";
import { Tooltip } from "react-tooltip";

import cn from "@/lib/utils";
import { Typography } from "@/components/typography";

function CustomerProtectionBanner() {
  return (
    <div className="ring-solid relative mb-4 mt-8 overflow-hidden rounded-[20px] px-[15px] py-[24px] ring-[1px] ring-[#DE350B] sm:px-[30px]">
      <Typography variant={"body-5"}>
        <h3 className="flex items-center gap-1">
          CUSTOMER PROTECTION
          <button
            type="button"
            id="tooltip-customers-protection"
            className=" h-6 w-6 cursor-pointer "
          >
            <InfoIndicatorIcon className=" text-red-600" />
          </button>
        </h3>
      </Typography>
      <Typography
        className="mt-1 text-xs font-normal !text-[#31302E]"
        fontWeight={"regular"}
      >
        We care that you have the best experience on Bundo. Learn more about our
        customer protection policies.
      </Typography>
      <div className="  flex">
        <div className="mt-[12px] w-[calc(100%_-_10%)]  pl-4 md:w-[calc(100%_-_30%)] xxmd:w-[calc(100%_-_20%)] mxxss:w-full">
          <ul className=" flex list-disc flex-col gap-2">
            <li>
              <Typography className="text-base font-semibold">
                Vendors
              </Typography>
              <ul className=" flex list-decimal flex-col pl-4 ">
                <li>
                  <Typography
                    className="text-xs  font-normal !text-[#31302E]"
                    fontWeight={"regular"}
                  >
                    We verify the identities of all vendors on Bundo using
                    standard data verification procedures.
                  </Typography>
                </li>
                <li>
                  <Typography
                    className="text-xs  font-normal !text-[#31302E] mxxss:w-full"
                    fontWeight={"regular"}
                  >
                    We do not check or verify the quality of vendor
                    products/stock because we are only middlemen. Hence,
                    purchases are fully at the discretion of buyers.
                  </Typography>
                </li>{" "}
                <li>
                  <Typography
                    className="w-[80%] text-xs  font-normal !text-[#31302E] mxxss:w-full"
                    fontWeight={"regular"}
                  >
                    We flag vendor accounts that have a consistent bad
                    reputation and track record to protect customers
                  </Typography>
                </li>
              </ul>
            </li>
            <li>
              <Typography className="text-base font-semibold">
                Returns
              </Typography>
              <ul className=" list-decimal pl-4">
                <li>
                  <Typography
                    className="w-[80%] text-xs  font-normal !text-[#31302E] mxxss:w-full"
                    fontWeight={"regular"}
                  >
                    Returns are valid and can be initiated ONLY within 24 hours
                    after delivery for ALL eligible items
                  </Typography>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className=" absolute bottom-0 right-[-70px] top-[40%] ml-auto  w-[200px] sm:top-[30%] md:right-[24px] md:top-[25%] lg:top-0   mlg:hidden mxxss:hidden">
          <Image src={bundoMockup} fill alt="mock up" />
        </div>
      </div>

      <Tooltip
        place="top"
        className={cn(
          "z-[50] !w-[250px] !rounded-sm border border-solid !bg-white !px-4 !py-6 !text-tertiary-pale-950 !opacity-100 !shadow-md",
        )}
        anchorSelect="#tooltip-customers-protection"
        clickable
      >
        some service information
      </Tooltip>
    </div>
  );
}

export default CustomerProtectionBanner;
