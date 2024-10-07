import React, { useMemo } from "react";
import Image from "next/image";
import { aboutHeroImage } from "@/assets";

import styles from "./about.module.css";

function AboutHero() {
  const memoizedClassNames = useMemo(
    () => ({
      aboutHeroContainer: `${styles.aboutHeroContainer} relative flex w-full items-center bg-tertiary-deep-green-950 mb-6`,
      textContainer: `flex w-fit max-w-[550px] flex-col items-start gap-4 text-emerald-100`,
      title: `font-bold leading-[30.40px]`,
      heading: `text-[clamp(40px,_3vw,_58px)] font-semibold text-tertiary-white-100 xlg:whitespace-nowrap`,
      highlightedText: `text-[#FDE74C] transition-all duration-500`,
      imageContainer: `relative mb-6 mt-[60px] w-full max-w-[610px]`,
    }),
    [],
  );

  return (
    <section className={memoizedClassNames.aboutHeroContainer}>
      <div className="container flex h-fit flex-col items-center justify-between gap-12 px-4 py-6 lg:flex-row xlg:px-0">
        <div className={`${memoizedClassNames.textContainer} pt-8`}>
          <div className={memoizedClassNames.title}>What we are About</div>
          <h2>
            <div className="max-w-[557px]">
              <h1 className={memoizedClassNames.heading}>
                We’re simplifying
                <br className="hidden xlg:block" /> Retail for everyday
                <br className="hidden xlg:block" /> people who{" "}
                <span className={memoizedClassNames.highlightedText}>buy</span>
                <br className="hidden xlg:block" /> and{" "}
                <span className={memoizedClassNames.highlightedText}>sell</span>
              </h1>
            </div>
          </h2>
        </div>
        <div className={memoizedClassNames.imageContainer}>
          <Image
            src={aboutHeroImage}
            alt="Network tree representing connections between people"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutHero;
