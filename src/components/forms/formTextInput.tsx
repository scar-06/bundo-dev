import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { InfoIndicatorIcon } from "@/assets";
import { useFormContext } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Tooltip } from "react-tooltip";

import cn from "@/lib/utils";

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  labelText: string;
  name: string;
  showInputRequirements?: boolean;
  Icon?: React.ReactElement;
  callback?: () => void;
  customStyle?: { [key: string]: string };
  showIndidcator?: boolean;
  formatCurrency?: boolean;
};

function FormTextInput({
  type,
  name,
  labelText,
  placeholder,
  showInputRequirements,
  callback,
  Icon,
  customStyle,
  showIndidcator = false,
  formatCurrency,
  ...rest
}: Props) {
  const { formState, register, watch, setValue } = useFormContext();
  const { errors } = formState;
  const [show, setShow] = useState(false);
  const errorMessage = errors[name]?.message;
  const [formattedValue, setFormattedValue] = useState("");

  const value = watch()[name];

  useEffect(() => {
    if (value !== undefined && formatCurrency) {
      const rawValue = value.replace(/,/g, "");
      if (!Number.isNaN(rawValue)) {
        if (value === "") {
          setFormattedValue("");
        } else {
          setFormattedValue(new Intl.NumberFormat("en-US").format(rawValue));
        }
      }
    }
  }, [value, formatCurrency]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const rawValue = inputValue.replace(/[^\d,]/g, "").replace(/,/g, "");
    if (inputValue === "") {
      setFormattedValue("");
      setValue(name, "");
    } else if (!Number.isNaN(rawValue)) {
      setValue(name, rawValue);
    }
  };

  const noInputVal = !value || value.length < 1;
  const isNumber = /\d/.test(value);
  const isLengthValid = value?.length > 6;
  const isLowercase = /[a-z]/.test(value) && !noInputVal;
  const isUppercase = /[A-Z]/.test(value);
  const isSpecialChar = /[@$!%*?&#]/.test(value);

  const renderCheckmarkOrCross = (condition: boolean) => {
    if (noInputVal) {
      return <span className="h-1 w-1 rounded-full bg-black/90" />;
    }
    return condition ? (
      <span className="text-green-500">&#10003;</span>
    ) : (
      <span className="text-red-700">&times;</span>
    );
  };

  return (
    <>
      <div className={`relative flex w-full flex-col items-start gap-2 `}>
        {labelText !== "" && (
          <label
            htmlFor={name}
            className="cursor-pointer text-xs text-tertiary-pale-950"
          >
            {labelText}
          </label>
        )}
        <div tabIndex={0} className="relative isolate h-[54px] w-full">
          {type === "password" && showIndidcator && (
            <button
              type="button"
              id="tooltip-clickable"
              className="absolute left-[10px] top-1/2 z-20 h-6 w-6 -translate-y-1/2 cursor-pointer "
            >
              {
                <InfoIndicatorIcon
                  className={errorMessage ? " text-red-500" : " text-green-600"}
                />
              }
            </button>
          )}

          {formatCurrency ? (
            <input
              placeholder={placeholder}
              type={type && !show ? type : "text"}
              step={"any"}
              {...register(name)}
              {...rest}
              id={name}
              value={formattedValue}
              onChange={handleChange}
              className={cn(
                `relative h-full w-full rounded-md border-none bg-[rgba(222,242,251,0.3)] pl-2 text-sm font-light outline-none ring-1 ring-[#C8C8C8] transition-all duration-300   ease-in-out placeholder:text-[#AAAAAA]`,
                formState.errors[name]
                  ? "text-red-600 ring-red-500 focus-within:ring-red-500"
                  : " text-[#302F2C] focus-within:ring-primary-500",
                showIndidcator ? "pl-[40px]" : "",
              )}
              style={customStyle}
            />
          ) : (
            <input
              placeholder={placeholder}
              type={type && !show ? type : "text"}
              step={"any"}
              {...register(name)}
              {...rest}
              id={name}
              className={cn(
                `relative h-full w-full rounded-md border-none bg-[rgba(222,242,251,0.3)] pl-2 text-sm font-light outline-none ring-1 ring-[#C8C8C8] transition-all duration-300   ease-in-out placeholder:text-[#AAAAAA]`,
                formState.errors[name]
                  ? "text-red-600 ring-red-500 focus-within:ring-red-500"
                  : " text-[#302F2C] focus-within:ring-primary-500",
                showIndidcator ? "pl-[40px]" : "",
              )}
              style={customStyle}
            />
          )}
          {type === "password" && (
            <button
              onClick={() => setShow(!show)}
              type="button"
              className="absolute right-[10px] top-1/2 h-6 w-6 -translate-y-1/2 text-black text-opacity-70"
            >
              {!show ? <FaEyeSlash /> : <FaEye />}
            </button>
          )}
          {Icon && (
            <button
              onClick={() => (callback ? callback() : null)}
              type="button"
              className="absolute right-[10px] top-1/2  -translate-y-1/2 text-black text-opacity-70"
            >
              {Icon}
            </button>
          )}
        </div>
        {/* Display error message if available */}
        {errorMessage && typeof errorMessage === "string" && (
          <p
            className={`w-full  bg-inherit  text-start text-xs text-red-500 transition-all duration-300 ease-in-out ${
              errors[name] ? "top-[calc(100%_+_0.3rem)]" : "top-[50%]  z-[-1]"
            } `}
          >
            {errorMessage}
          </p>
        )}
      </div>
      <Tooltip
        place="top"
        className={cn(
          "z-[50] w-[500px] !rounded-sm border border-solid !bg-white !px-4 !py-6 !opacity-100 !shadow-md",
          errorMessage
            ? "border-red-500 shadow-red-500"
            : "border-green-500 shadow-green-500",
        )}
        anchorSelect="#tooltip-clickable"
        clickable
      >
        {showInputRequirements && type === "password" && (
          <div className="flex w-full flex-col">
            <h3 className="text-xs text-tertiary-pale-950">
              Password must contain:
              <ul className="my-1 flex flex-col gap-1 pl-2 ">
                <li className="flex items-center gap-2">
                  {renderCheckmarkOrCross(isNumber)}
                  <span
                    className={
                      isNumber
                        ? "text-green-500"
                        : noInputVal
                          ? ""
                          : "text-red-500"
                    }
                  >{`At least one number`}</span>
                </li>
                <li className="flex items-center gap-2">
                  {renderCheckmarkOrCross(isLengthValid)}
                  <span
                    className={
                      isLengthValid
                        ? "text-green-500"
                        : noInputVal
                          ? ""
                          : "text-red-500"
                    }
                  >{`At least 6 characters long`}</span>
                </li>
                <li className="flex items-center gap-2">
                  {renderCheckmarkOrCross(isLowercase)}
                  <span
                    className={
                      isLowercase
                        ? "text-green-500"
                        : noInputVal
                          ? ""
                          : "text-red-500"
                    }
                  >
                    At least one lowercase letter
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  {renderCheckmarkOrCross(isUppercase)}
                  <span
                    className={
                      isUppercase
                        ? "text-green-500"
                        : noInputVal
                          ? ""
                          : "text-red-500"
                    }
                  >
                    At least one uppercase letter
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  {renderCheckmarkOrCross(isSpecialChar)}
                  <span
                    className={
                      isSpecialChar
                        ? "text-green-500"
                        : noInputVal
                          ? ""
                          : "text-red-500"
                    }
                  >{`At least one special character (@$!%*?&#)`}</span>
                </li>
              </ul>
            </h3>
          </div>
        )}
      </Tooltip>
    </>
  );
}

export default FormTextInput;
