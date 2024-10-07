import React from "react";
import { StaticImageData } from "next/image";
import * as yup from "yup";

export type SelectItemsType = {
  heading: string | null;
  items: {
    key: string;
    value: string;
  }[];
}[];

export type GridItemType = {
  id: number;
  header: string;
  paragraph: string;
};

export type FaqItemType = {
  id: number;
  header: string;
  paragraph: string | React.ReactElement;
};

export type ITypeSubscriptionCard = {
  plan: string;
  badge: string;
  price: number;
  planOffers: string[];
};

export type ITypeOnboardingSliderItem = {
  src: string | StaticImageData;
  heading: string;
  subheading: string;
};

export type ITypeAuthSchema = {
  authLoginSchema: yup.ObjectSchema<
    {
      username: string;
      password: string;
    },
    yup.AnyObject,
    {
      username: undefined;
      password: undefined;
    },
    ""
  >;
  authSignUpSchema: yup.ObjectSchema<
    {
      firstName: string | undefined;
      lastName: string | undefined;
      pin: string;
      confirmPin: string;
      email: string;
      socialAdz: string | undefined;
    },
    yup.AnyObject,
    {
      firstName: undefined;
      lastName: undefined;
      pin: undefined;
      confirmPin: undefined;
      email: undefined;
      socialAdz: undefined;
    },
    ""
  >;
};

export interface DeviceInfo {
  deviceId: string;
  kind: string;
  label: string;
  facingMode?: "user" | "environment"; // 'user' for front camera, 'environment' for back camera
}
