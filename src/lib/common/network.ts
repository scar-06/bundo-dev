import { deleteReq, fetcher, paginatedFetcher, patch, post } from "./fetcher";

// Network request interface
export const network = {
  get: fetcher,
  delete: deleteReq,
  post,
  patch,
  paginatedFetcher,
};
