"use client";

import React from "react";

import { useGetLoggedInUser } from "@/hooks/useGetLoggedInUser";

import VendorsLayoutWrapper from "./_components/layoutWrapper";

function VendorsLayout({ children }: { children: React.ReactNode }) {
  useGetLoggedInUser();
  return <VendorsLayoutWrapper>{children}</VendorsLayoutWrapper>;
}

export default VendorsLayout;
