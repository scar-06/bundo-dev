import React from "react";

import VendorProfileWrapper from "./_components/vendorProfileWrapper";

function VendorProfileLayout({ children }: { children: React.ReactNode }) {
  return <VendorProfileWrapper>{children}</VendorProfileWrapper>;
}

export default VendorProfileLayout;
