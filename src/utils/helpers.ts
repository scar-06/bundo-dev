import { Updater } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";

import {
  Courier,
  GetDeliveryEstimatePerVendorOrderRes,
} from "@/lib/app/orders/services";
import { Business, Product } from "@/lib/app/vendors/services";

import { APP_CONFIG } from ".";

export function createSubArrays<T>(arr: T[], subArraySize: number): T[][] {
  const result: T[][] = [];

  for (let i = 0; i < arr.length; i += subArraySize) {
    result.push(arr.slice(i, i + subArraySize));
  }

  return result;
}

export function sortByMatchingKey<T, K extends keyof T>(
  array: T[],
  key: K,
  value: T[K],
): T[] {
  const index = array.findIndex((obj) => obj[key] === value);

  if (index === -1) return array;

  const matchedObj = array.splice(index, 1)[0];
  array.unshift(matchedObj);

  return array;
}

export function formatNigerianPhoneNumber(phoneNumber: string): string {
  phoneNumber = phoneNumber.trim();
  const pN = phoneNumber.startsWith("0")
    ? phoneNumber
    : phoneNumber.split("234")[1];

  if (pN?.startsWith("0")) {
    return pN;
  }
  return `0${pN}`;
}
export function removeCommas(amount: string): string {
  return amount.replace(/,/g, "");
}
export function formatCurrency(
  amount: number,
  currencySymbol: string = "₦",
  locale: string = "en-US",
): string {
  const formatted = `${currencySymbol}${amount.toLocaleString(locale, {
    style: "currency",
    currency: "NGN", // Using "NGN" as currency code
  })}`;
  return formatted.replace(/\.00$/, "").replace(/NGN/, "");
}

export function detectDeviceType(): string {
  const userAgent: string =
    // @ts-expect-error
    navigator.userAgent || navigator.vendor || window.opera.toString();

  if (/android/i.test(userAgent)) {
    return "Android";
  }
  // @ts-expect-error
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "iOS";
  }
  return "Web";
}

// Util fn to get newer pagination state from previous state
export const getNextPaginationState = (
  updater: Updater<PaginationState, PaginationState>,
  oldState: PaginationState,
) => {
  if (updater instanceof Function) {
    return updater(oldState);
  }

  return oldState;
};
// util to convert base64 to File
export function base64ToFile(dataURI: string, fileName: string): File {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new File([ab], fileName, { type: mimeString });
}
export function extractFirstElements(cards: {
  [key: string]: string[];
}): string[] {
  const firstElements: string[] = [];

  // Use Object.keys to iterate over the object's own properties
  Object.keys(cards).forEach((key) => {
    const elementArray = cards[key];

    // Check if it's an array and has at least one element before accessing
    if (Array.isArray(elementArray) && elementArray.length > 0) {
      firstElements.push(elementArray[0]); // Add the first element to the result array
    } else {
      throw new Error(
        `Invalid input for ${key}: Ensure it is a non-empty array.`,
      );
    }
  });

  return firstElements;
}

interface Contacts {
  [key: string]: string;
}

interface ContactsWithValues {
  [key: string]: Contacts;
}

export function filterContactsWithValues(data: Contacts): Contacts {
  const filteredContacts: Contacts = {};
  for (const key in data) {
    if (Object.values(data[key]).some((value) => value !== "")) {
      filteredContacts[key] = data[key];
    }
  }
  console.log(`Filtered contacts: ${filteredContacts}`);
  return filteredContacts;
}

export function formatContacts(data: Contacts) {
  // Iterate over each property in the object
  for (const key in data) {
    if (data.hasOwnProperty(key) && key.toLowerCase().includes("phone")) {
      // Apply formatting to phone number fields
      data[key] = formatNigerianPhoneNumber(data[key]);
    }
  }

  return data;
}

export const queryParamsHelper = (queryParams: any) => {
  let queries = "?";

  for (const [key, value] of Object.entries(queryParams || {})) {
    if (
      value &&
      value !== undefined &&
      value !== null &&
      value instanceof Array
    ) {
      for (let i = 0; i < value.length; i++) {
        queries += `${key}=${value[i]}&`;
      }
    } else if (value && value !== undefined && value !== null) {
      queries += `${key}=${value}&`;
    }
  }
  return queries?.substring(0, queries?.length - 1);
};

interface ProductDetails {
  productId: string;
  picture: string;
  productName: string;
  cost: string;
}

interface BusinessDetails {
  businessId: string;
  businessName: string;
  business_profile_picture: string;
  pickupDate: string;
  businessAddressCode: string;
}

export interface ProductInput {
  productId: string;
  picture: string;
  productName: string;
  cost: string;
  description: string;
  unit_weight: string;
  quantity: number;
  businessId: string;
  businessName: string;
  business_profile_picture: string;
  businessAddressCode: string;
  categoryId: number;
  pickupDate: string;
  _id: string;
  product_quantity?: number;
}
interface ServerCartItem {
  business: BusinessDetails;
  item: ProductInput;
  quantity: number;
}

export function createCartData(data: ProductInput[]) {
  const fData = data.map(
    (item): ServerCartItem => ({
      business: {
        businessId: item.businessId,
        businessName: item.businessName,
        business_profile_picture: item.business_profile_picture,
        pickupDate: item.pickupDate,
        businessAddressCode: item?.businessAddressCode,
      },
      item: {
        ...item,
        productId: item.productId,
        picture: item.picture,
        productName: item.productName,
        cost: item.cost,
        quantity: item.quantity,
        businessId: item.businessId,
        businessName: item.businessName,
        business_profile_picture: item.business_profile_picture,
        pickupDate: item.pickupDate,
        _id: item._id,
      },
      quantity: item.quantity,
    }),
  ) as ServerCartItem[];

  let groupedByVendor: { items: ServerCartItem[] }[] = [];
  // group by vendorId
  const tempGroup = fData.reduce(
    (acc, item) => {
      const vendorId = item.item.businessId as string;
      if (!acc[vendorId]) {
        acc[vendorId] = [];
      }
      acc[vendorId].push(item);
      return acc;
    },
    {} as Record<string, ServerCartItem[]>,
  );

  // Convert grouped items into array of single-key records

  groupedByVendor = Object.entries(tempGroup).map(([vendorId, items]) => ({
    items,
  }));
  return groupedByVendor;
}

export const filterUniqueCouriers = (
  newData: GetDeliveryEstimatePerVendorOrderRes,
): Courier[] => {
  const uniqueCouriers = newData?.data?.couriers?.filter(
    (courier: Courier) =>
      courier.courier_id !== newData?.data?.fastest_courier?.courier_id &&
      courier.courier_id !== newData?.data?.cheapest_courier?.courier_id,
  );

  return uniqueCouriers ?? [];
};

export function addDaysToDate(daysToAdd: number): string {
  const currentDate: Date = new Date();
  const newDate: Date = new Date(currentDate);
  newDate.setDate(currentDate.getDate() + daysToAdd);
  const newDateString: string = newDate.toISOString().split("T")[0];
  return newDateString;
}

export const createGetEstimatedDeliveryCost = ({
  data,
  dropOffLocationCode,
}: {
  data: {
    items: ServerCartItem[];
  }[];
  dropOffLocationCode: string;
}) => {
  const fData = data.map((item) => ({
    dropoffCode: dropOffLocationCode,
    // @ts-expect-error
    pickupCode: item.items[0].business?.pickupLocationCode,
    pickupDate: item.items[0].business.pickupDate,
    // weight: ",
    // height: "",
    // width: "",
    // length: "",
  }));
  return fData;
};

export function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Number((minutes % 60).toFixed(0));

  if (hours === 0) {
    return `${remainingMinutes} minutes away`;
  } else if (remainingMinutes === 0) {
    return `${hours} hours away`;
  } else {
    return `${hours} hours ${remainingMinutes} minutes away`;
  }
}

export function checkIfImagesAreCorrectType(files: File[]): boolean {
  let valid = true;
  if (files[0]) {
    const file = files[0];
    if (!["image/png", "image/jpg", "image/jpeg"].includes(file.type)) {
      valid = false;
    }
  }
  return valid;
}
export function checkIfFilesAreTooBig(files: File[], limit: number): boolean {
  let valid = true;
  if (files[0]) {
    const file = files[0];
    const sizeInMB = file.size / 1024 / 1024; // Convert size to megabytes
    if (sizeInMB > limit) {
      valid = false;
    }
  }
  return valid;
}

type FieldSetterAndClearerParams<T> = {
  value: T[keyof T];
  setterFunc: (field: keyof T, value: T[keyof T] | null) => void;
  setField: keyof T;
  clearFields?: Array<keyof T>;
  clearErrors: (field: keyof T) => void;
};

export const fieldSetterAndClearer = <T>({
  value,
  setterFunc,
  setField,
  clearFields,
  clearErrors,
}: FieldSetterAndClearerParams<T>): void => {
  setterFunc(setField, value);
  clearErrors(setField);
  clearFields?.forEach((field) => setterFunc(field, null));
};
