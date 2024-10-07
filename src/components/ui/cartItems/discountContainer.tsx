import React, { useState } from "react";
import { SmallVoucher } from "@/assets";

import { getUserVoucher } from "@/lib/app/voucher/services";
import { Typography } from "@/components/typography";

type DiscountContainerProps = {
  applyDiscount: any;
  orderTotal: number;
};

function DiscountContainer({
  applyDiscount,
  orderTotal,
}: DiscountContainerProps) {
  const [voucherCode, setVoucherCode] = useState<string>("");
  const [isApplying, setIsApplying] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleApplyVoucher = async () => {
    if (!voucherCode) {
      setErrorMessage("Please enter a voucher code.");
      return;
    }

    setIsApplying(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const voucherData = {
        status: "",
        message: "",
        data: {
          createdAt: "",
          ttl: 0,
          SK: "",
          value: 0,
          percValue: 0,
          validTill: "",
          voucherCode: voucherCode,
        },
      };

      const response = await getUserVoucher(voucherData);

      if (response.status === "success") {
        const { value, percValue } = response.data;

        if (percValue) {
          const discountAmount = (orderTotal * percValue) / 100; // Calculate percentage discount
          applyDiscount(discountAmount);
          setSuccessMessage(
            // `Voucher applied successfully! You get ${percValue}% off.`,
            `${percValue}% off`,
          );
        } else if (value) {
          applyDiscount(value); // Apply the exact discount value
          setSuccessMessage(
            // `Voucher applied successfully! You get "₦"${value} off.`,
            `₦${value}`,
          );
        } else {
          setErrorMessage("Invalid voucher. No discount available.");
        }
      } else {
        setErrorMessage(
          response.message || "Failed to apply voucher. Please try again.",
        );
      }
    } catch (error) {
      setErrorMessage(
        "An error occurred while applying the voucher. Please try again.",
      );
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="mb-4 rounded-[20px] bg-[#F8F8F8] px-[15px] py-[24px] sm:px-[30px]">
      {/* Discount Code Title */}
      <div className="flex items-center justify-between">
        <Typography variant={"body-5"}>
          <h3>Discount code</h3>
        </Typography>
      </div>

      {/* Voucher Code Label */}
      <Typography variant={"body-7"}>
        <p className="mt-4">Voucher code</p>
      </Typography>

      {/* Voucher Code Input and Apply Button */}
      <div className="mt-2 flex items-center">
        <div className="relative w-full">
          {/* Input field */}
          <input
            type="text"
            placeholder="Paste Voucher code"
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
            className="w-full rounded-[12px] border border-[#DADADA] bg-[#F8F8F8] py-3 pl-4 pr-[60px] text-sm focus:outline-none focus:ring-2 focus:ring-[#00B140]"
          />

          {/* Voucher Image inside input field */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 transform">
            <SmallVoucher />
          </div>
        </div>

        {/* Apply Button */}
        <button
          className="ml-4 rounded-[20px] bg-[#00B140] px-6 py-3 text-sm text-white"
          onClick={handleApplyVoucher}
          disabled={isApplying}
        >
          {isApplying ? "Applying..." : "Apply"}
        </button>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <Typography variant={"body-7"} className="mt-2 text-red-500">
          {errorMessage}
        </Typography>
      )}

      {/* Success Message */}
      {successMessage && (
        <Typography
          variant={"body-7"}
          className="mt-2 flex w-full items-center justify-between px-2 pt-1 "
        >
          <span>DISCOUNT AMOUNT</span>
          <span> {successMessage}</span>
        </Typography>
      )}
    </div>
  );
}

export default DiscountContainer;
