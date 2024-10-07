"use client";

// done here
import React, { useEffect, useRef, useState } from "react";
import { Listbox } from "@headlessui/react";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";

export type OptionType = {
  name: string;
  value: string | number;
  disabled?: boolean;
};

export type OptionGroupType = {
  groupName: string;
  options: OptionType[];
};

export type SelectProps = {
  selectedDisplayValue?: React.ReactNode;
  value: string | number | undefined;
  listValue: (OptionType | OptionGroupType)[];
  onChange: (value: OptionType) => void;
  label?: string;
  customBtnClass?: string;
  errorMessage?: string;
  customListOptionsClass?: string;
  placeholder?: string;
  disabled?: boolean;
};

function SingleSelect({
  selectedDisplayValue,
  value,
  listValue,
  onChange,
  label,
  customBtnClass,
  errorMessage,
  customListOptionsClass,
  placeholder,
  disabled,
}: SelectProps) {
  const isOptionGroup = (
    item: OptionType | OptionGroupType,
  ): item is OptionGroupType => {
    return (item as OptionGroupType).groupName !== undefined;
  };
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  const [listPosition, setListPosition] = useState("top-auto bottom-0");

  useEffect(() => {
    const handlePosition = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const bottomSpace = window.innerHeight - rect.bottom;

        if (bottomSpace < 200) {
          setListPosition("bottom-auto top-0");
        } else {
          setListPosition("top-auto bottom-0");
        }
      }
    };
    handlePosition();
    window.addEventListener("resize", handlePosition);
    return () => window.removeEventListener("resize", handlePosition);
  }, []);

  return (
    <div className="relative flex w-full flex-col gap-4">
      {label && (
        <label className="cursor-pointer text-xs text-tertiary-pale-950">
          {label}
        </label>
      )}

      <Listbox
        disabled={disabled}
        value={value}
        onChange={(newValue) => {
          // Find the OptionType or OptionGroupType that matches the newValue
          const selectedOption = listValue.find((item) => {
            if (isOptionGroup(item)) {
              return item.options.some((option) => option.value === newValue);
            } else {
              return item.value === newValue;
            }
          });

          if (selectedOption) {
            if (isOptionGroup(selectedOption)) {
              // If the selected option is within a group, find the specific option
              const optionWithinGroup = selectedOption.options.find(
                (option) => option.value === newValue,
              );
              if (optionWithinGroup) {
                onChange(optionWithinGroup);
              }
            } else {
              // Directly use the selectedOption as it's not part of a group
              onChange(selectedOption);
            }
          }
        }}
      >
        {({ open }) => (
          <div className="relative w-full">
            <Listbox.Button
              ref={buttonRef}
              className={clsx(
                "relative flex min-h-[56px] w-full items-center justify-between gap-2 truncate rounded-xl bg-[rgba(222,242,251,0.3)] px-6 py-4 outline-none ring-1 placeholder:text-[#AAAAAA]",
                open ? "ring-primary-500" : "hover:ring-primary-400",
                errorMessage ? "ring-red-600" : "ring-transparent",
                customBtnClass,
              )}
            >
              <span
                className={clsx(
                  "truncate text-center text-[0.875rem] capitalize",
                  placeholder && !selectedDisplayValue
                    ? "font-normal text-gray-400"
                    : "font-semibold text-[#302F2C]",
                )}
              >
                {selectedDisplayValue || placeholder || "Select..."}
              </span>
              <ChevronDown
                className={clsx(
                  "min-h-[20px] min-w-[20px] text-[#AAAAAA] transition-transform duration-200",
                  open && "-rotate-180",
                )}
                size={15}
              />
            </Listbox.Button>

            <Listbox.Options
              ref={optionsRef}
              className={clsx(
                "absolute z-50 mt-4 max-h-[200px] w-full overflow-auto rounded-md bg-white p-1 shadow-lg focus:outline-none",
                customListOptionsClass,
              )}
            >
              {listValue.map((item, idx) => {
                if (isOptionGroup(item)) {
                  return (
                    <div key={item.groupName}>
                      <div className="w-full  border-b-[1px] py-3.5 pl-4 !font-tv2SansDisplay text-sm  font-semibold  text-gray-900">
                        {item.groupName}
                      </div>
                      {item.options.map((option) => (
                        <Listbox.Option
                          key={option.value}
                          className={({ active, selected }) =>
                            clsx(
                              "relative flex w-full cursor-pointer select-none items-center rounded-sm py-2.5 pl-8 pr-2 !font-tv2SansDisplay text-sm outline-none focus:bg-slate-50 focus:text-tertiary-deep-green-950",
                              active ? "bg-primary-100" : "",
                              selected
                                ? "bg-primary-50 font-semibold"
                                : "font-normal",
                            )
                          }
                          value={option.value}
                          disabled={option.disabled}
                        >
                          {option.value}
                        </Listbox.Option>
                      ))}
                    </div>
                  );
                } else {
                  return (
                    <Listbox.Option
                      key={item.name}
                      className={({ active, selected }) =>
                        clsx(
                          "relative flex w-full cursor-pointer select-none items-center rounded-sm py-2.5 pl-8 pr-2 !font-tv2SansDisplay text-sm outline-none focus:bg-slate-50 focus:text-tertiary-deep-green-950",
                          active ? "bg-primary-100" : "",
                          selected
                            ? "bg-primary-50 font-semibold"
                            : "font-normal",
                        )
                      }
                      value={item.name}
                      disabled={item.disabled}
                    >
                      {item.name}
                    </Listbox.Option>
                  );
                }
              })}
            </Listbox.Options>
          </div>
        )}
      </Listbox>

      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
    </div>
  );
}

export default SingleSelect;
