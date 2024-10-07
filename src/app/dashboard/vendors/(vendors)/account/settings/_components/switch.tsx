import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface props {
  handleToggle: () => void;
  name: string;
}

function Switch({ handleToggle, name }: props) {
  const { formState, register, watch } = useFormContext();
  const { errors } = formState;

  const value = watch()[name];
  return (
    <div
      id={name}
      {...register(name)}
      className={`${
        value ? " bg-[#34A853]" : "bg-gray-300"
      } relative inline-flex h-6 w-12 cursor-pointer items-center rounded-full transition-colors duration-300 ease-in-out`}
      onClick={handleToggle}
    >
      <span
        className={`${
          value ? "translate-x-6" : "translate-x-1"
        } inline-block h-5 w-[21px] transform rounded-full bg-white transition-transform duration-300 ease-in-out`}
      />
    </div>
  );
}

function SwitchContainer({
  name,
  handleToggle,
  // isOn,
}: {
  name: string;
  handleToggle: () => void;
  // isOn: boolean;
}) {
  return (
    <div className="flex w-full items-center">
      <Switch handleToggle={handleToggle} name={name} />
    </div>
  );
}

export default SwitchContainer;
