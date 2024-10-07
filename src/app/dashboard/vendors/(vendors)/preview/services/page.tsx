"use client";

import { useUserStore } from "@/store/user.store";
import { QUERY_KEYS } from "@/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useStore } from "zustand";

import { getBusinessById, Product, Service } from "@/lib/app/vendors/services";
import PageLoader from "@/components/loaders/pageLoader";
import ProductView from "@/components/shared/cards/productView";
import ServiceView from "@/components/shared/cards/serviceView";

function Services() {
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
  const services =
    businessType === "services" ? (productsOrServices as Product[]) : [];
  return (
    <div>
      {services?.map((product) => (
        <div
          key={Math.random() * Math.PI}
          className="mt-3 flex w-full flex-col gap-4"
        >
          <ServiceView product={product} variant="customer" />
        </div>
      ))}
    </div>
  );
}

export default Services;
