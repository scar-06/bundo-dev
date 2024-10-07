import React, { useMemo } from "react";
import { FlowerIcon } from "@/assets";

function Why() {
  const memoizedClassNames = useMemo(
    () => ({
      container: `items-centers container flex flex-col items-center justify-center gap-[clamp(50px,_5vw,_70px)] px-6 xlg:px-0`,
      textSection: `inline-flex max-w-[530px] flex-col items-center justify-start gap-[11px]`,
      iconContainer: `relative h-[80px] w-[80px]`,
      heading: `text-center text-[clamp(25px,_3vw,_42px)] font-semibold text-[#302F2C]`,
      bodyText: `text-center mb-4 text-sm font-light leading-7 text-[#302F2C] `,
    }),
    [],
  );

  return (
    <section className="flex w-full items-center py-[clamp(70px,_5vw,_118px)]">
      <div className={memoizedClassNames.container}>
        <div className={memoizedClassNames.textSection}>
          <div className={memoizedClassNames.iconContainer}>
            <FlowerIcon
              className="absolute top-[-12px] -rotate-90"
              aria-hidden="true"
            />
          </div>
          <h2 className={memoizedClassNames.heading}>Why Retail?</h2>
          <p className={memoizedClassNames.bodyText}>
            {` Imagine a world without the ability to buy and sell?
 People will be left stranded and the world will be void of the good things of life. The world was designed for people to connect and exchange goods and services. The world needs more people who sell and people who buy and most importantly, a sturdy bridge that connects them together seamlessly. `}
          </p>
        </div>

        <div className={memoizedClassNames.textSection}>
          <FlowerIcon aria-label="Icon representing growth and connection" />
          <h2 className={memoizedClassNames.heading}>Why Bundo?</h2>
          <p className={memoizedClassNames.bodyText}>
            {`    Bundo is the bridge we’re building to seamlessly connect everyday sellers with everyday buyers and vice-versa. Using Geo-location technology and digital retail innovation, Bundo offers SME vendors the ability to go completely digital even without the need for a physical shop while also offering customers the ability to shop from different vendors in the comfort of their location and binge on new and exciting vendors every other day. 
With Bundo, selling and buying is easy from start to finish. `}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Why;
