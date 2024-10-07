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
  GreenLocationIcon,
  LoveFilled,
  SamllLoveIcon,
  ShoppingIcon,
} from "@/assets";
import { QUERY_KEYS } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";

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
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import PageLoader from "@/components/loaders/pageLoader";
import TabsComponent from "@/components/shared/tabComponents/TabComponent";
import TabPannel from "@/components/shared/tabPannel/tabPannel";
import { notify } from "@/app/(root)/_components/notifications/notify";

import VendorsEmptyState from "../../../../_components/vendorsEmptyState";
import Contact from "./contact/contact";
import Products from "./products/products";
import Reviews from "./reviews/reviews";
import Services from "./services/services";

function VendorProfileWrapper({ children }: { children: React.ReactNode }) {
  const loc = usePathname();
  const router = useRouter();
  const searchparams = useSearchParams();
  const tabkey = searchparams.get("tabkey") ?? "0";
  const productId = searchparams.get("id");
  const id = loc.split("/")[5];
  const queryClient = useQueryClient();
  const [openOutOfStockModal, setOpenOutOfStockModal] = useState(false);

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
      }
    },
    onError: async (err) =>
      notify.error({
        message: "Error while updating user information",
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

  const businessType =
    data?.business?.business_type === "products" ? "product" : "services";

  const locSplit = loc.split("/");
  const tabKey = locSplit[locSplit.length - 1];
  const activeTab =
    tabKey !== "contact" && tabKey !== "reviews"
      ? "product_service"
      : tabKey === "contact"
        ? "contact"
        : "reviews";
  if (isFetching) {
    return <PageLoader />;
  }
  if (isError) {
    return <div>Error fetching a vendor business</div>;
  }
  const business = data?.business;
  const productsOrServices = business?.products_services;
  const contacts = business?.contact;
  const products =
    businessType === "product" ? (productsOrServices as Product[]) : [];
  const services =
    businessType === "services" ? (productsOrServices as Service[]) : [];
  const isInnerPage = loc.endsWith("/reviews") || productId !== null;
  const tabLinkOption = [
    {
      value: "0",
      title: businessType === "product" ? "Products" : "Services",
      content: (
        <div className="w-full">
          {businessType === "product" ? (
            products?.length > 0 ? (
              <div className="grid w-full cursor-pointer grid-cols-3 gap-[1px]">
                {products?.map((product) =>
                  product?.quantity !== 0 ? (
                    <Link
                      href={{
                        pathname: `/dashboard/customers/marketplace/vendor/${business?._id}/products`,
                        query: { tabkey, id: product._id },
                      }}
                      key={Math.random() * Math.PI}
                    >
                      <Products {...product} />
                    </Link>
                  ) : (
                    <div
                      onClick={() => setOpenOutOfStockModal(true)}
                      key={Math.random()}
                    >
                      <Products {...product} />
                    </div>
                  ),
                )}
              </div>
            ) : (
              <div className="my-10 flex h-full w-full items-center justify-center">
                <VendorsEmptyState
                  icon={<GreenLocationIcon />}
                  descriptionOne=" No Products to display for now."
                  descriptionTwo="Don't forget to check back soon"
                />
              </div>
            )
          ) : (
            <div className="grid w-full cursor-pointer grid-cols-1 gap-[1px]">
              {services.map((service) => (
                <Link
                  href={{
                    pathname: `/dashboard/customers/marketplace/vendor/${business?._id}/services`,
                    query: { tabkey, id: service._id },
                  }}
                  key={Math.random() * Math.PI}
                >
                  <Services {...service} />
                </Link>
              ))}
            </div>
          )}
        </div>
      ),
    },
    {
      value: "1",
      title: "Contact",
      content: (
        <div className="pb-20">
          <Contact {...contacts} />
        </div>
      ),
    },
    {
      value: "2",
      title: "Reviews",
      content: (
        <div className="pb-10">
          <Reviews data={data as GetBusinessByIdRes} />
        </div>
      ),
    },
  ];
  return (
    <div className="w-full md:mt-[-40px] ">
      <div className="flex w-full justify-between ">
        <div
          className={cn(
            "bottom hideScrollBar col-span-6  h-[calc(100vh_-_80px)] w-full   overflow-y-auto border-solid border-gray-300  sm:border-l  sm:border-r lg:ml-16 lg:max-w-[582px] ",
            isInnerPage ? "hidden lg:block" : "",
          )}
        >
          <div
            className={cn(
              " w-full rounded-[10px] sm:p-5 lg:py-5 ",
              " bg-[#fff] sm:min-w-[unset]",
            )}
          >
            <div className="mb-4 flex  items-center justify-between px-6 sm:px-0  ">
              <Link
                href="/dashboard/customers/marketplace"
                className="cursor-pointer"
              >
                <ArrowBackIcon />
              </Link>
            </div>{" "}
            <div className="mb-1 flex items-center justify-between px-6 sm:px-0 ">
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

              <div className="flex cursor-pointer items-center px-5">
                <span className="mx-2 text-[10px] sm:text-xs">
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
                      <span className="hidden sm:block">
                        {" "}
                        <FullFilledHeartIcon />
                      </span>
                      <span className="sm:hidden">
                        <LoveFilled />
                      </span>
                    </div>
                  ) : (
                    <div
                      onClick={() =>
                        handleFollowVendors(data?.business?._id || "")
                      }
                    >
                      <span className="hidden sm:block">
                        {" "}
                        <FullLove />
                      </span>
                      <span className="sm:hidden">
                        <SamllLoveIcon />
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col text-[12px]">
              <div className="flex flex-col justify-center px-6 sm:px-0">
                <span className="  mb-1 text-lg font-semibold">
                  {business?.name}
                </span>
                <span className=" text-[10px] font-medium text-[#302F2C] sm:text-xs">
                  {business?.description}
                </span>
                <div className=" mb-1 mt-2 flex w-fit items-center rounded-sm bg-[#F6F0E7] p-1">
                  <span className="mr-1">
                    <ColoredLocation />
                  </span>
                  <span className="text-[10px] font-normal sm:text-xs">
                    {business?.address}
                  </span>
                </div>{" "}
                <div className=" mt-1 flex w-fit items-center rounded-sm bg-[#F6F0E7] p-1">
                  <span className="mr-1">
                    <ShoppingIcon />
                  </span>
                  <span className="text-[10px] font-normal underline sm:text-xs">
                    {" "}
                    {business?.categories
                      ?.map(
                        (value) =>
                          value.charAt(0).toLocaleUpperCase() + value.slice(1),
                      )
                      .join(" , ")}
                  </span>
                </div>
                <div className="mb-2 mt-6">
                  <TabsComponent
                    selectedTab={tabkey}
                    items={tabLinkOption}
                    setSelectedTab={(value) => {
                      router.push(
                        `/dashboard/customers/marketplace/vendor/${business?._id}/${tabLinkOption
                          .find((item) => item.value === value)
                          ?.title.toLowerCase()}?tabkey=${value}${
                          (productId?.length as number) > 0
                            ? `&id=${productId}`
                            : ""
                        }`,
                      );
                    }}
                  />{" "}
                </div>
              </div>
            </div>
          </div>
          <Modal
            isOpen={openOutOfStockModal}
            closeModal={() => {
              setOpenOutOfStockModal(false);
            }}
          >
            <div
              className="flex w-full   flex-col  items-center justify-center   gap-6 rounded-[40px]  border-[1px] border-[#0000001A] bg-white px-10 py-6 font-tv2SansDisplay  shadow-xl md:w-[517px] md:px-20 "
              style={{
                boxShadow:
                  "0px 0px 1px 0px #091E424F, 0px 8px 12px 0px #091E4226",
              }}
            >
              <div className="flex h-fit w-fit items-center justify-center rounded-full bg-[#DE350B]  p-3">
                <span className="text-[11px] font-bold text-white">
                  {" "}
                  OUT OF STOCK
                </span>
              </div>
              <span className="text-lg font-semibold">
                This product is currently out of stock
              </span>
              <span className="text-center">
                Don’t forget to check back later <br />
                to see if it is back in stock
              </span>

              <Button
                className="w-full"
                onClick={() => setOpenOutOfStockModal(false)}
              >
                CONTINUE SHOPPING
              </Button>
            </div>
          </Modal>
        </div>
        <div
          className={cn(
            "h-[calc(100vh_-_100px)] max-h-[850px] w-full overflow-auto px-6 pb-6  lg:max-w-sm lg:pt-3",
            isInnerPage ? "" : "hidden lg:block",
          )}
        >
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default VendorProfileWrapper;
