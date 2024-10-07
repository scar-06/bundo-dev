import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";

import "./radio.css";

interface RadioButtonProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  errorText?: string;
}

export function RadioButton({
  name,
  id,
  value,
  label,
  errorText = "",
  className,
  onChange,
  ...rest
}: RadioButtonProps) {
  return (
    <>
      <div
        className={`rse-radio flex h-fit w-fit items-center gap-2 ${
          className || ""
        }`}
        key={`radio-${value}`}
      >
        <input
          className="rse-radio h-[16px] w-[16px] cursor-pointer accent-green-600 "
          type="radio"
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          {...rest}
        />
        <label htmlFor={id} className="cursor-pointer text-sm text-[#302F2C]">
          {label}
        </label>
      </div>
      {errorText.length > 0 && <div className="text-red-500">{errorText}</div>}
    </>
  );
}
