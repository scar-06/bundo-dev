import { useState } from "react";
import { toast } from "react-toastify";

import { network } from "@/lib/common";

type PostRequest = {
  url: string;
  body: any;
};

type UsePostOptions<T> = {
  onSuccess?: (data: T[]) => void;
  onError?: (error: Error[]) => void;
};

function usePost<T = any>(options?: UsePostOptions<T>) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Error[] | null>(null);
  const [data, setData] = useState<T[] | null>(null);

  const sendMultiplePosts = async (requests: PostRequest[]) => {
    setLoading(true);
    setErrors(null);

    try {
      const promises = requests.map((request) =>
        network
          .post<T>(request.url, {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(request.body),
          })
          .catch((err) => Promise.reject(err)),
      );

      const results = await Promise.allSettled(promises);
      const successfulResults: T[] = [];
      const errorsEncountered: Error[] = [];

      results.forEach((result) => {
        if (result.status === "fulfilled") {
          // @ts-expect-error
          successfulResults.push(result.value);
        } else {
          errorsEncountered.push(result.reason);
        }
      });

      if (errorsEncountered.length > 0) {
        setErrors(errorsEncountered);
        if (options?.onError) {
          options.onError(errorsEncountered);
        }
      }
      setData(successfulResults);
      if (options?.onSuccess) {
        options.onSuccess(successfulResults);
      }
    } catch (err: any) {
      // Handle unexpected errors in Promise.allSettled execution
      toast.error("An unexpected error occurred");
      setErrors([err]);
      if (options?.onError) {
        options.onError([err]);
      }
    } finally {
      setLoading(false);
    }
  };

  return { sendMultiplePosts, isLoading, data, errors };
}

export default usePost;
