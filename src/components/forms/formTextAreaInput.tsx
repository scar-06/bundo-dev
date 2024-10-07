import React, {
  DetailedHTMLProps,
  TextareaHTMLAttributes,
  useState,
} from "react";
import { useFormContext } from "react-hook-form";

type Props = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  labelText: string;
  name: string;
  height?: string;
};

function FormTextAreaInput({
  name,
  labelText,
  maxLength = 250,
  height,
  placeholder,
  ...rest
}: Props) {
  const { formState, register } = useFormContext();
  const { errors } = formState;
  const errorMessage = errors[name]?.message;

  const [currentLength, setCurrentLength] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentLength(e.target.value.length);
  };

  return (
    <div className={`relative flex w-full flex-col gap-2`}>
      {labelText.length > 0 && (
        <label
          htmlFor={name}
          className="cursor-pointer text-xs text-tertiary-pale-950"
        >
          {labelText}
        </label>
      )}
      <div
        tabIndex={0}
        className="relative h-[76px] w-full"
        style={{ height: height ?? "76px" }}
      >
        <textarea
          placeholder={placeholder}
          maxLength={maxLength}
          {...register(name)}
          {...rest}
          id={name}
          onChange={handleInputChange} // Update on change
          className={`relative h-full w-full resize-none rounded-md border-none bg-[rgba(222,_242,_251,_0.30)] py-2 pl-2 text-sm font-light leading-6 outline-none ring-1 ring-[#C8C8C8] placeholder:text-[#AAAAAA] ${
            formState.errors[name]
              ? "text-red-600 ring-red-500 focus-within:ring-red-500"
              : "text-[#302F2C] focus-within:ring-primary-500"
          }`}
        />
        {/* Display error message if available */}
        {errorMessage && typeof errorMessage === "string" && (
          <p
            className={`absolute left-0 w-full bg-inherit bg-white text-xs text-red-500 transition-all duration-300 ease-in-out ${
              errors[name] ? "top-[calc(100%_+_0.3rem)]" : "top-[50%] z-[-1]"
            }`}
          >
            {errorMessage}
          </p>
        )}
      </div>

      {/* Display character count if maxLength is defined */}
      {maxLength && (
        <div className="flex w-full items-center justify-end text-xs text-[#5A5A5A]">
          <span>
            {currentLength}/{maxLength} characters
          </span>
        </div>
      )}
    </div>
  );
}

export default FormTextAreaInput;
