import React from "react";
import { twMerge } from "tailwind-merge";

import { Itabs } from "./type";

function TabPannel({
  readonly,
  options,
  width,
  onChange,
  activeTab,
  className,
  isIcon = true,
}: Itabs) {
  const handleClick = (newValue: any) => {
    if (!readonly && onChange) {
      onChange(newValue);
    }
  };

  if (!options) {
    return <div />;
  }

  const tabs: JSX.Element[] = [];
  const contents: JSX.Element[] = [];
  let isContent = false;
  let activeTabIndex = 0;

  options.forEach(({ label, value, content, icon }, index) => {
    const isActiveTab = value === activeTab;
    if (isActiveTab) {
      activeTabIndex = index;
    }

    tabs.push(
      <React.Fragment key={`tab-${value}`}>
        <div className="flex w-fit ">
          <button
            className={twMerge(
              `${className} ${
                activeTab === value
                  ? " w-fit bg-primary-500 px-8  text-white lg:px-14"
                  : "w-fit  text-[#8E8A87]"
              } w-fit whitespace-nowrap rounded-sm py-4  text-xs font-normal transition-all before:absolute before:-bottom-[1px] before:left-0
              before:w-0 before:rounded before:transition-all  before:duration-700 before:content-[''] before:hover:w-[100%] disabled:cursor-not-allowed  md:px-6 lg:px-[50px] xlg:px-[50px]
             `,
            )}
            onClick={() => handleClick(value)}
          >
            <div className="flex w-full items-center justify-center gap-[2px] sm:gap-1">
              {isIcon && <span>{icon}</span>}
              <span
                className={twMerge(
                  ` text-xs font-normal sm:text-sm ${className} ${
                    activeTab === value
                      ? "font-semibold sm:font-bold"
                      : "font-normal"
                  } `,
                )}
              >
                {label}
              </span>
            </div>
          </button>
        </div>
      </React.Fragment>,
    );

    if (!isContent && content) {
      isContent = true;
    }

    contents.push(
      <div
        key={`content-${value}`}
        className={`w-full ${isActiveTab ? "" : "max-h-0  overflow-hidden"}`}
      >
        {content}
      </div>,
    );
  });

  return (
    <div className="flex h-full w-full justify-center">
      <div
        className={`${width} flex justify-center border border-solid border-transparent`}
      >
        {tabs}
      </div>
      {isContent && (
        <div className="mx-auto w-full overflow-x-hidden">
          <div
            className="relative mt-5 grid w-full"
            style={{
              gridTemplateColumns: `repeat(${tabs.length}, 1fr)`,
              width: `${tabs.length * 100}%`,
              left: `-${activeTabIndex * 100}%`,
            }}
          >
            {contents}
          </div>
        </div>
      )}
    </div>
  );
}

export default TabPannel;
