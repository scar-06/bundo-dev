import { useEffect } from "react";
import { useUserStore } from "@/store/user.store";
import { QUERY_KEYS } from "@/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getLoggedUser } from "@/lib/app/user/services";

export const useGetLoggedInUser = (isDisabled?: boolean) => {
  const setUser = useUserStore((state) => state.setUser);
  const queryClient = useQueryClient();
  const { isFetching, isError, isSuccess, data, refetch } = useQuery(
    {
      queryKey: [QUERY_KEYS.USER],
      queryFn: async () => getLoggedUser(),
      enabled: isDisabled,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      retry: 1,
    },
    queryClient,
  );
  useEffect(() => {
    if (isSuccess) {
      setUser(data.user);
    }
  }, [isSuccess, data, setUser]);

  return { isFetching, isError, isSuccess, refetch };
};
