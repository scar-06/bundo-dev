import * as Yup from "yup";

import { getPhoneValidationSchema } from "..";

export const createServiceValidationSchema = Yup.object().shape({
  name: Yup.string().required("Service name is required"),
  description: Yup.string().required("Service description is required"),
  pictures: Yup.mixed(),
  startingPriceRange: Yup.string().required("required"),
  endingPriceRange: Yup.string().required("required"),
  categories: Yup.array()
    .of(Yup.object().required())
    .min(1, "At least one category is required"),
});

export const editServiceValidationSchema = Yup.object().shape({
  name: Yup.string().required("Service name is required"),
  description: Yup.string().required("Service description is required"),
  pictures: Yup.mixed().optional(),
  startingPriceRange: Yup.string().required("required"),
  endingPriceRange: Yup.string().required("required"),
  categories: Yup.array()
    .of(Yup.object().required())
    .min(1, "At least one category is required"),
});
export const createProductValidationSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required"),
  description: Yup.string().required("Product description is required"),
  pictures: Yup.mixed(),
  cost: Yup.string()
    .typeError("Product cost must be a number")
    .required("Product cost is required"),
  weight: Yup.number()
    .typeError("Product weight must be a number")
    .required("Product weight is required"),
  height: Yup.mixed().notRequired(),
  length: Yup.mixed().notRequired(),
  width: Yup.mixed().notRequired(),
  returnable: Yup.boolean().required(
    "Please specify if the product is returnable",
  ),
  quantity: Yup.number()
    .typeError("Product quantity must be a number")
    .required("Product quantity is required"),
  categories: Yup.array()
    .of(Yup.object().required("Category is required"))
    .min(1, "At least one category is required"),
});

export const editProductValidationSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required"),
  description: Yup.string().required("Product description is required"),
  pictures: Yup.mixed().optional(),
  cost: Yup.string().required("Product cost is required"),
  weight: Yup.number()
    .typeError("Product weight must be a number")
    .required("Product weight is required"),
  height: Yup.mixed().notRequired(),
  length: Yup.mixed().notRequired(),
  width: Yup.mixed().notRequired(),
  quantity: Yup.number()
    .typeError("Product quantity must be a number")
    .required("Product quantity is required"),
  categories: Yup.array()
    .of(Yup.object().required())
    .min(1, "At least one category is required"),
});

export const createBankCredentialstValidationSchema = Yup.object().shape({
  bankName: Yup.object()
    .shape({ label: Yup.string().required(), value: Yup.string().required() })
    .required("Bank name is required"),
  accountNumber: Yup.string().required("Account number is required"),
});

export const payToBankAccounttValidationSchema = Yup.object().shape({
  bankName: Yup.object()
    .shape({
      label: Yup.string().required(),
      accountNumber: Yup.string().required(),
      accountName: Yup.string().required(),
    })
    .required("bankName is required"),
  accountNumber: Yup.string().required("Account number is required"),
  amount: Yup.number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value,
    )
    .required("Amount is required")
    .positive("Input a valid amount")
    .integer("Input a valid amount"),
});
