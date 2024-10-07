"use client";

import { useUserStore } from "@/store/user.store";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { useStore } from "zustand";

import { createNewPasswordSchema, updatePin, UpdatePinSchema } from "@/lib/app";
import { Button } from "@/components/ui/button";
import FormTextInput from "@/components/forms/formTextInput";
import { notify } from "@/app/(root)/_components/notifications/notify";
import GoBack from "@/app/dashboard/goBack";

function ChangePassword() {
  const { user } = useStore(useUserStore, (state) => state);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: UpdatePinSchema) => await updatePin({ ...data }),
    onSuccess: async (data) => {
      if (data?.status === "success") {
        notify.success({ message: "user pin updated successfully" });
      }
    },
    onError: async (err) =>
      notify.error({
        message: "Error while updating user's pin information",
        subtitle: err?.message,
      }),
  });

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(createNewPasswordSchema),
  });
  return (
    <div className="w-full px-6 lg:pl-16">
      <div>
        <div className="flex w-full max-w-md items-center justify-between pr-4">
          <div className="max-w-[200px]">
            {" "}
            <GoBack text="Change Password" />
          </div>
          <div className="isolate flex aspect-square w-[clamp(50px,_8vw,_50px)] items-center justify-center rounded-full bg-[#34A853]">
            <span className="font-bold text-[#fff]">
              {user?.firstName?.slice(0, 1)}
            </span>
          </div>
        </div>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(({ oldPin, newPin }) => {
              mutate({ oldPin, newPin });
            })}
          >
            <div className=" mt-8 flex max-w-md flex-col gap-6">
              <FormTextInput
                name="oldPin"
                labelText="Old Password"
                placeholder="Enter old password"
                type="password"
              />
              <FormTextInput
                name="pin"
                labelText="New Password"
                placeholder="Enter new password"
                type="password"
              />
              <FormTextInput
                name="newPin"
                labelText="Confirm New Password"
                placeholder="Enter new password"
                type="password"
              />

              <Button
                type="submit"
                className="mt-4"
                disabled={!methods.formState.isValid || isPending}
                loading={isPending}
              >
                {isPending ? "Updating ..." : "UPDATE PASSWORD"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default ChangePassword;
