import * as Yup from "yup";

export const createStoreValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  address: Yup.string().required("Address is required"),
  state: Yup.string().required("State is required"),
  pickupLocationCode: Yup.string().required(
    "Local Government Area is required",
  ),
  daysUntilPickup: Yup.string().required("days to ready an order is required"),
  lat: Yup.string().optional(),
  long: Yup.string().optional(),
  longLat: Yup.string().optional(),
  phone_calls: Yup.string().required("Phone number for calls is required"),
  phone_whatsapp: Yup.string().optional(),
  additionalPhone: Yup.string().optional(),
  phone_whatsappBusiness: Yup.string().optional(),
  twitterLink: Yup.string().optional(),
  facebookLink: Yup.string().optional(),
  instaLink: Yup.string().optional(),
  categories: Yup.array()
    .of(Yup.object().required())
    .min(1, "At least one category is required"),
  cacDoc: Yup.mixed().nullable(),
});

export const updateStoreValidationSchema = Yup.object().shape({
  business_profile_picture: Yup.string().optional(),
  description: Yup.string().required("Description is required"),
  address: Yup.string().required("Address is required"),
  lat: Yup.string().optional(),
  long: Yup.string().optional(),
  longLat: Yup.string().optional(),
  phone_calls: Yup.string().optional(),
  phone_whatsapp: Yup.string().optional(),
  additionalPhone: Yup.string().optional(),
  phone_whatsappBusiness: Yup.string().optional(),
  twitterLink: Yup.string().optional(),
  facebookLink: Yup.string().optional(),
  instaLink: Yup.string().optional(),
  categories: Yup.array()
    .of(
      Yup.object()
        .shape({
          label: Yup.string().required(),
          value: Yup.string().required(),
        })
        .required(),
    )
    .min(1, "At least one category is required"),
  cacDoc: Yup.mixed().nullable(),
});

export type UpdateStoreValidationSchemaData = Yup.InferType<
  typeof updateStoreValidationSchema
>;
