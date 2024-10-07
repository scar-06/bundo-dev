import React from "react";

import VendorProfileWrapper from "./_components/vendorProfileWrapper";

function RootMarketLayout({ children }: { children: React.ReactNode }) {
  return <VendorProfileWrapper>{children}</VendorProfileWrapper>;
}

export default RootMarketLayout;
