"use client";

import React, { useEffect, useState } from "react";

import cn from "@/lib/utils";

type Props = {
  title: string;
  children: React.ReactNode;
  hideOverFlow?: boolean;
  isError?: boolean;
};

function AccordionInputWrapper({
  title,
  children,
  hideOverFlow,
  isError,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    if (isError) return setIsOpen(true);
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (isError) {
      setIsOpen(true);
    }
  }, [isError]);
  return (
    <div
      className={cn(
        "rounded-md border border-dashed  p-4",
        isError ? "border-red-600" : "border-tertiary-deep-green-800",
      )}
    >
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={toggleAccordion}
      >
        <h2 className="text-xs font-semibold">{title}</h2>
        <svg
          className={`h-4 w-4 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={"M19 9l-7 7-7-7"}
          />
        </svg>
      </div>
      <div
        className={cn(
          " grid  transition-all duration-300 ease-in-out",
          isOpen
            ? " overflow-[unset] grid-rows-[1fr] pt-2"
            : "grid-rows-[0fr] overflow-hidden p-0",
        )}
      >
        <div
          className={cn(
            "",
            isOpen ? " p-1" : "overflow-hidden p-0 ",
            isOpen && hideOverFlow && "overflow-hidden",
          )}
        >
          {" "}
          {children}
        </div>
      </div>
    </div>
  );
}

export default AccordionInputWrapper;
