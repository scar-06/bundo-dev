"use client";

import { useGetLoggedInUser } from "@/hooks/useGetLoggedInUser";

import CustomersLayoutWrapper from "./_components/layoutWrapper";

function CustomersLayout({ children }: { children: React.ReactNode }) {
  useGetLoggedInUser();
  return <CustomersLayoutWrapper>{children}</CustomersLayoutWrapper>;
}

export default CustomersLayout;
