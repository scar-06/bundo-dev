"use client";

import { useSearchParams } from "next/navigation";
import { useUserStore } from "@/store/user.store";
import { QUERY_KEYS } from "@/utils";
import { sortByMatchingKey } from "@/utils/helpers";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useStore } from "zustand";

import { getBusinessById, Product } from "@/lib/app/vendors/services";
import PageLoader from "@/components/loaders/pageLoader";
import ProductView from "@/components/shared/cards/productView";

import VendorsEmptyState from "../../_components/vendorsEmptyState";

function Products() {
  const searchparams = useSearchParams();
  const productId = searchparams.get("id");
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
  const sortedProducts = productId
    ? sortByMatchingKey(products ?? [], "_id", productId)
    : products;
  return (
    <div>
      {productId ? (
        sortedProducts?.map((product) => (
          <div
            key={Math.random() * Math.PI}
            className=" mt-4 hidden  w-full lg:block "
          >
            <ProductView product={product} />
          </div>
        ))
      ) : (
        <VendorsEmptyState />
      )}
    </div>
  );
}

export default Products;
