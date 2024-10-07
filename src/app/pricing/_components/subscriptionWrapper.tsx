"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FullLogo } from "@/assets";
import { subscriptionPlans } from "@/mocks/data";

import { ITypeSubscriptionCard } from "@/types/constants";
import cn from "@/lib/utils";
import { Button } from "@/components/ui/button";

import styles from "./subscription.module.css";

export function SubscriptionCard({
  plan,
  badge,
  price,
  planOffers,
  isActive,
  bg,
}: ITypeSubscriptionCard & { isActive: boolean; bg?: string }) {
  return (
    <div
      className={cn(
        "flex  w-[100%] cursor-pointer flex-col items-center rounded-3xl bg-[#FCFBF8] py-[28px] ring-[1px] ring-primary-500 transition-all duration-500 ease-in-out hover:shadow-xl hover:ring md:w-full",
        isActive && "ring",
        bg && bg,
      )}
    >
      <h3 className=" text-xl font-bold text-tertiary-deep-green-950">
        {plan}
      </h3>
      <span className=" my-[18px] rounded-full bg-primary-100 px-5 py-2 text-sm font-semibold text-tertiary-deep-green-950">
        {badge}
      </span>
      <div className="flex h-fit items-end  font-bold ">
        <span className=" -mb-1 text-4xl ">{price}</span>
        <span className="-mb-1 text-xl ">₦</span>
        <span className="-mb-[3px] text-sm">/month</span>
      </div>
      <ul className="mt-[30px] flex w-fit max-w-[258px] list-disc flex-col  gap-3">
        {planOffers.map((offer) => (
          <li className="leading-normal" key={offer}>
            {offer}
          </li>
        ))}
      </ul>
      <Link
        href={"/dashboard/vendors/store_setup"}
        className="mx-auto mt-6 w-[90%]"
      >
        {" "}
        <Button className="w-full" disabled={!isActive}>
          {isActive ? "Active" : "CONTINUE"}
        </Button>
      </Link>
    </div>
  );
}
function SubscriptionWrapper() {
  const [scrolling, setScrolling] = useState(false);
  const [activePlan, setActivePlan] = useState(() => subscriptionPlans[0].plan);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        if (window.scrollY > 3) {
          setScrolling(true);
        } else {
          setScrolling(false);
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <section className={`${styles.wrapper}`}>
      <div className="mx-auto flex h-fit w-full max-w-[500px] flex-col gap-[60px] pb-8">
        <div
          className={cn(
            ` mt-[50px] flex flex-col items-center gap-3 rounded py-3 `,
            scrolling
              ? `fixed top-0  z-20 bg-white/30 [&>small]:text-primary-900`
              : "",
          )}
        >
          <Link href="/">
            <FullLogo />
          </Link>
          <small className=" mx-auto text-white ">Simplifying Retail</small>
        </div>

        <div className="mx-[auto] flex h-fit w-[95%] flex-col rounded-3xl bg-white px-[clamp(15px,_5vw,_34px)] py-[35px] md:w-full">
          <h3 className="mx-auto w-[80%]  max-w-[280px] text-center text-[19px] font-bold text-tertiary-pale-950">
            Select A Plan That Works Best For Your Business
          </h3>
          <div className="mx-[auto] mb-4 mt-14 flex w-full flex-col gap-6">
            {subscriptionPlans.map((plan) => (
              <div
                className="h-fit w-full"
                key={Math.random()}
                onClick={() => setActivePlan(plan.plan)}
              >
                <SubscriptionCard
                  {...plan}
                  isActive={activePlan === plan.plan}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SubscriptionWrapper;
