import { getBaseUrl, getClientBaseUrl, network } from "@/lib/common";

/**
 * =============================
 * SIGN UP
 * =============================
 */

// Form Validator schema
export interface SignupFormSchema {
  email: string;
  firstName: string;
  lastName: string;
  pin: string;
  pinConfirmation: string;
  socialAdz?: string;
  business_type?: string;
}

export interface SignUpRes {
  status: string;
  result: {
    _id: string;
    firstName: string;
    lastName: string;
    role: string;
    phoneNumber: string;
    accessToken: string;
    refreshToken: string;
  };
}

// Sign user up
export const signupUser = async (data: SignupFormSchema, url?: string) => {
  const URL = `${getClientBaseUrl()}/auth/${url ?? "signup-user"}`;
  const reqBody = {
    body: JSON.stringify({ ...data }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return network.post<SignUpRes>(URL, reqBody);
};

/**
 * =============================
 *  END OF SIGN UP
 * =============================
 */

/**
 * =============================
 * SIGN IN
 * =============================
 */

// Form Validator schema for signing in
export interface SigninFormSchema {
  username: string;
  pin: string;
}

export interface SignInRes {
  status: string;
  result: {
    _id: string;
    firstName: string;
    lastName: string;
    role: string;
    phoneNumber: string;
    accessToken: string;
    refreshToken: string;
  };
}

export const signUserIn = async (data: SigninFormSchema) => {
  const URL = `${getClientBaseUrl()}/auth/signin`;
  const reqBody = {
    body: JSON.stringify({ ...data }),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return network.post<SignInRes>(URL, reqBody);
};
/**
 * =============================
 * END OF SIGN IN
 * =============================
 */
export const signUserOut = async (data: SigninFormSchema) => {
  const URL = `${getBaseUrl()}/auth/signin`;
  const reqBody = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return network.post<SignInRes>(URL, reqBody);
};
/**
 * =============================
 * PHONE NUMBER OTP VERIFICATION
 * =============================
 */

// sending otp to number
export interface SendOTPSchema {
  otpId: string;
}
export interface SendOTPToEmailSchema {
  email: string;
  route: string;
  firstName?: string;
  lastName?: string;
}
export interface SendOTPRes {
  pinId: string;
  to: string;
  smsStatus?: string;
  emailStatus?: string;
  status: number;
}
export const sendOTP = async (data: SendOTPSchema, purpose?: string) => {
  const URL = `${getClientBaseUrl()}/auth/sendOtpPhone`;
  const reqBody = {
    body: JSON.stringify({ phoneNumber: data.otpId, route: purpose ?? "OTP" }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return network.post<SendOTPRes>(URL, reqBody);
};

export const sendOTPToEmail = async (data: SendOTPToEmailSchema) => {
  const URL = `${getClientBaseUrl()}/auth/sendOtpEmail`;
  const reqBody = {
    body: JSON.stringify({ ...data }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return network.post<SendOTPRes>(URL, reqBody);
};

// verifying otp number for phone number
export interface OTPVerifySchema {
  channel: "phone" | "email";
  pin_id: string;
  pin: string;
}
export interface OTPVerifyRes {
  status: string;
  message: string;
}
export const verifyOTP = async ({ pin, pin_id, channel }: OTPVerifySchema) => {
  const URL = `${getClientBaseUrl()}/auth/verifyOtp`;
  const reqBody = {
    body: JSON.stringify({ pin, pin_id, channel: channel || "phone" }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return network.post<OTPVerifyRes>(URL, reqBody);
};

/**
 * =============================
 * END PHONE NUMBER OTP VERIFICATION
 * =============================
 */

/**
 * =============================
 * RESET PASSWORD OTP
 * =============================
 */

export interface verifyInitResetPasswordOTPSchema {
  pin_id: string;
  pin: string;
  email: string;
}
export interface verifyInitResetPasswordOTPResSchema {
  status: string;
  message: string;
  "x-reset-token": string;
}
export interface changePinSchema {
  pin: string;
  "x-reset-token": string;
}

export const changePin = async (data: changePinSchema) => {
  const URL = `${getClientBaseUrl()}/auth/changePin`;
  const reqHeader = {
    headers: {
      "x-reset-token": data["x-reset-token"],
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pin: data.pin }),
  };
  return network.post<OTPVerifyRes>(URL, reqHeader);
};

export const verifyInitResetPasswordOTP = async (
  data: verifyInitResetPasswordOTPSchema,
) => {
  const URL = `${getClientBaseUrl()}/auth/resetPin`;
  const reqBody = {
    body: JSON.stringify({ ...data }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return network.post<verifyInitResetPasswordOTPResSchema>(URL, reqBody);
};

export const initResetPasswordOTP = async (data: SendOTPSchema) => {
  const URL = `${getClientBaseUrl()}/auth/initResetPasswordOtp`;
  const reqBody = {
    body: JSON.stringify({ phoneNumber: data.otpId }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return network.post<SendOTPRes>(URL, reqBody);
};

/**
 * =============================
 * END OF RESET PASSWORD OTP
 * =============================
 */

export interface SendKycDataSchema {
  facePic: string;
  supportingDocuments: string[];
  identificationMeans: string;
}
export interface SendKycDataSchemaRes {
  status: string;
  message: string;
}

export const submitKycData = async (data: SendKycDataSchema) => {
  const URL = `${getClientBaseUrl()}/vendor/submitKYC`;
  const reqBody = {
    body: JSON.stringify(data),
    header: { "Content-Type": "application/json" },
  };
  return network.patch<SendKycDataSchemaRes>(URL, reqBody);
};

export interface UpdatePinSchema {
  oldPin: string;
  newPin: string;
}

export const updatePin = async (data: UpdatePinSchema) => {
  const URL = `${getClientBaseUrl()}/user/updatePin`;
  const reqBody = {
    body: JSON.stringify({ ...data }),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return network.patch<SendKycDataSchemaRes>(URL, reqBody);
};
