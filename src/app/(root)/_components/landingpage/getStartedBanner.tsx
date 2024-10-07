import React from "react";
import Image from "next/image";
import { bundoIllustration, FlowerIcon } from "@/assets";

import { Button } from "@/components/ui/button";

import styles from "./hero.module.css";

function GetStartedBanner() {
  return (
    <div className="h-fit w-full pb-[170px] sm:pb-[190px]">
      <section className=" relative isolate  w-full bg-primary-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:-z-[1] after:h-full after:w-full after:bg-black/30 after:content-[''] md:px-6 ">
        <div className="container relative mx-auto flex min-h-[553px] w-full flex-col items-center justify-between gap-8 px-0 xxmd:flex-row xxmd:gap-0 ">
          <div className="inline-flex flex-col items-start justify-start gap-[21px] px-6 pt-[50px] xxmd:max-w-[498px] xxmd:px-0">
            <h3 className="  text-[clamp(32px,_5vw,_42px)] font-bold text-white">
              Get started for Free in less than 5 minutes
            </h3>
            <p className="  text-xs font-light leading-[30.40px] text-white">
              Begin your journey to simpler retail
            </p>

            <Button className=" cursor-default">
              <span>Coming Soon</span>
            </Button>
          </div>
          <div
            className={`${styles.getStarted} relative right-0 h-[40vh] max-h-[553px] w-full xxmd:absolute  xxmd:h-full xxmd:max-h-[unset] xxmd:w-[60%] `}
          >
            <div className="absolute top-[30%] w-[550px] ssm:right-[clamp(_-15%,_8vw,_-10%)] sm:right-[-5%] sm:w-full md:h-[633px] md:w-[812px] xmd:right-[-25%] xxmd:top-[30%] lg:right-[-2%] xlg:right-[10%]  ">
              <span className=" absolute left-[25%] top-[calc(100%_+_-10px)] sm:left-[35%] md:bottom-[20px] md:top-[unset] xlg:left-[25%]">
                <FlowerIcon />
              </span>
              <Image src={bundoIllustration} alt="getStarted " />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GetStartedBanner;
