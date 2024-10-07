"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CopyIcon, SmallVoucher, VoucherIcon } from "@/assets";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import GoBack from "@/components/goBack";

import HowItWorks from "./components/how-it-works";
import MyReferrals from "./components/my-referrals-card";
import MyVouchers from "./components/my-vouchers";

function ReferralWins() {
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState("tab-my-referrals");
  const [openModal, setOpenModal] = useState(false);
  const earnings = [
    {
      id: 1,
      description:
        "Share your unique referral code with any friend, family or person you know",
    },
    {
      id: 2,
      description:
        "Ensure they use the code while signing up on Bundo.  Note that one person cannot use your code more than once",
    },
    {
      id: 2,
      description:
        "Check this page often to see and claim all your earnings from active referrals",
    },
    {
      id: 2,
      description: "Happy referring and earning!",
    },
  ];
  return show ? (
    <div className="grid lg:pl-12">
      <div className="flex w-full max-w-md justify-between">
        <div className="w-fit px-4 md:px-0">
          <GoBack text="Manage Referral Wins" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#2B8C45]">MICHAEL97sg</span>
          <div className="flex items-center">
            <span className="text-[10px] text-[#2B8C45]">share</span>
            <CopyIcon />
          </div>
        </div>
      </div>
      <div className=" flex h-fit w-full flex-col-reverse px-4 lg:flex-row lg:gap-8 lg:px-0">
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
                  value="tab-my-vouchers"
                  className="w-full rounded-sm bg-transparent font-normal text-tertiary-pale-950 data-[state=active]:bg-[#1E404E] data-[state=active]:p-[clamp(12px,_3vw,_14px)_clamp(_26px,_3vw,_34px)] data-[state=active]:font-semibold data-[state=active]:text-white"
                >
                  {" "}
                  <span className="m-auto   whitespace-nowrap text-center text-xs ">
                    My Vouchers
                  </span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="tab-my-vouchers">
                {[
                  {
                    description: "You’ve won a N500 shopping voucher",
                    status: "Claim",
                    icon: <SmallVoucher />,
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
            data={earnings}
            subTitle={
              "To earn from Referrals on Bundo, it’s pretty simple. Just follow these three steps and voila!"
            }
            title={"See how it works "}
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
          <VoucherIcon />
          <h3 className="w-[90%] text-center  font-tv2SansDisplay text-xs">
            Congrats on winning a Bundo Shopping Voucher! Copy your Voucher
            discount code and don’t forget to apply it at Checkout!
          </h3>
          <div className="flex w-full  flex-col  gap-3">
            <Button size={"sm"} className="w-full font-tv2SansDisplay ">
              Copy
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
