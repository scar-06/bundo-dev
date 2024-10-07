import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CartIcon,
  EditCircleIcon,
  FeddbackRedIcon,
  InfoIndicatorIcon,
} from "@/assets";
import { useCartStore } from "@/store/cart.store";
import { useServerCartStore } from "@/store/serverCart.store";
import { useUserStore } from "@/store/user.store";
import { QUERY_KEYS } from "@/utils";
import { addDaysToDate, formatCurrency } from "@/utils/helpers";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { formatDistance } from "date-fns";
import { LoaderIcon, ShareIcon } from "lucide-react";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import { useStore } from "zustand";

import { addToServerCart, P } from "@/lib/app/orders/services";
import { Business, Product } from "@/lib/app/vendors/services";
import cn from "@/lib/utils";
import { useGetServerCart } from "@/hooks/useGetServerCart";
import { Button } from "@/components/ui/button";
import { notify } from "@/app/(root)/_components/notifications/notify";
import CreateAdz from "@/app/dashboard/vendors/(vendors)/_components/createAdz";

import SliderWrapper from "../slider";
import ContactsButton from "./contactsButton";

function ProductView({
  product,
  variants = "customers",
  business,
}: {
  product: Partial<Product>;
  variants?: "customers" | "vendor";
  business?: Partial<Business>;
}) {
  const { refetch } = useGetServerCart();
  const user = useStore(useUserStore, (state) => state.user);
  const { isInCart: isInServerCart, serverCart } = useStore(
    useServerCartStore,
    (state) => state,
  );
  const queryClient = new QueryClient();
  const {
    cost,
    pictures,
    categories,
    name,
    description,
    _id,
    createdAt,
    contact_means,
    returnable,
    weight,
    quantity,
  } = product;

  const { daysUntilPickup, addressCode, categoryId } = business as Business;

  const { mutate: addToCartServer, isPending } = useMutation({
    mutationFn: async (formData: P) => await addToServerCart(formData),
    onSuccess: async (response) => {
      notify.success({ message: "Successfully added to cart" });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SERVER_CART],
      });
      refetch();
    },
  });

  const { isInCart, addToCart } = useStore(useCartStore, (state) => state);
  const newDate = createdAt ? new Date(createdAt) : new Date();
  const now = new Date();
  const formattedDate = formatDistance(newDate, now, { addSuffix: true });
  const id = _id as string;
  const isItemInCart = isInCart(id);
  const isItemInServerCart = isInServerCart(id);

  const loc = window.location;
  const base = loc.origin;
  const copyLink = () => {
    const link = `${base}/marketplace/vendors/${business?._id}/products?tabkey=0&id=${product?._id}`;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast.info("Link copied to clipboard!", {
          icon: (
            <svg
              width="32"
              height="33"
              viewBox="0 0 32 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="32"
                height="32"
                transform="translate(0 0.5)"
                fill="white"
                fillOpacity="0.01"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.9993 29.8307C23.3631 29.8307 29.3327 23.8612 29.3327 16.4974C29.3327 9.1336 23.3631 3.16406 15.9993 3.16406C8.63555 3.16406 2.66602 9.1336 2.66602 16.4974C2.66602 23.8612 8.63555 29.8307 15.9993 29.8307ZM15.666 22.0307L16.3967 21.3147C16.4713 21.2421 16.5306 21.1552 16.571 21.0592C16.6115 20.9633 16.6324 20.8602 16.6324 20.7561C16.6324 20.6519 16.6115 20.5489 16.571 20.4529C16.5306 20.357 16.4713 20.2701 16.3967 20.1974C16.2447 20.0484 16.0403 19.9649 15.8274 19.9649C15.6145 19.9649 15.4101 20.0484 15.258 20.1974L14.4927 20.9494C13.7407 21.6867 12.5154 21.8321 11.6914 21.1734C11.4708 20.9995 11.2898 20.7806 11.1605 20.5312C11.0312 20.2818 10.9566 20.0078 10.9416 19.7273C10.9266 19.4468 10.9715 19.1664 11.0734 18.9046C11.1754 18.6429 11.3319 18.4059 11.5327 18.2094L13.7914 15.9921C14.1757 15.6168 14.6915 15.4067 15.2287 15.4067C15.7658 15.4067 16.2817 15.6168 16.666 15.9921L17.5287 16.8387L18.666 15.7201L17.8047 14.8734C17.1144 14.2042 16.1908 13.83 15.2294 13.83C14.268 13.83 13.3443 14.2042 12.654 14.8734L10.3954 17.0921C10.0369 17.444 9.75729 17.868 9.57508 18.3361C9.39286 18.8042 9.31219 19.3056 9.33841 19.8072C9.36463 20.3089 9.49715 20.7992 9.72718 21.2457C9.9572 21.6923 10.2795 22.0848 10.6727 22.3974C12.1447 23.5761 14.3234 23.3507 15.6674 22.0307H15.666ZM15.6033 11.6801L16.3327 10.9641H16.3313C17.6753 9.64407 19.854 9.41873 21.326 10.5974C21.7193 10.9099 22.0417 11.3024 22.2718 11.7489C22.502 12.1953 22.6346 12.6856 22.661 13.1873C22.6873 13.6889 22.6068 14.1904 22.4247 14.6585C22.2426 15.1267 21.9631 15.5508 21.6047 15.9027L19.3447 18.1214C18.6544 18.7906 17.7307 19.1648 16.7694 19.1648C15.808 19.1648 14.8843 18.7906 14.194 18.1214L13.3327 17.2747L14.47 16.1561L15.3327 17.0027C15.717 17.378 16.2329 17.5881 16.77 17.5881C17.3072 17.5881 17.823 17.378 18.2073 17.0027L20.466 14.7854C21.3074 13.9587 21.254 12.5814 20.3074 11.8214C19.4833 11.1627 18.258 11.3081 17.506 12.0454L16.7407 12.7974C16.5887 12.946 16.3846 13.0292 16.172 13.0292C15.9594 13.0292 15.7553 12.946 15.6033 12.7974C15.5288 12.7247 15.4695 12.6379 15.429 12.5419C15.3885 12.446 15.3677 12.3429 15.3677 12.2387C15.3677 12.1346 15.3885 12.0315 15.429 11.9356C15.4695 11.8396 15.5288 11.7527 15.6033 11.6801Z"
                fill="#34A853"
              />
            </svg>
          ),
        });
      })
      .catch((err) => {
        toast.error("Failed to copy: ");
      });
  };
  return (
    <div className="relative isolate  flex h-fit w-full max-w-[411px] flex-col overflow-hidden rounded-md bg-[#FAF8F3] shadow-sm">
      <div className="relative isolate aspect-square w-full ">
        <span className="absolute left-0 top-0 h-fit  rounded-[10px] rounded-tl-none bg-tertiary-deep-green-950 p-[6px_7px] text-xl font-semibold text-white shadow-md">
          {formatCurrency(Number(cost))}
        </span>
        <span className="absolute right-[4px] top-0 flex  h-fit items-center  gap-2 rounded-[10px] shadow-md">
          {(business?.plan?.actionables?.createAds as boolean) &&
            variants === "vendor" && <CreateAdz product={product as Product} />}
          <button
            onClick={copyLink}
            className="my-2 flex cursor-pointer items-center"
          >
            <span className="cursor-pointer rounded-full bg-white  p-2 text-black/70">
              <ShareIcon size={17} />
            </span>
            <p className="cursor-pointer rounded-xl bg-white p-[6px_7px] text-xs text-black/70">
              {" "}
              Share this item
            </p>
          </button>
        </span>
        <div className="relative z-[-1] h-full w-full">
          <SliderWrapper
            slides={(pictures as string[]).map((preview, index) => (
              <div
                key={Math.random()}
                className={
                  "relative isolate flex aspect-square w-full items-center justify-center"
                }
              >
                <Image
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  layout="fill"
                  className="z-[-1] rounded-[inherit] bg-white object-cover"
                  unoptimized
                />
                {quantity === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                    <div className="flex h-fit w-fit items-center justify-center rounded-full bg-[#DE350B] px-2 py-1">
                      <span className="text-[7px] font-bold text-white">
                        OUT OF STOCK
                      </span>
                    </div>
                  </div>
                )}
                {quantity && quantity <= 5 && (
                  <div className="absolute bottom-2 right-4 flex items-center justify-center">
                    <div className={" scale-[0.7]"}>
                      <FeddbackRedIcon />
                    </div>

                    <div className="flex h-fit w-fit items-center justify-center rounded-full bg-[#DE350B] px-2 py-1">
                      <span className="text-[10px]  font-medium text-white md:text-sm">
                        {quantity === 1
                          ? `${quantity} piece`
                          : `${quantity} pieces`}{" "}
                        left
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
            hideControls
          />
        </div>
      </div>
      <div className="flex max-w-[411px] flex-col p-[1rem_1rem]">
        <div className="mb-[25px] flex w-full items-center justify-between md:mb-[47px]">
          <h6 className=" w-full text-lg font-semibold">{name}</h6>
          {variants === "customers" ? (
            <div className="flex w-full cursor-pointer items-center justify-end gap-1">
              <div>
                <CartIcon />
              </div>
              <button
                onClick={
                  user
                    ? user && isItemInServerCart
                      ? () => toast.info("Item already to bag")
                      : () =>
                          addToCartServer({
                            productId: _id as string,
                            cost: cost as string,
                            picture: (pictures as string[])[0] as string,
                            productName: name as string,
                            quantity: 1,
                            businessName: business?.name as string,
                            businessId: business?._id as string,
                            businessAddressCode: addressCode as number,
                            categoryId: categoryId as number,
                            pickupDate: addDaysToDate(
                              Number(daysUntilPickup as number),
                            ),
                            description: description as string,
                            unit_weight: (weight as number).toString(),
                            business_profile_picture:
                              business?.business_profile_picture as string,
                          })
                    : isItemInCart
                      ? () => toast.info("Item already to bag")
                      : () => addToCart(product, business as Business, 1)
                }
                className=" w-fit rounded-full bg-[#FF4D4F] p-[5px_10px] text-[10px] font-normal text-white  sm:text-xs"
              >
                {isPending ? (
                  <LoaderIcon />
                ) : isItemInCart || isItemInServerCart ? (
                  "Added"
                ) : (
                  "Add to bag"
                )}
              </button>
            </div>
          ) : null}
        </div>
        <div className="flex w-full flex-col  gap-4">
          <div className="flex gap-2">
            {categories?.slice(0, 2)?.map((tag) => (
              <span
                className="whitespace-nowrap rounded-full bg-tertiary-pale-100  px-[12px] py-[6px]   text-[10px] font-semibold xsm:text-xs"
                key={Math.random() * 21}
              >
                {tag}
              </span>
            ))}
            {(categories?.length as number) - 2 > 0 && (
              <span
                className=" whitespace-nowrap rounded-full bg-tertiary-pale-100 px-[12px] py-[6px] text-[10px] font-semibold xsm:text-xs "
                key={Math.random() * 21}
              >
                +{(categories?.length as number) - 2}
              </span>
            )}
          </div>

          <span className="flex cursor-pointer items-center gap-1 text-sm text-primary-600">
            {returnable
              ? "Product is Returnable"
              : "  Product is Non-Returnable"}
            <button
              type="button"
              id={`tooltip-vendor-returnable-${_id}`}
              className=" h-6 w-6 cursor-pointer "
            >
              <InfoIndicatorIcon className=" text-green-600" />
            </button>
          </span>

          <div className="flex h-fit w-full flex-col gap-6 text-xs leading-7 text-tertiary-pale-950 sm:text-sm">
            <p>{description}</p>
          </div>
          {variants === "vendor" && (
            <div className=" flex w-full items-center justify-between">
              <span className="text-sm">
                Created: <b>{formattedDate}</b>
              </span>
              <span>
                {" "}
                <Button variant={"plain"} size={"plain"}>
                  <Link
                    href={`/dashboard/vendors/manage_products/edit_product/${_id}`}
                  >
                    <EditCircleIcon />
                  </Link>
                </Button>
              </span>
            </div>
          )}
        </div>
      </div>

      {variants === "customers" && <ContactsButton {...contact_means} />}

      <Tooltip
        place="top"
        className={cn(
          "z-[50] !w-[95vw] !max-w-[385px] !rounded-sm !bg-white !px-4 !py-6 !text-tertiary-pale-950 !opacity-100 !shadow-[0px_20px_24px_0px_#1111110F]",
        )}
        anchorSelect={`#tooltip-vendor-returnable-${_id}`}
        clickable
      >
        {returnable ? (
          <div>
            <h3 className="mb-2 flex items-center gap-1 text-sm font-bold text-[#333333] ">
              What this means
              <InfoIndicatorIcon className=" text-green-600" />
            </h3>
            <ul className="mb-4 list-disc pl-4 [&>li>a]:text-primary-600 [&>li>a]:underline [&>li]:text-xs [&>li]:font-light [&>li]:text-[#555555]">
              <li className="mb-2">
                The vendor has set this product to be Returnable which means
                that you can{" "}
                <span className="font-semibold">
                  request a return after delivery
                </span>
              </li>
              <li>
                Only{" "}
                <Link href={""} className="font-semibold">
                  Eligible items
                </Link>{" "}
                items are valid for return.
              </li>
              <li>
                All Return & Refund complaints are received via our
                <Link href={""} className="font-semibold">
                  Customer support channels.
                </Link>{" "}
              </li>
            </ul>
            <h3 className="mb-2 flex items-center gap-1 text-sm font-bold text-[#333333]">
              What we advise
              <InfoIndicatorIcon className=" text-green-600" />
            </h3>
            <ul className="mb-4 list-disc pl-4 [&>li>a]:text-primary-600 [&>li>a]:underline [&>li]:text-xs [&>li]:font-light [&>li]:text-[#555555]">
              <li className="mb-2">
                We strongly advise that you consider each product before you
                make payment to be sure you are comfortable with the return
                policy that has been set.
              </li>
              <li>
                You can leave reviews/ratings and comments on a vendors page for
                other potential customers to to see.
              </li>
            </ul>
            <Link
              href=""
              className="mt-2 flex items-center gap-1 text-xs font-light text-[#55555] "
            >
              Learn more about our Return and Refund Policy
              <span className="font-semibold text-primary-600 underline">
                Here
              </span>
            </Link>
          </div>
        ) : (
          <div>
            <h3 className="mb-2 flex items-center gap-1 text-sm font-bold text-[#333333] ">
              What this means
              <InfoIndicatorIcon className=" text-green-600" />
            </h3>
            <ul className="mb-4 list-disc pl-4 [&>li>a]:text-primary-600 [&>li>a]:underline [&>li]:text-xs [&>li]:font-light [&>li]:text-[#555555]">
              <li className="mb-2">
                The vendor has set this product to be Non-returnable which means
                that you{" "}
                <span className="font-semibold">
                  cannot request a return after delivery.
                </span>
              </li>
            </ul>
            <h3 className="mb-2 flex items-center gap-1 text-sm font-bold text-[#333333]">
              What we advise
              <InfoIndicatorIcon className=" text-green-600" />
            </h3>
            <ul className="mb-4 list-disc pl-4 [&>li>a]:text-primary-600 [&>li>a]:underline [&>li]:text-xs [&>li]:font-light [&>li]:text-[#555555]">
              <li className="mb-2">
                We strongly advise that you consider each product before you
                make payment to be sure you are comfortable with the return
                policy that has been set.
              </li>
              <li>
                You can leave reviews/ratings and comments on a vendors page for
                other potential customers to to see.
              </li>
              <li className="my-2">
                Only{" "}
                <Link href={""} className="font-semibold">
                  Eligible items
                </Link>{" "}
                items are valid for return.
              </li>
              <li>
                All Return & Refund complaints are received via our
                <Link href={""} className="font-semibold">
                  Customer support channels.
                </Link>{" "}
              </li>
            </ul>
            <Link
              href=""
              className="mt-2 flex items-center gap-1 text-xs font-light text-[#55555] "
            >
              Learn more about our Return and Refund Policy
              <span className="font-semibold text-primary-600 underline">
                Here
              </span>
            </Link>
          </div>
        )}
      </Tooltip>
    </div>
  );
}

export default ProductView;
