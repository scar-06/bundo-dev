"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ArrowDown } from "@/assets";
import { faqData as data } from "@/mocks/data";

import { FaqItemType } from "@/types/constants";

type Props = FaqItemType & {
  currentTab: number | null;
  setCurrentTab: React.Dispatch<React.SetStateAction<number | null>>;
};

export function FaqItem({
  id,
  header,
  paragraph,
  currentTab,
  setCurrentTab,
}: Props) {
  const contentClassName = useMemo(
    () =>
      `grid max-w-[95%] overflow-hidden pb-5 text-xs font-[300] !leading-[22.60px] transition-all duration-500 ease-in-out md:text-sm md:!leading-[26.60px] ${
        id === currentTab
          ? "h-[auto] grid-rows-[1fr] opacity-100"
          : "h-[0px] grid-rows-[0fr] opacity-0"
      }`,
    [id, currentTab],
  );

  return (
    <button
      key={id}
      aria-expanded={id === currentTab ? "true" : "false"}
      className="mb-6 block w-full cursor-pointer overflow-hidden border-b border-dashed border-tertiary-white-700 text-left last-of-type:border-none"
      onClick={() => setCurrentTab(currentTab !== id ? id : null)}
    >
      <div className="mb-3 flex w-full items-center justify-between">
        <h4 className="text-bundo-dark-green max-w-[90%] text-xs font-[700] md:text-lg">
          {header}
        </h4>
        <ArrowDown
          className={`duration-500 ${
            id === currentTab ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
      <div className={contentClassName}>
        <p className="overflow-hidden">{paragraph}</p>
      </div>
    </button>
  );
}

export function FaqSection() {
  const [faqData, setFaqData] = useState<FaqItemType[]>([]);
  useEffect(() => {
    setFaqData(data);
  }, []);
  const [currentTab, setCurrentTab] = useState<number | null>(null);

  return (
    <section
      className="flex w-full flex-col gap-6 bg-tertiary-pale-100 px-6 py-10 xlg:px-0"
      aria-labelledby="faq-heading"
    >
      <header className="xl:px-0 xl:pt-0 mx-auto flex w-fit flex-col items-center px-4 md:mb-10">
        <h1
          id="faq-heading"
          className="mb-3 text-center text-[clamp(32px,_5vw,_62px)] font-[700] leading-[clamp(39.5px,_5vw,_75.95px)] text-tertiary-deep-green-950"
        >
          Frequently Asked <span className="text-primary-500">Questions</span>
        </h1>
        <p className="max-w-[550px] text-center text-sm font-[300] leading-6 md:text-base md:leading-7">
          Need help? Check out these answers to questions you might have about
          Bundo.
          <span className="font-[500]">Or send an email to help@bundo.app</span>
        </p>
      </header>

      <main className="mx-auto flex w-full flex-col items-center">
        <div className="mx-auto w-full max-w-[589px] grid-cols-1 md:grid">
          <div className={useMemo(() => `md:!h-auto md:opacity-100`, [])}>
            {faqData.map((item) => (
              <FaqItem
                key={Math.random() * Math.PI}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                {...item}
              />
            ))}
          </div>
        </div>
      </main>
    </section>
  );
}
