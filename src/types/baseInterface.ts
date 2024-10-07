export type IChildren = {
  children: React.ReactNode;
};

export type EmptyObject = {
  [K in string | number | symbol]: never;
};

/**
 * contains the @param {value} for the value
 * @params {label} for the display or preview
 */
export type OptionType = {
  icon?: React.ReactNode;
  label: string;
  value: string;
  content?: JSX.Element;
  disabled?: boolean;
  onClick?: () => void;
  showChangeIndicator?: boolean;
  changeIndicatorType?: "error" | "info" | "normal";
  data?: any;
};
