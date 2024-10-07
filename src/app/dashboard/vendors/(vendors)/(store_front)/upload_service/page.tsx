"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useVendorBusinessStore } from "@/store/business.store";
import { QUERY_KEYS } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";

import { getAllCategories } from "@/lib/app/category/services";
import { createServiceValidationSchema } from "@/lib/app/products/schema";
import {
  createProduct,
  CreateProductSchema,
} from "@/lib/app/products/services";
import { handleUploadMultiple } from "@/lib/app/uploads/services";
import { useGetBusiness } from "@/hooks/useGetBusiness";
import useStore from "@/hooks/useStateFromStore";
import { Button } from "@/components/ui/button";
import FileUploader from "@/components/forms/fileUploader";
import FormTextAreaInput from "@/components/forms/formTextAreaInput";
import FormTextInput from "@/components/forms/formTextInput";
import { MultiSearchSelect } from "@/components/forms/multiSelect";
import PageLoader from "@/components/loaders/pageLoader";
import { notify } from "@/app/(root)/_components/notifications/notify";

function Store() {
  const { isFetching: gettingBusiness } = useGetBusiness();
  const businessState = useStore(useVendorBusinessStore, (state) => state, [
    gettingBusiness,
  ]);
  const business = businessState?.business;
  const businessCategories = business?.business?.categories as string[];
  const businessType = business?.business?.business_type;
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data, isFetching, isError } = useQuery(
    {
      queryKey: [QUERY_KEYS.CATEGORIES],
      queryFn: async () => getAllCategories(),
      enabled: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
    queryClient,
  );
  const [uploading, setUploading] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: CreateProductSchema) =>
      await createProduct({ ...data }),
    onSuccess: async (data) => {
      if (data?.status === "success") {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.VENDOR_PRODUCTS],
        });
        notify.success({ message: "Service created successfully" });
        router.push("/dashboard/vendors/");
      }
    },
    onError: async (err) =>
      notify.error({
        message: "Unable to create service",
        subtitle: err?.message,
      }),
  });
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(createServiceValidationSchema),
  });

  if (isFetching) {
    return (
      <div>
        <PageLoader />
      </div>
    );
  }
  if (isError) {
    return <div>Error fetching categories...</div>;
  }
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

  return (
    <main className=" mb-8 w-full pb-8">
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
          <span className="mx-auto">Upload Service</span>{" "}
        </button>
      </div>
      <FormProvider {...methods}>
        <form
          className="mt-5 flex flex-col gap-6"
          onSubmit={methods.handleSubmit(
            async (data) => {
              const {
                name,
                description,
                categories,
                startingPriceRange,
                endingPriceRange,
                ...rest
              } = data;
              setUploading(true);
              try {
                const uploadRes = await handleUploadMultiple({
                  files: rest.pictures,
                });
                setUploading(false);
                mutate({
                  name,
                  description,
                  endingPriceRange,
                  startingPriceRange,
                  productType: "service",
                  // @ts-expect-error
                  pictures: uploadRes?.urls,
                  // @ts-expect-error
                  categories: categories?.map((c) => c.value),
                  available: true,
                  returnable: false,
                  quantity: 1,
                });
              } catch (error) {
                setUploading(false);
                notify.error({
                  message: "Error while uploading service files",
                  subtitle: "Try again",
                });
              }
            },
            (err) => console.log(err),
          )}
        >
          <div className="rounded-sm [&>div]:!h-fit  [&>div]:!min-h-[clamp(350px,8vw,400px)] [&>div]:w-full [&>div]:rounded-[inherit]">
            <FileUploader
              name={`pictures`}
              id={`file-input-cac`}
              snapType={""}
              isMultiple
              variant="type2"
            />
          </div>
          <FormTextInput
            name="name"
            labelText="Name / Title of Service"
            placeholder="Deep Wave Glueless Wig Human Hairgg"
            type="text"
          />
          <FormTextAreaInput
            name="description"
            labelText="Caption"
            placeholder="Describe the service"
            maxLength={250}
            height="193px"
          />

          <div className="grid grid-cols-2 gap-6">
            <div className="relative">
              <span className="absolute left-1 top-[36px] flex h-[30px] w-[30px] items-center  justify-center transition-all duration-300 ease-in-out">
                ₦
              </span>
              <FormTextInput
                name="startingPriceRange"
                labelText="Price range (starting)"
                placeholder="250,000"
                customStyle={{ paddingLeft: "30px" }}
                type="number"
              />
            </div>
            <div className="relative">
              <span className="absolute left-1 top-[36px] flex h-[30px] w-[30px] items-center  justify-center transition-all duration-300 ease-in-out">
                ₦
              </span>
              <FormTextInput
                name="endingPriceRange"
                labelText="Price range (ending)"
                placeholder="250,000"
                customStyle={{ paddingLeft: "30px" }}
                type="number"
              />
            </div>
          </div>
          <MultiSearchSelect
            name="categories"
            label="Select 3 Categories that describe this service"
            isMulti
            options={categoriesOptions || []}
            isDisabled={methods.watch("categories")?.length === 3}
            onChange={(value) =>
              methods.setValue(
                "categories",
                // @ts-expect-error
                value as { name: string; value: string }[],
              )
            }
          />

          <Button
            type="submit"
            disabled={uploading || isPending}
            loading={isPending || uploading}
            className="w-full"
          >
            {uploading
              ? "uploading service file..."
              : isPending
                ? "Creating Service..."
                : "ADD TO PAGE"}
          </Button>
        </form>
      </FormProvider>
    </main>
  );
}

export default Store;
