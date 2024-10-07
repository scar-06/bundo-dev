import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { UserOmittedProps } from "@/store/user.store";
import { queryParamsHelper } from "@/utils/helpers";

import { getClientBaseUrl, network, ResProps } from "@/lib/common";

import { UserInfoProps } from "../../../../next-auth";

export interface MetaData {
  total: number;
  pages: number;
  limit: number;
  currPage: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}
export interface GetBusinesses {
  _id: string;
  name: string;
  type: string;
  businessId: string;
  vendorId: string;
  productType: string;
  description: string;
  address: string;
  phone_calls: string;
  phone_whatsapp: string;
  link: string;
  products_services: any[];
  location: {
    coordinates: number[];
  };
  dist: {
    calculated: string;
  };
  minutes_away: string;
  total_ratings: number;
  total_reviews: number;
  average_rating: number;
  categories: string[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
  createdAt: string;
  updatedAt: string;
  cacDoc: string;
  business_type: string;
  business_profile_picture: string | StaticImport;
  __v: number;
}

export interface IGetAllAds {
  _id: string;
  vendorId: string;
  productId: string;
  businessId: string;
  businessName: string;

  businessPicture?: string;
  categories: string[];
  name: string;
  description: string;
  pictures: string[];
  duration: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
}

export interface GetAllProducts {
  status: string;
  products: {
    businesses: GetBusinesses[];
    hasNextPage: true;
    hasPrevPage: false;
    limit: number;
    page: number;
    totalDocs: number;
    totalPages: number;
  };
}

export interface GetFavouriteProducts {
  status: string;
  user: {
    vendors: GetBusinesses[];
    metaData: MetaData;
  };
}

export interface GetAllAds {
  status: string;
  allAds: {
    allAds: IGetAllAds[];
  };
  metaData: {
    total: number;
    pages: number;
    limit: number;
    currPage: number;
    hasPrevPage: number;
    hasNextPage: number;
  };
}

export interface GetAllOrders {
  _id: string;
  businessName: string;
  productId: string;
  userId: string;
  orderId: string;
  cost: string;
  quantity: string;
  trackingId: string;
  createdAt: string;
  status: string;
  trackingUrl?: string;
  productName?: string;
  productPicture?: string;
  customerName?: string;
}

export interface GetAllOrdersByVendors {
  _id: string;
  businessName: string;
  productId: string;
  userId: string;
  orderId: string;
  cost: string;
  quantity: string;
  trackingId: string;
  createdAt: string;
  status: string;
  orderItem: string;
  image: string;
  productPicture?: string;
  productName?: string;
}

export interface IGetPurchases {
  status: string;
  messages: string;
  data: {
    allOrders: GetAllOrders[];
  };
}

export interface IGetOrders {
  status: string;
  messages: string;
  data: {
    allOrders: GetAllOrdersByVendors[];
  };
}

export interface IGetOrderDetails {
  status: string;
  messages: string;
  data: {
    deliveryDetails: {
      firstName: string;
      lastName: string;
      phoneNumber: string;
      additionalPhoneNumber: string;
      email: string;
      state: string;
      LGA: string;
      dropOffLocationCode: string;
      address: string;
      landmark: string;
      zipCode: string;
      note: string;
    };
    _id: string;
    userId: string;
    orderId: string;
    paymentStatus: string;
    orders: string[];
    batchId: string;
    trackingUrl: string;
    sendstackRes: string;
    estimatedDropoffWindowEnd: string;
    estimatedDropoffWindowStart: string;
    estimatedPickupWindowEnd: string;
    estimatedPickupWindowStart: string;
    trackingId: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface GetLoggedUserRes {
  status: string;
  user: Omit<UserInfoProps, UserOmittedProps>;
}
export interface UpdateUserInfoSchema
  extends Partial<Omit<UserInfoProps, UserOmittedProps>> {}
interface UpdateUserInfoSchemaRes {
  status: string;
  message: string;
}

export interface IQueryKey {
  [key: string]: string | number | any;
}

export const getLoggedUser = async (): Promise<GetLoggedUserRes> => {
  const URL = `${getClientBaseUrl()}/user/getUser`;
  return network.get<GetLoggedUserRes>(URL);
};

export const updateUserInfo = async (
  data: UpdateUserInfoSchema,
): Promise<ResProps<UpdateUserInfoSchemaRes>> => {
  const URL = `${getClientBaseUrl()}/user/updateUser`;
  const reqBody = {
    body: JSON.stringify({ ...data }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return network.patch<UpdateUserInfoSchemaRes>(URL, reqBody);
};

export const updateFollowVendors = async (
  data: any,
): Promise<ResProps<UpdateUserInfoSchema>> => {
  const URL = `${getClientBaseUrl()}/user/followVendor`;
  const reqBody = {
    body: JSON.stringify({ ...data }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return network.patch<UpdateUserInfoSchema>(URL, reqBody);
};
export const updateUnFollowVendors = async (
  data: any,
): Promise<ResProps<UpdateUserInfoSchema>> => {
  const URL = `${getClientBaseUrl()}/user/unfollowVendor`;
  const reqBody = {
    body: JSON.stringify({ ...data }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return network.patch<UpdateUserInfoSchema>(URL, reqBody);
};

export const getAllProducts = async ({
  queryKey,
}: IQueryKey): Promise<GetAllProducts> => {
  const queryParams = queryParamsHelper(queryKey?.[1]);
  const URL = `${getClientBaseUrl()}/user/searchVendorByCategories${queryParams}`;
  return network.get<GetAllProducts>(URL);
};

export const getFollowedVendors = async ({
  queryKey,
}: IQueryKey): Promise<GetFavouriteProducts> => {
  const queryParams = queryParamsHelper(queryKey?.[1]);
  const URL = `${getClientBaseUrl()}/user/listFollowedVendors${queryParams}`;
  return network.get<GetFavouriteProducts>(URL);
};

export const getOrdersForVendors = async ({
  queryKey,
}: IQueryKey): Promise<IGetPurchases> => {
  const queryParams = queryParamsHelper(queryKey?.[1]);
  const URL = `${getClientBaseUrl()}/orders/getOrdersVendor${queryParams}`;
  return network.get<IGetPurchases>(URL);
};

export const getUserOrders = async ({
  queryKey,
}: IQueryKey): Promise<IGetOrders> => {
  const queryParams = queryParamsHelper(queryKey?.[1]);
  const URL = `${getClientBaseUrl()}/orders/getOrders${queryParams}`;
  return network.get<IGetOrders>(URL);
};

export const getUserOrderDetails = async ({
  queryKey,
}: IQueryKey): Promise<IGetOrderDetails> => {
  const [, { trackingId }] = queryKey;
  const URL = `${getClientBaseUrl()}/orders/getOrderDetails/${trackingId}`;
  return network.get<IGetOrderDetails>(URL);
};

export const getListAllAds = async ({
  queryKey,
}: IQueryKey): Promise<GetAllAds> => {
  const queryParams = queryParamsHelper(queryKey?.[1]);
  const URL = `${getClientBaseUrl()}/vendor/ads${queryParams}`;
  return network.get<GetAllAds>(URL);
};

export interface Transaction {
  userId: string;
  customerEmail: string;
  status: string;
  type: string;
  reference: string;
  amount: string;
  createdAt: string;
  updatedAt: string;
}

export interface Data {
  transactions: Transaction[];
  metaData: MetaData;
}
export interface IGetPayment {
  status: string;
  message: string;
  data: Data;
}

export interface IVerifyPayment {
  status: string;
  message: string;
}

export const getPayments = async ({
  queryKey,
}: IQueryKey): Promise<IGetPayment> => {
  const queryParams = queryParamsHelper(queryKey?.[1]);
  const URL = `${getClientBaseUrl()}/payment/listTransactions${queryParams}`;
  return network.get<IGetPayment>(URL);
};

export const verifyPayments = async ({
  queryKey,
}: IQueryKey): Promise<IVerifyPayment> => {
  const queryParams = queryParamsHelper(queryKey?.[1]);
  const URL = `${getClientBaseUrl()}/payment/verifyPayment${queryParams}`;
  return network.get<IVerifyPayment>(URL);
};
