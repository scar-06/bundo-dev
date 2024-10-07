"use client";

import Link from "next/link";
import { ArrowBackIcon } from "@/assets";
import { useUserStore } from "@/store/user.store";
import { QUERY_KEYS } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { useStore } from "zustand";

import { accountInformationSchema } from "@/lib/app/user/schema";
import { updateUserInfo, UpdateUserInfoSchema } from "@/lib/app/user/services";
import queryClient from "@/lib/reactQuery/queryClient";
import { Button } from "@/components/ui/button";
import DisplayInputWrapper from "@/components/forms/displayInputWrapper";
import FormTextInput from "@/components/forms/formTextInput";
import { notify } from "@/app/(root)/_components/notifications/notify";

function AccountInformation() {
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
    <div className="grid">
      <div className="px-6 lg:px-0 lg:pl-16">
        <div className="w-full">
          {" "}
          <Link href="/dashboard/customers/account">
            <div className="flex cursor-pointer items-center">
              {" "}
              <ArrowBackIcon />
              <span className=" text-sm font-medium sm:text-base">
                Account Information
              </span>
            </div>
          </Link>
          <FormProvider {...methods}>
            <form>
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
                  defaultText={user?.phoneNumber ?? "--"}
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
    </div>
  );
}

export default AccountInformation;
