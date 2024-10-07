import { queryParamsHelper } from "@/utils/helpers";

import { getBaseUrl, getClientBaseUrl, network, ResProps } from "@/lib/common";

import { IQueryKey } from "../user/services";

export interface createAdsReqData {
  productId: string;
  duration: number;
  name: string;
  description: string;
  pictures: string[];
  amount: number;
  callbackUrl: string;
  cost: string;
}
export interface createAdsRes {
  status: string;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}
export const createAds = async (
  data: createAdsReqData,
): Promise<ResProps<createAdsRes>> => {
  const URL = `${getClientBaseUrl()}/vendor/ads/createAds`;
  const reqBody = {
    body: JSON.stringify({ ...data }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return network.post<createAdsRes>(URL, reqBody);
};

export interface AllAd {
  _id: string;
  vendorId: string;
  productId: string;
  name?: string;
  description?: string;
  pictures: string[];
  expiresAt: string;
  duration: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MetaData {
  total: number;
  pages: number;
  limit: number;
  currPage: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

export interface AllAds {
  allAds: AllAd[];
  metaData: MetaData;
}

export interface GetAllAdsRes {
  status: string;
  allAds: AllAds;
}

export const getAllAds = async ({
  queryKey,
}: IQueryKey): Promise<GetAllAdsRes> => {
  const queryParams = queryParamsHelper(queryKey?.[1]);
  const URL = `${getClientBaseUrl()}/vendor/ads${queryParams}`;
  return network.get<GetAllAdsRes>(URL);
};
