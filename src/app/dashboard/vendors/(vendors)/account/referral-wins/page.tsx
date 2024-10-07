"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  CopyIcon,
  LargeNairaEarn,
  SmallNairaEarn,
  SmallVoucher,
  VoucherIcon,
} from "@/assets";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import GoBack from "@/components/goBack";
import HowItWorks from "@/app/dashboard/customers/(customers)/account/referral-wins/components/how-it-works";
import MyReferrals from "@/app/dashboard/customers/(customers)/account/referral-wins/components/my-referrals-card";
import MyVouchers from "@/app/dashboard/customers/(customers)/account/referral-wins/components/my-vouchers";

function ReferralWins() {
  const [show, setShow] = useState(false);
  const howITWorks = [
    {
      id: 1,
      description:
        "Share your unique referral code with any friend, family or person you know",
    },
    {
      id: 2,
      description:
        "Ensure they use the code while signing up on Bundo.  Kindly note that one person cannot use your code more than once",
    },
    {
      id: 2,
      description:
        "Check this page often to see how many vouchers you’ve won and can use at checkout after shopping",
    },
    {
      id: 2,
      description: "Happy referring and winning!",
    },
  ];
  const [activeTab, setActiveTab] = useState("tab-my-referrals");
  const [openModal, setOpenModal] = useState(false);

  return show ? (
    <div className="grid">
      <div className="flex w-full max-w-md justify-between">
        <div className="w-fit md:px-0">
          <GoBack text="Manage Earnings" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#2B8C45]">MICHAEL97sg</span>
          <div className="flex cursor-pointer items-center">
            <span className="text-[10px] text-[#2B8C45]">share</span>
            <CopyIcon />
          </div>
        </div>
      </div>
      <div className=" flex h-fit w-full flex-col-reverse lg:flex-row lg:gap-8 lg:px-0">
        <div className="h-fit w-full max-w-md pb-3">
          <div className="mt-6 h-fit rounded-[20px] bg-[#F8F8F8] px-3 pb-1  pt-8 shadow-sm lg:px-6 lg:py-2">
            <Tabs
              defaultValue={activeTab}
              onValueChange={(value) => {
                setActiveTab(value);
              }}
              className=" mt-[-20px] w-full md:mt-[20px] "
            >
              <TabsList className="  z-[50] mx-auto mb-[30px] flex h-fit w-[90%] gap-[30px] rounded-lg px-[clamp(15px,3vw,20px)] py-[clamp(8px,3vw,12px)] shadow-[0px_0px_1px_0px_rgba(9,_30,_66,_0.31),_0px_18px_28px_0px_rgba(9,_30,_66,_0.15)] lg:gap-[60px] mxxss:gap-[15px] mxxssw:scale-[0.9]">
                <TabsTrigger
                  value="tab-my-referrals"
                  className="w-full rounded-sm bg-transparent font-normal text-tertiary-pale-950 data-[state=active]:bg-[#1E404E] data-[state=active]:p-[clamp(12px,_3vw,_14px)_clamp(_26px,_3vw,_34px)] data-[state=active]:font-semibold data-[state=active]:text-white"
                >
                  <span className="m-auto whitespace-nowrap text-center text-xs ">
                    My Referrals
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="tab-my-earnings"
                  className="w-full rounded-sm bg-transparent font-normal text-tertiary-pale-950 data-[state=active]:bg-[#1E404E] data-[state=active]:p-[clamp(12px,_3vw,_14px)_clamp(_26px,_3vw,_34px)] data-[state=active]:font-semibold data-[state=active]:text-white"
                >
                  {" "}
                  <span className="m-auto   whitespace-nowrap text-center text-xs ">
                    My Earnings
                  </span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="tab-my-earnings">
                {[
                  {
                    description: "You’ve won a N500 shopping voucher",
                    status: "Claim",
                    icon: <SmallNairaEarn />,
                  },
                ]?.map((val) => (
                  <MyVouchers
                    key={Math.random()}
                    icon={val.icon}
                    description={val.description}
                    status={val.status}
                    onAction={() => setOpenModal(true)}
                  />
                ))}
              </TabsContent>
              <TabsContent value="tab-my-referrals">
                {[
                  {
                    name: "Chuks Ifionu",
                    accountType: "Vendor Account",
                    referralStatus: "Earned",
                    nameInitial: "C",
                  },
                ]?.map((res) => (
                  <MyReferrals
                    key={Math.random()}
                    accountType={res.accountType}
                    name={res.name}
                    referralStatus={res.referralStatus}
                    nameInitial={"C"}
                  />
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className=" mt-6">
          <HowItWorks
            data={howITWorks}
            subTitle=" To win shopping vouchers on Bundo, it’s pretty simple. Just follow these
        three steps and voila!"
            title="See how it works"
          />
        </div>
      </div>
      <Modal
        isOpen={openModal}
        showCloseIcon={false}
        closeModal={() => setOpenModal(false)}
      >
        <div
          className="hideScrollBar z-[100] flex  w-screen max-w-[380px] flex-col items-center justify-center gap-8 overflow-y-auto rounded-[25px] bg-white px-[20px]  py-[30px] "
          style={{
            boxShadow: "0px 0px 1px 0px #091E424F, 0px 8px 12px 0px #091E4226",
          }}
        >
          <LargeNairaEarn />
          <h3 className="w-[90%] text-center  font-tv2SansDisplay text-xs">
            Congrats on earning from Bundo referrals! Go ahead and credit your
            earnings to your wallet
          </h3>
          <div className="flex w-full  flex-col  gap-3">
            <Button size={"sm"} className="w-full font-tv2SansDisplay ">
              Credit to my wallet
            </Button>
            <Button
              size={"sm"}
              className="w-full border-tertiary-deep-green-500 font-tv2SansDisplay  text-tertiary-deep-green-600"
              variant="outline"
              onClick={() => setOpenModal(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  ) : (
    <div />
  );
}

export default ReferralWins;
