import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFoundImage } from "@/assets";

import { Button } from "@/components/ui/button";

function NotFound() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center px-6 font-tv2SansDisplay xlg:px-0">
      <div className="mb-[46px]">
        <Image src={notFoundImage} className="" alt="not found" />
      </div>

      <p className="w-full max-w-[556px] text-center text-base text-tertiary-pale-950">
        {`Oops! Seems like you’ve missed your way. But it’s never too late to find
        your way back to the land of simplified retail`}
      </p>
      <Link href="/" className="mt-[64px] w-full max-w-[411px]">
        <Button className=" w-full ">RETURN TO HOME</Button>
      </Link>
    </main>
  );
}

export default NotFound;
