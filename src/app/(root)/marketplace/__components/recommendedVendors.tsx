import React from "react";
import Link from "next/link";

import { GetBusinesses } from "@/lib/app/user/services";
import VendorCard, {
  Props,
} from "@/app/(root)/marketplace/_components/vendorCard";

import SeeAll from "../../_components/seeAll";

function RecommendedVandors({ data }: { data: GetBusinesses[] }) {
  return (
    <div className="flex-col items-start gap-3 pb-8 xlg:ml-0">
      <header className="container flex items-center gap-5  px-3 lg:px-0 xlg:px-0">
        <h2 className="text-sm font-semibold text-tertiary-pale-950">
          Have you checked out these Vendors🔥😍
        </h2>{" "}
        <SeeAll path="recommended-vendors" />
      </header>
      <div className="hideScrollBar w-full flex-col overflow-x-auto ">
        <div className="flex w-fit cursor-move gap-4 pb-8  pt-3 ">
          {data?.map((item) => (
            <VendorCard
              varient="default"
              key={Math.random() * Math.PI}
              id={item._id}
              address={item?.address}
              business_profile_picture={item?.business_profile_picture}
              categories={item?.categories}
              description={item?.description}
              location={item?.location}
              name={item?.name}
              total_ratings={item?.total_ratings}
              total_reviews={item?.total_reviews}
              minutes_away={item?.minutes_away}
              vendorId={item?._id}
              businessType={item?.productType}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecommendedVandors;
