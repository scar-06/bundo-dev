import * as Yup from "yup";

import {
  getEmailValidationSchema,
  getNameValidationSchema,
  getPhoneValidationSchema,
} from "..";

export const accountInformationSchema = Yup.object({
  firstName: getNameValidationSchema("first"),
  lastName: getNameValidationSchema("last"),
  userName: getEmailValidationSchema(),
  phoneNumber: getPhoneValidationSchema(),
}).required();
