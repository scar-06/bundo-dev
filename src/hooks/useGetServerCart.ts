import { useEffect } from "react";
import { useServerCartStore } from "@/store/serverCart.store";
import { QUERY_KEYS } from "@/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getCartFromServer } from "@/lib/app/orders/services";

export const useGetServerCart = (enabled?: boolean) => {
  const setServerCart = useServerCartStore((state) => state.setServerCart);
  const queryClient = useQueryClient();
  const { isFetching, isError, isSuccess, data, refetch } = useQuery(
    {
      queryKey: [QUERY_KEYS.SERVER_CART],
      queryFn: async () => getCartFromServer(),
      enabled: enabled || true,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
    queryClient,
  );
  useEffect(() => {
    if (isSuccess) {
      setServerCart(data);
    }
  }, [isSuccess, data, setServerCart]);

  return { isFetching, isError, isSuccess, refetch };
};
