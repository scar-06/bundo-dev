"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CirclePlusIcon, logo } from "@/assets";
import fallBackImage from "@/assets/images/1000287458.jpg";
import { useVendorBusinessStore } from "@/store/business.store";
import { ModifiedUser, useUserStore } from "@/store/user.store";
import { toast } from "react-toastify";
import { useStore } from "zustand";

import { Business, Product } from "@/lib/app/vendors/services";
import { generateChecklist } from "@/lib/utils";
import { useGetLoggedInUser } from "@/hooks/useGetLoggedInUser";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

import CreateAdz from "./createAdz";
import ImageWrapper from "./ImageWrapper";

type Props = {
  state: "empty" | "create" | "product";
  product?: Product;
  productsLength?: number;
};

function VendorGridItemCard({ state, product, productsLength }: Props) {
  useGetLoggedInUser();
  const user = useStore(useUserStore, (state) => state.user);
  const data = useStore(useVendorBusinessStore, (state) => state.business);
  const checkList = generateChecklist(
    user as ModifiedUser,
    data?.business as Business,
  );
  const isTaskCompleted =
    checkList.filter((check) => check.status !== "completed").length === 0;
  const lengthOfProducts = productsLength as number;
  const canCreateProduct =
    (data?.business?.plan?.actionables.noOfTiles as number) > lengthOfProducts;
  const [status, setShowStatus] = useState(false);
  return (
    <div className="flex aspect-square w-full cursor-pointer items-center justify-center bg-[#CFD4CE] object-cover">
      {state === "empty" && (
        <>
          {isTaskCompleted ? (
            <Link
              href={"/dashboard/vendors/upload_product"}
              className="relative isolate flex aspect-square w-full cursor-pointer items-center justify-center overflow-hidden object-cover"
            >
              <span className="relative aspect-square w-[45%] max-w-[60px] rounded-full">
                <ImageWrapper
                  src={
                    data?.business?.business_profile_picture ?? fallBackImage
                  }
                  alt="brand logo"
                  fill
                  // unoptimized
                  className=" rounded-[inherit]"
                  fallbackSrc={fallBackImage}
                />
              </span>
            </Link>
          ) : (
            <button
              className="aspect-square w-[80%] max-w-[60px] rounded-full"
              onClick={() => setShowStatus(true)}
            >
              <div className="relative isolate flex aspect-square w-full cursor-pointer items-center justify-center overflow-hidden rounded-[inherit]  object-cover">
                <Image
                  src={data?.business?.business_profile_picture ?? logo}
                  alt="brand logo"
                  fill
                  className=" h-full w-full rounded-2xl object-cover "
                  unoptimized
                />
              </div>
            </button>
          )}
        </>
      )}

      {state === "product" && (
        <div className="relative isolate h-full w-full">
          {(data?.business?.plan?.actionables.createAds as boolean) &&
            product?.quantity !== 0 && (
              <span className="absolute right-1 top-2">
                <CreateAdz product={product as Product} />
              </span>
            )}
          <Link
            href={`/dashboard/vendors/uploaded_product/product/${product?._id}`}
            className="absolute z-[-1] h-full w-full"
          >
            <Image
              src={product?.pictures[0] ?? ""}
              fill
              alt={product?.name ?? " product name"}
              className=" object-cover"
              unoptimized
            />
            {product?.quantity === 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                <div className="flex h-fit w-fit items-center justify-center rounded-full bg-[#DE350B] px-2 py-1">
                  <span className="text-[7px] font-bold text-white">
                    OUT OF STOCK
                  </span>
                </div>
              </div>
            )}
          </Link>
        </div>
      )}

      {state === "create" &&
        (canCreateProduct ? (
          <>
            {isTaskCompleted ? (
              <Link href={"/dashboard/vendors/upload_product"}>
                <Button
                  variant={"plain"}
                  className=" transition-all  duration-300 ease-in-out hover:scale-[1.2]"
                >
                  <CirclePlusIcon />
                </Button>
              </Link>
            ) : (
              <button onClick={() => setShowStatus(true)}>
                <Button
                  variant={"plain"}
                  className=" transition-all  duration-300 ease-in-out hover:scale-[1.2]"
                >
                  <CirclePlusIcon />
                </Button>
              </button>
            )}
          </>
        ) : (
          <button
            className="  flex h-full w-full items-center justify-center"
            onClick={() => toast.info("Please upgrade to add more products")}
          >
            <CirclePlusIcon />
          </button>
        ))}

      <Modal
        isOpen={status}
        showCloseIcon={false}
        closeModal={() => setShowStatus(false)}
      >
        <div
          className="hideScrollBar relative flex w-[95vw] max-w-[504px]  flex-col items-center justify-center gap-8 rounded-[40px]  bg-white px-[44px] py-[49px] sm:w-screen "
          style={{
            boxShadow: "0px 0px 1px 0px #091E424F, 0px 8px 12px 0px #091E4226",
          }}
        >
          <button
            onClick={() => setShowStatus(false)}
            className="absolute right-[20px] top-[-60px] z-[32] h-[50px] w-[50px]  rounded-3xl bg-white font-bold text-black/90 shadow-2xl"
          >
            &times;
          </button>
          <span className="relative isolate ml-1 flex aspect-square w-[clamp(72px,_8vw,_72px)] items-center justify-center rounded-full">
            <Image
              src={data?.business?.business_profile_picture ?? logo}
              alt="brand logo"
              fill
              priority
              className="rounded-full object-cover"
              unoptimized
            />
          </span>
          {checkList[0]?.status === "pending" &&
          checkList[1]?.status === "completed" &&
          checkList[2]?.status === "completed" ? (
            <h3 className="w-[90%] text-center text-sm">
              Hey <b>{data?.business?.name}</b>, {`Onboarding complete! We're `}
              <b>verifying</b>
              {` your info. It will be done `}
              <b>within 24 hours or less</b>
              {`. Almost there!`}
            </h3>
          ) : (
            <h3 className="w-[90%] text-center text-sm">
              Hey <b>{data?.business?.name}</b>, Complete your{" "}
              <b>onboarding tasks</b> to showcase your amazing products.
              {` Let’s ensure we’re all set for your big `}
              <b>launch!</b>
            </h3>
          )}

          <div className="flex w-full max-w-[300px] flex-col items-center justify-center gap-4">
            <Link href={"/dashboard/vendors/marketplace"} className="w-full">
              <Button size={"sm"} variant={"light-green"} className="w-full">
                {"Browse Marketplace"}
              </Button>
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default VendorGridItemCard;
