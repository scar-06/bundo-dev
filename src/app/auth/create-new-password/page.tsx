"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { useEffectOnce } from "usehooks-ts";

import { changePin, changePinSchema, resetPasswordSchema } from "@/lib/app";
import cn from "@/lib/utils";
import { Button } from "@/components/ui/button";
import AuthWrapper from "@/components/auth/authWrapper";
import FormTextInput from "@/components/forms/formTextInput";
import { notify } from "@/app/(root)/_components/notifications/notify";

import { ApplicationRoutes } from "../../../../routes";

function CreateNewPassword() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") ?? "";

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(resetPasswordSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: changePinSchema) => await changePin({ ...data }),

    // If change pin is successful
    onSuccess: async () => {
      notify.success({ message: "pin changed successfully, please log in" });
      router.replace(ApplicationRoutes.AUTH_SIGN_IN);
    },
    onError: async (err) =>
      notify.error({
        message: "Invalid access token",
        subtitle: err?.message,
      }),
  });
  useEffectOnce(() => {
    if (token.length < 1) {
      router.replace(ApplicationRoutes.AUTH_FORGOT_PASSWORD);
      return;
    }
  });
  return (
    <AuthWrapper hideSlider wrapperFor="buyer">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            mutate({ pin: data.pin, "x-reset-token": token }),
          )}
          className="flex w-full flex-col items-center px-6 xlg:px-0"
        >
          <div className="mx-[auto] mb-[64px]  flex h-fit w-full max-w-[489px] flex-col rounded-3xl bg-white px-[14px] py-[29px]">
            <h3 className="mx-auto  mb-1 w-[80%]  max-w-[280px] text-center text-lg font-semibold text-tertiary-pale-950">
              Create New Password
            </h3>
            <span className="mx-auto text-xs font-light">
              Kindly enter your new Password to proceed
            </span>
            <div className="mx-[auto]  mb-7 mt-7 flex w-[90%] flex-col gap-7">
              <div className=" flex w-full flex-col gap-6">
                <FormTextInput
                  name="pin"
                  labelText="Password"
                  placeholder="Password"
                  type="password"
                />
                <FormTextInput
                  name="pinConfirmation"
                  labelText="Confirm Password"
                  placeholder="Confirm Password"
                  type="password"
                />
              </div>
            </div>
            <div
              className={cn(
                "mx-auto h-fit w-[90%]",
                isPending && "pointer-events-none",
              )}
            >
              <Button
                variant={"plain"}
                size={"plain"}
                type={"submit"}
                disabled={!methods.formState.isValid || isPending}
                loading={isPending}
                className={cn(
                  "mb-6 h-[54px] w-full bg-primary-500 font-medium  text-white hover:bg-primary-700",
                )}
              >
                {isPending ? "UPDATING..." : "UPDATE NEW PASSWORD"}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </AuthWrapper>
  );
}

export default CreateNewPassword;
