import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type Props = {
  rightBackgroundColor: string;
  heading: string;
  description: string;
  buttonText: string;
  imageSrc: string | StaticImageData;
  imageAlt: string;
  linkToRegister: string;
};

function BundoOfferCard({
  rightBackgroundColor,
  heading,
  description,
  buttonText,
  imageSrc,
  imageAlt,
  linkToRegister,
}: Props) {
  return (
    <div className="relative isolate my-3 flex h-[clamp(400,_15vw,405px)] flex-row sm:min-w-[350px]">
      <div
        className="flex h-[398px] w-[350px] flex-col justify-center gap-2 rounded-2xl px-6 shadow-md md:w-[clamp(380px,_15vw,_385px)] "
        style={{
          backgroundColor: rightBackgroundColor,
        }}
      >
        <div className="flex w-fit flex-col items-center gap-4">
          <div className="container h-auto w-[80px]">
            <div className="relative h-[80px] w-[80px] overflow-hidden rounded-full">
              <Image
                src={imageSrc}
                alt={imageAlt}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
                placeholder="blur"
              />
            </div>
          </div>
          <div className="align-center items-center justify-center">
            <h2 className="text-tertiary-pale-[#302F2C] items-center justify-center text-center text-[clamp(12px,_15vw,_15px)] font-semibold">
              {heading}
            </h2>
          </div>
          <p className="text-tertiary-pale-[#302F2C] mb-4 text-center text-[12px] font-light leading-6">
            {description}
          </p>

          <Link href={linkToRegister} className=" m-auto block w-[165px]">
            <Button>{buttonText}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BundoOfferCard;
