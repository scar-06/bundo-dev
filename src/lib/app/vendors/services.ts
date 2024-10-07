import { queryParamsHelper } from "@/utils/helpers";

import { getClientBaseUrl, network, ResProps } from "@/lib/common";

import { IQueryKey } from "../user/services";

export interface IReview {
  userId: string;
  fullName: string;
  review: string;
  rating: number;
}
export interface ContactMeans {
  phone_calls: string;
  phone_whatsapp?: string;
  additionalPhone?: string;
  phone_whatsappBusiness?: string;
  twitterLink?: string;
}
export interface Service {
  _id: string;
  name: string;
  businessId: string;
  vendorId: string;
  productType: string;
  description?: string;
  cost: string;
  pictures: string[];
  categories: string[];
  contact_means: ContactMeans;
  negotiable: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface Product {
  _id: string;
  name: string;
  businessId: string;
  vendorId: string;
  productType: string;
  description: string;
  weight?: number;
  height?: number;
  width?: number;
  length?: number;
  cost: string;
  startingPriceRange?: number;
  endingPriceRange?: number;
  pictures: string[];
  categories: string[];
  quantity: number;
  contact_means: ContactMeans;
  negotiable: boolean;
  returnable: boolean;
  createdAt: string;
  updatedAt: string;
  product_quantity?: number;
  __v: number;
}
export interface Actionables {
  noOfTiles: number | null;
  imageUpload: boolean;
  videoUpload: boolean;
  logisticsIntegration: string;
  createAds: boolean;
  trackOrders: boolean;
}
export interface IPlanInfo {
  _id: string;
  planCode: string;
  email: string;
  planName: string;
  subName: string;
  features: string;
  actionables: Actionables;
  emailToken: string;
  expires: string;
  isActive: boolean;
  state: string;
  subscriptionCode: string;
}
export interface Business {
  _id: string;
  vendorId: string;
  name: string;
  business_profile_picture: string;
  type: string;
  categories: string[];
  description: string;
  address: string;
  contact: ContactMeans;
  location: {
    coordinates: number[];
    type: string;
  };
  state: string;
  pickupLocationCode: string;
  daysUntilPickup: number;
  link: string;
  noOfLikes: number;
  cacDoc?: string;
  plan: IPlanInfo;
  products_services?: Service[] | Product[];
  total_ratings?: number;
  total_reviews?: number;
  average_rating?: number;
  reviews?: IReview[];
  business_type?: string;
  visibility: boolean;
  products: any[]; // Todo: Replace `any` with a more specific type if products have a defined structure
  categoryId: number;
  addressCode: number;
}
export interface CreateStoreSchema {
  name: string; // The name of the store.
  description: string; // Description of the store.
  address: string; // Address of the store.
  lat?: string; // Latitude coordinate of the store location.
  long?: string; // Longitude coordinate of the store location.
  state: string; // State of the store
  daysUntilPickup: string; // Day of the
  pickupLocationCode: string; // Day
  phone_calls: string; // Phone number for calls.
  phone_whatsapp?: string; // Phone number for WhatsApp.
  additionalPhone?: string; // Additional phone number.
  phone_whatsappBusiness?: string; // WhatsApp business phone number.
  twitterLink?: string; // Twitter profile link.
  facebookLink?: string; // Facebook profile link.
  instaLink?: string; // Instagram profile link.

  categories: string[]; // Categories associated with the store.
  cacDoc?: string; // CAC document for the store.
}

export interface UpdateStoreSchema {
  name?: string; // The name of the store.
  description?: string; // Description of the store.
  address?: string; // Address of the store.
  lat?: string; // Latitude coordinate of the store location.
  long?: string; // Longitude coordinate of the store location.
  daysUntilPickup?: string; // Day of the
  business_profile_picture?: string;
  phone_calls?: string; // Phone number for calls.
  phone_whatsapp?: string; // Phone number for WhatsApp.
  additionalPhone?: string; // Additional phone number.
  phone_whatsappBusiness?: string; // WhatsApp business phone number.
  twitterLink?: string; // Twitter profile link.
  facebookLink?: string; // Facebook profile link.
  instaLink?: string; // Instagram profile link.

  categories?: string[]; // Categories associated with the store.
  cacDoc?: string; // CAC document for the store.
}
export interface GetBusinessRes {
  status: string;
  business: Omit<Business, "products">;
}
export interface GetBusinessByIdRes {
  status: string;
  business: Business;
}

export interface GetSearchProductRes {
  status: string;
  products: Business;
}

export interface IUpdatWithdrawaleAccount {
  accountName: string;
  bankCode: string;
  bankName: string;
  accountNumber: string;
}

export interface ICreateWithdrawalSchema {
  amount: number;
  accountNumber: string;
  idKey: string;
}

// export interface ICreateWithdrawal {
//   accountName: string;
//   bankName: string;
//   accountNumber: string;
// }

export interface IGetListSupportedBanks {
  status: string;
  message: string;
  data: { bankName: string; bankCode: string; isActive: boolean }[];
}

export interface IVerifyBankAccount {
  status: string;
  message: string;
  data: {
    account_number: string;
    account_name: string;
    bank_id: number;
  };
}

export interface IWalletHistory {
  status: string;
  message: string;
  data: {
    histories: {
      transactionId: string;
      transactionCode: string;
      amount: string;
      remark: string;
      recipient: string;
      transactionType: string;
      createdAt: string;
      status: "successful" | "blocked" | "pending" | "failed";
    }[];
  };
}

export interface ISubscriptionPlan {
  planId?: string;
  planCode?: string;
  interval?: string;
  currency?: string;
  invoiceLimit?: string;
  createdAt?: string;
  name: string;
  integration?: number;
  discount?: number;
  sendInvoices?: boolean;
  features: string[];
  sendSms?: boolean;
  hostedPage?: boolean;
  updatedAt?: string;
  amount: number;
  SK?: string;
  PK?: string;
  id?: string;
  migrate?: boolean;
  domain?: string;
  subName: string;
}

export interface IMonthlyPlanArray {
  name: any;
  amount: number;
  features: string[];
  subName: string;
}

export interface IGetListSubscriptionPlan {
  status: string;
  message: string;
  plans: {
    freePlan: ISubscriptionPlan | undefined;
    monthlyPlans: ISubscriptionPlan[];
    quarterlyPlans: ISubscriptionPlan[];
    annualPlans: ISubscriptionPlan[];
  };
}

export interface UpdateStoreSchemaRes {
  status: string;
  message: string;
}

export interface Data {
  authorization_url: string;
  access_code: string;
  reference: string;
}

export interface createSubscriptionSchemaRes {
  status: string;
  message: string;
  authorization_url: string;
  access_code: string;
  reference: string;
}

export interface disableSubscriptionSchemaRes {
  status: string;
  message: string;
}

export interface ICreateSubscriptionSchema {
  planName: string;
  callbackUrl: string;
}

export interface ICreatVisibilitySchema {
  visibility: boolean;
}

export interface createVisibilitychemaRes {
  status: string;
  message: string;
}

export interface IDisableSubscriptionSchema {
  subscriptionCode: string;
  emailToken: string;
}

export interface UpdateWithdrawalAccountRes {
  status: string;
  message: string;
}
export interface CreateStoreSchemaRes {
  status: string;
  business: {
    vendorId: string;
    name: string;
    categories: string[];
    description: string;
    address: string;
    contact: object;
    products_services: any[];
    cacDoc: string;
    location: object;
    total_ratings: number;
    total_reviews: number;
    reviews: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export interface ProductsResponse {
  status: string;
  products: Product[];
}

interface GetInfoSchemaRes {
  status: string;
  message: string;
}

interface GetWalletSchemaRes {
  status: string;
  message: string;
  data: {
    analytics: {
      maoneyIn: any[];
      moneyOut: { _id: string | null; total: number }[];
    };
    wallet: {
      _id: string;
      book_bal: number;
      createdAt: string;
      history: any[];
      main_bal: number;
      updatedAt: string;
      vendorId: string;
      withdrawalDetails: any[];
    };
  };
}

interface GetWithdrawalAccountSchemaRes {
  status: string;
  message: string;
  data: {
    accountName: string;
    accountNumber: string;
    bankName: string;
  }[];
}

export interface DeleteWithdrawalAccountSchema {
  _id: string;
}

export interface DeleteWithdrawalAccountSchemaRes {
  status: string;
  message: string;
}

export interface UpdateVendorSchema {
  phoneNumber?: string;
  supportingDocument?: string;
  identificationMeans?: string;
}

export interface UpdateVendorSchemaRes {
  message: string;
  status: string;
}

export const createStore = async (
  data: Partial<CreateStoreSchema>,
): Promise<ResProps<CreateStoreSchemaRes>> => {
  const URL = `${getClientBaseUrl()}/vendor/createStore`;
  const reqBody = {
    body: JSON.stringify({ ...data }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return network.post<CreateStoreSchemaRes>(URL, reqBody);
};

export const getWallet = async ({
  queryKey,
}: IQueryKey): Promise<GetWalletSchemaRes> => {
  const queryParams = queryParamsHelper(queryKey?.[1]);
  const URL = `${getClientBaseUrl()}/wallet/getWallet${queryParams}`;
  return network.get<GetWalletSchemaRes>(URL);
};

export const getWithdrawalAccounts =
  async (): Promise<GetWithdrawalAccountSchemaRes> => {
    const URL = `${getClientBaseUrl()}/wallet/listWithdrawalAccounts`;
    return network.get<GetWithdrawalAccountSchemaRes>(URL);
  };

export const updateStore = async (
  data: UpdateStoreSchema,
): Promise<ResProps<UpdateStoreSchemaRes>> => {
  const URL = `${getClientBaseUrl()}/vendor/updateBusiness`;
  const reqBody = {
    body: JSON.stringify({ ...data }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return network.patch<UpdateStoreSchemaRes>(URL, reqBody);
};

export const updateVendor = async (
  data: UpdateVendorSchema,
): Promise<ResProps<UpdateVendorSchemaRes>> => {
  const URL = `${getClientBaseUrl()}/vendor/updateVendor`;
  const reqBody = {
    body: JSON.stringify({ ...data }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return network.patch<UpdateVendorSchemaRes>(URL, reqBody);
};
export const createSubscription = async (
  data: ICreateSubscriptionSchema,
): Promise<ResProps<createSubscriptionSchemaRes>> => {
  const URL = `${getClientBaseUrl()}/subscription/subscribe`;
  const reqBody = {
    body: JSON.stringify({ ...data }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return network.post<createSubscriptionSchemaRes>(URL, reqBody);
};

export const disableSubscription = async (
  data: IDisableSubscriptionSchema,
): Promise<ResProps<disableSubscriptionSchemaRes>> => {
  const URL = `${getClientBaseUrl()}/subscription/disable`;
  const reqBody = {
    body: JSON.stringify({ ...data }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return network.post<disableSubscriptionSchemaRes>(URL, reqBody);
};

export const getBusiness = async (): Promise<GetBusinessRes> => {
  const URL = `${getClientBaseUrl()}/vendor/getBusiness`;
  return network.get<GetBusinessRes>(URL);
};
export const getAllVendorProducts = async (): Promise<ProductsResponse> => {
  const URL = `${getClientBaseUrl()}/vendor/getAllProducts`;
  return network.get<ProductsResponse>(URL);
};

export const getListSupportedBanks =
  async (): Promise<IGetListSupportedBanks> => {
    const URL = `${getClientBaseUrl()}/payment/listSupportedBanks`;
    return network.get<IGetListSupportedBanks>(URL);
  };

export const verifyBankAccount = async ({
  queryKey,
}: IQueryKey): Promise<IVerifyBankAccount> => {
  const queryParams = queryParamsHelper(queryKey?.[1]);
  const URL = `${getClientBaseUrl()}/payment/verifyBankAccount${queryParams}`;
  return network.get<IVerifyBankAccount>(URL);
};

export const addBankAccount = async (
  data: IUpdatWithdrawaleAccount,
): Promise<ResProps<UpdateWithdrawalAccountRes>> => {
  const URL = `${getClientBaseUrl()}/wallet/addWithdrawalAccount`;
  const reqBody = {
    body: JSON.stringify({ ...data }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return network.patch<UpdateWithdrawalAccountRes>(URL, reqBody);
};
export const getBusinessById = async (
  id: string,
): Promise<GetBusinessByIdRes> => {
  const URL = `${getClientBaseUrl()}/user/getBusiness/${id}`;
  return network.get<GetBusinessByIdRes>(URL);
};

export const getSearchProduct = async ({
  queryKey,
}: IQueryKey): Promise<GetSearchProductRes> => {
  const queryParams = queryParamsHelper(queryKey?.[1]);
  const URL = `${getClientBaseUrl()}/vendor/searchProducts${queryParams}`;
  return network.get<GetSearchProductRes>(URL);
};

export const createWithdrawal = async (
  data: ICreateWithdrawalSchema,
): Promise<ResProps<UpdateWithdrawalAccountRes>> => {
  const URL = `${getClientBaseUrl()}/wallet/withdraw`;
  const reqBody = {
    body: JSON.stringify({ ...data }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return network.post<UpdateWithdrawalAccountRes>(URL, reqBody);
};

export const getWalletHistory = async ({
  queryKey,
}: IQueryKey): Promise<IWalletHistory> => {
  const queryParams = queryParamsHelper(queryKey?.[1]);
  const URL = `${getClientBaseUrl()}/wallet/getHistory${queryParams}`;
  return network.get<IWalletHistory>(URL);
};

export const removeWithdrawalAccount = async (
  data: DeleteWithdrawalAccountSchema,
): Promise<ResProps<DeleteWithdrawalAccountSchemaRes>> => {
  const URL = `${getClientBaseUrl()}/wallet/removeAccount/${data._id}`;
  const reqBody = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return network.delete<DeleteWithdrawalAccountSchemaRes>(URL, reqBody);
};

export const getListSubscriptionPlan =
  async (): Promise<IGetListSubscriptionPlan> => {
    const URL = `${getClientBaseUrl()}/subscription/listPlans`;
    return network.get<IGetListSubscriptionPlan>(URL);
  };

export const setVisibility = async (data: {
  id: string;
  data: ICreatVisibilitySchema;
}): Promise<ResProps<createVisibilitychemaRes>> => {
  const URL = `${getClientBaseUrl()}/vendor/setVisibility/${data.id}`;
  const reqBody = {
    body: JSON.stringify({ ...data.data }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return network.post<createVisibilitychemaRes>(URL, reqBody);
};
