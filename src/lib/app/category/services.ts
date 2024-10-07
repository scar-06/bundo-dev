import { getBaseUrl, getClientBaseUrl, network } from "@/lib/common";

export interface categoriesResponseItem {
  category: string;
  SK: string;
  categoryUrl: string;
}

export interface GetAllCategoriesRes {
  status: string;
  categories: categoriesResponseItem[];
}
export const getAllCategories = async (): Promise<GetAllCategoriesRes> => {
  const URL = `${getClientBaseUrl()}/user/getCategories`;
  return network.get<GetAllCategoriesRes>(URL);
};
