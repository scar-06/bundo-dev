import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFormContext } from "react-hook-form";

type Props = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  name: string;
  label: string;
  min: number;
  max: number;
  step: number;
};

function InputRangeComponent({ name, label, min, max, step, ...rest }: Props) {
  const [value, setValue] = useState(min);
  const sliderRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const {
    register,
    setValue: setFormValue,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    setFormValue(name, value);
  }, [value, setFormValue, name]);

  useEffect(() => {
    const slider = sliderRef.current;
    const label = labelRef.current;
    if (slider && label) {
      const percent = ((value - min) / (max - min)) * 100;
      const thumbWidth = 20; // Adjust based on your thumb size
      const positionOffset = (thumbWidth * percent) / 50;

      label.style.left = `calc(${percent}% - ${positionOffset}px)`;
    }
  }, [value, min, max]);

  const errorMessage = errors[name]?.message;

  return (
    <div className="relative flex flex-col items-start gap-3">
      <style>
        {`
          input[type='range']::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            background: #56B670;
            cursor: pointer;
            border-radius: 50%;
            border: 3px solid #FDE74C;
          
          }

          input[type='range']::-moz-range-thumb {
            width: 20px;
            height: 20px;
            background:#56B670;
            cursor: pointer;
            border-radius: 50%;
            border: 3px solid #FDE74C;
          }
        `}
      </style>
      <label
        htmlFor={name}
        className="cursor-pointer text-start text-xs text-tertiary-pale-950"
      >
        {label}
      </label>
      <div className="relative w-full">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          defaultValue={1}
          {...register(name)}
          ref={sliderRef}
          onChange={(e) => setValue(Number(e.target.value))}
          className="h-[3px] w-full cursor-pointer appearance-none  rounded-lg bg-[#D6EEDD] accent-green-600"
          {...rest}
        />
        <div
          ref={labelRef}
          className="absolute flex items-center justify-center whitespace-nowrap text-xs"
          style={{ top: "30px" }}
        >
          {value} days
        </div>
      </div>
      {errorMessage && typeof errorMessage === "string" && (
        <span className="text-xs text-red-500">{errorMessage}</span>
      )}
    </div>
  );
}

export default InputRangeComponent;
