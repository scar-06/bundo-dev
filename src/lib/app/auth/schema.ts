import { APP_CONFIG } from "@/utils";
import * as Yup from "yup";

const phoneRegex = /^\+(?:[0-9] ?){6,15}[0-9]$/;
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
// Utility function to generate password validation schema
export const getPasswordValidationSchema = () =>
  Yup.string()
    .required("Password is required")
    .test(
      "uppercase",
      "Password must contain at least one uppercase letter",
      (value) => /[A-Z]/.test(value),
    )
    .test("number", "Password must contain at least one number", (value) =>
      /\d/.test(value),
    )
    .test(
      "special",
      "Password must contain at least one special character (@$!%*#?&)",
      (value) => /[@$!%*#?&]/.test(value),
    )
    .min(6, "Password must be at least 8 characters long");

export const getPasswordConfirmationSchema = () =>
  Yup.string()
    .oneOf([Yup.ref("pin"), " "], "Passwords must match")
    .required("Confirm Password is required");

// Common validation schema for name fields
export const getNameValidationSchema = (field: string) =>
  Yup.string().required(`Please enter your ${field} name.`);
const getEmailOrPhoneNumberValidationSchema = () =>
  Yup.string()
    .required(`Please enter your phonenumber or email`)
    .test(
      "email-or-phone-number",
      "Invalid email or phone number",
      function (value) {
        // If the value contains "@" or a-z, validate it as an email address
        if (value.includes("@") || /[a-zA-Z]/.test(value)) {
          return (
            emailRegex.test(value) ||
            this.createError({
              message: "Invalid email format: mariaokon@gmail.com",
            })
          );
        } else {
          // Validate it as a phone number
          const pN = value?.trim();

          const startWithZero = pN?.startsWith("0");
          if (startWithZero && /^(\d\d{10})$/.test(pN as string)) {
            return true;
          } else if (startWithZero && !/^(\d\d{10})$/.test(pN as string)) {
            return this.createError({
              message: "Use a valid phone format: 090 754 193 60",
            });
          } else if (!startWithZero && /^(\d\d{9})$/.test(pN as string)) {
            return true;
          }
          return this.createError({
            message: "Use a valid phone format: 90 754 193 60",
          });
        }
      },
    );

export const getPhoneValidationSchema = () =>
  Yup.string()
    .test("special", "Invalid phone number", function (value) {
      const pN = value?.trim();
      const vS = value?.split("234")[1];
      const startWithZero = vS?.startsWith("0");
      if (startWithZero && /^(\d{3}\d\d{10})$/.test(pN as string)) {
        return true;
      } else if (startWithZero && !/^(\d{3}\d\d{10})$/.test(pN as string)) {
        return this.createError({
          message: "Use a valid phone format: +234 090 754 193 60",
        });
      } else if (!startWithZero && /^(\d{3}\d\d{9})$/.test(pN as string)) {
        return true;
      }
      return this.createError({
        message: "Use a valid phone format: +234 90 754 193 60",
      });
    })
    .required("Phone number is required");

export const getEmailValidationSchema = () =>
  Yup.string().email("Invalid email address");

// Form validation schema for signup
export const signupSchema = Yup.object({
  email: getEmailValidationSchema(),
  firstName: getNameValidationSchema("first"),
  lastName: getNameValidationSchema("last"),
  pin: getPasswordValidationSchema(),
  pinConfirmation: getPasswordConfirmationSchema(),
  socialAdz: Yup.string(),
  agreeToTerms: Yup.boolean().oneOf(
    [true],
    "You must agree to the terms and conditions",
  ),
});

// Form validation schema for signin
export const signinSchema = Yup.object({
  pin: getPasswordValidationSchema(),
  username: getEmailOrPhoneNumberValidationSchema(),
});

// Form validation schema for signin Ends

// Password reset req schema
export const passResetReqSchema = Yup.object().shape({
  email: getEmailValidationSchema(),
});

// Reset password schema
export const resetPasswordSchema = Yup.object().shape({
  pin: getPasswordValidationSchema(),
  pinConfirmation: getPasswordConfirmationSchema(),
});

export const createNewPasswordSchema = Yup.object().shape({
  oldPin: getPasswordValidationSchema(),
  pin: getPasswordValidationSchema(),
  newPin: getPasswordConfirmationSchema(),
});
