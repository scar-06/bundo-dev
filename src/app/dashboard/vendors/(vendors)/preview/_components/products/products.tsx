import Image from "next/image";
import { weddingImage } from "@/assets";

import { Product } from "@/lib/app/vendors/services";

function Products({ pictures }: Product) {
  return (
    <div
      key={Math.PI + 1}
      className="relative aspect-square w-full cursor-pointer"
    >
      <Image
        src={pictures[0] ?? ""}
        alt="wedding image"
        fill
        className=" w-[100%] object-cover "
      />
    </div>
  );
}

export default Products;
