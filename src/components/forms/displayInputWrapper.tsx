import React, { useEffect, useState } from "react";

import FormTextInput from "./formTextInput";
import MobilePhone from "./mobilePhone";

type Props = {
  labelText: string;
  defaultText: string;
  name: string;
  placeholder: string;
  type: string;
  setValue?: (str: string) => void;
  disabled?: boolean;
};

function InputDisplay({
  labelText,
  defaultText,
}: {
  labelText: string;
  defaultText: string;
}) {
  return (
    <div className={`relative flex w-full flex-col gap-2 `}>
      <small className="cursor-pointer text-xs text-tertiary-pale-950">
        {labelText}
      </small>
      <div
        tabIndex={0}
        className=" relative flex h-[54px] w-full items-center rounded-md border-none bg-[rgba(222,_242,_251,_0.30)] pl-2 text-sm font-light  text-[#333] outline-none ring-1 ring-[#C8C8C8] placeholder:text-[#AAAAAA] "
      >
        <span>{defaultText}</span>
      </div>
    </div>
  );
}

function DisplayInputWrapper({
  labelText,
  defaultText,
  name,
  placeholder,
  type,
  disabled,
  setValue,
}: Props) {
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!editing) {
      setValue && setValue(defaultText);
    }
  }, [editing]);
  return (
    <div className="relative isolate w-full">
      {editing ? (
        type === "phone" ? (
          <MobilePhone name={name} />
        ) : (
          <FormTextInput
            labelText={labelText}
            placeholder={placeholder}
            name={name}
            type={type}
          />
        )
      ) : (
        <InputDisplay labelText={labelText} defaultText={defaultText} />
      )}

      {/* <button
        onClick={disabled ? () => null : () => setEditing(!editing)}
        type="button"
        className="absolute right-[10px] top-[50%] z-20 h-6 w-6  text-black text-opacity-70 shadow-2xl "
      >
        {!editing ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="12" fill="#F3EDE1" />
            <path
              d="M16.8676 16.3156H7.66758C7.44633 16.3156 7.26758 16.4944 7.26758 16.7156V17.1656C7.26758 17.2206 7.31258 17.2656 7.36758 17.2656H17.1676C17.2226 17.2656 17.2676 17.2206 17.2676 17.1656V16.7156C17.2676 16.4944 17.0888 16.3156 16.8676 16.3156ZM9.08883 15.2656C9.11383 15.2656 9.13883 15.2631 9.16383 15.2594L11.2663 14.8906C11.2913 14.8856 11.3151 14.8744 11.3326 14.8556L16.6313 9.55687C16.6429 9.54531 16.6521 9.53157 16.6584 9.51645C16.6647 9.50133 16.6679 9.48512 16.6679 9.46875C16.6679 9.45238 16.6647 9.43617 16.6584 9.42105C16.6521 9.40593 16.6429 9.39219 16.6313 9.38063L14.5538 7.30188C14.5301 7.27813 14.4988 7.26562 14.4651 7.26562C14.4313 7.26562 14.4001 7.27813 14.3763 7.30188L9.07758 12.6006C9.05883 12.6194 9.04758 12.6419 9.04258 12.6669L8.67383 14.7694C8.66167 14.8363 8.66601 14.9053 8.68649 14.9702C8.70696 15.0351 8.74295 15.094 8.79133 15.1419C8.87383 15.2219 8.97758 15.2656 9.08883 15.2656Z"
              fill="#0A2211"
            />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 1.5C6.20156 1.5 1.5 6.20156 1.5 12C1.5 17.7984 6.20156 22.5 12 22.5C17.7984 22.5 22.5 17.7984 22.5 12C22.5 6.20156 17.7984 1.5 12 1.5ZM15.8766 15.9891L14.3297 15.982L12 13.2047L9.67266 15.9797L8.12344 15.9867C8.02031 15.9867 7.93594 15.9047 7.93594 15.7992C7.93594 15.7547 7.95234 15.7125 7.98047 15.6773L11.0297 12.0445L7.98047 8.41406C7.95215 8.37971 7.93643 8.3367 7.93594 8.29219C7.93594 8.18906 8.02031 8.10469 8.12344 8.10469L9.67266 8.11172L12 10.8891L14.3273 8.11406L15.8742 8.10703C15.9773 8.10703 16.0617 8.18906 16.0617 8.29453C16.0617 8.33906 16.0453 8.38125 16.0172 8.41641L12.9727 12.0469L16.0195 15.6797C16.0477 15.7148 16.0641 15.757 16.0641 15.8016C16.0641 15.9047 15.9797 15.9891 15.8766 15.9891Z"
              fill="#606F5C"
            />
          </svg>
        )}
      </button> */}
    </div>
  );
}

export default DisplayInputWrapper;
