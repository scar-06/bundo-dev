import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import PhoneInput from "react-phone-input-2";

import "react-phone-input-2/lib/style.css";

type Props = {
  name: string;
  label?: string;
};

function MobilePhone({ name, label = " Phone Number" }: Props) {
  const { formState, control } = useFormContext();
  const { errors } = formState;
  const errorMessage = errors[name]?.message;

  return (
    <div className={`relative flex w-full flex-col items-start gap-2`}>
      <label className="cursor-pointer font-tv2SansDisplay text-xs text-tertiary-pale-950">
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <PhoneInput
            {...field}
            country={"ng"}
            onlyCountries={["ng"]}
            containerClass="h-[54px]"
            buttonClass="!bg-transparent !border-none !focus-within:bg-transparent ![&.open>.selected-flag]:bg-transparent"
            countryCodeEditable={false}
            inputClass={`relative !font-tv2SansDisplay !h-full !w-full rounded-md !border-none !bg-[rgba(222,_242,_251,_0.30)] pl-2 !text-sm font-light outline-none !ring-1 outline-none   ring-[#C8C8C8] placeholder:text-[#AAAAAA]   ${
              formState.errors[name]
                ? "text-red-600 ring-red-500 focus-within:ring-red-500"
                : " text-[#302F2C] focus-within:ring-primary-500"
            } `}
          />
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

export default MobilePhone;
