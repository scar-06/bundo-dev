import { getBaseUrl, getClientBaseUrl, network, ResProps } from "@/lib/common";

import { Product } from "../vendors/services";

export interface CreateProductSchema {
  name: string;
  productType: string;
  description: string;
  pictures: string[];
  cost: string;
  weight: number;
  height?: number;
  length?: number;
  width?: number;
  quantity: number;
  categories: string[];
  available?: boolean;
}
export interface CreateProductResSchema {
  status: string;
  product: Product;
}
export interface UpdateProductResSchema {
  status: string;
  message: string;
}
export interface DeleteProductSchema {
  _id: string;
}
export interface DeleteProductSchemaRes {
  status: string;
  message: string;
}

export interface GetProductSchema {
  _id: string;
}
export interface GetProductResSchema {
  status: string;
  product: Product;
}
export const createProduct = async (
  data: CreateProductSchema,
): Promise<ResProps<CreateProductResSchema>> => {
  const URL = `${getClientBaseUrl()}/product/createProduct`;
  const reqBody = {
    body: JSON.stringify({ ...data }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return network.post<CreateProductResSchema>(URL, reqBody);
};
export const updateProduct = async (data: {
  id: string;
  data: Partial<CreateProductSchema>;
}): Promise<ResProps<UpdateProductResSchema>> => {
  const URL = `${getClientBaseUrl()}/product/updateProduct/${data.id}`;
  const reqBody = {
    body: JSON.stringify({ ...data.data }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return network.patch<UpdateProductResSchema>(URL, reqBody);
};
export const getProduct = async (
  data: GetProductSchema,
): Promise<GetProductResSchema> => {
  const URL = `${getClientBaseUrl()}/product/getProduct/${data._id}`;
  return network.get<GetProductResSchema>(URL);
};

export const deleteProduct = async (
  data: DeleteProductSchema,
): Promise<ResProps<DeleteProductSchemaRes>> => {
  const URL = `${getClientBaseUrl()}/product/deleteProduct/${data._id}`;
  const reqBody = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return network.delete<DeleteProductSchemaRes>(URL, reqBody);
};
