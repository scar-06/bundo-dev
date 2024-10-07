"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { QUERY_KEYS } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";

import { getAllCategories } from "@/lib/app/category/services";
import { createStore, CreateStoreSchema } from "@/lib/app/vendors/services";
import cn from "@/lib/utils";
import { Button } from "@/components/ui/button";
import AuthWrapper from "@/components/auth/authWrapper";
import FormTextAreaInput from "@/components/forms/formTextAreaInput";
import FormTextInput from "@/components/forms/formTextInput";
import { MultiSearchSelect } from "@/components/forms/multiSelect";
import { notify } from "@/app/(root)/_components/notifications/notify";

function CreateBusiness() {
  const loc = usePathname();
  const vendorType: string = loc.split("/")[5];
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data } = useQuery(
    {
      queryKey: [QUERY_KEYS.CATEGORIES],
      queryFn: async () => getAllCategories(),
      enabled: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
    queryClient,
  );
  const categories = data?.categories?.filter((c) =>
    vendorType === "product_vendor"
      ? !c.category.includes(" Services")
      : c.category.includes(" Services"),
  );
  const categoriesOptions = categories?.map((category) => ({
    label: category.category,
    value: category.category,
  }));

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: Partial<CreateStoreSchema>) =>
      await createStore({ ...data }),
    onSuccess: async (data) => {
      if (data?.status === "success") {
        notify.success({ message: "store created successfully" });
        return router.push("/dashboard/vendors");
      }
      // @ts-expect-error
      throw new Error(data?.message.join("\n"));
    },
    onError: async (err) =>
      notify.error({
        message: "Error while creating store",
        subtitle: err?.message,
      }),
  });
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(
      Yup.object().shape({
        name: Yup.string().required("Name is required"),
        description: Yup.string().required("Description is required"),
        categories: Yup.array()
          .of(Yup.object().required())
          .min(1, "At least one category is required"),
      }),
    ),
  });

  return (
    <AuthWrapper hideSlider wrapperFor="vendor">
      <div className="mx-[auto] mb-[64px]  flex h-fit w-full max-w-[489px] flex-col rounded-3xl bg-white px-[14px] py-[29px]">
        <span className="mx-auto text-xs font-light">Step 2/2</span>
        <h3 className="mx-auto  mb-1 w-[80%]  max-w-[280px] text-center text-lg font-semibold text-tertiary-pale-950">
          Business Information
        </h3>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(async (data) => {
              const { name, description, categories } = data;
              mutate({
                name,
                description,
                // @ts-expect-error
                categories: categories?.map((c) => c.value),
              });
            })}
            className="flex w-full flex-col items-center px-0 xsm:px-6 xlg:px-0"
          >
            <div className="mx-[auto] mb-7 mt-7 flex w-[95%] flex-col gap-4 xsm:w-[90%]">
              <div className=" relative grid w-full  grid-cols-1 gap-4">
                <FormTextInput
                  name="name"
                  labelText="Business Name"
                  placeholder="Mira’s Thrift"
                  type="text"
                />
              </div>
              <div className=" flex w-full flex-col">
                <FormTextAreaInput
                  name="description"
                  labelText="Business Bio"
                  placeholder="What best describes your business"
                />
              </div>

              <MultiSearchSelect
                name="categories"
                label="Select 3 categories that describe your business"
                isMulti
                isSearchable
                options={categoriesOptions || []}
                isOptionDisabled={() =>
                  methods.watch("categories")?.length === 3
                }
                onChange={(value) =>
                  methods.setValue(
                    "categories",
                    // @ts-expect-error
                    value as { name: string; value: string }[],
                  )
                }
              />
            </div>
            <div
              // href={"/dashboard/customers"}
              className={cn("mx-auto h-fit w-[95%] xsm:w-[90%]")}
            >
              <Button
                variant={"plain"}
                size={"plain"}
                type="submit"
                className={cn(
                  "mb-6 h-[54px] w-full bg-primary-500 font-medium  text-white hover:bg-primary-700",
                )}
                loading={isPending}
                disabled={isPending || !methods.formState.isValid}
              >
                {!isPending ? "Create Business" : "Creating store"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </AuthWrapper>
  );
}

export default CreateBusiness;
