import React from "react";
import { Metadata } from "next";
import Salesiq from "@/utils/chatbot";

import { Marquee } from "@/components/marquee";

import AboutHero from "../_components/aboutpage/aboutHero";
import Theproblem from "../_components/aboutpage/theproblem";
import Why from "../_components/aboutpage/Why";

export const metadata: Metadata = {
  title: "About",
  description: `We’re simplifying Retail for everyday people who sell and buy `,
  keywords:
    "digital marketplace, buy, sell, discover vendors, simplified retail, Bundo, about bundo, discover vendors, bundo app, profits & sales, B2c, business",
};
function AboutUs() {
  return (
    <div className=" flex min-h-[50vh] w-full flex-col overflow-x-hidden">
      <AboutHero />
      <Marquee />
      <Why />
      <Theproblem />
    </div>
  );
}

export default AboutUs;
