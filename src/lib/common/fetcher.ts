"use client";

import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getCookie } from "cookies-next";

import { UserInfoProps } from "../../../next-auth";
import { capitalizeFirstChar } from "../utils";

type fetcherArgs = [reqInfo: RequestInfo | URL, init?: RequestInit | undefined];

// Default response props
export type ResProps<T = null> = {
  statusCode?: number;
  message?: string[] | string;
  data: T;
  error?: Error;
  status?: string;
};

// Global fetcher fn
export const fetcher = async <T>(...args: fetcherArgs): Promise<T> => {
  const [info, init = {}] = args;

  try {
    const cookieVal = getCookie("auth_token");

    const token = cookieVal
      ? (JSON.parse(cookieVal) as UserInfoProps)
      : ({} as UserInfoProps);

    const accessToken = token?.accessToken ?? "";

    if (token) {
      init.headers = {
        "x-access-token": `${accessToken}`,
        ...init.headers,
      };
    }

    const response = await fetch(info, init);

    const data = await response.json();
    const statusCode = response.status;

    if (
      statusCode.toString().startsWith("4") ||
      statusCode.toString().startsWith("5") ||
      data.status === "failed"
    ) {
      throw new Error(data.message);
    }
    return data;
  } catch (err: any) {
    throw new Error(err.message || "An error occurred during fetch operation.");
  }
};

// Global default post fetch fn
export const post = <T>(...args: fetcherArgs) => {
  const [info, init] = args;

  return fetcher<T>(info, {
    method: "POST",
    ...init,
  }) as Promise<ResProps<T>>;
};

// For patch requests
export const patch = <T>(...args: fetcherArgs) => {
  const [info, init] = args;

  return fetcher<T>(info, {
    method: "PATCH",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  }) as Promise<ResProps<T>>;
};

// Delete requests handler fn
export const deleteReq = <T>(...args: fetcherArgs) => {
  const [info, init] = args;

  return fetcher<T>(info, {
    method: "DELETE",
    ...init,
    headers: {
      ...init?.headers,
    },
  }) as Promise<ResProps<T>>;
};

// Paginated fetcher
export interface PaginatedQueryProps {
  pageSize?: number;
  pageNumber?: number;
  search?: string;
}

export interface PaginationProps {
  totalItem: number;
  totalPage: number;
  pageSize: string;
  pageNumber: string;
}

export type Pagination = {
  total: number;
  pageNumber: number;
  pageSize: number;
  totalPage?: number;
};

export interface ITablePagination {
  search: string;
  sort?: string;
  filterBy?: string | number;
  pagination: Pagination;
}

export type PaginatedResProps<T> = ResProps<{
  data: T[];
  pagination: PaginationProps;
}>;

export const paginatedFetcher = <T>(
  route: string,
  pageProps: PaginatedQueryProps,
) => {
  const queryURL = new URL(route);

  // Attach paginated props
  const { pageNumber = 1, pageSize = 11, search = "" } = pageProps;

  queryURL.searchParams.set("pageNumber", String(pageNumber + 1));
  queryURL.searchParams.set("pageSize", String(pageSize));
  queryURL.searchParams.set("search", search);

  const url = queryURL.toString();

  return fetcher<{ data: T[]; pagination: PaginationProps }>(url);
};

const useSpecialSearchParams = () => {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const pageNumber = searchParams.get("pageNumber") || 0;
  const pageSize = searchParams.get("pageSize") || 10;
  const spParam = searchParams.get("sqsp");

  const decodedString = spParam
    ? JSON.parse(spParam)
      ? {}
      : JSON.parse(spParam)
    : {};

  return {
    search,
    pageNumber: Number(pageNumber),
    pageSize: Number(pageSize),
    ...decodedString,
  };
};

const useTableParams = () => {
  const { search, ...parsedUrl } = useSpecialSearchParams();
  const searchParams = useSearchParams();

  const [tableParams, setTableParams] = React.useState<ITablePagination>({
    search: search || "",
    sort: "-createdAt",
    pagination: {
      pageNumber: 0,
      pageSize: 10,
      total: 0,
      totalPage: 1,
      ...parsedUrl,
    },
  });
  const replacer = (key: any, value: any) => {
    // Filtering out empty properties
    if (!value) {
      return undefined;
    }
    return value;
  };

  const currentPath = usePathname();

  const params = new URLSearchParams(searchParams.toString());

  const paramsUrl = React.useMemo(() => {
    return {
      search: search || tableParams.search,
      pageNumber: tableParams.pagination.pageNumber.toString(),
      pageSize: tableParams.pagination.pageSize.toString(),
      sqsp: JSON.stringify({}, replacer),
    };
  }, [tableParams]);

  React.useEffect(() => {
    // searchParams.set(paramsUrl);
    // setSearchParams(searchParams)
    params.set("pageSize", paramsUrl.pageSize);
    params.set("pageNumber", paramsUrl.pageNumber + 1);
  }, [paramsUrl]);
  return {
    tableParams,
    setTableParams,
  };
};

export default useTableParams;

export type ParseQueryParams = Record<
  string | symbol | number,
  string | string[] | boolean
>;
export type ParseQueryParamsOptions = {
  capitalizeKeysFirstChar?: boolean;
};

export const parseQueryParams = (
  queryParams: ParseQueryParams,
  options?: ParseQueryParamsOptions,
) => {
  const params = new URLSearchParams();
  Object.keys(queryParams).forEach((key) => {
    const queryParamsKeyValue = queryParams[key];
    const paramKey = options?.capitalizeKeysFirstChar
      ? capitalizeFirstChar(key)
      : key;
    if (queryParamsKeyValue instanceof Array) {
      queryParamsKeyValue.forEach((item: any) => {
        params.append(`${paramKey}`, item);
      });
    } else if (typeof queryParamsKeyValue === "boolean") {
      params.set(paramKey, `${queryParamsKeyValue}`);
    } else if (queryParamsKeyValue) {
      params.set(paramKey, queryParamsKeyValue);
    }
  });
  return params;
};
