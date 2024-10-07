"use client";

import { useUserStore } from "@/store/user.store";
import { QUERY_KEYS } from "@/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useStore } from "zustand";

import { getBusinessById } from "@/lib/app/vendors/services";
import PageLoader from "@/components/loaders/pageLoader";

import ReviewDetails from "../_components/reviews/reviewDetails";

function Reviews() {
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
  const reviews = business?.reviews ?? [];
  const totalReviews = business?.total_reviews ?? 0;
  const totalRating = business?.total_ratings ?? 0;
  return (
    <div
      key={Math.random() * Math.PI}
      className=" hidden h-fit w-full lg:block "
    >
      <ReviewDetails
        reviews={reviews}
        totalRating={totalRating}
        totalReviews={totalReviews}
      />
    </div>
  );
}

export default Reviews;
