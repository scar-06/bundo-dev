import React from "react";
import { useFormContext } from "react-hook-form";

import cn from "@/lib/utils";
import FormTextInput from "@/components/forms/formTextInput";

type Props = {
  name: string;
  placeholder: string;
  Icon: any;
  disabled?: boolean;
};

function ContactMeInput({ name, placeholder, Icon, disabled }: Props) {
  const { watch } = useFormContext();
  const hasLength = watch(name)?.length > 0;
  return (
    <div className="relative">
      <span
        className={cn(
          "absolute top-1/2 flex h-[30px] w-[30px] -translate-y-1/2 items-center  justify-center transition-all duration-300 ease-in-out",
          hasLength ? "left-3" : "left-[-100px]",
        )}
      >
        <Icon className="scale-[1.5]" />
      </span>

      <FormTextInput
        type="text"
        showInputRequirements={false}
        name={name}
        labelText=""
        placeholder={placeholder}
        customStyle={hasLength ? { paddingLeft: "50px" } : {}}
        disabled={disabled}
      />
    </div>
  );
}

export default ContactMeInput;
