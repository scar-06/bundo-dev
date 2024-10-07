import React from "react";

import { GetBusinesses } from "@/lib/app/user/services";

import SeeAll from "../../_components/seeAll";
import VendorCard from "./vendorCard";

function RecommendedVandors({ data }: { data: GetBusinesses[] }) {
  return (
    <div className=" ml-6 flex flex-col items-start gap-0 pb-8 xlg:ml-0">
      <header className="container flex items-center gap-5 pr-2 mmd:justify-between">
        <h2 className="text-xs  font-semibold text-tertiary-pale-950  md:text-sm">
          Check out these Vendors🔥😍
        </h2>{" "}
        <SeeAll path="recommended-vendors" />
      </header>
      <div className="hideScrollBar w-full flex-col overflow-x-auto ">
        <div className="flex w-fit  gap-4 xlg:ml-[calc(_(100vw_-_1200px)_/_2)] xlg:grid  xlg:grid-cols-5">
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
              average_rating={item?.average_rating}
              minutes_away={item?.minutes_away}
              vendorId={item?._id}
              path={`/marketplace/vendors/${item._id}/${item?.business_type}`}
              messageType="public"
              businessType={item?.productType}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecommendedVandors;
