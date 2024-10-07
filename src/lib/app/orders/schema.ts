import * as yup from "yup";

export const deliverySchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phoneNumber: yup.string().required("Primary phone number is required"),
  addtitionalPhoneNumber: yup.string().nullable(),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  address: yup.string().required("Address is required"),
  note: yup.string().nullable(),
});

export const updateDeliverySchema = yup.object().shape({
  firstName: yup.string().optional(),
  lastName: yup.string().optional(),
  phoneNumber: yup.string().optional(),
  addtitionalPhoneNumber: yup.string().nullable(),
  dropOffLocationCode: yup.string().optional(),
  email: yup.string().optional(),
  state: yup.string().optional(),
  address: yup.string().optional(),
  landmark: yup.string().optional(),
  note: yup.string().nullable(),
});

export const createClaimSchema = yup.object().shape({
  additionalInfo: yup.string().required("description is required"),
  quantity: yup.string().required("Quantity is required"),
  reasonForReturn: yup.mixed().required("reason for return is required"),
  pictures: yup.mixed<File[]>().required("Attachment is required"),
});
