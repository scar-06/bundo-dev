"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HttpStatus } from "@/utils";
import { formatNigerianPhoneNumber } from "@/utils/helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { FormProvider, useForm } from "react-hook-form";

import { SigninFormSchema, signinSchema, signUserIn } from "@/lib/app";
import cn from "@/lib/utils";
import { Button } from "@/components/ui/button";
import AuthWrapper from "@/components/auth/authWrapper";
import FormTextInput from "@/components/forms/formTextInput";
import { notify } from "@/app/(root)/_components/notifications/notify";

import { UserInfoProps } from "../../../../next-auth";
import { ApplicationRoutes } from "../../../../routes";

function Login() {
  const router = useRouter();
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(signinSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: SigninFormSchema) =>
      await signUserIn({ ...formData }),
    onSuccess: async (response) => {
      if (response?.status === "success") {
        // @ts-expect-error
        const user = response?.result as UserInfoProps;
        // Set the auth token in a cookie
        setCookie("auth_token", user, {
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });
        notify.success({
          message: "Login successful",
          subtitle: "Welcome back champ",
        });
        // Redirect based on user role
        if (user.role === "customer") {
          router.push(ApplicationRoutes.DASHBOARD_HOME_CUSTOMER);
        } else if (user.role === "vendor") {
          if (!user.vendorId?.business) {
            const businessType =
              user.vendorId?.business_type === "products"
                ? "product_vendor"
                : "service_vendor";
            router.push(
              `/auth/signup/vendor/onboarding/${businessType}/create_business`,
            );
          } else {
            router.push(ApplicationRoutes.DASHBOARD_HOME_VENDOR);
          }
        }
      } else {
        notify.error({
          message: "Unable to sign in",
          subtitle: response.error?.message || "An error occurred",
        });
      }
    },
    onError: (err) => {
      console.error(err);
      notify.error({
        message: "Unable to sign in",
        subtitle: err?.message || "An unexpected error occurred",
      });
    },
  });

  return (
    <AuthWrapper hideSlider wrapperFor="buyer">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            mutate({
              pin: data.pin,
              username: data.username.startsWith("+234")
                ? formatNigerianPhoneNumber(data.username).trim()
                : data.username.trim(),
            }),
          )}
          className="flex w-full flex-col items-center px-6 xlg:px-0"
        >
          <div className="mx-auto mb-16 flex h-fit w-full max-w-lg flex-col rounded-3xl bg-white px-4 py-6">
            <h3 className="mx-auto mb-2 text-center text-lg font-semibold text-tertiary-pale-950">
              Welcome Back!
            </h3>
            <span className="mx-auto text-xs font-light">
              Continue enjoying buying with ease
            </span>
            <div className="mx-auto my-6 flex w-11/12 flex-col gap-6">
              <FormTextInput
                name="username"
                labelText="Email"
                placeholder="mariaokon@gmail.com"
                type="text"
              />
              <div className="flex flex-col">
                <FormTextInput
                  name="pin"
                  labelText="Password"
                  placeholder="Password"
                  type="password"
                  showInputRequirements
                  showIndidcator
                />
                <Link
                  href="/auth/forgot-password"
                  className="mt-2 self-end text-xs text-tertiary-pale-950 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
            <div
              className={cn(
                "mx-auto w-11/12",
                !methods.formState.isValid && "pointer-events-none",
              )}
            >
              <Button
                variant="plain"
                size="plain"
                type={methods.formState.isValid ? "submit" : "button"}
                disabled={!methods.formState.isValid || isPending}
                loading={isPending}
                className="mb-6 h-14 w-full bg-primary-500 text-white hover:bg-primary-700"
              >
                {isPending ? "Signing in..." : "SIGN IN"}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
      <div className="text-center text-white">
        {`Don't have a Bundo account?`}{" "}
        <Link href="/auth/onboarding" className="text-[#FDE74C] underline">
          Create your account
        </Link>
      </div>
    </AuthWrapper>
  );
}

export default Login;
