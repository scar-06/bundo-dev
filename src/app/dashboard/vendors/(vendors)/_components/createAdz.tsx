"use client";

import React, { useState } from "react";
import Image from "next/image";
import { adzAlertIcon } from "@/assets";
import { APP_CONFIG } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";

import { createAds, createAdsReqData } from "@/lib/app/ads/services";
import { Product } from "@/lib/app/vendors/services";
import cn from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import Drawer from "@/components/drawer/drawer";
import InputRangeComponent from "@/components/forms/formRangeInput";
import { SingleSearchSelect } from "@/components/forms/singleSearchSelect";
import { notify } from "@/app/(root)/_components/notifications/notify";

// Define the Yup schema for form validation
const adFormSchema = Yup.object().shape({
  goal: Yup.string().required("Goal is required"),
  duration: Yup.number()
    .required("Duration is required")
    .min(1, "Minimum duration is 1 day")
    .max(28, "Maximum duration is 28 days"),
});

function CreateAdz({ product }: { product: Product }) {
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(adFormSchema),
  });
  const [showCreateAdz, setShowCreateAdz] = useState(false);
  const [goal, setGoal] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const { errors } = methods.formState;

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: createAdsReqData) => await createAds(formData),
    onSuccess: async (response) => {
      // @ts-expect-error
      const { authorization_url } = response?.data;
      window.open(authorization_url, "_self");
      setShowCreateAdz(false);
    },
    onError: async (err) => {
      notify.error({
        message: "Error while creating ads",
        subtitle: err?.message,
      });
    },
  });

  return (
    <div>
      <button
        type="button"
        onClick={() => setShowCreateAdz(!showCreateAdz)}
        className="group  flex h-fit w-fit items-center justify-between gap-1"
      >
        <span className="relative h-[32px] w-[32px] overflow-hidden">
          <Image
            src={adzAlertIcon}
            fill
            alt="adzAlert"
            className="object-contain"
          />
        </span>
        <small className="hidden cursor-pointer rounded-full bg-white px-[7.6px] group-hover:flex">
          Boost
        </small>
      </button>

      <Modal
        isOpen={showCreateAdz}
        closeModal={() => setShowCreateAdz(!showCreateAdz)}
      >
        <button
          onClick={() => setShowCreateAdz(!showCreateAdz)}
          className="fixed right-0 top-0 z-[32] hidden h-[50px] w-[50px] rounded-bl-3xl bg-white font-bold text-black/90 shadow-2xl mmd:block"
        >
          &times;
        </button>
        <div className="hideScrollBar flex h-fit w-fit items-center justify-center overflow-y-auto text-[unset]">
          <div className="isolate mx-[auto] my-[50px] flex h-fit w-[90%] max-w-[489px] flex-col rounded-3xl bg-white px-6 pb-[18px] pt-[29px] font-tv2SansDisplay sm:w-full">
            <h3 className="mx-auto mb-1 w-[80%] max-w-[280px] text-center text-lg font-semibold text-tertiary-deep-green-950">
              Create Product Ads
            </h3>
            <span className="text-textiary-pale-900 mx-auto text-xs font-light">
              Get more customers & sales on this product
            </span>

            <div className="relative isolate mx-auto mb-9 mt-6 aspect-square w-full sm:w-[370px]">
              <Image
                src={product?.pictures[0]}
                fill
                alt={product?.name}
                className="object-cover"
              />
            </div>
            <p className="mx-auto mb-6 w-full max-w-[427px] text-sm font-light leading-5 text-[#11270B]">
              Boosting this product item will help it target the right customers
              and get the visibility it deserves both on the Home and
              Marketplace. Once the duration of the Ads is elapsed, it will no
              longer appear under ‘Ads’.
            </p>

            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(async (data) => {
                  await mutate({
                    productId: product?._id,
                    duration: data.duration,
                    name: product.name,
                    cost: product.cost,
                    amount: data?.duration * 1000,
                    description: product?.description,
                    pictures: product?.pictures,
                    callbackUrl: `${APP_CONFIG.siteBaseUrl}dashboard/vendors/payments`,
                  });
                })}
              >
                <div className="flex flex-col items-start gap-2">
                  <label className="cursor-pointer text-xs text-tertiary-pale-950">
                    What’s your goal for this Ad?
                  </label>
                  <SingleSearchSelect
                    name="goal"
                    isSearchable={false}
                    options={[
                      {
                        value: "More sales for this product",
                        label: "More sales for this product",
                      },
                      {
                        value: "New customers for my Business",
                        label: "New customers for my Business",
                      },
                      {
                        value: "Business Referral",
                        label: "Business Referral",
                      },
                    ]}
                    value={goal}
                    onChange={(value) => {
                      methods.setValue("goal", value?.value as string);
                      setGoal(value);
                    }}
                  />
                  {errors.goal && (
                    <p className="text-xs text-red-500">
                      {errors.goal.message}
                    </p>
                  )}
                </div>
                <div className="mt-4 w-full">
                  <InputRangeComponent
                    name="duration"
                    label="How long do you want this Ad to run for? (*1 day = N1,000)"
                    min={1}
                    max={28}
                    step={1}
                  />
                </div>
                <div className={cn("mx-auto mt-12 h-fit")}>
                  <Button
                    variant="plain"
                    size="plain"
                    type="submit"
                    disabled={isPending}
                    loading={isPending}
                    className={cn(
                      "mb-6 h-[54px] w-full bg-primary-500 font-medium text-white hover:bg-primary-700",
                    )}
                  >
                    {isPending ? "Craeting Ads.." : "Create Ads"}
                  </Button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CreateAdz;
