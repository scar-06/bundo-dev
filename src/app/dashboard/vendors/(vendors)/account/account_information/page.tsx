"use client";

import Link from "next/link";
import { ArrowBackIcon } from "@/assets";
import { useUserStore } from "@/store/user.store";
import { QUERY_KEYS } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { useStore } from "zustand";

import { accountInformationSchema } from "@/lib/app/user/schema";
import { updateUserInfo, UpdateUserInfoSchema } from "@/lib/app/user/services";
import { Button } from "@/components/ui/button";
import DisplayInputWrapper from "@/components/forms/displayInputWrapper";
import { notify } from "@/app/(root)/_components/notifications/notify";
import GoBack from "@/app/dashboard/goBack";

function AccountInformation() {
  const queryClient = useQueryClient();

  const { user } = useStore(useUserStore, (state) => state);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: UpdateUserInfoSchema) =>
      await updateUserInfo({ ...data }),
    onSuccess: async (data) => {
      if (data?.status === "success") {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.USER],
        });
        notify.success({ message: "user updated successfully" });
      }
    },
    onError: async (err) =>
      notify.error({
        message: "Error while updating user information",
        subtitle: err?.message,
      }),
  });
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: user?.firstName,
      phoneNumber: user?.phoneNumber,
      lastName: user?.lastName,
      userName: user?.email,
    },
    resolver: yupResolver(accountInformationSchema),
  });
  return (
    <div className=" w-full pb-20">
      <div className="w-full">
        <div className="flex w-full max-w-md items-center justify-between pr-4">
          <div className="max-w-[250px]">
            {" "}
            <GoBack text="Account Information" />
          </div>
          <div className="isolate flex aspect-square w-[clamp(50px,_8vw,_50px)] items-center justify-center rounded-full bg-[#34A853]">
            <span className="font-bold text-[#fff]">
              {user?.firstName?.slice(0, 1)}
            </span>
          </div>
        </div>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit((data) => {
              mutate(data);
            })}
          >
            <div className=" mt-8 flex flex-col gap-6 lg:max-w-md xlg:max-w-md">
              <div className="flex items-center gap-3">
                <DisplayInputWrapper
                  name="firstName"
                  labelText="First Name"
                  placeholder="firstName"
                  type="text"
                  disabled
                  setValue={(str) => methods.setValue("firstName", str)}
                  defaultText={user?.firstName ?? "firstName"}
                />
                <DisplayInputWrapper
                  name="lastName"
                  labelText="Last Name"
                  placeholder="lastname"
                  type="text"
                  disabled
                  setValue={(str) => methods.setValue("lastName", str)}
                  defaultText={user?.lastName ?? "lastName"}
                />
              </div>
              <DisplayInputWrapper
                name="userName"
                labelText="Email Address"
                placeholder="email address"
                type="email"
                disabled
                defaultText={user?.email ?? "userName"}
                setValue={(str) => methods.setValue("userName", str)}
              />
              {/* <DisplayInputWrapper
                name="phoneNumber"
                labelText="Phone Number"
                placeholder="phone number"
                type="phone"
                disabled
                defaultText={user?.phoneNumber ?? "phoneNumber"}
                setValue={(str) =>
                  methods.setValue("phoneNumber", "+234" + str.slice(1))
                }
              /> */}
              <Button
                type="submit"
                className="mt-8"
                // disabled={!methods.formState.isValid || isPending}
                loading={isPending}
                disabled
              >
                {isPending ? "Updating ..." : "UPDATE ACCOUNT INFORMATION"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default AccountInformation;
