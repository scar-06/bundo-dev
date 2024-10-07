import { useEffect } from "react";
import { useVendorBusinessStore } from "@/store/business.store";
import { QUERY_KEYS } from "@/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getBusiness } from "@/lib/app/vendors/services";

export const useGetBusiness = () => {
  const setBusiness = useVendorBusinessStore((state) => state.setBusiness);
  const queryClient = useQueryClient();
  const { isFetching, isError, isSuccess, data } = useQuery(
    {
      queryKey: [QUERY_KEYS.BUSINESS],
      queryFn: async () => getBusiness(),
      enabled: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 1,
    },
    queryClient,
  );
  useEffect(() => {
    if (isSuccess) {
      setBusiness(data);
    }
  }, [isSuccess, data, setBusiness]);

  return { isFetching, isError, data };
};
