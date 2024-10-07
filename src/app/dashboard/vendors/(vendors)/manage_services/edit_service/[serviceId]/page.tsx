import React from "react";

import EditService from "./_components/EditItems";

function EditProductPage({
  params: { serviceId },
}: {
  params: { serviceId: string };
}) {
  return <EditService serviceId={serviceId} />;
}

export default EditProductPage;
