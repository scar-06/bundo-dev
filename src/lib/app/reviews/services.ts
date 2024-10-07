import { getBaseUrl, getClientBaseUrl, network, ResProps } from "@/lib/common";

import { Product } from "../vendors/services";

export interface CreateReviewSchema {
  rating: number;
  review: string;
  productId: string;
}
export interface CreateReviewResSchema {
  status: string;
}

export interface GetReviewSchema {
  _id: string;
}
export interface GetReviewResSchema {
  status: string;
  product: Product;
}

export const createReview = async (
  data: CreateReviewSchema,
): Promise<ResProps<CreateReviewResSchema>> => {
  const URL = `${getClientBaseUrl()}/user/reviewBusiness/${data.productId}`;
  const reqBody = {
    body: JSON.stringify({ rating: data.rating, review: data.review }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  return network.patch<CreateReviewResSchema>(URL, reqBody);
};

// export const getReviews = async (
//   data: GetProductSchema,
// ): Promise<GetProductResSchema> => {
//   const URL = `${getClientBaseUrl()}/product/getProduct/${data._id}`;
//   return network.get<GetProductResSchema>(URL);
// };
