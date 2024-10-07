"use client";

import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import {
  buyersOnboardingSliderContents,
  vendorsOnboardingSliderContents,
} from "@/mocks/data";

import cn from "@/lib/utils";

import AuthWrapperSliderCard from "./authWrapperSliderCard";

type Props = {
  wrapperFor: "buyer" | "vendor";
};

function AuthWrapperSlider({ wrapperFor }: Props) {
  const [activeSlideItem, setActiveSlideItem] = useState(0);
  const data =
    wrapperFor === "buyer"
      ? buyersOnboardingSliderContents
      : vendorsOnboardingSliderContents;
  return (
    <div className="slides-container sticky  left-0 top-0 hidden h-screen w-full max-w-[540px] flex-1 overflow-hidden bg-white/95 lg:flex">
      <div className="relative h-full w-full overflow-hidden">
        <div className="indicator absolute left-1/2 mt-[40px] flex h-[5px] w-[80%] -translate-x-1/2 justify-between gap-2">
          {data.map((_, index) => (
            <span
              key={_.heading}
              className={cn(
                ` rounded-sm transition-all duration-500  ease-in-out `,
                activeSlideItem === index
                  ? " w-2/6 bg-tertiary-deep-green-950 "
                  : "w-1/4 bg-[#D9D9D9]",
              )}
            />
          ))}
        </div>
        <Carousel
          showArrows={false}
          showStatus={false}
          showThumbs={false}
          autoPlay
          infiniteLoop
          interval={3000}
          autoFocus
          thumbWidth={0}
          emulateTouch
          showIndicators={false}
          onChange={(index) => setActiveSlideItem(index)}
          className="w-ful h-full"
        >
          {data.map((item) => (
            <div key={item.heading} className="h-screen w-full">
              <AuthWrapperSliderCard
                {...item}
                key={item.heading + Math.random() * 1}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default AuthWrapperSlider;
