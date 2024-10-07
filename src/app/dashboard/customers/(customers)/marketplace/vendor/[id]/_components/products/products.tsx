import Image from "next/image";
import { weddingImage } from "@/assets";

import { Product } from "@/lib/app/vendors/services";

function Products({ pictures, quantity }: Product) {
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
      {quantity === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <div className="flex h-fit w-fit items-center justify-center rounded-full bg-[#DE350B] px-2 py-1">
            <span className="text-[7px] font-bold text-white">
              {" "}
              OUT OF STOCK
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
