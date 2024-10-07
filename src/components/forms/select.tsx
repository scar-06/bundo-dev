import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { SelectItemsType } from "@/types/constants";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  name: string;
  selectItems: SelectItemsType;
};
export function SelectScrollable({ name, selectItems }: Props) {
  const { formState, control } = useFormContext();
  const { errors } = formState;
  const errorMessage = errors[name]?.message;
  return (
    <div className=" relative isolate w-full !font-tv2SansDisplay ">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="w-full">
              <SelectValue
                className="!text-xs !text-tertiary-pale-950"
                placeholder="Select a ..."
              />
            </SelectTrigger>
            <SelectContent onClick={(e) => e.stopPropagation()}>
              {selectItems.map((selectGroupItems) => (
                <SelectGroup
                  key={selectGroupItems.heading ?? Math.random() * Math.PI}
                >
                  {selectGroupItems.heading && (
                    <SelectLabel className=" w-full border-b-[1px] py-3.5  ">
                      {selectGroupItems.heading}
                    </SelectLabel>
                  )}
                  {selectGroupItems.items.map((selectGroupItem) => (
                    <SelectItem
                      key={selectGroupItem.key}
                      value={selectGroupItem.key}
                      className="text-xs"
                    >
                      {selectGroupItem.value}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {errorMessage && typeof errorMessage === "string" && (
        <p
          className={`absolute left-0 w-full bg-inherit bg-white text-xs text-red-500 transition-all duration-300 ease-in-out ${
            errors[name] ? "top-[calc(100%_+_0.3rem)]" : "top-[50%]  z-[-1]"
          } `}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
}
