import Image from "next/image";

import { ITypeOnboardingSliderItem } from "@/types/constants";

function AuthWrapperSliderCard({
  src,
  heading,
  subheading,
}: ITypeOnboardingSliderItem) {
  return (
    <div className="authWrapperSliderCard flex h-full  w-full flex-col items-end justify-center ">
      <div className="flex w-full flex-col items-center gap-6">
        <div className="imageWraper  w-clamp(250px,_8vw,_396px)] mb-[clamp(15px,_5vw,_40px)] max-w-[396px] ">
          <Image
            src={src}
            alt="image"
            className="image"
            height={417}
            width={380}
          />
        </div>
        <h3 className=" max-w-[365px] text-center text-[clamp(18px,_5vw,_24px)] font-semibold leading-[clamp(28px,_5vw,_32px)]  text-tertiary-deep-green-950  ">
          {heading}
        </h3>
        <small className=" max-w-[365px] text-pretty text-center text-xs  leading-[190%] text-tertiary-pale-950 ">
          {subheading}
        </small>
      </div>
    </div>
  );
}

export default AuthWrapperSliderCard;
