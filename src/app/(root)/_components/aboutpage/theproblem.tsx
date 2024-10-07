import React, { useMemo } from "react";
import Image from "next/image";
import { BundoLogoMini2, groupedImageMobile, groupImage } from "@/assets";

function Theproblem() {
  const memoizedClassNames = useMemo(
    () => ({
      container: `container flex flex-col justify-between px-6 xlg:px-0`,
      mainContent: `mb-[clamp(60px,_5vw,_100px)] flex h-fit w-full xlg:w-[95%] flex-col justify-between gap-6 md:flex-row`,
      gridContainer: `grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-1`,
      textColumn: `flex w-full max-w-[368px] flex-col md:items-center md:text-center lg:items-start lg:text-start`,
      imageColumn: `relative hidden max-h-[1052px] w-full max-w-[490px] lg:block`,
      mobileImage: `relative flex w-full max-w-[522px]  items-center md:hidden`,
      heading: `text-start text-[clamp(32px,_5vw,_42px)] font-bold text-tertiary-deep-green-950 md:text-center lg:text-start`,
      subheading: `text-start text-[clamp(32px,_5vw,_42px)] font-semibold text-zinc-800`,
    }),
    [],
  );

  return (
    <section className="flex w-full items-center bg-[#F4F5F7] pb-[clamp(52px,_5vw,_80px)] pt-[clamp(50px,_5vw,_129px)]">
      <div className={memoizedClassNames.container}>
        <div className="mb-[clamp(30px,_5vw,_42px)]">
          <h2 className={memoizedClassNames.heading}>
            The issues <br className="hidden xlg:block" /> we are tackling
          </h2>
        </div>

        <div className={memoizedClassNames.mainContent}>
          <div className={memoizedClassNames.gridContainer}>
            <div className="flex w-full max-w-[368px] flex-col md:items-center md:text-center lg:items-start lg:text-start ">
              <span className="mb-[20px]">
                <BundoLogoMini2 />
              </span>
              <h2 className="mb-[4px] font-bold">Business Visibility</h2>
              <p className="text-xs leading-[clamp(20px,_5vw,_26px)] text-[#302F2C] sm:text-sm">
                Physical shop for what? With our advanced geo-location
                technology, we showcase your business to customers in your
                location and beyond. We connect you directly to the right
                customers, ensuring your business receives the attention it
                deserves.
              </p>
            </div>
            <div className="flex w-full max-w-[368px] flex-col md:items-center md:text-center lg:items-start lg:text-start ">
              <span className="mb-[20px]">
                <BundoLogoMini2 />
              </span>
              <h2 className="mb-[4px] font-bold">Profit and Sales</h2>
              <p className="text-xs leading-[clamp(20px,_5vw,_26px)] text-[#302F2C] sm:text-sm">
                More customers equals more sales and profit. We ensure that your
                products or services are seen by the right people at the right
                time and converts to profit.
              </p>
            </div>
            <div className="flex w-full max-w-[368px] flex-col md:items-center md:text-center lg:items-start lg:text-start ">
              <span className="mb-[20px]">
                <BundoLogoMini2 />
              </span>
              <h2 className="mb-[4px] font-bold">Logistics and Delivery</h2>
              <p className="text-xs leading-[clamp(20px,_5vw,_26px)] text-[#302F2C] sm:text-sm">
                {` We're building a comprehensive solution to streamline your operations and product delivery, ensuring selling is easier.`}
              </p>
            </div>
            <div className="flex w-full max-w-[368px] flex-col md:items-center md:text-center lg:items-start lg:text-start ">
              <span className="mb-[20px]">
                <BundoLogoMini2 />
              </span>
              <h2 className="mb-[4px] font-bold">Easier B2C experience</h2>
              <p className="text-xs leading-[clamp(20px,_5vw,_26px)] text-[#302F2C] sm:text-sm">
                With our goal to simplify retail, we want to ensure that your
                customers can connect easily with you and enjoy an easy retail
                experience from start to finish.
              </p>
            </div>
            <div className="flex w-full max-w-[368px] flex-col md:items-center md:text-center lg:items-start lg:text-start ">
              <span className="mb-[20px]">
                <BundoLogoMini2 />
              </span>
              <h2 className="mb-[4px] font-bold">Customer Satisfaction</h2>
              <p className="text-xs leading-[clamp(20px,_5vw,_26px)] text-[#302F2C] sm:text-sm">
                We are working to provide a seamless and delightful experience
                for our customers and their own customers, ensuring we
                understand and are solving their evolving needs.
              </p>
            </div>
          </div>
          <div className={memoizedClassNames.imageColumn}>
            <Image src={groupImage} alt="group" />
          </div>
          <div className={memoizedClassNames.mobileImage}>
            <Image src={groupedImageMobile} alt="group" />
          </div>
        </div>

        <div className={memoizedClassNames.subheading}>
          There are over{" "}
          <span className="text-primary-500">1,000,000 million</span> businesses
          and <br className="hidden xlg:block" /> people in Africa and we are
          here to ensure that yours <br className="hidden xlg:block" />{" "}
          <span className="text-primary-500">stands out to</span> the customers
          who need you
        </div>
      </div>
    </section>
  );
}

export default Theproblem;
