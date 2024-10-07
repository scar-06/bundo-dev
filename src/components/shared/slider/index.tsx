"use client";

import React, { ReactNode, useRef, useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ArrowLeft, ArrowRight } from "lucide-react"; // Changed for simplicity

import { Button } from "@/components/ui/button";

interface SliderWrapperProps {
  slides: ReactNode[];
  hideControls?: boolean;
}

function SliderWrapper({ slides, hideControls = false }: SliderWrapperProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: false,
    infinite: slides.length > 1,
    speed: 300,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: hideControls,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
  };

  const nextSlide = () => {
    sliderRef.current?.slickNext();
  };

  const prevSlide = () => {
    sliderRef.current?.slickPrev();
  };

  return (
    <div className="h-full w-full">
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, index) => (
          <div key={Math.PI * Math.random()}>{slide}</div>
        ))}
      </Slider>
      {!hideControls && (
        <div className="mt-4 flex w-full items-center justify-between ">
          <Button
            variant={"plain"}
            type="button"
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="p-0"
          >
            <ArrowLeft size={18} />
          </Button>
          <span>
            {currentSlide + 1}/{slides.length}
          </span>
          <Button
            variant={"plain"}
            type="button"
            onClick={nextSlide}
            aria-label="Next Slide"
            className="p-0"
          >
            <ArrowRight size={18} />
          </Button>
        </div>
      )}
    </div>
  );
}

export default SliderWrapper;
