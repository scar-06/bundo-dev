import React from "react";

import EditProduct from "./_components/EditItems";

function EditProductPage({
  params: { productId },
}: {
  params: { productId: string };
}) {
  return <EditProduct productId={productId} />;
}

export default EditProductPage;
