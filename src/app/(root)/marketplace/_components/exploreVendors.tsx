import React from "react";

import { GetBusinesses } from "@/lib/app/user/services";

import SeeAll from "../../_components/seeAll";
import VendorCard from "./vendorCard";

function ExploreVendors({ data }: { data: GetBusinesses[] }) {
  return (
    <div className="container flex flex-col items-start gap-6 px-4 pb-12 xlg:px-0">
      <header className="flex w-full items-center gap-5 mmd:justify-between">
        <h2 className="text-xs  font-semibold text-tertiary-pale-950  md:text-sm">
          Explore a wide range of Vendors
        </h2>{" "}
        <SeeAll path={"marketplace"} />
      </header>
      <div className="w-full flex-col gap-[90px] ">
        <div className="grid w-full  grid-cols-2 gap-x-4  gap-y-4 md:grid-cols-3 lg:grid-cols-4 xlg:grid-cols-5 ">
          {data?.map((item) => {
            return (
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
                hideLocation
                path={`/marketplace/vendors/${item._id}/${item?.business_type}`}
                messageType="public"
                businessType={item?.business_type}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ExploreVendors;
