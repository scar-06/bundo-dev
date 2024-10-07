import { Interface } from "readline";

import { getClientBaseUrl, network, ResProps } from "@/lib/common";

import { Product } from "../vendors/services";

export interface getDropOffLocationItemReq {
  loc: string;
}

export interface Local {
  name: string;
  locationCode: string;
  isAvailable: boolean;
  isLockerAvailable: boolean;
}
export interface Locations {
  state: string;
  locals: Local[];
}

export interface GetDropOffListRes {
  status: string;
  message: string;
  locations: Locations;
}
export const getAllDropOffLocations = async ({
  loc,
}: getDropOffLocationItemReq): Promise<GetDropOffListRes> => {
  const URL = `${getClientBaseUrl()}/orders/listDropOffLocations?state=${loc}`;
  return network.get<GetDropOffListRes>(URL);
};

export interface AddDeliveryInfoReq {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  addtitionalPhoneNumber?: string | null;
  email: string;
  address: string;
  note?: string | null;
  addressCode?: string;
}
export interface UpdateDeliveryInfoReq {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  addtitionalPhoneNumber?: string | null;
  dropOffLocationCode?: string;
  addressCode?: string;
  email?: string;
  state?: string;
  address?: string;
  landmark?: string | null;
  note?: string | null;
}
export type IDeliveryLocation = AddDeliveryInfoReq & {
  _id: string;
};
export interface AddDeliveryInfoRes {
  status: string;
  message: string;
}

export const addDeliveryInfo = async (
  data: AddDeliveryInfoReq,
): Promise<ResProps<AddDeliveryInfoRes>> => {
  const URL = `${getClientBaseUrl()}/orders/addDeliveryLocation`;
  const reqBody = {
    body: JSON.stringify({ ...data }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return network.post<AddDeliveryInfoRes>(URL, reqBody);
};

export interface ValidateAddressReq {
  address: string;
  email: string;
  phoneNumber: string;
  name: string;
}
export interface ValidateAddressRes {
  status: string;
  message: string;
  data: {
    address_code: number;
    address: string;
    name: string;
    email: string;
    street_no: string;
    street: string;
    phone: string;
    formatted_address: string;
    country: string;
    country_code: string;
    city: string;
    city_code: string;
    state: string;
    state_code: string;
    postal_code: string;
    latitude: number;
    longitude: number;
  };
}

export const validateAddress = async (
  data: ValidateAddressReq,
): Promise<ResProps<ValidateAddressRes>> => {
  const URL = `${getClientBaseUrl()}/shipping/validateAddress`;
  const reqBody = {
    body: JSON.stringify({ ...data }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return network.post<ValidateAddressRes>(URL, reqBody);
};
export const UpdateDeliveryInfo = async (
  data: UpdateDeliveryInfoReq,
  id: string,
): Promise<ResProps<AddDeliveryInfoRes>> => {
  const URL = `${getClientBaseUrl()}/orders/editDeliveryLocation/${id}`;
  const reqBody = {
    body: JSON.stringify({ ...data }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return network.patch<AddDeliveryInfoRes>(URL, reqBody);
};

export interface GetDeliveryLocationsRes {
  status: string;
  message: string;
  data: IDeliveryLocation[];
}

export const getDeliveryLocations =
  async (): Promise<GetDeliveryLocationsRes> => {
    const URL = `${getClientBaseUrl()}/orders/getDeliveryLocations`;
    const response = await network.get<GetDeliveryLocationsRes>(URL);

    // Assuming the list is in the order of addition, reverse the array to show the most recent first
    if (response.data && Array.isArray(response.data)) {
      response.data.reverse(); // Reverses the array to show the most recent first
    }

    return response;
  };

export interface DeleteDeliveryLocationSchema {
  _id: string;
}

export interface DeleteDeliveryLocationSchemaRes {
  status: string;
  message: string;
}
export const deleteDeliveryLocation = async (
  data: DeleteDeliveryLocationSchema,
): Promise<ResProps<DeleteDeliveryLocationSchemaRes>> => {
  const URL = `${getClientBaseUrl()}/orders/removeDeliveryLocation/${data._id}`;
  const reqBody = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return network.delete<DeleteDeliveryLocationSchemaRes>(URL, reqBody);
};
// •••••••/bundo-api/orders/initCheckout
export interface OrderItem {
  productName: string;
  description: string;
  unit_weight: string;
  cost: string;
  picture: string;
  productId: string;
  quantity: number;
}
export interface Order {
  businessId: string;
  businessName: string;
  deliveryEstimate: number;
  request_token: string;
  service_code: string;
  courier_id: string;
  pickup_eta_time: string;
  delivery_eta_time: string;
  orders: OrderItem[];
}

export interface InitCheckoutReqData {
  amount: string;
  deliveryLocation: IDeliveryLocation;
  orders: Order[];
  callbackUrl: string;
}
export interface Data {
  authorization_url: string;
  access_code: string;
  reference: string;
}
export interface InitCheckoutRes {
  status: string;
  message: string;
  data: Data;
}

export const initCheckout = async (
  data: InitCheckoutReqData,
): Promise<ResProps<InitCheckoutRes>> => {
  const URL = `${getClientBaseUrl()}/orders/initCheckout`;
  const reqBody = {
    body: JSON.stringify({ ...data }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return network.post<InitCheckoutRes>(URL, reqBody);
};

export interface P {
  productId: string;
  cost: string;
  description?: string;
  picture: string;
  productName: string;
  quantity: number;
  businessName: string;
  businessId: string;
  businessAddressCode: number;
  categoryId: number;
  pickupDate: string;
  business_profile_picture: string;
  unit_weight: string;
}
// server cart actions
export interface SyncCartReqData {
  data: P[];
}
export interface SyncCartResData {
  status: string;
  message: string;
}
export const syncCart = ({
  data,
}: SyncCartReqData): Promise<ResProps<SyncCartResData>> => {
  const URL = `${getClientBaseUrl()}/cart/syncCart`;
  const reqBody = {
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return network.post<SyncCartResData>(URL, reqBody);
};

export interface GetCartFromServerRes {
  status: string;
  message: string;
  cart: [
    {
      productId: string;
      picture: string;
      productName: string;
      cost: string;
      quantity: number;
      businessId: string;
      businessName: string;
      business_profile_picture: string;
      pickupDate: string;
      pickupLocationCode: string;
      _id: string;
    },
  ];
}

export const getCartFromServer = async (): Promise<GetCartFromServerRes> => {
  const URL = `${getClientBaseUrl()}/cart/getCart`;
  return network.get<GetCartFromServerRes>(URL);
};

// •••••••/bundo-api/product/addToCart

export interface AddToServerCartRes {
  status: string;
  message: string;
}

export const addToServerCart = (
  data: Partial<P>,
): Promise<ResProps<AddToServerCartRes>> => {
  const URL = `${getClientBaseUrl()}/product/addToCart`;
  const reqBody = {
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return network.patch<AddToServerCartRes>(URL, reqBody);
};

export const incrementCartItem = (data: {
  productId: string;
  quantity: number;
}): Promise<ResProps<AddToServerCartRes>> => {
  const URL = `${getClientBaseUrl()}/cart/incrementCartItem`;
  const reqBody = {
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return network.patch<AddToServerCartRes>(URL, reqBody);
};

export const removeCartItemServer = (data: {
  id: string;
}): Promise<ResProps<AddToServerCartRes>> => {
  const URL = `${getClientBaseUrl()}/cart/removeCartItem/${data.id}`;
  const reqBody = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return network.delete<AddToServerCartRes>(URL, reqBody);
};

export const removeCartItemsByVendorsServer = (data: {
  id: string;
}): Promise<ResProps<AddToServerCartRes>> => {
  const URL = `${getClientBaseUrl()}/cart/removeCartItemByVendor/${data.id}`;
  const reqBody = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return network.delete<AddToServerCartRes>(URL, reqBody);
};

// •••••••/bundo-api/orders/getDeliveryEstimate

export interface GetDeliveryEstimateRes {
  status: string;
  message: string;
  data: {
    estimate: number;
  };
}
export interface GetDeliveryEstimateReq {
  dropoffCode: string;
  pickupCode: string;
  pickupDate: string;
  weight: string;
  height: string;
  width: string;
  length: string;
}

export const getDeliveryEstimate = (
  data: GetDeliveryEstimateReq,
): Promise<ResProps<GetDeliveryEstimateRes>> => {
  const URL = `${getClientBaseUrl()}/orders/getDeliveryEstimate`;
  const reqBody = {
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return network.post<GetDeliveryEstimateRes>(URL, reqBody);
};

export interface GetDeliveryEstimatePerVendorReq {
  businessAddressCode: number;
  customerAddressCode: number;
  pickupDate: string;
  categoryId: number;
  orders: GetDeliveryEstimatePerVendorOrderReq[];
}

export interface GetDeliveryEstimatePerVendorOrderReq {
  name: string;
  description: string;
  unit_weight: string;
  unit_amount: string;
  quantity: string;
}

export interface GetDeliveryEstimatePerVendorOrderRes {
  status: string;
  message: string;
  data: GetDeliveryEstimatePerVendorOrderResData;
}

export interface GetDeliveryEstimatePerVendorOrderResData {
  request_token: string;
  couriers: Courier[];
  fastest_courier: FastestCourier;
  cheapest_courier: CheapestCourier;
  checkout_data: CheckoutData;
}

export interface Courier {
  courier_id: string;
  courier_name: string;
  courier_image: string;
  service_code: string;
  insurance: Insurance;
  discount: Discount;
  service_type: string;
  waybill: boolean;
  on_demand: boolean;
  is_cod_available: boolean;
  tracking_level: number;
  ratings: number;
  votes: number;
  connected_account: boolean;
  rate_card_amount: number;
  rate_card_currency: string;
  pickup_eta: string;
  pickup_eta_time: string;
  dropoff_station?: DropoffStation;
  pickup_station?: PickupStation;
  delivery_eta: string;
  delivery_eta_time: string;
  info: any;
  currency: string;
  vat: number;
  total: number;
  tracking: Tracking;
}

export interface Insurance {
  code: string;
  fee: number;
}

export interface Discount {
  percentage: number;
  symbol: string;
  discounted: number;
}

export interface DropoffStation {
  name: string;
  address: string;
  country: string;
  phone: any;
}

export interface PickupStation {
  name: string;
  address: string;
  phone: any;
}

export interface Tracking {
  bars: number;
  label: string;
}

export interface FastestCourier extends Courier {}

export interface Insurance2 {
  code: string;
  fee: number;
}

export interface Discount2 {
  percentage: number;
  symbol: string;
  discounted: number;
}

export interface Tracking2 {
  bars: number;
  label: string;
}

export interface CheapestCourier extends Courier {}

export interface Insurance3 {
  code: string;
  fee: number;
}

export interface Discount3 {
  percentage: number;
  symbol: string;
  discounted: number;
}

export interface Tracking3 {
  bars: number;
  label: string;
}

export interface CheckoutData {
  ship_from: ShipFrom;
  ship_to: ShipTo;
  currency: string;
  package_amount: number;
  package_weight: number;
  pickup_date: string;
}

export interface ShipFrom {
  name: string;
  phone: string;
  email: string;
  address: string;
}

export interface ShipTo {
  name: string;
  phone: string;
  email: string;
  address: string;
}

export const getDeliveryEstimatePerVendor = (
  data: GetDeliveryEstimatePerVendorReq,
): Promise<ResProps<GetDeliveryEstimatePerVendorOrderRes>> => {
  const URL = `${getClientBaseUrl()}/shipping/getDeliveryEstimate`;
  const reqBody = {
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return network.post<GetDeliveryEstimatePerVendorOrderRes>(URL, reqBody);
};

// •••••••/bundo-api/shipping/cancelOrder

export interface cancelOrderReqData {
  batchId: string;
}
export interface cancelOrderResData {
  status: string;
  message: string;
}
export const cancelOrder = ({
  batchId,
}: cancelOrderReqData): Promise<ResProps<cancelOrderResData>> => {
  const URL = `${getClientBaseUrl()}/shipping/cancelOrder`;
  const reqBody = {
    body: JSON.stringify({ batchId }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return network.post<cancelOrderResData>(URL, reqBody);
};

// •••••••/bundo-api/orders/fileClaim
export interface fileClaimReqReqData {
  itemId: string;
  reasonForReturn: string;
  additionalInfo: string;
  claimType: string;
  businessName: string;
  productId: string;
  batchId: string;
  orderId: string;
  pictures: string[];
  cost: string;
  quantity: number;
  productName: string;
  customerName: string;
}
export interface fileClaimReqResData {
  status: string;
  message: string;
}
export const fileClaimReq = (
  data: fileClaimReqReqData,
): Promise<ResProps<fileClaimReqResData>> => {
  const URL = `${getClientBaseUrl()}/orders/fileClaim`;
  const reqBody = {
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return network.post<fileClaimReqResData>(URL, reqBody);
};
