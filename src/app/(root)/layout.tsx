import React from "react";

import { FaqSection } from "./_components/faqSection";
import { Footer } from "./_components/footer";
import Navbar from "./_components/navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col font-tv2SansDisplay">
      <Navbar />
      <main className="mt-[72px] overflow-x-hidden xxlg:mt-[100px]">
        {children}
      </main>
      <div id="faqs">
        <FaqSection />
      </div>
      <Footer />
    </div>
  );
}
