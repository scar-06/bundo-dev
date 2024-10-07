import React from "react";

import { ProductsResponse } from "@/lib/app/vendors/services";

import VendorServiceGridItemCard from "./VendorServiceGridItem";

function ServiceVendorTiles({ products }: Partial<ProductsResponse>) {
  return (
    <div className="grid grid-cols-1 gap-2">
      {products?.map((product) => (
        <VendorServiceGridItemCard
          key={Math.random()}
          product={product}
          state="service"
        />
      ))}
      {products &&
        Array(products?.length >= 9 ? 0 : 9 - products?.length)
          .fill(0)
          .map((v) => (
            <VendorServiceGridItemCard key={Math.random()} state="create" />
          ))}
    </div>
  );
}

export default ServiceVendorTiles;
