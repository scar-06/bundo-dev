"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { InfoIndicatorIcon } from "@/assets";
import { useVendorBusinessStore } from "@/store/business.store";
import { QUERY_KEYS } from "@/utils";
import { extractFirstElements, removeCommas } from "@/utils/helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { Tooltip } from "react-tooltip";

import { getAllCategories } from "@/lib/app/category/services";
import { editProductValidationSchema } from "@/lib/app/products/schema";
import {
  createProduct,
  CreateProductSchema,
  getProduct,
  updateProduct,
} from "@/lib/app/products/services";
import { handleUploadMultiple } from "@/lib/app/uploads/services";
import cn from "@/lib/utils";
import { useGetBusiness } from "@/hooks/useGetBusiness";
import useStore from "@/hooks/useStateFromStore";
import { Button } from "@/components/ui/button";
import FileUploader from "@/components/forms/fileUploader";
import FormTextAreaInput from "@/components/forms/formTextAreaInput";
import FormTextInput from "@/components/forms/formTextInput";
import { MultiSearchSelect } from "@/components/forms/multiSelect";
import Spinner from "@/components/loaders/buttonSpinner";
import PageLoader from "@/components/loaders/pageLoader";
import { notify } from "@/app/(root)/_components/notifications/notify";

import WeightGuidePopup from "../../../../_components/weightGuidePopup";

function EditProduct({ productId }: { productId: string }) {
  const { isFetching: gettingBusiness } = useGetBusiness();
  const businessState = useStore(useVendorBusinessStore, (state) => state, [
    gettingBusiness,
  ]);
  const business = businessState?.business;
  const businessCategories = business?.business?.categories as string[];
  const businessType = business?.business?.business_type;
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    data: productData,
    isFetching,
    isError,
    isFetched,
  } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCT],
    queryFn: async () => getProduct({ _id: productId }),
  });
  const {
    data,
    isFetching: fetchingCategory,
    isError: categoryError,
  } = useQuery(
    {
      queryKey: [QUERY_KEYS.CATEGORIES],
      queryFn: async () => getAllCategories(),
      enabled: isFetched,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
    queryClient,
  );
  const [uploading, setUploading] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: {
      id: string;
      data: Partial<CreateProductSchema>;
    }) => await updateProduct({ ...data }),
    onSuccess: async (data) => {
      if (data?.status === "success") {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.PRODUCT],
        });
        notify.success({ message: "product updated successfully" });
        router.push(`/dashboard/vendors/manage_products`);
      }
    },
    onError: async (err) =>
      notify.error({
        message: "Unable to update product",
        subtitle: err?.message,
      }),
  });

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(editProductValidationSchema),
  });

  // Reset form with product data when it's fetched
  useEffect(() => {
    if (productData?.product) {
      const { name, description, cost, categories, weight, quantity } =
        productData.product;
      methods.reset({
        name,
        description,
        cost,
        weight,
        quantity,
        categories: categories.map((category) => ({
          label: category,
          value: category,
        })),
      });
    }
  }, [productData, methods.reset]);
  const categories = data?.categories
    ?.filter((c) =>
      businessType === "products"
        ? !c.category.includes(" Services")
        : c.category.includes(" Services"),
    )
    .filter(
      (c) => businessCategories?.includes(c?.category?.toLocaleLowerCase()),
    );
  const categoriesOptions = categories?.map((category) => ({
    label: category.category,
    value: category.category,
  }));
  if (isFetching || fetchingCategory) {
    return <PageLoader />;
  }
  if (isError || categoryError) {
    return <div>Error fetching page data...</div>;
  }
  return (
    <main className=" mb-20 w-full pb-20">
      <div>
        <button
          onClick={router.back}
          className=" flex w-full cursor-pointer gap-2 text-lg font-semibold "
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" fill="white" fillOpacity="0.01" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.41379 11.4994H17.9998C18.265 11.4994 18.5194 11.6048 18.7069 11.7923C18.8944 11.9799 18.9998 12.2342 18.9998 12.4994C18.9998 12.7646 18.8944 13.019 18.7069 13.2065C18.5194 13.3941 18.265 13.4994 17.9998 13.4994H8.41379L12.2068 17.2924C12.3889 17.481 12.4897 17.7336 12.4875 17.9958C12.4852 18.258 12.38 18.5088 12.1946 18.6942C12.0092 18.8797 11.7584 18.9848 11.4962 18.9871C11.234 18.9894 10.9814 18.8886 10.7928 18.7064L5.29279 13.2064C5.10532 13.0189 5 12.7646 5 12.4994C5 12.2343 5.10532 11.98 5.29279 11.7924L10.7928 6.29243C10.9814 6.11027 11.234 6.00948 11.4962 6.01176C11.7584 6.01403 12.0092 6.1192 12.1946 6.30461C12.38 6.49002 12.4852 6.74083 12.4875 7.00303C12.4897 7.26523 12.3889 7.51783 12.2068 7.70643L8.41379 11.4994Z"
              fill="#333333"
            />
          </svg>
          <span className="mx-auto">Edit Item</span>{" "}
        </button>
      </div>
      <FormProvider {...methods}>
        <form
          className="mt-5 flex flex-col gap-6"
          onSubmit={methods.handleSubmit(async (data) => {
            const {
              name,
              description,
              categories,
              cost,
              quantity,
              weight,
              ...rest
            } = data;
            setUploading(true);
            try {
              const uploadRes = await handleUploadMultiple({
                // @ts-expect-error
                files: rest.pictures,
              });
              setUploading(false);
              mutate({
                id: productId,
                data: {
                  name,
                  description,
                  weight,
                  cost: removeCommas(cost),
                  quantity,
                  productType: "product",
                  pictures: [
                    // @ts-expect-error
                    ...productData?.product?.pictures,
                    // @ts-expect-error
                    ...uploadRes?.urls,
                  ],
                  // @ts-expect-error
                  categories: categories?.map((c) => c.value),
                  available: true,
                },
              });
            } catch (error) {
              setUploading(false);

              notify.error({
                message: "Error while uploading product files",
                subtitle: "Try again",
              });
            }
          })}
        >
          <div className="rounded-sm [&>div]:!h-fit  [&>div]:!min-h-[clamp(350px,8vw,400px)] [&>div]:w-full [&>div]:rounded-[inherit]">
            <FileUploader
              name={`pictures`}
              id={`file-input-cac`}
              snapType={""}
              isMultiple
              variant="type2"
              uploadedPreviews={productData?.product.pictures}
              productId={productId}
            />
          </div>
          <FormTextInput
            name="name"
            labelText="Name / Title of Product"
            placeholder="Deep Wave Glueless Wig Human Hair"
            type="text"
          />
          <FormTextAreaInput
            name="description"
            labelText="Caption"
            placeholder="Describes the product ..."
            maxLength={500}
            height="193px"
          />
          <div className="relative">
            <span className="absolute left-1 top-[36px] flex h-[30px] w-[30px] items-center  justify-center transition-all duration-300 ease-in-out">
              ₦
            </span>
            <FormTextInput
              name="cost"
              labelText="Price"
              placeholder="250,000"
              customStyle={{ paddingLeft: "30px" }}
              type={"text"}
              formatCurrency
            />{" "}
          </div>
          <div className="grid grid-cols-1 gap-1">
            <span className="flex w-full cursor-pointer items-center justify-between gap-1 text-xs text-tertiary-pale-950">
              Weight in kg
              <button
                type="button"
                id="tooltip-weight-info"
                className=" flex cursor-pointer items-center "
              >
                <span className="mr-1 text-red-600 underline">
                  Why is this important?
                </span>{" "}
                <InfoIndicatorIcon className="  text-red-600" />
              </button>
            </span>
            <FormTextInput
              name="weight"
              labelText=""
              placeholder="2kg"
              type="number"
            />
            <WeightGuidePopup />
          </div>
          <MultiSearchSelect
            name="categories"
            isMulti
            value={methods.watch("categories")}
            options={categoriesOptions || []}
            isDisabled={methods.watch("categories")?.length === 3}
            onChange={(value) =>
              methods.setValue(
                "categories",

                value as { label: string; value: string }[],
              )
            }
          />
          <div className="grid grid-cols-1 gap-6">
            <FormTextInput
              name="quantity"
              labelText="How many items of this product is available for purchase?"
              placeholder="1"
              type="number"
            />
          </div>
          <Button
            type="submit"
            disabled={uploading || isPending}
            loading={isPending || uploading}
            className="w-full"
          >
            {uploading
              ? "uploading product file..."
              : isPending
                ? "Updating product..."
                : "Update product"}
          </Button>
        </form>
      </FormProvider>
      <Tooltip
        place="top"
        className={cn(
          "z-[50] !w-[95vw] !max-w-[385px] !rounded-sm !bg-white !px-4 !py-6 !text-tertiary-pale-950 !opacity-100 !shadow-[0px_20px_24px_0px_#1111110F]",
        )}
        anchorSelect="#tooltip-weight-info"
        clickable
      >
        <div>
          <h3 className="mb-2 flex items-center gap-1 text-sm font-bold text-[#333333] ">
            Why the weight of this product matters
            <InfoIndicatorIcon className=" text-green-600" />
          </h3>
          <ul className="mb-4 list-disc pl-4 [&>li>a]:text-primary-600 [&>li>a]:underline [&>li]:text-xs [&>li]:font-light [&>li]:text-[#555555]">
            <li className="mb-2">
              The estimated or approximate weight of this product is very
              crucial in calculating the{" "}
              <span className="font-semibold">
                total estimated delivery fee{" "}
              </span>{" "}
              at checkout for customers who buys this product from your store.
            </li>
            <li>
              The <span className="font-semibold">higher the weight</span>, the
              higher the{" "}
              <span className="font-semibold">delivery estimate</span> might be
              for them
            </li>
          </ul>
          <h3 className="mb-2 flex items-center gap-1 text-sm font-bold text-[#333333]">
            What we advise
            <InfoIndicatorIcon className=" text-green-600" />
          </h3>
          <ul className="mb-4 list-disc pl-4 [&>li>a]:text-primary-600 [&>li>a]:underline [&>li]:text-xs [&>li]:font-light [&>li]:text-[#555555]">
            <li className="mb-2">
              We strongly advise that you input the exact or approximate weight
              of this product before uploading it for purchase.
            </li>
            <li className="mb-2">
              Check our guide for weight estimates of different products,
              however, if possible you can use your own weight checker
            </li>
          </ul>
        </div>
      </Tooltip>
    </main>
  );
}

export default EditProduct;
