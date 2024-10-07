import React from "react";
import Image from "next/image";
import { BundoLogoIcon } from "@/assets";
import fallBackImage from "@/assets/images/1000287458.jpg";

import cn from "@/lib/utils";
import ImageWrapper from "@/app/dashboard/vendors/(vendors)/_components/ImageWrapper";

function CustomersCategoryCard({
  image,
  productName,
  height,
  onClick,
}: {
  image: string;
  productName: string;
  height?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick!}
      className={cn(
        `flex ${height} w-fit  flex-col items-center  rounded-[10px] `,
      )}
    >
      <div className=" relative flex aspect-square w-[clamp(58.94px,_8vw,_58.94px)]   justify-center overflow-hidden  overflow-x-auto rounded-full md:w-[clamp(78.94px,_8vw,_78.94px)]">
        <ImageWrapper
          src={image ?? fallBackImage}
          alt="logo image"
          fill
          style={{ objectFit: "cover" }}
          fallbackSrc={fallBackImage}
        />
        {/* </div> */}

        <div className="absolute  h-full w-full bg-black bg-opacity-35 " />
        {/* <div className="absolute"> */}
        <BundoLogoIcon />
        {/* </div> */}
      </div>
      <div className="mx-2 flex w-[clamp(58.94px,_8vw,_58.94px)] items-center justify-center md:w-[clamp(78.94px,_8vw,_78.94px)]">
        <span className="mt-4 text-center text-[9px] font-medium md:text-[12px]">
          {productName}
        </span>
      </div>
    </div>
  );
}

export default CustomersCategoryCard;
