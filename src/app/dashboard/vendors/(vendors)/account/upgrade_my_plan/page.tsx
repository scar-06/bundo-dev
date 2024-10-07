"use client";

import React, { useState } from "react";
import { CloseIcon } from "@/assets";
import { useVendorBusinessStore } from "@/store/business.store";
import { ModifiedUser, useUserStore } from "@/store/user.store";
import { APP_CONFIG, QUERY_KEYS } from "@/utils";
import { currency } from "@/utils/currencyFormatter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useStore } from "zustand";

import {
  Business,
  createSubscription,
  disableSubscription,
  getListSubscriptionPlan,
  ICreateSubscriptionSchema,
  IDisableSubscriptionSchema,
  ISubscriptionPlan,
} from "@/lib/app/vendors/services";
import { generateChecklist } from "@/lib/utils";
import { useGetBusiness } from "@/hooks/useGetBusiness";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import DotLoader from "@/components/loaders/dotLoader";
import { notify } from "@/app/(root)/_components/notifications/notify";
import GoBack from "@/app/dashboard/goBack";

function UpgradePlanPage() {
  const user = useStore(useUserStore, (state) => state.user);
  const business = useStore(useVendorBusinessStore, (state) => state.business);
  const checkList = generateChecklist(
    user as ModifiedUser,
    business?.business as Business,
  );

  const [activeTab, setActiveTab] = useState("tab-monthly");
  const [uploading, setUploading] = useState(false);
  const [planName, setPlanName] = useState("");
  const [type, setType] = useState("");
  const [openUpgradeConfirmeModal, setOpenUgradeConfirmModal] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: mutateSubscription } = useMutation({
    mutationFn: async (data: ICreateSubscriptionSchema) =>
      await createSubscription({ ...data }),
    onSuccess: async (response) => {
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.BUSINESS],
      });
      const { authorization_url } = response?.data;
      window.open(authorization_url, "_self");
      setUploading(false);
      setPlanName("");
      setType("");
      setOpenUgradeConfirmModal(false);
      if (response?.status === "success") {
        notify.success({ message: " payment initiated" });
      }
    },
    onError: async (err) => {
      setUploading(false);
      notify.error({
        message: "Error while subscribing",
        subtitle: err?.message,
      });
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (data: IDisableSubscriptionSchema) =>
      await disableSubscription({ ...data }),
    onSuccess: async (response) => {
      if (response?.status === "success") {
        notify.success({ message: "successfully" });
      }
    },
    onError: async (err) => {
      setUploading(false);
      notify.error({
        message: "Error while subscribing",
        subtitle: err?.message,
      });
    },
  });

  const {
    data: subscriptionPlanData,
    isFetching,
    isError,
  } = useQuery(
    {
      queryKey: [QUERY_KEYS.SUBSCRIPTION_PLAN],

      queryFn: getListSubscriptionPlan,
      enabled: true,

      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },

    queryClient,
  );

  const order = ["FREE", "BASIC", "PREMIUM"];

  const monthlyPlans: ISubscriptionPlan[] = Array.isArray(
    subscriptionPlanData?.plans?.monthlyPlans,
  )
    ? order
        .map(
          (item) =>
            subscriptionPlanData.plans?.monthlyPlans?.find(
              (plan) => plan?.name === item,
            ),
        )
        .filter((plan): plan is ISubscriptionPlan => plan !== undefined)
    : [];

  const monthlyPlansData: ISubscriptionPlan[] = [
    subscriptionPlanData?.plans?.freePlan as ISubscriptionPlan,
    ...monthlyPlans,
  ];

  const quaterlyPlans: ISubscriptionPlan[] = Array.isArray(
    subscriptionPlanData?.plans?.quarterlyPlans,
  )
    ? order
        .map(
          (item) =>
            subscriptionPlanData.plans?.quarterlyPlans?.find(
              (plan) => plan?.name === item,
            ),
        )
        .filter((plan): plan is ISubscriptionPlan => plan !== undefined)
    : [];

  const quaterlyPlansData: ISubscriptionPlan[] = [
    subscriptionPlanData?.plans?.freePlan as ISubscriptionPlan,
    ...quaterlyPlans,
  ];

  const annualPlans: ISubscriptionPlan[] = Array.isArray(
    subscriptionPlanData?.plans?.annualPlans,
  )
    ? order
        .map(
          (item) =>
            subscriptionPlanData.plans?.annualPlans?.find(
              (plan) => plan?.name === item,
            ),
        )
        .filter((plan): plan is ISubscriptionPlan => plan !== undefined)
    : [];

  const annuallyPlansData: ISubscriptionPlan[] = [
    subscriptionPlanData?.plans?.freePlan as ISubscriptionPlan,
    ...annualPlans,
  ];

  const businessPlan = business?.business?.plan;

  const businessHierachy = [
    ...monthlyPlansData,
    ...quaterlyPlansData?.slice(1),
    ...annuallyPlansData?.slice(1),
  ];

  const checkRenderDescription = (name: string, type: string) => {
    const rSk = `PLAN#${name}_${type}`;
    const bPlanCode = businessPlan?.planCode;
    const rSkIndex = businessHierachy?.findIndex((item) => item?.SK === rSk);
    const bPlanCodeIndex = businessHierachy?.findIndex(
      (item) => item?.planCode === bPlanCode,
    );

    if (rSkIndex > bPlanCodeIndex) {
      return "Upgrading your plan means you are forfeiting your current plan, and this new plan is taking effect immediately";
    } else if (rSkIndex === bPlanCodeIndex) {
      return "You are currently on this plan, and this new plan is taking effect immediately";
    } else {
      return "Downgrading your plan means you are forfeiting your current plan, and this new plan is taking effect immediately";
    }
  };

  const handleSubmitData = (name: string, type: string) => {
    if (businessPlan?.planName !== "FREE") {
      mutate({
        subscriptionCode: businessPlan?.subscriptionCode || "",
        emailToken: businessPlan?.emailToken || "",
      });
    }
    setUploading(true);
    mutateSubscription({
      planName: `${name}_${type}`,
      callbackUrl: `${APP_CONFIG.siteBaseUrl}dashboard/vendors/payments`,
    });
  };

  return (
    <div className=" flex w-full flex-col ">
      <div className="w-fit  min-w-[145px]">
        {" "}
        <GoBack text="Upgrade my plan" />
      </div>
      <div className="text-xs md:text-sm lg:text-base">
        {businessPlan?.planName === "FREE" ? (
          <div className="mt-6 max-w-[600px]">
            You are currently on the{" "}
            <b className=" text-primary-500">
              {businessPlan?.planName?.split("_")?.[0]}
            </b>{" "}
            plan. Upgrade to the <b className=" text-primary-500">BASIC</b> or{" "}
            <b className=" text-primary-500"> PREMIUM </b> plan to enjoy more
            features that make doing business easier. Compare plans below:
          </div>
        ) : businessPlan?.planName === "BASIC" ? (
          <div className="mt-8 max-w-[600px]">
            You are currently on the{" "}
            <b className=" text-primary-500">
              {businessPlan?.planName?.split("_")?.[0]}
            </b>{" "}
            plan. Upgrade to the
            <b className=" text-primary-500"> PREMIUM </b> plan to enjoy more
            features that make doing business easier. Compare plans below:
          </div>
        ) : (
          <div className="mt-8 max-w-[600px]">
            You are currently on the{" "}
            <b className=" text-primary-500">
              {businessPlan?.planName?.split("_")?.[0]}
            </b>{" "}
            plan
          </div>
        )}
      </div>

      <div
        className=" mb-4 mt-6 flex 
      flex-col gap-6 rounded-[25px]"
      >
        <div className="flex w-full  justify-center">
          <Tabs
            defaultValue={activeTab}
            value={activeTab}
            onValueChange={(e) => setActiveTab(e)}
            className="mb-[90px] mt-[-10px] flex w-full flex-col justify-center overflow-x-hidden md:mt-[10px]"
          >
            <TabsList className=" mx-auto mb-[20px] flex  h-fit w-fit scale-[0.85] gap-[20px] rounded-lg px-[20px] py-[12px] shadow-[0px_0px_1px_0px_rgba(9,_30,_66,_0.31),_0px_18px_28px_0px_rgba(9,_30,_66,_0.15)] ssm:scale-[1] sm:mb-[60px]">
              <TabsTrigger
                value="tab-monthly"
                className="w-fit rounded-sm bg-transparent font-normal text-tertiary-pale-950 data-[state=active]:bg-[#1E404E] data-[state=active]:p-[clamp(12px,_5vw,_14px)_clamp(_26px,_5vw,_34px)] data-[state=active]:font-semibold data-[state=active]:text-white"
              >
                <span className="m-auto whitespace-nowrap text-center text-xs ">
                  Monthly
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="tab-quarterly"
                className="w-fit rounded-sm bg-transparent font-normal text-tertiary-pale-950 data-[state=active]:bg-[#1E404E] data-[state=active]:p-[clamp(12px,_5vw,_14px)_clamp(_26px,_5vw,_34px)] data-[state=active]:font-semibold data-[state=active]:text-white"
              >
                {" "}
                <span className="m-auto whitespace-nowrap text-center text-xs ">
                  Quarterly
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="tab-annually"
                className="w-fit rounded-sm bg-transparent p-[12px] font-normal text-tertiary-pale-950 data-[state=active]:bg-[#1E404E] data-[state=active]:p-[clamp(12px,_5vw,_14px)_clamp(_26px,_5vw,_34px)] data-[state=active]:font-semibold data-[state=active]:text-white"
              >
                {" "}
                <span className="m-auto whitespace-nowrap text-center text-xs ">
                  Annually
                </span>
              </TabsTrigger>
            </TabsList>
            {isFetching ? (
              <div className="flex h-[35vh] w-full items-center justify-center ">
                <DotLoader />
              </div>
            ) : (
              <>
                {activeTab === "tab-monthly" && (
                  <TabsContent
                    value="tab-monthly"
                    className="grid w-full  grid-cols-1 gap-6 p-3 md:grid-cols-2 lg:grid-cols-3"
                  >
                    {/* <div className=" grid gap-3"> */}
                    {monthlyPlansData?.map((prop) => {
                      return (
                        <div
                          key={Math.random()}
                          className={`flex h-full  w-full max-w-[388px] cursor-pointer flex-col items-center  gap-4 rounded-2xl border-2  p-6 ring-[1px] ring-primary-500 transition-all duration-500 ease-in-out hover:shadow-xl hover:ring md:w-full md:p-10 ${
                            businessPlan?.planCode === `${prop?.planCode}`
                              ? "border-2 ring-[3px]"
                              : ""
                          }`}
                        >
                          <span className="text-sm font-semibold md:text-base">
                            {prop?.name}
                          </span>
                          <span className="rounded-3xl bg-[#D6EEDD] px-2 py-1 text-xs sm:text-sm">
                            {" "}
                            {prop?.subName}
                          </span>
                          <div>
                            {" "}
                            <span className="text-3xl font-semibold">
                              {currency(prop?.amount, {
                                showCurrency: false,
                              })}
                            </span>
                            <span className="font-semibold">₦/month</span>
                          </div>
                          {prop?.features?.map((item: any) => (
                            <div
                              className="mt-2 flex h-[30%] w-full flex-col gap-3"
                              key={Math.random()}
                            >
                              <ul className=" list-disc text-xs md:text-base">
                                <li>{item} </li>
                              </ul>
                            </div>
                          ))}
                          <div className={`mt-4 flex h-full w-full items-end`}>
                            <Button
                              className="w-full"
                              onClick={
                                checkList[0]?.status === "pending"
                                  ? () =>
                                      notify.error({
                                        message:
                                          "Account verification is still pending",
                                      })
                                  : () => {
                                      if (
                                        prop?.name === "FREE" &&
                                        businessPlan?.planName === "FREE"
                                      ) {
                                        return notify.success({
                                          message:
                                            "You already on the free plan",
                                        });
                                      } else {
                                        setPlanName(prop?.name);
                                        setType("monthly");
                                        setOpenUgradeConfirmModal(true);
                                      }
                                    }
                              }
                              loading={
                                prop?.name === planName
                                  ? uploading
                                  : prop?.name === planName
                                    ? uploading
                                    : prop?.name === planName && uploading
                              }
                            >
                              CONTINUE
                            </Button>
                          </div>
                        </div>
                      );
                    })}

                    {/* </div> */}
                  </TabsContent>
                )}
                {activeTab === "tab-quarterly" && (
                  <TabsContent
                    value="tab-quarterly"
                    className="grid w-full grid-cols-1 gap-6 p-3 md:grid-cols-2 lg:grid-cols-3"
                  >
                    {quaterlyPlansData?.map((prop) => {
                      return (
                        <div
                          key={Math.random()}
                          className={`flex h-full  w-full max-w-[388px] cursor-pointer flex-col items-center  gap-4 rounded-2xl border-2  p-6 ring-[1px] ring-primary-500 transition-all duration-500 ease-in-out hover:shadow-xl hover:ring md:w-full md:p-10 ${
                            businessPlan?.planCode === `${prop?.planCode}`
                              ? "border-2 ring-[3px]"
                              : ""
                          }`}
                        >
                          <span className="text-sm font-semibold md:text-base">
                            {prop?.name}
                          </span>
                          <span className="rounded-3xl bg-[#D6EEDD] px-2 py-1 text-xs sm:text-sm">
                            {" "}
                            {prop?.subName}
                          </span>
                          <div>
                            {" "}
                            <span className="text-3xl font-semibold">
                              {currency(prop?.amount, {
                                showCurrency: false,
                              })}
                            </span>
                            <span className="font-semibold">₦/quarterly</span>
                          </div>
                          {prop?.features?.map((item: any) => (
                            <div
                              className="flex h-full w-full flex-col justify-center gap-4"
                              key={Math.random()}
                            >
                              <ul className=" list-disc text-xs md:text-base">
                                <li>{item} </li>
                              </ul>
                            </div>
                          ))}
                          <div className="mt-4 flex h-full w-full items-end">
                            <Button
                              className="w-full"
                              onClick={
                                checkList[0]?.status === "pending"
                                  ? () =>
                                      notify.error({
                                        message:
                                          "Account verification is still pending",
                                      })
                                  : () => {
                                      if (
                                        prop?.name === "FREE" &&
                                        businessPlan?.planName === "FREE"
                                      ) {
                                        return notify.success({
                                          message:
                                            "You already on the free plan",
                                        });
                                      } else {
                                        setPlanName(prop?.name);
                                        setType("quarterly");
                                        setOpenUgradeConfirmModal(true);
                                      }
                                    }
                              }
                              loading={
                                prop?.name === planName
                                  ? uploading
                                  : prop?.name === planName
                                    ? uploading
                                    : prop?.name === planName && uploading
                              }
                            >
                              CONTINUE
                            </Button>
                          </div>
                        </div>
                      );
                    })}

                    {/* </div> */}
                  </TabsContent>
                )}
                {activeTab === "tab-annually" && (
                  <TabsContent
                    value="tab-annually"
                    className="grid w-full grid-cols-1 gap-6 p-3 md:grid-cols-2 lg:grid-cols-3"
                  >
                    {/* <div className=" grid gap-3"> */}
                    {annuallyPlansData?.map((prop) => {
                      return (
                        <div
                          key={Math.random()}
                          className={`flex h-full  w-full max-w-[388px] cursor-pointer flex-col items-center  gap-4 rounded-2xl border-2 p-6 ring-[1px] ring-primary-500 transition-all duration-500 ease-in-out hover:shadow-xl hover:ring md:w-full md:p-10 ${
                            businessPlan?.planCode === `${prop?.planCode}`
                              ? "border-2 ring-[3px]"
                              : ""
                          }`}
                        >
                          <span className="text-sm font-semibold md:text-base">
                            {prop?.name}
                          </span>
                          <span className="rounded-3xl bg-[#D6EEDD] px-2 py-1 text-xs sm:text-sm">
                            {" "}
                            {prop?.subName}
                          </span>
                          <div>
                            {" "}
                            <span className="text-3xl font-semibold">
                              {currency(prop?.amount, {
                                showCurrency: false,
                              })}
                            </span>
                            <span className="font-semibold">₦/annually</span>
                          </div>
                          {prop?.features?.map((item: any) => (
                            <div
                              className="flex h-full w-full flex-col justify-center gap-4"
                              key={Math.random()}
                            >
                              <ul className=" list-disc text-xs md:text-base">
                                <li>{item} </li>
                              </ul>
                            </div>
                          ))}
                          <div className="mt-4 flex h-full w-full items-end">
                            <Button
                              className="w-full"
                              onClick={
                                checkList[0]?.status === "pending"
                                  ? () =>
                                      notify.error({
                                        message:
                                          "Account verification is still pending",
                                      })
                                  : () => {
                                      if (
                                        prop?.name === "FREE" &&
                                        businessPlan?.planName === "FREE"
                                      ) {
                                        return notify.success({
                                          message:
                                            "You already on the free plan",
                                        });
                                      } else {
                                        setPlanName(prop?.name);
                                        setType("annually");
                                        setOpenUgradeConfirmModal(true);
                                      }
                                    }
                              }
                              loading={
                                prop?.name === planName
                                  ? uploading
                                  : prop?.name === planName
                                    ? uploading
                                    : prop?.name === planName && uploading
                              }
                            >
                              CONTINUE
                            </Button>
                          </div>
                        </div>
                      );
                    })}

                    {/* </div> */}
                  </TabsContent>
                )}
              </>
            )}
          </Tabs>
        </div>
      </div>
      <Modal
        isOpen={openUpgradeConfirmeModal}
        closeModal={() => setOpenUgradeConfirmModal(false)}
      >
        <div
          className={`hideScrollBar mx-auto flex w-[90%] max-w-[504px] flex-col  items-center justify-center gap-8 overflow-y-auto rounded-[40px] bg-white px-[44px] py-[49px] font-tv2SansDisplay md:w-screen`}
          style={{
            boxShadow: "0px 0px 1px 0px #091E424F, 0px 8px 12px 0px #091E4226",
          }}
        >
          <div
            className="flex w-full cursor-pointer justify-end"
            onClick={() => setOpenUgradeConfirmModal(false)}
          >
            <CloseIcon />
          </div>
          {/* <h3 className="max-w-[200px] text-center"> */}{" "}
          <span className=" max-w-[350px] text-center text-base font-medium ">
            {checkRenderDescription(planName, type)}
          </span>
          {/* </h3> */}
          <div className="flex w-full max-w-[300px] items-center justify-center gap-6 ">
            <Button
              variant="outline"
              size="sm"
              className="w-full border-2 border-[#34A853] text-black"
              onClick={() => setOpenUgradeConfirmModal(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="w-full"
              onClick={
                checkList[0]?.status === "pending"
                  ? () =>
                      notify.error({
                        message: "Account verification is still pending",
                      })
                  : () => {
                      handleSubmitData(planName, type);
                    }
              }
              loading={
                planName === "FREE"
                  ? uploading
                  : planName === "PREMIUM"
                    ? uploading
                    : planName === "BASIC" && uploading
              }
              // onClick={() => setShowModal(!showModal)}
            >
              Continue
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default UpgradePlanPage;
