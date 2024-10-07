import React from "react";
import { cva } from "class-variance-authority";
import clsx from "clsx";

import cn from "@/lib/utils";

import { TypographyProps, variantMapping } from "./types";

const colorClasses = {
  white: "text-tertiary-white-100",
  black: "text-black",
  secondary: "text-secondary-300", // default secondary yellow
  primary: "text-primary-500", // default primary green
  "primary-light-100": "text-primary-100",
  "secondary-100": "text-secondary-100",
  "tertiary-deep-green-100": "text-tertiary-deep-green-100",
  "tertiary-deep-green-200": "text-tertiary-deep-green-200",
  "tertiary-deep-green-300": "text-tertiary-deep-green-300",
  "tertiary-deep-green-400": "text-tertiary-deep-green-400",
  "tertiary-deep-green-500": "text-tertiary-deep-green-500",
  "tertiary-deep-green-600": "text-tertiary-deep-green-600",
  "tertiary-deep-green-700": "text-tertiary-deep-green-700",
  "tertiary-deep-green-800": "text-tertiary-deep-green-800",
  "tertiary-deep-green-900": "text-tertiary-deep-green-900",
  "tertiary-deep-green-950": "text-tertiary-deep-green-950",
  "tertiary-blue-50": "text-tertiary-blue-50",
  "tertiary-blue-100": "text-tertiary-blue-100",
  "tertiary-blue-200": "text-tertiary-blue-200",
  "tertiary-blue-300": "text-tertiary-blue-300",
  "tertiary-blue-400": "text-tertiary-blue-400",
  "tertiary-blue-500": "text-tertiary-blue-500",
  "tertiary-blue-600": "text-tertiary-blue-600",
  "tertiary-blue-700": "text-tertiary-blue-700",
  "tertiary-blue-800": "text-tertiary-blue-800",
  "tertiary-blue-900": "text-tertiary-blue-900",
  "tertiary-blue-950": "text-tertiary-blue-950",
  "tertiary-red-50": "text-tertiary-red-50",
  "tertiary-red-100": "text-tertiary-red-100",
  "tertiary-red-200": "text-tertiary-red-200",
  "tertiary-red-300": "text-tertiary-red-300",
  "tertiary-red-400": "text-tertiary-red-400",
  "tertiary-red-500": "text-tertiary-red-500",
  "tertiary-red-600": "text-tertiary-red-600",
  "tertiary-red-700": "text-tertiary-red-700",
  "tertiary-red-800": "text-tertiary-red-800",
  "tertiary-red-900": "text-tertiary-red-900",
  "tertiary-red-950": "text-tertiary-red-950",
  "tertiary-pale-50": "text-tertiary-pale-50",
  "tertiary-pale-100": "text-tertiary-pale-100",
  "tertiary-pale-200": "text-tertiary-pale-200",
  "tertiary-pale-300": "text-tertiary-pale-300",
  "tertiary-pale-400": "text-tertiary-pale-400",
  "tertiary-pale-500": "text-tertiary-pale-500",
  "tertiary-pale-600": "text-tertiary-pale-600",
  "tertiary-pale-700": "text-tertiary-pale-700",
  "tertiary-pale-800": "text-tertiary-pale-800",
  "tertiary-pale-900": "text-tertiary-pale-900",
  "tertiary-pale-950": "text-tertiary-pale-950",
  "tertiary-white-100": "text-tertiary-white-100",
  "tertiary-white-200": "text-tertiary-white-200",
  "tertiary-white-300": "text-tertiary-white-300",
  "tertiary-white-400": "text-tertiary-white-400",
  "tertiary-white-500": "text-tertiary-white-500",
  "tertiary-white-600": "text-tertiary-white-600",
  "tertiary-white-700": "text-tertiary-white-700",
  "tertiary-white-800": "text-tertiary-white-800",
  "tertiary-white-900": "text-tertiary-white-900",
  "tertiary-white-950": "text-tertiary-white-950",
};

const typography = cva("", {
  variants: {
    intent: {
      h1: "text-h-1 mxs:text-mxs-h-1",
      h2: "text-h-2 mxs:text-mxs-h-2",
      h3: "text-h-3 mxs:text-mxs-h-3",
      h4: "text-h-4 mxs:text-mxs-h-4",
      h5: "text-h-5 mxs:text-mxs-h-5",
      h6: "text-h-6 mxs:text-mxs-h-6",
      "body-1": "text-body-1 mxs:text-mxs-body-1",
      "body-2": "text-body-2 mxs:text-mxs-body-2",
      "body-3": "text-body-3 mxs:text-mxs-body-3",
      "body-4": "text-body-4 mxs:text-msx-body-4",
      "body-5": "text-body-5 mxs:text-msx-body-5",
      "body-6": "text-body-6 mxs:text-msx-body-6",
      "body-7": "text-body-7 mxs:text-msx-body-7",
      "body-8": "text-body-8 mxs:text-msx-body-8",
      "body-9": "text-body-9 mxs:text-msx-body-9",
      "body-10": "text-body-10 mxs:text-msx-body-9",
      "body-11": "text-body-11 mxs:text-msx-caption-s",
      "caption-s": "text-caption-s mxs:text-msx-caption-s",
    },
    font: {
      poppins: "poppins",
      tV2SansDisplay: "tV2SansDisplay",
    },
    color: colorClasses,
    fontWeight: {
      thin: "font-thin",
      "extra-light": "font-extra-light",
      light: "font-light",
      regular: "font-regular",
      medium: "font-medium",
      "semi-bold": "font-semi-bold",
      bold: "font-bold",
      "extra-bold": "font-extra-bold",
      black: "font-black",
    },
    underline: { always: "underline", hover: "hover:underline", none: "" },
    align: {
      center: "text-center",
      start: "text-start",
      end: "text-end",
      left: "text-left",
      right: "text-right",
      justify: "text-justify",
    },
  },
  compoundVariants: [],
});

// Typography component
function Typography(props: TypographyProps) {
  const {
    variant = "body-6",
    tag,
    underline = "none",
    fontWeight,
    gutterBottom,
    noWrap,
    align = "left",
    color = "tertiary-white-950",
    customClassName = "",
    font,
    children,
    className,
    ...rest
  } = props;

  // Resolved tag
  const Tag = (tag ||
    variantMapping[variant] ||
    "p") as keyof JSX.IntrinsicElements;

  // Classes
  const classNameI = cn(
    gutterBottom && "mb-4",
    noWrap && "overflow-hidden text-ellipsis whitespace-nowrap",
    className && className,
  );

  return (
    <Tag
      className={typography({
        intent: variant,
        underline,
        fontWeight,
        color,
        align,
        font,
        className: cn(
          customClassName && customClassName,
          classNameI && classNameI,
        ),
      })}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export { Typography };
export * from "./types";
