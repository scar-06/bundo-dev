import React from "react";

import ViewVendorProducts from "./_components/viewVendorProducts";

function UploadedProduct({
  params: { productId },
}: {
  params: { productId: string };
}) {
  return <ViewVendorProducts productId={productId} />;
}

export default UploadedProduct;
