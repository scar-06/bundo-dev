"use client";

import React from "react";
import { InfoIndicatorIcon } from "@/assets";

import { Modal } from "@/components/ui/modal";

function WeightGuidePopup() {
  const [show, setShow] = React.useState(false);

  const weightEstimates = [
    { item: "Jewellery", weight: "0.2 - 0.6 kg" },
    { item: "Fitness wear", weight: "0.6 - 1 kg" },
    { item: "T-shirts/Tops", weight: "0.18 - 0.2 kg" },
    { item: "Shoes", weight: "0.7 - 0.9 kg" },
    { item: "Perfumes/Hygiene items", weight: "0.3 - 0.6 kg" },
    { item: "Suitcases/Luggages", weight: "5.0 - 10 kg" },
    { item: "Skincare/Beauty Products", weight: "0.1 - 0.6 kg" },
    { item: "Underwear", weight: "0.7 - 0.9 kg" },
    { item: "Stationery", weight: "0.1 - 0.9 kg" },
    { item: "Gadgets (Phones)", weight: "0.33 - 0.43 kg" },
    { item: "Gadgets (Laptops)", weight: "3 - 5 kg" },
    { item: "Gadgets (Cameras)", weight: "1 - 2 kg" },
    { item: "Electronics", weight: "0.5 - 3 kg" },
    { item: "Children clothing/footwear", weight: "0.2 - 0.4 kg" },
    { item: "Bags (Women)", weight: "0.7 - 0.9 kg" },
    { item: "Bags (Men)", weight: "0.7 - 0.9 kg" },
    { item: "Furniture", weight: "1.5 - 6 kg" },
    { item: "Kitchen/Household items", weight: "0.4 - 1.8 kg" },
    { item: "Toys", weight: "0.2 - 0.7 kg" },
    { item: "Books", weight: "0.6 - 1 kg" },
    { item: "Accessories (Fashion)", weight: "0.25 - 0.9 kg" },
    { item: "Art & Craft", weight: "0.7 - 0.9 kg" },
    { item: "Wrist-watches", weight: "0.3 - 0.6 kg" },
  ];

  return (
    <div>
      <div className="w-full">
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="group ml-auto mt-[2px] flex h-fit w-fit items-center justify-between gap-1 rounded-full bg-[#D6EEDD] p-2 text-[11px] text-[#34A853]"
        >
          Use the weight guide here!
        </button>
      </div>
      <Modal isOpen={show} closeModal={() => setShow(!show)}>
        <button
          onClick={() => setShow(!show)}
          className="fixed right-0 top-0 z-[32] hidden h-[50px] w-[50px] rounded-bl-3xl bg-white font-bold text-black/90 shadow-2xl mmd:block"
        >
          &times;
        </button>
        <div className="hideScrollBar flex h-fit items-center justify-center overflow-y-auto text-[unset]">
          <div className="isolate mx-[auto] my-[50px] flex h-fit !w-fit  flex-col rounded-3xl bg-white px-6 pb-[18px] pt-[29px] font-tv2SansDisplay ">
            <h3 className="mx-auto mb-4 flex items-center gap-2 text-nowrap text-center text-xs font-semibold text-tertiary-deep-green-950 md:text-base">
              Use this as a Guide for weight estimates
              <InfoIndicatorIcon className="text-green-600" />
            </h3>
            <table className="mx-auto  border-collapse border border-green-500 text-left text-sm text-gray-700">
              <thead>
                <tr>
                  <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-xs sm:text-nowrap sm:text-base">
                    Product Item
                  </th>
                  <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-xs sm:text-nowrap sm:text-base">
                    Weight estimates in Kg
                  </th>
                </tr>
              </thead>
              <tbody>
                {weightEstimates.map((estimate, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">
                      {estimate.item}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {estimate.weight}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mx-auto mt-4 max-w-[344px] text-center text-xs text-gray-600">
              {`If you don't see your product in any of the categories listed
              below or you want a more specific estimate, check`}{" "}
              <a
                href="https://www.cartrollers.com/approximate-weights-of-products-on-cartrollers/"
                target="_blank"
                className="font-bold text-red-500 underline"
              >
                here
              </a>
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default WeightGuidePopup;
