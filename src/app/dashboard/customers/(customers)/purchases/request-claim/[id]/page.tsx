"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user.store";
import { QUERY_KEYS } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useStore } from "zustand";

import { createClaimSchema } from "@/lib/app/orders/schema";
import { fileClaimReq, fileClaimReqReqData } from "@/lib/app/orders/services";
import { handleUploadMultiple } from "@/lib/app/uploads/services";
import { getUserOrders } from "@/lib/app/user/services";
import queryClient from "@/lib/reactQuery/queryClient";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/fileUpload";
import FormTextInput from "@/components/forms/formTextInput";
import { MultiSearchSelect } from "@/components/forms/multiSelect";
import GoBack from "@/components/goBack";
import DotLoader from "@/components/loaders/dotLoader";
import QuillComponent from "@/components/quill";
import { notify } from "@/app/(root)/_components/notifications/notify";

function FileClaim(props: any) {
  const user = useStore(useUserStore, (state) => state.user);
  const itemId = props?.params?.id ?? "";
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { data, isFetching: isFetchingHistory } = useQuery(
    {
      queryKey: [
        QUERY_KEYS.GET_PURCHASES,
        {
          page: 1,
          limit: 50,
        },
      ],
      queryFn: getUserOrders,
      enabled: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
    queryClient,
  );
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: fileClaimReqReqData) =>
      await fileClaimReq({ ...data }),
    onSuccess: async (data) => {
      if (data?.status === "success") {
        notify.success({ message: "Request submitted successfully" });
        router.push("/dashboard/customers/purchases");
      }
    },
    onError: async (err) =>
      notify.error({
        message: "Unable to file claim",
        subtitle: err?.message,
      }),
  });
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(createClaimSchema),
  });

  useEffect(() => {
    if (isMounted) {
      setIsMounted(true);
    }
  }, []);
  if (isFetchingHistory) {
    return (
      <div className="m-auto flex h-screen w-full items-center justify-center">
        <DotLoader />
      </div>
    );
  }
  const order = data?.data?.allOrders.filter((item) => item._id === itemId)[0];

  return (
    <div className="container mx-auto px-6 pb-10 ">
      <div className="mb-8">
        <GoBack text="Request return" noMargin />
      </div>
      <div className="  flex w-full items-center pb-10">
        <FormProvider {...methods}>
          <form
            className="mx-auto mt-6 flex w-full max-w-[471px] flex-col gap-4"
            onSubmit={methods.handleSubmit(
              async (data) => {
                const { reasonForReturn, additionalInfo, quantity, ...rest } =
                  data;

                setUploading(true);
                try {
                  const uploadRes = await handleUploadMultiple({
                    files: rest.pictures,
                  });

                  mutate({
                    itemId,
                    // @ts-expect-error
                    reasonForReturn: reasonForReturn?.value,
                    additionalInfo,
                    claimType: "Return",
                    businessName: order?.businessName as string,
                    productId: order?.productId as string,
                    // @ts-expect-error
                    batchId: order?.batchId,
                    orderId: order?.orderId as string,
                    // @ts-expect-error
                    pictures: uploadRes?.urls as string[],
                    quantity: Number(quantity),
                    // @ts-expect-error
                    productName: order?.productName,
                    cost: order?.cost as string,
                    customerName: `${user?.firstName} ${user?.lastName}`,
                  });
                  setUploading(false);
                } catch (error) {
                  setUploading(false);
                  notify.error({
                    message: "Error while uploading claim files",
                    subtitle: "Try again",
                  });
                }
              },
              (err) => console.log(err),
            )}
          >
            <MultiSearchSelect
              name="reasonForReturn"
              label="Reason for return"
              isMulti={false}
              options={[
                { label: "Damaged item", value: "damaged item" },
                { label: "Wrong item", value: "wrong item" },
                { label: "Defective item", value: "defective item" },
                { label: "Quality issues", value: "quality issues" },
                { label: "Size/fit issues", value: "size/fit issues" },
                { label: "Other", value: "other" },
              ]}
              onChange={(value) =>
                methods.setValue(
                  "reasonForReturn",
                  // @ts-expect-error
                  value as { name: string; value: string },
                )
              }
            />
            <FormTextInput
              name="quantity"
              labelText="Quantity "
              placeholder="The quantity of items"
              type="number"
            />
            <div className="flex flex-col gap-2">
              <label className="text-[12px] " htmlFor="additionalInfo">
                Additional Information
              </label>
              <div className={"QuillWrapperC"}>
                <Controller
                  name="additionalInfo"
                  control={methods.control}
                  defaultValue=""
                  render={({ field }) =>
                    isMounted ? (
                      <div />
                    ) : (
                      <QuillComponent
                        theme="snow"
                        value={field.value}
                        onChange={field.onChange}
                        error={!!methods.formState.errors.additionalInfo}
                        errorText={
                          (methods.formState.errors.additionalInfo
                            ?.message as string) ?? ""
                        }
                      />
                    )
                  }
                />
              </div>
            </div>
            <FileUpload
              name="pictures"
              setValue={methods.setValue}
              error={!!methods.formState.errors.pictures}
              errorText={methods.formState.errors.pictures?.message}
            />
            <Button
              disabled={uploading || isPending}
              className="cursor-pointer"
              type="submit"
            >
              {uploading
                ? "uploading product file..."
                : isPending
                  ? "Sumitting request..."
                  : "Submit Request"}
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default FileClaim;
