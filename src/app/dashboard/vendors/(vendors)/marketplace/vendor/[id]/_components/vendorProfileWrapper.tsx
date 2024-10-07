"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ArrowBackIcon,
  ColoredLocation,
  GreenLocationIcon,
  NewSearchIcon,
  SearchIcon,
  ShoppingIcon,
} from "@/assets";
import { QUERY_KEYS } from "@/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import _debounce from "lodash.debounce";
import { LoaderIcon } from "lucide-react";
import { FaHeart } from "react-icons/fa";

import {
  getLoggedUser,
  updateFollowVendors,
  updateUnFollowVendors,
} from "@/lib/app/user/services";
import {
  getBusinessById,
  GetBusinessByIdRes,
  getSearchProduct,
  Product,
  Service,
} from "@/lib/app/vendors/services";
import cn from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import PageLoader from "@/components/loaders/pageLoader";
import TabsComponent from "@/components/shared/tabComponents/TabComponent";
import { notify } from "@/app/(root)/_components/notifications/notify";
import VendorsEmptyState from "@/app/dashboard/customers/(customers)/_components/vendorsEmptyState";

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
  const id = loc.split("/")[5];
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [openOutOfStockModal, setOpenOutOfStockModal] = useState(false);

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

  const { isFetching: isSearching, data: searchedProduct } = useQuery(
    {
      queryKey: [QUERY_KEYS.SEARCH_PRODUCT, { name: searchText }],
      queryFn: async (params) => getSearchProduct({ ...params }),
      enabled: !!searchText,
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

  const { mutate: mutateUnfollowVendor } = useMutation({
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

  const productsData = !searchText
    ? products
    : (searchedProduct?.products?.products_services as Product[]) ?? [];

  const servicesData = !searchText
    ? services
    : (searchedProduct?.products?.products_services as Service[]) ?? [];

  const isInnerPage =
    loc.endsWith("/reviews") || (productId !== null && tabkey !== "2");
  const handleSearch = _debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
    },
    1000,
  );

  const tabLinkOption = [
    {
      value: "0",
      title: businessType === "product" ? "Products" : "Services",
      content: (
        <div className="w-full">
          {businessType === "product" ? (
            productsData?.length > 0 ? (
              <div className="grid w-full cursor-pointer grid-cols-3 gap-[1px]">
                {productsData?.map((product) =>
                  product?.quantity !== 0 ? (
                    <Link
                      href={{
                        pathname: `/dashboard/vendors/marketplace/vendor/${business?._id}/products`,
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
              {servicesData.map((service) => (
                <Link
                  href={{
                    pathname: `/dashboard/vendors/marketplace/vendor/${business?._id}/services`,
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
    <div className="w-full">
      <div className="mt-[-40px] flex w-full justify-between ">
        <div
          className={cn(
            "bottom hideScrollBar col-span-6 h-[calc(100vh_-_80px)] w-full overflow-y-auto border-solid border-gray-300 sm:border-l sm:border-r lg:max-w-[582px]",
            isInnerPage ? "hidden lg:block" : "",
          )}
        >
          <div className="w-full rounded-[10px] bg-[#fff] py-5 sm:min-w-[unset] sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <Link
                href="/dashboard/vendors/marketplace"
                className="cursor-pointer"
              >
                <ArrowBackIcon />
              </Link>
              <div className="flex items-center">
                <div
                  className="mx-1 cursor-pointer"
                  onClick={() => setShowSearch(!showSearch)}
                >
                  <NewSearchIcon />
                </div>
              </div>
            </div>
            {showSearch && (
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    tabIndex={0}
                    className="group mb-4 mt-2 flex h-[53px] items-center gap-2 rounded-[5px] border border-[#c8c8c8] bg-[rgba(222,_242,_251,_0.30)] px-[10px]  "
                  >
                    <span className="">
                      <SearchIcon className="transition-all duration-500 ease-in-out group-focus-within:text-primary-500 group-hover:stroke-primary-500  group-hover:text-primary-300" />
                    </span>
                    <Input
                      placeholder="Search for a products...."
                      className="h-full border-none bg-transparent text-[11px] outline-none md:text-xs"
                      onChange={handleSearch}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
            <div className="mb-1 flex items-center justify-between">
              <span
                className="relative isolate ml-1 flex aspect-square w-[clamp(72px,_8vw,_72px)] items-center justify-center rounded-full"
                key={Math.PI * Math.random()}
              >
                <Image
                  src={business?.business_profile_picture ?? ""}
                  alt={business?.name ?? ""}
                  fill
                  className="rounded-full object-contain"
                />
              </span>

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
                      className="text-[#DE350B]"
                    >
                      <FaHeart />
                    </div>
                  ) : (
                    <div
                      onClick={() =>
                        handleFollowVendors(data?.business?._id || "")
                      }
                      className="text-[#F3D9D9]"
                    >
                      <FaHeart />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col text-[12px]">
              <span className="mb-1 text-lg font-semibold">
                {business?.name}
              </span>
              <span className="text-[#302F2C]">{business?.description}</span>
              <div className="mb-1 mt-2 flex w-fit items-center rounded-sm bg-[#F6F0E7] p-1">
                <span className="mr-1">
                  <ColoredLocation />
                </span>
                <span>{business?.address}</span>
              </div>
              <div className="mt-1 flex w-fit items-center rounded-sm bg-[#F6F0E7] p-1">
                <span className="mr-1">
                  <ShoppingIcon />
                </span>
                <span className="underline">
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
                      `/dashboard/vendors/marketplace/vendor/${business?._id}/${tabLinkOption
                        .find((item) => item.value === value)
                        ?.title.toLowerCase()}?tabkey=${value}${
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
          <Modal
            isOpen={openOutOfStockModal}
            closeModal={() => {
              setOpenOutOfStockModal(false);
            }}
          >
            <div
              className="flex w-full flex-col items-center justify-center gap-6 rounded-[40px] border-[1px] border-[#0000001A] bg-white px-10 py-6 font-tv2SansDisplay shadow-xl md:w-[517px] md:px-20"
              style={{
                boxShadow:
                  "0px 0px 1px 0px #091E424F, 0px 8px 12px 0px #091E4226",
              }}
            >
              <div className="flex h-fit w-fit items-center justify-center rounded-full bg-[#DE350B] p-3">
                <span className="text-[11px] font-bold text-white">
                  OUT OF STOCK
                </span>
              </div>
              <span className="text-lg font-semibold">
                This product is currently out of stock
              </span>
              <span className="text-center">
                {`Don't forget to check back later`} <br />
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
            "h-[calc(100vh_-_100px)] max-h-[850px] w-full overflow-auto py-6 lg:max-w-sm",
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
