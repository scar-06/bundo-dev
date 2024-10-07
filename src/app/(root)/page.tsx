import React from "react";
import { Metadata } from "next";
import { bmeasy, dsvendor } from "@/assets";
import ChatBot from "@/utils/chatbot";

import { Marquee } from "@/components/marquee";

import BundoOffer from "./_components/bundoOffer";
import BundoAdzInfo from "./_components/landingpage/bundoAdzInfo";
import GetStartedBanner from "./_components/landingpage/getStartedBanner";
import Hero from "./_components/landingpage/hero";
import { WhyBundo } from "./_components/landingpage/whyBundo";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Simplified Retail for Everyday people. Bundo is the best digital marketplace to sell, buy, discover vendors around you and much more! Get started in less than 5 minutes and enjoy simplified retail.",
  keywords:
    "digital marketplace, buy, sell, discover vendors, simplified retail, Bundo",
};

function Home() {
  return (
    <div className=" w-full  overflow-x-hidden">
      <Hero />
      <BundoAdzInfo
        heading="BUSINESS MADE SIMPLER"
        src={bmeasy}
        alt="BUSINESS MADE SIMPLER"
        info={`Running a business is already hard but combining the chores of promoting your business and getting customers to know about you and is what we’re concerned about. With Bundo, your Business will stand out to the right customers with assured visibility thanks to our geolocation technology which will allow people in your location and even beyond discover you easily. We also offer a unique retail experience of showcasing your products/services, receiving and managing new orders, earning and promoting your products through Ads. 
Your business is better with Bundo.`}
        btnText={"Get Started"}
      >
        <span className=" font-semibold text-zinc-800">
          Make more <span className=" text-green-600">profit</span> while doing
          Business the simpler way
        </span>
      </BundoAdzInfo>
      <BundoAdzInfo
        heading="DISCOVER VENDORS"
        src={dsvendor}
        alt="DISCOVER VENDORS"
        reverse
        info={`Finding vendors and businesses that sell what you want shouldn’t be so hard. The right vendors are everywhere, probably even right behind your house but you’d probably never know until you use Bundo to help you find those hidden gems. We understand the frustrations of finding the right vendors and even getting scammed while doing so which is why we’re building a platform that helps make buying easier for you; from start to finish - as it should be.`}
        btnText={"Get Started"}
      >
        <span className="  font-semibold text-zinc-800">
          Say goodbye to searching endlessly for the right{" "}
          <span className=" text-green-600">vendors</span> and tiresome buying
        </span>
      </BundoAdzInfo>
      <Marquee />
      <BundoOffer />
      <GetStartedBanner />
      <WhyBundo />

      <ChatBot
        widgetCode={"siq07d0becd91e9cd5e0d13d702961bc5ca"}
        domain={"https://salesiq.zoho.com/widget"}
      />
    </div>
  );
}

export default Home;
