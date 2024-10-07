"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ArrowBackIcon,
  ColoredLocation,
  FullFilledHeartIcon,
  FullLove,
  ShoppingIcon,
} from "@/assets";
import { QUERY_KEYS } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon, LoaderIcon } from "lucide-react";

import {
  getLoggedUser,
  updateFollowVendors,
  updateUnFollowVendors,
} from "@/lib/app/user/services";
import {
  getBusinessById,
  GetBusinessByIdRes,
  Product,
  Service,
} from "@/lib/app/vendors/services";
import cn from "@/lib/utils";
import PageLoader from "@/components/loaders/pageLoader";
import TabsComponent from "@/components/shared/tabComponents/TabComponent";
import TabPannel from "@/components/shared/tabPannel/tabPannel";
import { notify } from "@/app/(root)/_components/notifications/notify";
import VendorsEmptyState from "@/app/dashboard/vendors/(vendors)/_components/vendorsEmptyState";

import Contact from "./contact/contact";
import Products from "./products/products";
import Reviews from "./reviews/reviews";
import Services from "./services/services";

function VendorProfileWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const loc = usePathname();
  const searchparams = useSearchParams();
  const tabkey = searchparams.get("tabkey") ?? "0";
  const productId = searchparams.get("id");
  const id = loc.split("/")[3];
  const queryClient = useQueryClient();
  const { isFetching, isError, data } = useQuery(
    {
      queryKey: [QUERY_KEYS.BUSINESS_BY_ID],
      queryFn: async () => getBusinessById(id),
      enabled: id !== "",
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      retry: 3,
    },
    queryClient,
  );

  const { isFetching: isLoading, data: dataItems } = useQuery(
    {
      queryKey: [QUERY_KEYS.USER],
      queryFn: async () => getLoggedUser(),
      enabled: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 3,
    },
    queryClient,
  );

  const { mutate } = useMutation({
    mutationFn: async (data: any) => await updateFollowVendors({ ...data }),
    onSuccess: async (data) => {
      if (data?.status === "success") {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.USER],
        });
        notify.success({ message: "user updated successfully" });
      }
    },
    onError: async (err) =>
      notify.error({
        message: "Error while updating user's information",
        subtitle: err?.message,
      }),
  });

  const { mutate: mutateUnfollowVendor, isSuccess } = useMutation({
    mutationFn: async (data: any) => await updateUnFollowVendors({ ...data }),
    onSuccess: async (data) => {
      if (data?.status === "success") {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.USER],
        });
        notify.success({ message: "user updated successfully" });
      }
    },
    onError: async (err) =>
      notify.error({
        message: "Error while updating user information",
        subtitle: err?.message,
      }),
  });

  const handleFollowVendors = (id: string) => {
    if (dataItems?.user?.vendors?.includes(id)) {
      mutateUnfollowVendor({ businessId: id });
    } else {
      mutate({ businessId: id });
    }
  };

  if (isFetching) {
    return <PageLoader />;
  }
  if (isError) {
    return <div>Error fetching a vendor business</div>;
  }
  const businessType =
    data?.business?.business_type === "products" ? "product" : "services";
  const business = data?.business;
  const productsOrServices = business?.products_services;
  const contacts = business?.contact;
  const products =
    businessType === "product" ? (productsOrServices as Product[]) : [];
  const services =
    businessType === "services" ? (productsOrServices as Service[]) : [];

  const isInnerPage =
    loc.endsWith("/reviews") || (productId !== null && tabkey !== "1");

  const isProductGridPage = tabkey === "0" && loc.endsWith("products");

  const tabLinkOption = [
    {
      value: "0",
      title: businessType === "product" ? "products" : "services",
      content: (
        <div className={cn("w-full")}>
          {businessType === "product" ? (
            <>
              {products.length > 0 ? (
                <div className="mt-4 grid w-full cursor-pointer grid-cols-3 gap-[1px]">
                  {products.map((product) => (
                    <Link
                      href={{
                        pathname: `/marketplace/vendors/${business?._id}/products`,
                        query: { tabkey, id: product._id },
                      }}
                      key={product._id}
                    >
                      <Products {...product} />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="aspect-square w-full">
                  <VendorsEmptyState message="No products available at the moment." />
                </div>
              )}
            </>
          ) : (
            <>
              {services.length > 0 ? (
                <div className="grid w-full cursor-pointer grid-cols-1 gap-[1px]">
                  {services.map((service) => (
                    <Link
                      href={{
                        pathname: `/marketplace/vendors/${business?._id}/services`,
                        query: { tabkey, id: service._id },
                      }}
                      key={service._id}
                    >
                      <Services {...service} />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="h-fit">
                  <VendorsEmptyState message="No services available at the moment." />
                </div>
              )}
            </>
          )}
        </div>
      ),
    },
    {
      value: "1",
      title: "contact",
      content: (
        <div className="pb-20">
          <Contact {...contacts} />
        </div>
      ),
    },
    {
      value: "2",
      title: "reviews",
      content: (
        <div className="pb-10">
          <Reviews data={data as GetBusinessByIdRes} />
        </div>
      ),
    },
  ];

  return (
    <div className="w-full border-t">
      <div className="container  mx-auto flex  w-full justify-between gap-8 ">
        <div
          className={cn(
            "bottom hideScrollBar   col-span-6  h-[calc(100vh_-_80px)] max-h-[850px]  w-full overflow-y-auto border-l  border-r  border-solid border-gray-300 lg:max-w-[582px] ",
            isInnerPage ? "hidden lg:block" : "",
          )}
        >
          <div
            className={cn(
              " w-full rounded-[10px]  ",
              " bg-[#fff] sm:min-w-[unset]",
              isProductGridPage ? "p-0 py-5" : "px-5 py-5",
            )}
          >
            <div
              className={cn(
                "mb-4 flex  items-center justify-between",
                isProductGridPage ? "px-5" : "0",
              )}
            >
              <Link href="/marketplace" className="cursor-pointer">
                <ArrowBackIcon />
              </Link>
            </div>{" "}
            <div
              className={cn(
                "mb-1 flex items-center justify-between",
                isProductGridPage ? "px-5" : "0",
              )}
            >
              {business?.business_profile_picture ? (
                <span className="relative isolate ml-1 flex aspect-square w-[clamp(72px,_8vw,_72px)] items-center justify-center rounded-full">
                  <Image
                    src={business?.business_profile_picture}
                    alt="brand logo"
                    fill
                    className="rounded-full  object-cover"
                    priority
                  />
                </span>
              ) : (
                <span className="relative isolate ml-1 flex aspect-square w-[clamp(72px,_8vw,_72px)] items-center justify-center rounded-full bg-primary-500 text-3xl font-semibold text-white">
                  {business?.name.split("")[0]}
                </span>
              )}

              <div className="flex cursor-pointer items-center">
                <span className="mx-2 text-[12px]">
                  {!dataItems?.user?.vendors?.includes(
                    data?.business?._id || "",
                  ) && "Add to Favorites"}
                </span>
                <div>
                  {isLoading ? (
                    <LoaderIcon />
                  ) : dataItems?.user?.vendors?.includes(
                      data?.business?._id || "",
                    ) ? (
                    <div
                      onClick={() =>
                        handleFollowVendors(data?.business?._id || "")
                      }
                    >
                      <FullFilledHeartIcon />
                    </div>
                  ) : (
                    <div
                      onClick={() =>
                        handleFollowVendors(data?.business?._id || "")
                      }
                    >
                      <FullLove />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={cn("flex flex-col text-[12px]")}>
              <div
                className={cn(
                  "flex flex-col",
                  isProductGridPage ? "px-5" : "0",
                )}
              >
                <span className=" mb-1 text-sm font-semibold md:text-base lg:text-lg">
                  {business?.name}
                </span>
                <span className=" text-[10px] text-[#302F2C] md:text-xs">
                  {business?.description}
                </span>
                <div className="mb-1 mt-2 flex w-fit items-center rounded-sm bg-[#F6F0E7] p-1 text-[10px] md:text-xs">
                  <span className="mr-1">
                    <ColoredLocation />
                  </span>
                  <span>{business?.address}</span>
                </div>{" "}
                <div className="mt-1 flex w-fit items-center rounded-sm bg-[#F6F0E7] p-1">
                  <span className="mr-1">
                    <ShoppingIcon />
                  </span>
                  <span className="text-[10px] underline md:text-xs">
                    {" "}
                    {business?.categories
                      ?.map(
                        (value) =>
                          value.charAt(0).toLocaleUpperCase() + value.slice(1),
                      )
                      .join(" , ")}
                  </span>
                </div>
              </div>
              <div
                className={cn(
                  "mb-2 mt-6 w-full",
                  isProductGridPage ? "mb-0 px-5" : "0",
                )}
              >
                <TabsComponent
                  selectedTab={tabkey}
                  items={tabLinkOption}
                  setSelectedTab={(value) => {
                    router.push(
                      `/marketplace/vendors/${business?._id}/${tabLinkOption.find(
                        (item) => item.value === value,
                      )?.title}?tabkey=${value}${
                        (productId?.length as number) > 0
                          ? `&id=${productId}`
                          : ""
                      }`,
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className={cn(
            "h-[calc(100vh_-_100px)] max-h-[850px] w-full overflow-auto py-2  md:py-6 lg:max-w-sm",
            isInnerPage ? "" : "hidden lg:block",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default VendorProfileWrapper;
