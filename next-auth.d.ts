// next-auth.d.ts
import { SignInRes } from "@/lib/app";

interface VendorId {
  _id: string;
  userId: string;
  business: string;
  supportingDocument: string;
  idAccepted: boolean;
  business_type: "products" | "services";
  socialAdz: string;
  status: "PENDING" | "NONE" | "VERIFIED" | "HOLD";
  customers: string[];
  createdAt: string;
  updatedAt: string;
  phoneNumber: string;
  __v: 0;
  facePic: string;
  identificationMeans: "nin" | "passport" | "voter's card" | "driver's license";
}
export interface UserInfoProps extends SignInRes {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "customer" | "vendor";
  phoneNumber: string;
  categories: Array;
  vendors: string[];
  likedProducts: Array;
  accessToken: string;
  refreshToken: string;
  vendorId: null | VendorId;
  status: string;
  lastLogOutTime: string;
}

declare module "next-auth" {
  type User = UserInfoProps;

  interface Session {
    user: UserInfoProps;
  }
}

declare module "next-auth/jwt" {
  type JWT = UserInfoProps;
}
