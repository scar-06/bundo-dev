"use client";

import React, { useState } from "react";
import {
  BundoLogoMini,
  buyerOfferPic1,
  buyerOfferPic2,
  buyerOfferPic3,
  buyerOfferPic4,
  vendorOfferPic1,
  vendorOfferPic2,
  vendorOfferPic3,
  vendorOfferPic4,
} from "@/assets";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import BundoOfferCard from "./bundoOfferCard";

function BundoOffer() {
  const [activeTab, setActiveTab] = useState("tab-vendors");
  return (
    <div>
      <Tabs
        defaultValue="tab-vendors"
        className="mb-[40px] mt-[30px] w-full justify-center bg-[#FAFBFC] md:mb-[5px]  md:mt-[70px]  md:h-[994px] xlg:ml-0"
      >
        <div className="hideScrollBar ml-4 w-full overflow-auto py-3 md:ml-0">
          <div className="mx-auto w-[266px]">
            <TabsList className=" flex w-fit justify-center gap-8 pt-[10px] sm:mx-auto md:-ml-[35px] md:w-[330px] md:gap-[40px] lg:gap-[60px]">
              <TabsTrigger
                value="tab-vendors"
                onClick={() => setActiveTab("tab-vendors")}
                className="relative isolate flex bg-none text-center text-sm font-normal  leading-9 text-green-950 after:absolute after:bottom-[6px] after:left-0 after:h-[5px] after:w-0 after:rounded-sm after:bg-green-500 after:transition-all after:duration-200  after:ease-in-out after:content-[''] data-[state=active]:text-base data-[state=active]:font-bold data-[state=active]:leading-[48px] data-[state=active]:text-green-500 data-[state=active]:after:w-full sm:text-base sm:data-[state=active]:text-lg after:md:bottom-[-4px] after:md:h-[6px] lg:text-lg  lg:data-[state=active]:text-2xl"
              >
                <small className="whitespace-nowrap ">Bundo for Vendors</small>
              </TabsTrigger>
              <TabsTrigger
                value="tab-buyers"
                onClick={() => setActiveTab("tab-buyers")}
                className=" relative isolate flex bg-none text-center text-sm  font-normal leading-9 text-green-950 after:absolute after:bottom-[6px] after:left-0 after:h-[5px] after:w-0 after:rounded-sm after:bg-green-500 after:transition-all after:duration-200 after:ease-in-out after:content-[''] data-[state=active]:text-base data-[state=active]:font-bold data-[state=active]:leading-[48px] data-[state=active]:text-green-500 data-[state=active]:after:w-full after:md:bottom-[-4px] after:md:h-[6px] lg:text-lg  lg:data-[state=active]:text-2xl"
              >
                <small className="whitespace-nowrap "> Bundo for Buyers</small>
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="tab-vendors">
          <div className="container flex flex-col items-center sm:min-w-[350px] md:grid md:h-[817px] md:w-[783px] md:grid-cols-2 md:gap-[4px] md:pt-[20px]">
            <BundoOfferCard
              rightBackgroundColor="#FFFFFF"
              heading=" Get a Free Online Business Store and Manage your Business"
              description="Put your business where the customers are. Set up a free digital business page for you to showcase your products and services. Go digital!"
              buttonText="Set-up your store"
              imageSrc={vendorOfferPic1}
              imageAlt="Vendo offer app"
              linkToRegister="/auth/signup/vendor/onboarding"
            />
            <BundoOfferCard
              rightBackgroundColor="#FFFFFF"
              heading="Get new Customers around your location & beyond"
              description="With our geolocation technology, customers around you can find you in seconds and see what you offer. Get ready to be discovered more easily!"
              imageSrc={vendorOfferPic2}
              imageAlt=" find vendors"
              buttonText="Set-up your store"
              linkToRegister="/auth/signup/vendor/onboarding"
            />
            <BundoOfferCard
              rightBackgroundColor="#FFFFFF"
              heading="Manage and process your business orders"
              description="Get notified every time a customer buys from you and manage all orders easily from the comfort of your phone"
              imageSrc={vendorOfferPic4}
              imageAlt=" get your orders"
              buttonText="Set-up your store"
              linkToRegister="/auth/signup/vendor/onboarding"
            />
            <BundoOfferCard
              rightBackgroundColor="#FFFFFF"
              heading="Showcase your Business on a large digital marketplace"
              description="What’s better than having a physical store at a market? Having a digital store on a wider market!"
              imageSrc={vendorOfferPic3}
              imageAlt=" find vendors and products"
              buttonText="Set-up your store"
              linkToRegister="/auth/signup/vendor/onboarding"
            />
          </div>
        </TabsContent>
        <TabsContent value="tab-buyers">
          <div className="container flex flex-col items-center md:grid md:h-[817px] md:w-[783px] md:grid-cols-2 md:gap-[4px] md:pt-[20px]">
            <BundoOfferCard
              rightBackgroundColor="#FFFFFF"
              heading="Discover cool vendors in your location & beyond"
              description="With our geolocation technology, discover vendors around you effortlessly and reduce the cost of delivery and logistics fees"
              imageSrc={buyerOfferPic1}
              imageAlt="get your orders"
              buttonText="Start shopping"
              linkToRegister="/auth/signup"
            />
            <BundoOfferCard
              rightBackgroundColor="#FFFFFF"
              heading="Shop from a wide range of vendors and products"
              description="Discover a wide range of vendors selling products and offering services in over a hundred categories"
              imageSrc={buyerOfferPic2}
              imageAlt="get your orders"
              buttonText="Start shopping"
              linkToRegister="/auth/signup"
            />
            <BundoOfferCard
              rightBackgroundColor="#FFFFFF"
              heading="Track your orders and leave reviews for vendors"
              description="Easily track your orders and bookings and leave reviews for vendors you have previously contacted"
              imageSrc={buyerOfferPic3}
              imageAlt="get your orders"
              buttonText="Start shopping"
              linkToRegister="/auth/signup"
            />
            <BundoOfferCard
              rightBackgroundColor="#FFFFFF"
              heading="Save vendors to favorite and revisit them again and again"
              description="You know those vendors that sell the coolest things and you could literally sleep on their page? Bring them closer to you on Bundo by adding them to your favorite list of vendors!"
              imageSrc={buyerOfferPic4}
              imageAlt="get your orders"
              buttonText="Start shopping"
              linkToRegister="/auth/signup"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default BundoOffer;
