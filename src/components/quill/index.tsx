import dynamic from "next/dynamic";

import "react-quill/dist/quill.snow.css";

import { ReactQuillProps } from "react-quill";

const QuillNoSSRWrapper = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    return function QuillWrapper({ ...props }: ReactQuillProps) {
      return <RQ {...props} />;
    };
  },
  {
    ssr: false,
  },
);

interface QuillComponentProps extends Omit<ReactQuillProps, "onChange"> {
  theme?: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  error?: boolean;
  errorText?: string;
  onChange?: (value: string) => void;
  setValue?: (value: string) => void;
  value?: string;
  id?: string;
}

function QuillComponent({
  theme = "snow",
  className = "",
  disabled = false,
  placeholder = "",
  error = false,
  errorText = "",
  onChange = () => {},
  setValue = () => {},
  value,
  id,
  ...restProps
}: QuillComponentProps) {
  return (
    <>
      <QuillNoSSRWrapper
        theme={theme}
        placeholder="Enter the description"
        value={value}
        onChange={onChange}
        {...restProps}
      />

      {errorText && <div className="text-red-400">{errorText as string}</div>}
    </>
  );
}

export default QuillComponent;
