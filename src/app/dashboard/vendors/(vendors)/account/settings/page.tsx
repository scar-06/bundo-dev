"use client";

import React, { useEffect, useState } from "react";
import { useUserStore } from "@/store/user.store";
import { QUERY_KEYS } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useStore } from "zustand";

import {
  getBusiness,
  ICreatVisibilitySchema,
  setVisibility,
} from "@/lib/app/vendors/services";
import queryClient from "@/lib/reactQuery/queryClient";
import { useGetBusiness } from "@/hooks/useGetBusiness";
import FormTextInput from "@/components/forms/formTextInput";
import { notify } from "@/app/(root)/_components/notifications/notify";
import GoBack from "@/app/dashboard/goBack";

import SwitchContainer from "./_components/switch";

interface FormValues {
  visibility: boolean;
}

function Settings() {
  const { user } = useStore(useUserStore, (state) => state);

  const {
    isFetching,
    isError,
    isSuccess,
    data: businessData,
  } = useQuery(
    {
      queryKey: [QUERY_KEYS.BUSINESS],
      queryFn: async () => getBusiness(),
      enabled: true,
      refetchOnMount: false,
      refetchOnWindowFocus: true,
      retry: 1,
    },
    queryClient,
  );
  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      visibility: businessData?.business?.visibility || false,
    },
  });

  const { visibility } = methods.watch();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: { id: string; data: ICreatVisibilitySchema }) =>
      await setVisibility({ ...data }),
    onSuccess: async (data) => {
      if (data?.status === "success") {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.BUSINESS],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.PRODUCTS],
        });
        notify.success({ message: "Visibility has been updated" });
      }
    },
    onError: async (err) =>
      notify.error({
        message: "Unable to update visibility",
        subtitle: err?.message,
      }),
  });

  const onSubmit = (data: FormValues) => {
    const vendorId = businessData?.business?._id || "";
    mutate({
      id: vendorId,
      data: { visibility: data.visibility },
    });
  };

  const handleToggle = () => {
    const currentVisibility = methods.getValues("visibility");
    methods.setValue("visibility", !currentVisibility);
    methods.handleSubmit(onSubmit)();
  };

  useEffect(() => {
    if (businessData?.business && !isFetching) {
      methods.setValue("visibility", businessData.business.visibility);
    }
  }, [businessData, isFetching]);
  return (
    <div className=" w-full">
      <div className="flex w-full max-w-md items-center justify-between pr-4">
        <div className="max-w-[150px]">
          {" "}
          <GoBack text="Settings" />
        </div>
        <div className="isolate flex aspect-square w-[clamp(50px,_8vw,_50px)] items-center justify-center rounded-full bg-[#34A853]">
          <span className="font-bold text-[#fff]">
            {" "}
            {user?.firstName.slice(0, 1)}
          </span>
        </div>
      </div>

      {/* <div className="mt-6 w-full max-w-md border border-red-600" /> */}
      <div className="my-10 flex w-full max-w-md items-center justify-between pr-4">
        <span className="text-xs font-medium">
          Show my Business on Marketplace
        </span>
        <div className="my-4">
          <FormProvider {...methods}>
            <form>
              <Controller
                name="visibility"
                control={methods.control}
                render={({
                  field: { onChange, value, ...fields },
                  fieldState: { error },
                }) => (
                  <SwitchContainer
                    name="visibility"
                    handleToggle={() => handleToggle()}
                  />
                )}
              />
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

export default Settings;
