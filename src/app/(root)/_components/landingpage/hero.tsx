"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { heroNetworkPic } from "@/assets";

import cn from "@/lib/utils";
import { Button } from "@/components/ui/button";

import styles from "./hero.module.css";

function Hero() {
  const highLightTexts = [
    "Everyday people",
    // "Your Shopping needs",
    // "Your thrift business",
    // "Your fashion business",
    // "Your cake business",
    // "You",
  ];

  const highlightedIndex = 0;
  // const [highlightedIndex, setHighlightedIndex] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setHighlightedIndex((prevIndex) =>
  //       prevIndex === highLightTexts.length - 1 ? 0 : prevIndex + 1,
  //     );
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, []); // Only run effect once

  return (
    <section
      className={`${styles.heroContainer} relative flex w-full items-center bg-tertiary-deep-green-950`}
    >
      <div className="container flex h-fit flex-col items-center justify-between gap-12 px-4 py-6 lg:flex-row xlg:px-0">
        <div className="flex w-full flex-col items-start gap-6 pt-8">
          <div className="flex w-fit max-w-[550px] flex-col items-start gap-[22px] lg:gap-7">
            <h2>
              <div className="max-w-[557px]">
                <h2 className="min-w-min text-[clamp(40px,3vw,58px)] font-semibold text-tertiary-white-100 xlg:whitespace-nowrap">
                  Simplified Retail for <br className="hidden lg:block" />
                  <span
                    className={cn(
                      " text-[#FDE74C] transition-all duration-500 ease-in-out ",
                    )}
                  >
                    <span className=" min-w-min text-wrap">
                      {highLightTexts[0]}
                    </span>
                  </span>
                  {/* {highLightTexts.map((highLightText, index) => (
                    <span
                      key={highLightText}
                      className={cn(
                        "grid overflow-hidden text-[#FDE74C] transition-all duration-500 ease-in-out ",
                        highlightedIndex === index
                          ? "h-[auto] grid-rows-[1fr] opacity-100"
                          : "h-[0px] grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <span className=" min-w-min text-wrap">
                        {highLightText}
                      </span>
                    </span>
                  ))} */}
                </h2>
              </div>
            </h2>
            <p className="mb-1 whitespace-normal text-sm font-light leading-8 text-tertiary-white-100 md:text-base">
              Bundo is the best digital marketplace to sell, buy, discover
              vendors around you and much more! Get started in less than 5
              minutes and enjoy simplified retail.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/auth/onboarding">
                <Button
                  variant="white"
                  size={"default"}
                  aria-label="Create your Account"
                >
                  Create your Account
                </Button>
              </Link>
              <Link href="/#faqs">
                <Button variant="outline" size={"default"} aria-label="FAQs">
                  FAQs
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="relative mb-6 mt-[30px] aspect-auto w-full max-w-[610px] md:mt-[60px] ">
          <Image
            src={heroNetworkPic}
            alt="Visual representation of a network tree connecting multiple people and businesses"
            className=""
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
