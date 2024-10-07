import React, { useMemo } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import cn from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  reverse?: boolean;
  heading: string;
  info: string;
  children: React.ReactNode;
  src: string | StaticImageData;
  alt: string;
  btnText: string;
};

function BundoAdzInfo({
  reverse,
  heading,
  info,
  children,
  src,
  alt,
  btnText,
}: Props) {
  const className = useMemo(
    () =>
      cn(
        "flex  h-fit w-full flex-wrap justify-between gap-6 md:flex-nowrap",
        reverse ? "flex-row-reverse" : "flex-row",
      ),
    [reverse],
  );

  return (
    <section className="container px-6 pb-10 md:pb-16 xlg:px-0">
      <div className={className}>
        <div className=" w-full max-w-[530px] ">
          <Image src={src} alt={alt} />
        </div>
        <div className="flex flex-col items-start gap-6 pt-8">
          <h2 className="text-xs font-normal leading-4 tracking-[8px] text-neutral-500 sm:text-sm xlg:text-base">
            {heading}
          </h2>
          <div className="flex w-fit max-w-[550px] flex-col items-start gap-2">
            <h2 className="text-[clamp(25px,_3vw,_42px)]">{children}</h2>
            <p className="mb-4 text-xs font-light  leading-6 sm:text-sm md:leading-7">
              {info}
            </p>
            <Link href={"/auth/onboarding"}>
              <Button className=" font-normal" aria-label={btnText}>
                {btnText}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BundoAdzInfo;
