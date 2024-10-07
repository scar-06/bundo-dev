import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowBackIcon,
  GreyCancelIcon,
  SmallNotificationIcon,
  womanInBundoEmptyCart,
} from "@/assets";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type INotificationType = {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  actionText?: string;
  children?: React.ReactNode;
};

function SuccessNotificationModal(props: INotificationType) {
  const { icon, title, description, actionText, children } = props;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full text-xs font-medium ">{children}</div>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded p-[clamp(20px,_5vw,_30px)_clamp(10px,_5vw,_30px)] font-tv2SansDisplay md:w-full">
        <DialogHeader>
          <div className="flex  cursor-pointer justify-end">
            <DialogClose className="flex cursor-pointer items-center text-tertiary-deep-green-950 hover:text-primary-500">
              <GreyCancelIcon />
            </DialogClose>
          </div>
        </DialogHeader>
        <div className="flex w-full items-center space-x-2 overflow-x-auto">
          <div className="flex h-fit min-h-[300px] w-full flex-col items-center  justify-center gap-3 ">
            <div>{icon || <SmallNotificationIcon />}</div>
            <div className="flex flex-col gap-4">
              <p className="text-center text-sm  font-semibold text-tertiary-pale-950 md:text-base">
                {title || "Welcome to Bundo!"}
              </p>
              <p className="text-center text-xs text-[#808080]">
                {description ||
                  "Congratulations on successfully creating your Bundo account! Start discovering new vendors & buying!"}
              </p>
            </div>
            <DialogClose className="mt-10 flex w-full flex-wrap items-center ">
              <Link href="" className="w-full">
                <Button className="w-full">
                  {actionText || "VIEW WELCOME EMAIL"}
                </Button>
              </Link>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SuccessNotificationModal;
