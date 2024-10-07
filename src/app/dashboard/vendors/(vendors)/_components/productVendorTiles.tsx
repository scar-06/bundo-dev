import React from "react";

import { ProductsResponse } from "@/lib/app/vendors/services";

import VendorGridItemCard from "./VendorGridItemCard";

function ProductVendorTiles({ products }: Partial<ProductsResponse>) {
  return (
    <div className="grid grid-cols-3 gap-[2px]">
      {products?.map((product) => (
        <VendorGridItemCard
          key={Math.random()}
          product={product}
          state="product"
          productsLength={products?.length}
        />
      ))}
      {products &&
        Array(products?.length >= 8 ? 0 : 8 - products?.length)
          .fill(0)
          .map((v) => (
            <VendorGridItemCard
              productsLength={products?.length}
              key={Math.random()}
              state="empty"
            />
          ))}
      {Array(1)
        .fill(0)
        .map((v) => (
          <VendorGridItemCard
            productsLength={products?.length}
            key={Math.random()}
            state="create"
          />
        ))}
    </div>
  );
}

export default ProductVendorTiles;
