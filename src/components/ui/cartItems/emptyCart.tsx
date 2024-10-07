import React from "react";
import Image from "next/image";
import Link from "next/link";
import { DetailViewIcon, womanInBundoEmptyCart } from "@/assets";
import { useUserStore } from "@/store/user.store";
import { useStore } from "zustand";

import { Button } from "../button";

function EmptyCart({
  womanInBundoIcon = true,
  path,
  isCart,
}: {
  womanInBundoIcon?: boolean;
  path?: string;
  isCart?: boolean;
}) {
  const { user } = useStore(useUserStore, (state) => state);
  const role = user?.role;

  return (
    <div className="flex h-fit min-h-[calc(100vh_-_300px)] w-full flex-col items-center  justify-center ">
      {isCart ? (
        <div className="relative h-[clamp(107px,_5vw,_157px)]  w-[clamp(83px,_5vw,_121px)]">
          <svg
            width="72"
            height="72"
            viewBox="0 0 72 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.462646"
              width="71.0747"
              height="71.0747"
              rx="35.5374"
              fill="#FAF8F3"
            />
            <path
              d="M43 31H40V30C40 28.9391 39.5786 27.9217 38.8284 27.1716C38.0783 26.4214 37.0609 26 36 26C34.9391 26 33.9217 26.4214 33.1716 27.1716C32.4214 27.9217 32 28.9391 32 30V31H29C28.7348 31 28.4804 31.1054 28.2929 31.2929C28.1054 31.4804 28 31.7348 28 32V43C28 43.7956 28.3161 44.5587 28.8787 45.1213C29.4413 45.6839 30.2044 46 31 46H41C41.7956 46 42.5587 45.6839 43.1213 45.1213C43.6839 44.5587 44 43.7956 44 43V32C44 31.7348 43.8946 31.4804 43.7071 31.2929C43.5196 31.1054 43.2652 31 43 31ZM34 30C34 29.4696 34.2107 28.9609 34.5858 28.5858C34.9609 28.2107 35.4696 28 36 28C36.5304 28 37.0391 28.2107 37.4142 28.5858C37.7893 28.9609 38 29.4696 38 30V31H34V30ZM42 43C42 43.2652 41.8946 43.5196 41.7071 43.7071C41.5196 43.8946 41.2652 44 41 44H31C30.7348 44 30.4804 43.8946 30.2929 43.7071C30.1054 43.5196 30 43.2652 30 43V33H32V34C32 34.2652 32.1054 34.5196 32.2929 34.7071C32.4804 34.8946 32.7348 35 33 35C33.2652 35 33.5196 34.8946 33.7071 34.7071C33.8946 34.5196 34 34.2652 34 34V33H38V34C38 34.2652 38.1054 34.5196 38.2929 34.7071C38.4804 34.8946 38.7348 35 39 35C39.2652 35 39.5196 34.8946 39.7071 34.7071C39.8946 34.5196 40 34.2652 40 34V33H42V43Z"
              fill="#34A853"
            />
          </svg>
        </div>
      ) : (
        <>
          {womanInBundoIcon ? (
            <div className="relative h-[clamp(107px,_5vw,_157px)]  w-[clamp(83px,_5vw,_121px)]">
              <Image src={womanInBundoEmptyCart} fill alt="woman in bundo" />
            </div>
          ) : (
            <div className=" mb-3 flex h-[71px] w-[71px] items-center justify-center rounded-full bg-[#FAF8F3]">
              <DetailViewIcon />
            </div>
          )}
        </>
      )}
      {/* hidden */}

      <p className="text-center text-xs text-tertiary-pale-950 sm:text-sm">
        There’s nothing in your shopping bag yet.
        <br className=" xlg:block" /> Go through different vendors and find a
        product you love!
      </p>
      <Link href={path || `/dashboard/${role}s/marketplace`}>
        <Button className="mt-[30px] w-full text-[10px] !font-normal sm:w-fit sm:text-sm">
          LOOK FOR SOMETHING TO BUY
        </Button>
      </Link>
    </div>
  );
}

export default EmptyCart;
