"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowBackIcon,
  brandLogo,
  ChatIcon,
  ColoredLocation,
  FullLove,
  ListIcon,
  NewSearchIcon,
  ShoppingBag,
  ShoppingIcon,
  SubtaskIcon,
} from "@/assets";
import { useUserStore } from "@/store/user.store";
import { QUERY_KEYS } from "@/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useStore } from "zustand";

import { getBusinessById, Product, Service } from "@/lib/app/vendors/services";
import cn from "@/lib/utils";
import PageLoader from "@/components/loaders/pageLoader";
import TabPannel from "@/components/shared/tabPannel/tabPannel";

import VendorsEmptyState from "../../_components/vendorsEmptyState";
import Contact from "./contact/contact";
import Products from "./products/products";
import Reviews from "./reviews/reviews";
import Services from "./services/services";

function PreviewWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useStore(useUserStore, (state) => state.user);
  const fetching = useStore(useUserStore, (state) => state.fetching);
  const id = user?.vendorId?.business ?? "";
  const queryClient = useQueryClient();
  const { isFetching, isError, data } = useQuery(
    {
      queryKey: [QUERY_KEYS.BUSINESS_BY_ID],
      queryFn: async () => getBusinessById(id),
      enabled: id !== "",
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 3,
    },
    queryClient,
  );
  const businessType = user?.vendorId?.business_type;
  const [tabkey, setTabKey] = useState("0");
  const tabLinkOption = [
    {
      value: "0",
      label: businessType === "products" ? "Products" : "Services",
      icon:
        businessType === "products" ? (
          <ShoppingBag className={tabkey === "0" ? "[&>*]:fill-white " : ""} />
        ) : (
          <SubtaskIcon
            className={tabkey === "0" ? "[&>*]:fill-white " : "font-normal"}
          />
        ),
    },
    {
      value: "1",
      label: "Contact",
      icon: (
        <ListIcon
          className={tabkey === "1" ? "[&>*]:fill-white " : "font-normal"}
        />
      ),
    },
    {
      value: "2",
      label: "Reviews",
      icon: (
        <ChatIcon
          className={tabkey === "2" ? " [&>*]:stroke-white" : "font-normal"}
        />
      ),
    },
  ];

  if (fetching || isFetching) {
    return <PageLoader />;
  }
  if (isError) {
    return <div>Error fetching a vendor business</div>;
  }
  const business = data?.business;
  const productsOrServices = business?.products_services;
  const contacts = business?.contact;
  const products =
    businessType === "products" ? (productsOrServices as Product[]) : [];
  const services =
    businessType === "services" ? (productsOrServices as Service[]) : [];

  return (
    <div>
      <div className="mt-6 flex w-full justify-between ">
        <div className="bottom hideScrollBar max-h-[850px]col-span-6 sticky left-0 top-[100px] mb-6 h-[calc(100vh_-_100px)]  w-full max-w-[582px] overflow-y-auto  rounded-3xl  customeBoxShadow">
          <div
            className={cn(
              " w-full rounded-[10px] p-5 ",
              " bg-[#fff] sm:min-w-[unset]",
            )}
          >
            <div className="mb-4 flex  items-center justify-between">
              <Link href="/dashboard/customers" className="cursor-pointer">
                <ArrowBackIcon />
              </Link>
              <div className="flex items-center">
                {" "}
                <NewSearchIcon />
                <span className=" ml-1 text-[10px] text-[#8E8A87] underline">
                  Search for an item
                </span>
              </div>
            </div>{" "}
            <div className="mb-1 flex items-center justify-between">
              <span
                className="relative isolate ml-1 flex aspect-square w-[clamp(72px,_8vw,_72px)] items-center justify-center rounded-full"
                key={Math.PI * Math.random()}
              >
                <Image
                  src={business?.business_profile_picture ?? ""}
                  alt={business?.name ?? ""}
                  fill
                  className="rounded-full  object-contain"
                />
              </span>

              <div className="flex cursor-pointer items-center">
                <span className="text-[12px] ">Add to Favorites</span>
                <span>
                  <FullLove />
                </span>
              </div>
            </div>
            <div className="flex flex-col text-[12px]">
              <span className=" mb-1 text-lg font-semibold">
                {business?.name}
              </span>
              <span className=" text-[#302F2C]">{business?.description}</span>
              <div className="mb-1 mt-2 flex w-fit items-center rounded-sm bg-[#F6F0E7] p-1">
                <span className="mr-1">
                  <ColoredLocation />
                </span>
                <span>{business?.address}</span>
              </div>{" "}
              <div className="mt-1 flex w-fit items-center rounded-sm bg-[#F6F0E7] p-1">
                <span className="mr-1">
                  <ShoppingIcon />
                </span>
                <span className="underline">
                  {" "}
                  {business?.categories
                    ?.map(
                      (value) =>
                        value.charAt(0).toLocaleUpperCase() + value.slice(1),
                    )
                    .join(" , ")}
                </span>
              </div>
              <div className="mb-2 mt-6 flex items-center justify-between rounded-md bg-[#FAF8F3] py-2 lg:px-2">
                <TabPannel
                  activeTab={tabkey}
                  borderColor="border-black"
                  options={tabLinkOption}
                  onChange={(values) => {
                    router.push(
                      `/dashboard/vendors/preview/${tabLinkOption[
                        Number(values)
                      ].label.toLocaleLowerCase()}`,
                    );
                    setTabKey(values as string);
                  }}
                  width=" flex justify-between w-full"
                />
              </div>
              <div>
                {tabkey === "0" ? (
                  <div className=" mt-4 grid cursor-pointer grid-cols-3 gap-[1px]">
                    {businessType === "products"
                      ? products?.map((product) => (
                          <Link
                            href={{
                              pathname: "/dashboard/vendors/preview/products",
                              query: { id: product._id }, //
                            }}
                            key={Math.random() * Math.PI}
                          >
                            <Products {...product} />
                          </Link>
                        ))
                      : services.map(() => (
                          <div key={Math.random() * Math.PI}>
                            <Services imageName="Wedding Photography" />
                          </div>
                        ))}
                    {(products?.length === 0 && businessType === "products") ||
                      (services?.length === 0 &&
                        businessType === "services" && (
                          <div className="h-fit">
                            <VendorsEmptyState />
                          </div>
                        ))}
                  </div>
                ) : tabkey === "1" ? (
                  <div className="pb-20">
                    <Contact {...contacts} />
                  </div>
                ) : (
                  tabkey === "2" && (
                    <div className="pb-10">
                      <Reviews />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}

export default PreviewWrapper;
