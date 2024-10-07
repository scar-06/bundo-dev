import React from "react";
import Link from "next/link";

import { GetBusinesses } from "@/lib/app/user/services";
import VendorCard, {
  Props,
} from "@/app/(root)/marketplace/_components/vendorCard";

function RecommendedVandors({
  data,
  className,
  classContainer,
}: {
  data: GetBusinesses[];
  className?: any;
  classContainer?: string;
}) {
  return (
    <div className={` flex-col items-start gap-3 px-3 pb-8 lg:px-0 xlg:ml-0`}>
      <header className="container flex items-center justify-between gap-5 px-3  md:justify-start lg:px-0 xlg:px-0">
        <h2 className="hidden text-[10px] font-semibold text-tertiary-pale-950 md:block md:text-sm">
          Have you checked out these Vendors🔥😍
        </h2>{" "}
        <h2 className="text-[12px]  font-semibold text-tertiary-pale-950 md:hidden md:text-sm">
          Check out these Vendors🔥😍
        </h2>
        <Link href="/dashboard/customers/recommended-vendors">
          <button className="text-[10px] font-medium underline md:text-sm">
            see all
          </button>
        </Link>
      </header>
      <div className="hideScrollBar w-full flex-col overflow-x-auto ">
        <div
          className={` ${className} flex w-fit cursor-move gap-4 pb-8  pt-3 `}
        >
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
              type="customers"
              className={classContainer}
              businessType={item?.productType}
              path={`/dashboard/customers/marketplace/vendor/${item._id}/${item?.business_type}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecommendedVandors;
