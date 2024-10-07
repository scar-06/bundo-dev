import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowBackIcon, womanInBundoEmptyCart } from "@/assets";
import { useUserStore } from "@/store/user.store";
import { useStore } from "zustand";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function SeeAll({ path }: { path: string }) {
  const user = useStore(useUserStore, (state) => state);
  const isUserLoggedIn = !!user.user?.role;
  const redirectLink = `/dashboard/${user.user?.role}s/${path}`;

  return (
    <div>
      {isUserLoggedIn ? (
        <Link href={redirectLink}>
          {" "}
          <button className="text-xs font-medium underline">see all</button>
        </Link>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <button className="text-xs font-medium underline">see all</button>
          </DialogTrigger>
          <DialogContent className="w-[95%] max-w-2xl rounded-xl p-[clamp(30px,_5vw,_60px)_clamp(10px,_5vw,_70px)] font-tv2SansDisplay md:w-full">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogClose className="flex cursor-pointer items-center gap-2 text-tertiary-deep-green-950 hover:text-primary-500">
                  <ArrowBackIcon />
                  <DialogTitle className="mdtext-base text-sm">
                    Login to see more
                  </DialogTitle>
                </DialogClose>
              </div>
            </DialogHeader>
            <div className="flex w-full items-center space-x-2 overflow-x-auto">
              <div className="flex h-fit min-h-[300px] w-full flex-col items-center  justify-center gap-6 ">
                <div className="relative h-[clamp(107px,_6vw,_200px)]  w-[clamp(83px,_5vw,_121px)]">
                  <Image
                    src={womanInBundoEmptyCart}
                    fill
                    alt="woman in bundo"
                  />
                </div>
                <p className="text-center  text-sm text-tertiary-pale-950 md:text-base">
                  {` Log In or Create an Account to finish what you’ve started`}
                </p>
                <DialogClose className="flex w-full flex-wrap items-center justify-between gap-4 md:w-fit md:flex-nowrap">
                  <Link href="/auth/login" className="w-full">
                    <Button variant="deep-green" className="w-full">
                      Login to your account
                    </Button>
                  </Link>
                  <Link href="/auth/signup" className="w-full">
                    <Button variant="light-green" className="w-full">
                      Create your account
                    </Button>
                  </Link>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default SeeAll;
