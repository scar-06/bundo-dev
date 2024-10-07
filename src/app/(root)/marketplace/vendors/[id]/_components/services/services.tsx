import Image from "next/image";
import { largeWeddingPic, WhiteWeddingPic } from "@/assets";

import { Service } from "@/lib/app/vendors/services";

function Services({ pictures, name }: Service) {
  return (
    <div
      className=" 
    mt-4 w-full cursor-pointer rounded-md"
    >
      <div className="relative flex h-[144.48px] items-center justify-center">
        <Image
          src={pictures[0] ?? ""}
          alt="wedding image"
          fill
          className="  w-full rounded-lg object-cover"
        />
        <div className="absolute  h-full w-full rounded-lg bg-black bg-opacity-70 " />
        <span className="absolute font-bold text-[#fff]">
          {name}
          {/* </div> */}
        </span>
      </div>
    </div>
  );
}
export default Services;
