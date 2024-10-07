"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger as Trigger } from "gsap/dist/ScrollTrigger";

import useWindowResize from "@/hooks/useWindowResize";

type Props = {
  children: React.ReactNode;
};

function ScrollTrigger({ children }: Props) {
  const { width } = useWindowResize();
  const [scrollWidth, setScrollWidth] = useState<{
    width: number;
  }>();
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  gsap.registerPlugin(Trigger);

  useLayoutEffect(() => {
    const sectionElement = sectionRef.current;
    if (sectionElement) {
      const windowRect = document
        .getElementsByTagName("body")[0]
        .getBoundingClientRect();
      const boundingRect = sectionElement.getBoundingClientRect();

      const visibleWidth = windowRect.width - boundingRect.x;
      const nonVisibleWidth = boundingRect.width - visibleWidth;
      setScrollWidth({ width: nonVisibleWidth });
    }
  }, [width]);

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      {
        translateX: 0,
      },
      {
        translateX: `-${scrollWidth?.width ?? 0}`,
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "-130px top",
          end: "+=600",
          scrub: true,
          pin: true,
        },
      },
    );
    return () => {
      pin.kill();
    };
  }, [scrollWidth?.width]);

  return (
    <section className="hideScrollBar w-full overflow-hidden ">
      <div ref={triggerRef}>
        <div
          ref={sectionRef}
          className="inline-flex h-[550px] w-fit gap-8  pr-6  sm:h-[650px]  xlg:ml-[calc(_(100vw_-_1300px)_/_2)]"
        >
          {children}
        </div>
      </div>
    </section>
  );
}

export default ScrollTrigger;
