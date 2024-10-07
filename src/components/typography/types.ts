export const variantMapping = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  "body-1": "p",
  "body-2": "p",
  "body-3": "p",
  "body-4": "p",
  "body-5": "p",
  "body-6": "p",
  "body-7": "p",
  "body-9": "p",
  "body-10": "p",
  "body-11": "p",
  "caption-s": "p",
};

export type TypographyVariant = keyof typeof variantMapping;

export type TypographyColors =
  | "white"
  | "primary"
  | "primary-light-100"
  | "secondary"
  | "secondary-100"
  | "black"
  | "tertiary-deep-green-100"
  | "tertiary-deep-green-200"
  | "tertiary-deep-green-300"
  | "tertiary-deep-green-400"
  | "tertiary-deep-green-500"
  | "tertiary-deep-green-600"
  | "tertiary-deep-green-700"
  | "tertiary-deep-green-800"
  | "tertiary-deep-green-900"
  | "tertiary-deep-green-950"
  | "tertiary-blue-50"
  | "tertiary-blue-100"
  | "tertiary-blue-200"
  | "tertiary-blue-300"
  | "tertiary-blue-400"
  | "tertiary-blue-500"
  | "tertiary-blue-600"
  | "tertiary-blue-700"
  | "tertiary-blue-800"
  | "tertiary-blue-900"
  | "tertiary-blue-950"
  | "tertiary-red-50"
  | "tertiary-red-100"
  | "tertiary-red-200"
  | "tertiary-red-300"
  | "tertiary-red-400"
  | "tertiary-red-500"
  | "tertiary-red-600"
  | "tertiary-red-700"
  | "tertiary-red-800"
  | "tertiary-red-900"
  | "tertiary-red-950"
  | "tertiary-pale-50"
  | "tertiary-pale-100"
  | "tertiary-pale-200"
  | "tertiary-pale-300"
  | "tertiary-pale-400"
  | "tertiary-pale-500"
  | "tertiary-pale-600"
  | "tertiary-pale-700"
  | "tertiary-pale-800"
  | "tertiary-pale-900"
  | "tertiary-pale-950"
  | "tertiary-white-100"
  | "tertiary-white-200"
  | "tertiary-white-300"
  | "tertiary-white-400"
  | "tertiary-white-500"
  | "tertiary-white-600"
  | "tertiary-white-700"
  | "tertiary-white-800"
  | "tertiary-white-900"
  | "tertiary-white-950";

export type TypographyAlign =
  | "start"
  | "end"
  | "left"
  | "right"
  | "center"
  | "justify";

export type TypographyFontWeight =
  | "thin"
  | "extra-light"
  | "light"
  | "regular"
  | "medium"
  | "semi-bold"
  | "bold"
  | "extra-bold"
  | "black";

export type TypographyFont = "poppins";

export interface TypographyProps
  extends React.HTMLAttributes<HTMLOrSVGElement> {
  tag?: keyof JSX.IntrinsicElements;
  variant?: TypographyVariant;
  color?: TypographyColors;
  fontWeight?: TypographyFontWeight;
  gutterBottom?: boolean;
  align?: TypographyAlign;
  noWrap?: boolean;
  underline?: "none" | "always" | "hover";
  customClassName?: string;
  children?: React.ReactNode;
  font?: TypographyFont;
}
