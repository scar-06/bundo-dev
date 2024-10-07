import { getClientBaseUrl, network } from "@/lib/common";

export interface GetVoucherSchema {
  status: string;
  message: string;
  data: {
    createdAt: string;
    ttl: number;
    SK: string;
    value: number;
    percValue: number;
    validTill: string;
    voucherCode: string;
  };
}

export const getUserVoucher = async (
  data: GetVoucherSchema,
): Promise<GetVoucherSchema> => {
  const { voucherCode } = data.data;
  const URL = `${getClientBaseUrl()}/voucher/getVoucherUser/${voucherCode}`;
  return network.get<GetVoucherSchema>(URL);
};
