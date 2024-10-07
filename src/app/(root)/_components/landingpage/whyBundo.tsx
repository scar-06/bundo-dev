"use client";

import React from "react";
import Image from "next/image";
import { ArrowHorizontal, femaleHandHoldingIPhone } from "@/assets";
import { gridData } from "@/mocks/data";

import { GridItemType } from "@/types/constants";

function GridItem({ id, header, paragraph }: GridItemType) {
  return (
    <div key={id} className="mb-4 block overflow-hidden text-left ">
      <div className="mb-3 flex items-center justify-between">
        <h4 className=" max-w-[95%] text-[clamp(16px,_3vw,_24px)] font-[700] leading-[clamp(26px,_3vw,_40px)] text-tertiary-deep-green-800">
          {header}
        </h4>
      </div>
      <p className="max-w-[95%] pb-5 text-xs font-[300] !leading-[22.60px] md:text-sm md:!leading-[26.60px]">
        {paragraph}
      </p>
    </div>
  );
}

export function WhyBundo() {
  const [currentMobileSlide, setCurrentMobileSlide] = React.useState(1);

  const element =
    typeof window !== "undefined"
      ? document.getElementById("sectionGrid")
      : null;

  const handleMobileSlide = () => {
    setCurrentMobileSlide(currentMobileSlide === 1 ? 2 : 1);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className=" pt-[100px]" id="sectionGrid">
      <div className="mx-auto flex w-full max-w-screen-xlg items-center justify-center px-6  pb-20">
        <div className="inline-flex max-w-[530px] flex-col items-center justify-start gap-[11px]">
          <h2 className=" text-center text-[clamp(25px,_3vw,_42px)] font-semibold text-zinc-800">
            Why Bundo?
          </h2>
          <p className="  text-center text-sm font-light leading-loose text-zinc-800 sm:text-base">
            {` Bundo empowers business owners and everyday people with retail
            innovation that helps them solve their retail challenges; from
            finding verified and trustworthy vendors to gaining visibility for
            that small-scale business and much more. We’ve got you covered`}
          </p>
        </div>
      </div>
      <div className="container relative px-6">
        <div className="grid-cols-2  md:grid md:gap-10 md:px-4 xlg:gap-[520px] xlg:pt-0">
          <div
            className={`${
              currentMobileSlide !== 1
                ? "!h-0 overflow-hidden opacity-100"
                : "h-auto opacity-100"
            } aos-mobile-disable transition duration-500 md:!h-auto md:opacity-100`}
          >
            <div className=" mb-6 flex w-full items-center justify-between md:hidden">
              <button onClick={handleMobileSlide}>
                <ArrowHorizontal />
              </button>
              <h1 className=" leading-[clamp(29px,_5vw,_39 .95px)] text-[clamp(25px,_3vw,_32px)] font-[700] text-tertiary-deep-green-950   ">
                Enjoy easy <span className=" text-primary-500">Selling</span>
              </h1>
              <button onClick={handleMobileSlide}>
                <ArrowHorizontal className="rotate-180" />
              </button>
            </div>
            <h1 className=" leading-[clamp(29px,_5vw,_39 .95px)] mb-6 hidden text-[clamp(25px,_3vw,_32px)] font-[700] text-tertiary-deep-green-950 md:block   ">
              Enjoy easy <span className=" text-primary-500">Selling</span>
            </h1>
            {gridData.slice(0, 3).map((item) => (
              <GridItem key={Math.random() * Math.PI} {...item} />
            ))}
          </div>
          <div
            className={`${
              currentMobileSlide !== 2
                ? "!h-0 overflow-hidden opacity-0"
                : "h-auto opacity-100"
            } aos-mobile-disable transition duration-500 md:!h-auto md:opacity-100`}
          >
            <div className=" mb-6 flex w-full items-center justify-between md:hidden">
              <button onClick={handleMobileSlide}>
                <ArrowHorizontal />
              </button>
              <h1 className=" leading-[clamp(29px,_5vw,_39 .95px)] text-[clamp(24px,_5vw,_32px)] font-[700] text-tertiary-deep-green-950   ">
                Enjoy easy <span className=" text-primary-500">Buying</span>
              </h1>
              <button onClick={handleMobileSlide}>
                <ArrowHorizontal className="rotate-180" />
              </button>
            </div>
            <h1 className=" leading-[clamp(29px,_5vw,_39 .95px)] mb-6 hidden text-[clamp(25px,_3vw,_32px)] font-[700] text-tertiary-deep-green-950 md:block   ">
              Enjoy easy <span className=" text-primary-500">Buying</span>
            </h1>

            {gridData.slice(3).map((item) => (
              <GridItem key={`grid item ${Math.random()}`} {...item} />
            ))}
          </div>
        </div>

        <Image
          src={femaleHandHoldingIPhone}
          alt="a woman shopping on bundo marketplace"
          placeholder="blur"
          width={690}
          className="mx-auto xlg:absolute xlg:bottom-0 xlg:left-[50%] xlg:translate-x-[-42%]"
        />
      </div>
    </section>
  );
}
