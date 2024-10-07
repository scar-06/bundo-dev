import Image from "next/image";
import { largeWeddingPic, WhiteWeddingPic } from "@/assets";

function Services({ imageName }: { imageName: string }) {
  return (
    <div
      className=" 
    mt-4 w-full cursor-pointer rounded-md"
    >
      <div className="relative flex items-center justify-center">
        <Image
          src={WhiteWeddingPic}
          alt="wedding image"
          className=" h-[144.48px] w-full rounded-lg object-cover"
        />
        <div className="absolute  h-full w-full rounded-lg bg-black bg-opacity-70 " />
        <span className="absolute font-bold text-[#fff]">
          {imageName}
          {/* </div> */}
        </span>
      </div>
    </div>
  );
}
export default Services;
