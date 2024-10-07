import { cache } from "react";

export const getBaseUrl = cache(() => process.env.API_HOST);
export const getClientBaseUrl = cache(() => process.env.NEXT_PUBLIC_BASE_URL);
export const getClientMapApiKey = cache(
  () => process.env.NEXT_PUBLIC_MAP_API_KEY,
);
export const getClientMapID = cache(() => process.env.NEXT_PUBLIC_MAP_ID);
