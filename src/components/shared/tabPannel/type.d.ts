import { OptionType } from "@/types/baseInterface";

export type Itabs = {
  icon?: React.ReactNode;
  isIcon?: boolean;
  readonly?: boolean;
  borderColor?: string;
  width?: string;
  options: OptionType[];
  activeTab?: number | string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (x: number | string) => void;
  className?: any;
};
