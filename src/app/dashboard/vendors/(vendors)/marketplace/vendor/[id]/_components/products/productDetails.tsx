import Image from "next/image";
import { CartIcon, vendorProduct1, WhiteChatIcon } from "@/assets";

function ProductDetails() {
  return (
    <div
      key={Math.random() * Math.PI}
      className=" mb-12 hidden h-fit w-full rounded-lg bg-[#FAF8F3] lg:block "
    >
      <Image
        src={vendorProduct1}
        alt="vendor product"
        height={447}
        className="w-full rounded-t-md"
        // objectFit="contain"
      />
      <div className="relative flex flex-col p-6">
        <div className="flex items-center  justify-between">
          <span className="text-[22px] font-semibold ">
            Jollof Rice Platter
          </span>
          <div className="flex cursor-pointer items-center gap-1 text-[15px] text-[#fff]">
            <CartIcon />
            <div className="rounded-full bg-[#FF4D4F] px-2 py-1">
              <span>Add to bag</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="mb-3 mt-4 flex items-center gap-2">
            {["Food", "Meals", "Confectionery"].map((val) => (
              <span
                key={Math.random() * Math.PI}
                className=" rounded-full bg-[#f1e9db] p-2 text-[12px] font-semibold"
              >
                {val}
              </span>
            ))}
          </div>
          <span className="text-[15px]">
            This delicious Jollof Rice Platter comes in a tray of assorted rice,
            asun, meat and other delicacies. It can be shared with friends,
            eaten alone or given as a gift to someone who loves good food
          </span>
          {/* . <br /> */}
          <span className="mt-8 text-[15px]">
            This delicious Jollof Rice Platter comes in a tray of assorted rice,
            asun, meat and other delicacies. It can be shared with friends,
            eaten alone or given as a gift to someone who loves good food
          </span>
          <span className="mt-8 text-[12px]">Delivery: 2 - 3 working days</span>
        </div>
        <div className="absolute bottom-7 right-5 isolate ml-1 flex aspect-square w-[clamp(80px,_8vw,_80px)] items-center justify-center rounded-full bg-[#34A853] shadow-xl">
          <WhiteChatIcon />
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
