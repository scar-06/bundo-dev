import React from "react";

import ViewVendorProducts from "./_components/viewVendorServices";

function UploadedProduct({
  params: { productId },
}: {
  params: { productId: string };
}) {
  return <ViewVendorProducts productId={productId} />;
}

export default UploadedProduct;
