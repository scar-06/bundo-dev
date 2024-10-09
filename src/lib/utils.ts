import { ModifiedUser } from "@/store/user.store";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { UserInfoProps } from "../../next-auth";
import { Business } from "./app/vendors/services";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default cn;

export const capitalizeFirstChar = (str: string): string => {
  if (str) {
    const arr = [...str];
    arr[0] = arr[0].toUpperCase();
    return arr.join("");
  }
  return "";
};

export const useAmount = () => {
  function convertToAmount(amount: number | string) {
    return `${Number(amount || 0)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
  }

  function convertToAmountInNaira(amount: number | string) {
    return `₦${Number(amount || 0)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
  }

  return { convertToAmount, convertToAmountInNaira };
};

type ChecklistItemStatus = "completed" | "none" | "pending" | "in progress";

interface ChecklistItem {
  name: string;
  status: ChecklistItemStatus;
}

export function generateChecklist(
  userInfo: Partial<UserInfoProps>,
  businessInfo: Partial<Business>,
): ChecklistItem[] {
  const checklist: ChecklistItem[] = [];

  // 1. Upload a verification document
  if (userInfo?.vendorId?.status === "VERIFIED") {
    checklist.push({
      name: "Upload a verification document",
      status: "completed",
    });
  } else if (!userInfo?.vendorId?.supportingDocument) {
    checklist.push({ name: "Upload a verification document", status: "none" });
  } else if (
    userInfo?.vendorId?.supportingDocument &&
    (userInfo?.vendorId?.idAccepted === null ||
      userInfo?.vendorId?.idAccepted === undefined)
  ) {
    checklist.push({
      name: "Upload a verification document",
      status: "pending",
    });
  } else {
    checklist.push({
      name: "Upload a verification document",
      status: "pending",
    });
  }

  // 2. Verify phone number
  if (userInfo?.vendorId?.phoneNumber) {
    checklist.push({ name: "Verify phone number", status: "completed" });
  } else {
    checklist.push({ name: "Verify phone number", status: "none" });
  }

  // 3. Complete Store settings
  const isStoreSettingsComplete = (() => {
    if (!businessInfo?.address) {
      return "pending";
    }
    return "completed";
  })();
  if (isStoreSettingsComplete === "completed") {
    checklist.push({ name: "Complete Store settings", status: "completed" });
  } else {
    checklist.push({ name: "Complete Store settings", status: "none" });
  }

  return checklist;
}
