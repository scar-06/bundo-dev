// @ts-nocheck

import React from "react";
import { Metadata } from "next";
import { CheckSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms and Conditions of Service | Bundo",
  description:
    "Read the Terms and Conditions of Service for using Bundo. Understand the policies for returns, refunds, and general usage of our e-commerce platform.",
  keywords: "Terms of Service, Bundo, e-commerce, return policy, refund policy",
  openGraph: {
    title: "Terms and Conditions of Service | Bundo",
    description:
      "Read the Terms and Conditions of Service for using Bundo. Understand the policies for returns, refunds, and general usage of our e-commerce platform.",
    url: "https://www.bundo.app/terms-and-conditions",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms and Conditions of Service | Bundo",
    description:
      "Read the Terms and Conditions of Service for using Bundo. Understand the policies for returns, refunds, and general usage of our e-commerce platform.",
    site: "@bundo",
  },
};

function TermsAndConditionsOfService() {
  const requirements = [
    {
      reason: `INCORRECT ITEM  
PS: Requests must be made within 24 hours after receipt of the item.`,
      desc: `If you receive a product that is different from what was shown on the vendor's page. 
If the request is accepted, provided it meets the standard return policy, a return will be initiated & refund will be made upon confirmation of return by the Vendor.
Only the cost of the item will be refunded to you.`,
      inCondition: true,
      damaged: false,
      originalPackage: true,
      tagsAndLabels: true,
      extras: true,
    },
    {
      reason: `FAULTY PRODUCTS  
PS: Requests must be made within 24 hours after receipt of the item.`,
      desc: `If the product is defective, nonfunctional, or dead on arrival. If the request is accepted, provided it meets the standard return policy, a return will be initiated & refund will be made upon confirmation of return by the Vendor.
Only the cost of the item will be refunded to you.`,
      inCondition: true,
      damaged: false,
      originalPackage: true,
      tagsAndLabels: false,
      extras: true,
    },
    {
      reason: `PRODUCT QUALITY STANDARD  
PS: Requests must be made within 24 hours after receipt of the item.`,
      desc: `If the product doesn’t work as expected or can’t perform its functions. We’ll approve a return & refund after we check and confirm the issue. Only the cost of the item will be refunded to you.`,
      inCondition: true,
      damaged: false,
      originalPackage: true,
      tagsAndLabels: true,
      extras: true,
    },
    {
      reason: `DAMAGED OR DAMAGED IN TRANSIT  
PS: Requests must be made within 24 hours after receipt of the item.`,
      desc: `If the product received has visible damage. A return will be approved after we verify the issue. Please report any damage within 24 hours after delivery.`,
      inCondition: true,
      damaged: false,
      originalPackage: true,
      tagsAndLabels: true,
      extras: true,
    },
    {
      reason: `PARTIAL OR INCOMPLETE ITEM  
PS: Requests must be made within 24 hours after receipt of the item.`,
      desc: `If the product delivered is incomplete compared to what was shown on the website. A return will be approved after we confirm the issue. Once the return has been confirmed by the vendor, a refund will be initiated to you. Report issues within 24 hours after receipt of order.`,
      inCondition: true,
      damaged: false,
      originalPackage: true,
      tagsAndLabels: false,
      extras: true,
    },
  ];

  return (
    <div className="mx-auto mb-12 max-w-4xl rounded-lg bg-white p-6 text-xs">
      <h1 className="mx-auto mb-6 w-full max-w-[350px] bg-green-600 px-[16px] py-[14px] text-center text-sm font-bold text-white">
        TERMS OF SERVICE
      </h1>
      <p className="mb-6">
        Please read the contents of this document carefully before signing up as
        a Vendor or buyer and retain a copy electronically for your records.
      </p>
      <p className="mb-6">
        These Terms of Service {`"Terms"`} are between you and Bundo. They cover
        your use of our website at{" "}
        <a className="text-bold text-green-700" href="https://www.bundo.app">
          https://www.bundo.app
        </a>{" "}
        and related services {`(collectively, the "Services")`}. By using the
        Services, you agree to these Terms.
      </p>
      <p className="mb-6">
        The Privacy Policy, Acceptable Use Policy, and Vendor Terms of Service
        {`(if applicable)`} are also part of these Terms. Please review them to
        understand our practices. The {`"Privacy"`} refers to our practices for
        handling your personal data, while {`"We"`} and {`"our"`} refer to Bundo
        and its affiliates.
      </p>
      <h2 className="mb-4 text-2xl font-semibold mmd:text-xl">Who we are</h2>
      <p className="mb-6">
        Bundo is an E-commerce platform that bridges the gaps between
        small/medium business owners and regular customers. Through geo-location
        and modern retail innovation, we are making it easier for everyday
        people to buy and sell beyond the challenges of location, visibility,
        accessibility, and resources.
      </p>
      <h2 className="mb-4 text-2xl font-semibold mmd:text-xl">
        1. General Terms and Conditions
      </h2>
      <p className="mb-4">
        1.1 These general terms and conditions apply to buyers and sellers on
        the marketplace and govern your use of the marketplace and related
        services.
      </p>
      <p className="mb-4">
        1.2 By using our marketplace, you accept these general terms and
        conditions in full. If you disagree with these general terms and
        conditions or any part thereof, you must not use our marketplace.
      </p>
      <p className="mb-4">
        1.4 If you use our marketplace in the course of a business or other
        organizational project, by doing so, you:
      </p>
      <p className="mb-4 ml-4">
        1.4.1 Confirm that you have obtained the necessary authority to agree to
        these general terms and conditions;
      </p>
      <p className="mb-4 ml-4">
        1.4.2. Bind both yourself and the person, company, or other legal entity
        that operates that business or organizational project to these general
        terms and conditions; and
      </p>
      <p className="mb-4 ml-4">
        1.4.3. Agree that {`"you"`} in these general terms and conditions shall
        reference both the individual user and the relevant person, company, or
        legal entity unless the context requires otherwise.
      </p>
      <h2 className="mb-4 text-2xl font-semibold mmd:text-xl">
        2. Registration and Account
      </h2>
      <p className="mb-4">
        2.1. You may not register with our marketplace if you are under 18 years
        of age. By using our marketplace or agreeing to these general terms and
        conditions, you warrant and represent to us that you are at least 18
        years of age.
      </p>
      <p className="mb-4">
        2.2. You confirm that all information provided by you in opening your
        account with Bundo is accurate, current, and complete. You agree to
        promptly update any changes to your User Information in your Bundo
        Account and not to misrepresent yourself.
      </p>
      <p className="mb-4">
        2.2.f. If you register for an account with our marketplace, you will be
        asked to provide an email address/user ID and password, and you agree
        to:
      </p>
      <p className="mb-4 ml-4">2.2.f.1. Keep your password confidential;</p>
      <p className="mb-4 ml-4">
        2.2.2. Notify us in writing immediately{" "}
        {`(using our contact details
        provided in Section 26f)`}{" "}
        if you become aware of any disclosure of your password; and
      </p>
      <p className="mb-4 ml-4">
        2.2.3. Be responsible for any activity on our marketplace arising from
        failure to keep your password confidential, and you may be held liable
        for any losses resulting from such failure.
      </p>
      <p className="mb-4">
        2.3. Your account shall be used exclusively by you, and you shall not
        transfer your account to any third party. If you authorize any third
        party to manage your account on your behalf, this shall be at your own
        risk.
      </p>
      <p className="mb-4">
        2.4. We reserve the right to suspend or cancel your account and/or edit
        your account details at any time at our sole discretion and without
        notice or explanation, provided that if we cancel any products or
        services you have paid for but not received, and you have not breached
        these general terms and conditions, we will refund you accordingly.
      </p>
      <p className="mb-4">
        2.5. You may cancel your account on our marketplace by contacting us.
      </p>
      <h2 className="mb-4 text-2xl font-semibold mmd:text-xl">
        3. Terms and Conditions of Sale
      </h2>
      <h3 className="mb-3 text-xl font-semibold mmd:text-lg">
        3.1. General Acknowledgments
      </h3>
      <p className="mb-4">You acknowledge and agree that:</p>
      <p className="mb-4 ml-4">
        3.1.1. The marketplace provides an online platform for sellers to sell
        and buyers to purchase products.
      </p>
      <p className="mb-4 ml-4">
        3.1.2. We shall accept binding sales on behalf of sellers; however,
        unless Bundo is indicated as the seller, Bundo is not a party to the
        transaction between the seller and the buyer.
      </p>
      <p className="mb-4 ml-4">
        3.1.3. A contract for the sale and purchase of a product or products
        will come into effect between the buyer and the seller. You commit to
        buying or selling the relevant product(s) upon the {`buyer’s`}{" "}
        confirmation of purchase via the marketplace.
      </p>
      <h3 className="mb-3 text-xl font-semibold mmd:text-lg">
        3.2. Terms Governing the Sale and Purchase
      </h3>
      <p className="mb-4">
        Subject to these general terms and conditions, the {`seller’s`} terms of
        business shall govern the contract for sale and purchase between the
        buyer and the seller. Notwithstanding this, the following provisions are
        hereby incorporated into the contract of sale and purchase between the
        buyer and the seller:
      </p>
      <p className="mb-4 ml-4">
        3.2.1. The price for a product will be as stated in the relevant product
        listing.
      </p>
      <p className="mb-4 ml-4">
        3.2.2. The price for the product must include all taxes and comply with
        applicable laws in force at the time of sale.
      </p>
      <p className="mb-4 ml-4">
        3.2.3. Delivery charges, packaging charges, handling charges,
        administrative charges, insurance costs, and other ancillary costs and
        charges, where applicable, will only be payable by the buyer if
        expressly and clearly stated at checkout and is calculated based on
        standard shipping factors like location, weight of products, etc.
        Delivery of digital products is handled by a third-party shipping
        company.
      </p>
      <p className="mb-4 ml-4">
        3.2.4. Products must be of satisfactory quality, fit, and safe for any
        purpose specified in the product listing and conform in all material
        respects to any description of the product supplied or made available by
        the seller to the buyer.
      </p>
      <p className="mb-4 ml-4">
        3.2.5. For physical products sold, the seller warrants that they have
        good title to, and are the sole legal and beneficial owner of, the
        products. The seller also warrants that they have the right to supply
        the products under this agreement and that the products are not subject
        to any third-party rights or restrictions, including third-party
        intellectual property rights, or any criminal, insolvency, or tax
        investigation or proceedings. For digital products, the seller warrants
        they have the right to supply the digital products to the buyer.
      </p>
      <h2 className="mb-4 text-2xl font-semibold mmd:text-xl">
        4. Returns and Refunds
      </h2>
      <h3 className="mb-3 text-xl font-semibold mmd:text-lg">
        4.1. Management of Returns
      </h3>
      <p className="mb-4">
        The return of products by buyers and the acceptance of returned products
        by sellers will be managed by us in accordance with the guidelines
        provided on the returns page of the marketplace, which may be updated
        from time to time. The acceptance of returns is at our discretion,
        subject to compliance with the applicable guidelines.
      </p>
      <h3 className="mb-3 text-xl font-semibold mmd:text-lg">
        4.2. Management of Refunds
      </h3>
      <p className="mb-4">
        Refunds for returned products will be processed in accordance with the
        guidelines provided on the refunds page of the marketplace, which may
        also be amended from time to time. Our policies regarding refunds will
        be applied at our discretion, subject to the applicable laws of the
        platform.
      </p>
      <h3 className="mb-3 text-xl font-semibold mmd:text-lg">
        4.3. Issuance of Refunds
      </h3>
      <p className="mb-4">
        Returned products will be accepted, and refunds will be issued by Bundo,
        acting on behalf of the seller. Bundo will issue refunds only in cases
        of delivery failure. Returns and refunds made for any other reasons will
        be subject to the seller’s terms and conditions of sale (return & refund
        policy).
      </p>
      <h3 className="mb-3 text-xl font-semibold mmd:text-lg">
        4.4. Changes to Returns and Refunds Policy
      </h3>
      <p className="mb-4">
        We may change our Returns and Refunds Policy at any time without notice,
        and any changes to these terms will take effect for all purchases made
        from the date such changes are published on our website.
      </p>
      <h2 className="mb-4 text-2xl font-semibold mmd:text-xl">5. Payments</h2>
      <p className="mb-4">
        All payments due under these general terms and conditions must be made
        in accordance with the Payment Information and Guidelines provided on
        the marketplace.
      </p>

      <h2 className="mb-4 text-2xl font-semibold mmd:text-xl">
        6. Store Credit
      </h2>
      <p className="mb-4">6.1 Earning and Management of Store Credits</p>
      <p className="mb-4">
        Store credits may be earned and managed in accordance with the Bundo
        Store Credit Terms and Conditions, which may be updated from time to
        time. Bundo reserves the right to cancel or withdraw store credit
        rewards at its discretion, including in cases where fraud or foul play
        is suspected.
      </p>

      <h2 className="mb-4 text-2xl font-semibold mmd:text-xl">
        7. Rules Regarding Your Content
      </h2>
      <p className="mb-4">
        7.1 In these general terms and conditions, {`"your content"`} refers to:
      </p>
      <ul className="mb-4 list-inside list-disc">
        <li>
          7.1.1 All works and materials (including, without limitation, text,
          graphics, images, audio material, video material, audio-visual
          material, scripts, software, and files) that you submit to us or our
          marketplace for storage, publication, processing, or onward
          transmission; and
        </li>
        <li>
          7.1.2 All communications on the marketplace, including product
          reviews, feedback, and comments.
        </li>
      </ul>

      <p className="mb-4">
        7.2 Your content, and the use of your content by us in accordance with
        these general terms and conditions, must be accurate, complete, and
        truthful.
      </p>
      <p className="mb-4">
        7.3 Your content must be appropriate, civil, and tasteful, and must
        adhere to generally accepted standards of etiquette and behavior on the
        internet. Your content must not:
      </p>
      <ul className="mb-4 list-inside list-disc">
        <li>
          7.3.1 Be offensive, obscene, indecent, pornographic, lewd, suggestive,
          or sexually explicit;
        </li>
        <li>
          7.3.2 Depict violence in an explicit, graphic, or gratuitous manner;
        </li>
        <li>7.3.3 Promote racial prejudice and discrimination;</li>
        <li>
          7.3.4 Be deceptive, fraudulent, threatening, abusive, harassing,
          anti-social, menacing, hateful, discriminatory, or inflammatory;
        </li>
        <li>
          7.3.5 Cause annoyance, inconvenience, or needless anxiety to any
          person; or
        </li>
        <li>7.3.6 Constitute spam.</li>
      </ul>

      <p className="mb-4">
        7.4 Your content must not be illegal or unlawful, infringe any{" "}
        {`person's`}
        legal rights, or be capable of giving rise to legal action against any
        person (in any jurisdiction and under any applicable law). Your content
        must not infringe or breach:
      </p>
      <ul className="mb-4 list-inside list-disc">
        <li>
          7.4.1 Any copyright, trademark, image rights, or any other
          intellectual property right;
        </li>
        <li>
          7.4.2 Any right of confidence, right of privacy, or right under data
          protection legislation;
        </li>
        <li>7.4.3 Any contractual obligation owed to any person; or</li>
        <li>7.4.4 Any court order.</li>
      </ul>

      <p className="mb-4">
        7.5 You must not use our marketplace to link to any website or webpage
        that consists of or contains material that, if posted on our
        marketplace, would breach these general terms and conditions.
      </p>
      <p className="mb-4">
        7.6 You must not submit to our marketplace any material that is, or has
        ever been, the subject of any threatened or actual legal proceedings or
        other similar complaint.
      </p>
      <p className="mb-4">
        7.7 The review function on the marketplace may be used to facilitate
        buyer reviews on products. You must not use the review function or any
        other form of communication to provide inaccurate, inauthentic, or fake
        reviews.
      </p>
      <p className="mb-4">7.8 You must not interfere with a transaction by:</p>
      <ul className="mb-4 list-inside list-disc">
        <li>
          7.8.1 Contacting another user to buy or sell an item listed on the
          marketplace outside of the marketplace;
        </li>
        <li>
          7.8.2 Communicating with a user involved in an active or completed
          transaction to dissuade them from a particular buyer, seller, or item;
          or
        </li>
        <li>
          7.8.3 Contacting another user with the intent to collect any payments.
        </li>
      </ul>

      <p className="mb-4">
        7.9 You acknowledge that all users of the marketplace are solely
        responsible for their interactions with other users. You should exercise
        caution and good judgment in your communication with users and must not
        send them personal information, including your credit card details.
      </p>
      <p className="mb-4">
        7.10 We may periodically review your content and reserve the right to
        remove any content at our discretion for any reason whatsoever.
      </p>
      <p className="mb-4">
        7.11 If you become aware of any unlawful material or activity on our
        marketplace or any material or activity that breaches these general
        terms and conditions, you are required to inform us by contacting us.
      </p>

      <h2 className="mb-4 text-2xl font-semibold mmd:text-xl">
        8. Our Rights to Use Your Content
      </h2>
      <p className="mb-4">
        8.1 You grant us a worldwide, irrevocable, non-exclusive, royalty-free
        license to use, reproduce, store, adapt, publish, translate, and
        distribute your content on our marketplace, across our marketing
        channels, and in any existing or future media.
      </p>
      <p className="mb-4">
        8.2 You grant us the right to sub-license the rights licensed under
        Section 8.1.
      </p>
      <p className="mb-4">
        8.3 You grant us the right to take legal action for infringement of the
        rights licensed under Section 8.1.
      </p>
      <p className="mb-4">
        8.4 You waive all your intellectual property rights against us in
        respect of your content to the maximum extent permitted by applicable
        law, and you warrant and represent that all other rights in your content
        have been waived to the maximum extent permitted by applicable law.
      </p>
      <p className="mb-4">
        8.5 Without prejudice to our other rights under these general terms and
        conditions, if you breach our rules on content in any way, or if we
        reasonably suspect that you have breached our rules on content, we may
        delete, unpublish, or edit any or all of your content.
      </p>
      <p className="mb-4">
        8.6 You hereby agree to defend, indemnify and hold Bundo harmless for
        any claims or litigation from third parties arising from your use and
        reproduction of your content.
      </p>
      <h2 className="mb-4 text-2xl font-semibold mmd:text-xl">
        9. Use of Website and Mobile Applications
      </h2>
      <p className="mb-4">
        9.1 In this section, the terms {`"marketplace"`} and {`"website"`} shall
        be used interchangeably to refer to {`Bundo’s`} websites and mobile
        applications.
      </p>
      <p className="mb-4">9.2 You may:</p>
      <ul className="mb-4 ml-8 list-disc">
        <li>9.2.1 View pages from our website in a web browser;</li>
        <li>
          9.2.2 Download pages from our website for caching in a web browser;
        </li>
        <li>
          9.2.3 Print pages from our website for your personal and
          non-commercial use;
        </li>
        <li>
          9.2.4 Stream audio and video files from our website using the media
          player on our website; and
        </li>
        <li>
          9.2.5 Access our marketplace services by means of a web browser,
          subject to the other provisions of these general terms and conditions.
        </li>
      </ul>
      <p className="mb-4">
        9.3 Except as expressly permitted by Section 9.2 or other provisions of
        these general terms and conditions, you must not download any material
        from our website or save any such material to your computer.
      </p>
      <p className="mb-4">
        9.4 You may only use our website for your personal and business purposes
        concerning selling or purchasing products on the marketplace.
      </p>
      <p className="mb-4">
        9.5 Except as expressly permitted by these general terms and conditions,
        you must not edit or otherwise modify any material on our website.
      </p>
      <p className="mb-4">
        9.6 Unless you own or control the relevant rights in the material, you
        must not:
      </p>
      <ul className="mb-4 ml-8 list-disc">
        <li>
          9.6.1 Republish material from our website (including republication on
          another website);
        </li>
        <li>9.6.2 Sell, rent, or sub-license material from our website;</li>
        <li>9.6.3 Show any material from our website in public;</li>
        <li>
          9.6.4 Exploit material from our website for a commercial purpose; or
        </li>
        <li>9.6.5 Redistribute material from our website.</li>
      </ul>
      <p className="mb-4">
        9.7 Notwithstanding Section 9.6, you may forward links to products on
        our website and redistribute our newsletter and promotional materials in
        print and electronic form to any person.
      </p>
      <p className="mb-4">
        9.8 We reserve the right to suspend or restrict access to our website,
        specific areas of our website, and/or functionalities on our website.
        For example, we may suspend access during server maintenance or updates.
        You must not circumvent or attempt to circumvent any access restriction
        measures on the website.
      </p>
      <p className="mb-4">9.9 You must not:</p>
      <ul className="mb-4 ml-8 list-disc">
        <li>
          9.9.1 Use our website in any way or take any action that causes or may
          cause damage to the website or impairment of the performance,
          availability, accessibility, integrity, or security of the website;
        </li>
        <li>
          9.9.2 Use our website in any way that is unethical, unlawful, illegal,
          fraudulent, or harmful, or in connection with any unlawful, illegal,
          fraudulent, or harmful purpose or activity;
        </li>
        <li>9.9.3 Hack or otherwise tamper with our website;</li>
        <li>
          9.9.4 Probe, scan, or test the vulnerability of our website without
          our permission;
        </li>
        <li>
          9.9.5 Circumvent any authentication or security systems or processes
          on or relating to our website;
        </li>
        <li>
          9.9.6 Use our website to copy, store, host, transmit, send, use,
          publish, or distribute any material that consists of (or is linked
          with) spam, illegal, or contraband content.
        </li>
      </ul>

      <h2 className="mb-4 text-2xl font-semibold mmd:text-xl">
        10. Copyright and Trademarks
      </h2>
      <p className="mb-4">
        10.1 Subject to the express provisions of these general terms and
        conditions:
      </p>
      <ul className="mb-4 ml-8 list-disc">
        <li>
          10.1.1 We, together with our licensors, own and control all the
          copyrights and other intellectual property rights in our website and
          the material on our website; and
        </li>
        <li>
          10.1.2 All copyrights and other intellectual property rights in our
          website and the material on our website are reserved.
        </li>
      </ul>
      <p className="mb-4">
        10.2 Bundo’s logos and our other registered and unregistered trademarks
        are trademarks belonging to us; we do not grant permission for the use
        of these trademarks, and any such use may constitute an infringement of
        our rights.
      </p>
      <p className="mb-4">
        10.3 The third-party registered and unregistered trademarks or service
        marks on our website are the property of their respective owners. We do
        not endorse and are not affiliated with any of the holders of these
        rights; therefore, we cannot grant any license to exercise such rights.
      </p>

      <h2 className="mb-4 text-2xl font-semibold mmd:text-xl">
        11. Data Privacy
      </h2>
      <p className="mb-4">
        11.1 Buyers agree to the processing of their personal data in accordance
        with the terms of the Bundo Privacy and Cookie Notice.
      </p>
      <p className="mb-4">
        11.2 Bundo will process all personal data obtained through the
        marketplace and related services in accordance with our Privacy and
        Cookie Notice and Privacy Policy.
      </p>
      <p className="mb-4">
        11.3 Sellers are directly responsible to buyers for any misuse of their
        personal data, and Bundo shall bear no liability to buyers in respect of
        any misuse of their personal data by sellers.
      </p>

      <h2 className="mb-4 text-2xl font-semibold mmd:text-xl">
        12. Bundo’s Role as a Marketplace
      </h2>
      <p className="mb-4">12.1 You acknowledge that:</p>
      <ul className="mb-4 ml-8 list-disc">
        <li>
          12.1.1 Bundo facilitates a marketplace for buyers and third-party
          sellers, or Bundo where Bundo is the seller of a product;
        </li>
        <li>
          12.1.2 The relevant seller of the product (whether Bundo is the seller
          or it is a third-party seller) shall at all times remain exclusively
          liable for the products they sell on the marketplace; and
        </li>
        <li>
          12.1.3 In the event of an issue arising from the purchase of a product
          on the marketplace, the buyer should seek recourse from the relevant
          seller of the product by following the process set out in {`Bundo's`}
          Dispute Resolution Policy.
        </li>
      </ul>
      <p className="mb-4">
        12.2 We commit to ensuring that Bundo or third-party sellers, as
        applicable, submit information relating to their products on the
        marketplace that is complete, accurate, and up to date. Accordingly:
      </p>
      <ul className="mb-4 ml-8 list-disc">
        <li>
          12.2.1 The relevant seller warrants and represents the completeness
          and accuracy of their information published on our marketplace
          relating to their products;
        </li>
        <li>
          12.2.2 The relevant seller warrants and represents that the material
          on the marketplace is up to date; and
        </li>
        <li>
          12.2.3 If a buyer has a complaint regarding the accuracy or
          completeness of the product information received from a seller
          (including where Bundo is the seller), the buyer can seek recourse
          from the relevant seller by following the process set out in the
          (Returns, Refund and Cancellation Policy).
        </li>
      </ul>
      <p className="mb-4">
        12.3 We do not warrant or represent that the marketplace will operate
        without fault, or that the marketplace or any service on the marketplace
        will remain available during events beyond {`Bundo's`} control{" "}
        {`("force
        majeure" events)`}
        . These events include, but are not limited to:
      </p>
      <ul className="mb-4 ml-8 list-disc">
        <li>Flood, drought, earthquake, or other natural disasters;</li>
        <li>
          Hacking, viruses, malware, or other malicious software attacks on the
          marketplace;
        </li>
        <li>Terrorist attacks, civil war, civil commotion, or riots;</li>
        <li>War, threat of war, or preparation for war;</li>
        <li>Epidemics or pandemics; or</li>
        <li>
          Extra-constitutional events or circumstances that materially and
          adversely affect the political or macro-economic stability of the
          territory as a whole.
        </li>
      </ul>
      <p className="mb-4">
        12.4 We reserve the right to discontinue or alter any or all of our
        marketplace services and to stop publishing our marketplace at any time,
        at our sole discretion, without notice or explanation. You will not be
        entitled to any compensation or other payment upon the discontinuance or
        alteration of any marketplace services or if we stop publishing the
        marketplace. This is without prejudice to your rights regarding any
        unfulfilled orders or other existing liabilities of Bundo.
      </p>
      <p className="mb-4">
        12.5 If we discontinue or alter any or all of our marketplace services
        in circumstances not related to force majeure, we will provide prior
        notice to buyers and sellers of not less than fifteen (15) days, with
        clear guidance on the way forward for pending transactions or other
        existing liabilities of Bundo.
      </p>
      <p className="mb-4">
        12.6 We do not guarantee any commercial results concerning the use of
        the marketplace. To the maximum extent permitted by applicable law and
        subject to Section 12.1 above, we exclude all representations and
        warranties relating to the subject matter of these general terms and
        conditions, our marketplace, and the use of our marketplace.
      </p>

      <h2 className="mb-4 text-2xl font-semibold mmd:text-xl">
        13. Limitations and Exclusions of Liability
      </h2>
      <p className="mb-4">
        13.1 Nothing in these general terms and conditions will:
      </p>
      <ul className="mb-4 ml-8 list-disc">
        <li>
          13.1.1 Limit any liabilities in any way that is not permitted under
          applicable law; or
        </li>
        <li>
          13.1.2 Exclude any liabilities or statutory rights that may not be
          excluded under applicable law.
        </li>
      </ul>
      <p className="mb-4">
        13.2 The limitations and exclusions of liability set out in this Section
        14 and elsewhere in these general terms and conditions:
      </p>
      <ul className="mb-4 ml-8 list-disc">
        <li>13.2.1 Are subject to Section 14.1; and</li>
        <li>
          13.2.2 Govern all liabilities arising under these general terms and
          conditions or relating to the subject matter of these general terms
          and conditions, including liabilities arising in contract, in tort
          (including negligence), and for breach of statutory duty, except to
          the extent expressly provided otherwise in these general terms and
          conditions.
        </li>
      </ul>
      <p className="mb-4">
        13.3 In respect of the services offered to you free of charge, we will
        not be liable to you for any loss or damage of any nature whatsoever.
      </p>
      <p className="mb-4">
        13.4 Our aggregate liability to you in respect of any contract to
        provide services to you under these general terms and conditions shall
        not exceed the total amount paid and payable to us under the contract.
        Each separate transaction on the marketplace shall constitute a separate
        contract for the purpose of this Section 14.
      </p>
      <p className="mb-4">
        13.5 Notwithstanding Section 14.4 above, we will not be liable to you
        for any loss or damage of any nature, including in respect of:
      </p>
      <ul className="mb-4 ml-8 list-disc">
        <li>
          13.5.1 Any losses occasioned by any interruption or dysfunction to the
          website;
        </li>
        <li>
          13.5.2 Any losses arising out of any event or events beyond our
          reasonable control;
        </li>
        <li>
          13.5.3 Any business losses, including (without limitation) loss of or
          damage to profits, income, revenue, use, production, anticipated
          savings, business, contracts, commercial opportunities, or goodwill;
        </li>
        <li>
          13.5.4 Any loss or corruption of any data, database, or software; or
        </li>
        <li>13.5.5 Any special, indirect, or consequential loss or damage.</li>
      </ul>
      <p className="mb-4">
        13.6 We acknowledge our interest in limiting the personal liability of
        our officers and employees. Given that interest, you acknowledge that we
        are a limited liability entity; you agree that you will not bring any
        claim personally against our officers or employees regarding any losses
        you suffer in connection with the marketplace or these general terms and
        conditions. This limitation does not exclude the liability of the
        limited liability entity itself for the acts and omissions of our
        officers and employees.
      </p>
      <p className="mb-4">
        13.7 Our marketplace might include hyperlinks to other websites owned
        and operated by third parties; such hyperlinks are not recommendations.
        We have no control over third-party websites and their contents, and we
        accept no responsibility for them or for any loss or damage that may
        arise from your use of them.
      </p>
      <h2 className="mb-4 text-2xl font-semibold mmd:text-xl">
        14. Indemnification
      </h2>
      <p className="mb-4">
        14.1 You hereby agree to indemnify us and undertake to keep us
        indemnified against:
      </p>
      <ul className="mb-4 ml-8 list-disc">
        <li>
          14.1.1 Any and all losses, damages, costs, liabilities, and expenses
          (including, without limitation, legal expenses and any amounts paid by
          us to any third party in settlement of a claim or dispute) incurred or
          suffered by us and arising directly or indirectly from your use of our
          marketplace, or any breach by you of any provision of these general
          terms and conditions, or the Bundo codes, policies, or guidelines; and
        </li>
        <li>
          14.1.2 Any VAT liability or other tax liability that we may incur in
          relation to any sale, supply, or purchase made through our
          marketplace, where that liability arises out of your failure to pay,
          withhold, declare, or register to pay any VAT or other tax properly
          due in any jurisdiction.
        </li>
      </ul>

      <h2 className="mb-4 text-2xl font-semibold mmd:text-xl">
        15. Breaches of These General Terms and Conditions
      </h2>
      <p className="mb-4">
        15.1 If we permit the registration of an account on our marketplace, it
        will remain open indefinitely, subject to these general terms and
        conditions.
      </p>
      <p className="mb-4">
        15.2 If you breach these general terms and conditions, or if we
        reasonably suspect that you have breached these general terms and
        conditions, or any Bundo codes, policies, or guidelines in any way, we
        may:
      </p>
      <ul className="mb-4 ml-8 list-disc">
        <li>15.2.1 Temporarily suspend your access to our marketplace;</li>
        <li>15.2.2 Permanently prohibit you from accessing our marketplace;</li>
        <li>
          15.2.3 Block computers using your IP address from accessing our
          marketplace;
        </li>
        <li>
          15.2.4 Contact any or all of your internet service providers and
          request that they block your access to our marketplace;
        </li>
        <li>
          15.2.5 Suspend or delete your account on our marketplace; and/or
        </li>
        <li>
          15.2.6 Commence legal action against you, whether for breach of
          contract or otherwise.
        </li>
      </ul>
      <p className="mb-4">
        15.3 If we suspend, prohibit, or block your access to our marketplace or
        any part of our marketplace, you must not take any action to circumvent
        such suspension, prohibition, or blocking (including, without
        limitation, creating and/or using a different account).
      </p>

      <h2 className="mb-4 text-2xl font-semibold mmd:text-xl">
        16. Entire Agreement
      </h2>
      <p className="mb-4">
        16.1 These general terms and conditions, along with the Bundo codes,
        user agreement, policies, and guidelines (and, in the case of sellers,
        the seller terms and conditions), constitute the entire agreement
        between you and us regarding your use of our marketplace. They supersede
        all prior agreements between you and us related to your use of our
        marketplace.
      </p>

      <h2 className="mb-4 text-2xl font-semibold mmd:text-xl">17. Hierarchy</h2>
      <p className="mb-4">
        17.1 In the event of any conflict between these general terms and
        conditions, the seller terms and conditions, and the Bundo codes, user
        agreement policies, and guidelines, the following order of precedence
        shall apply: these general terms and conditions, the seller terms and
        conditions, and then the Bundo codes, policies, and guidelines.
      </p>

      <h2 className="mb-4 text-2xl font-semibold mmd:text-xl">18. Variation</h2>
      <p className="mb-4">
        18.1 We may revise these general terms and conditions, the seller terms
        and conditions, and the Bundo codes, policies, and guidelines from time
        to time.
      </p>
      <p className="mb-4">
        18.2 The revised general terms and conditions shall apply from the date
        of their publication on the marketplace.
      </p>

      <h2 className="mb-4 text-2xl font-semibold mmd:text-xl">19. No Waiver</h2>
      <p className="mb-4">
        19.1 No waiver of any breach of any provision of these general terms and
        conditions shall be construed as a further or continuing waiver of any
        other breach of that provision or any breach of any other provision of
        these general terms and conditions.
      </p>

      <h2 className="mb-4 text-2xl font-semibold mmd:text-xl">
        20. Severability
      </h2>
      <p className="mb-4">
        20.1 If any provision of these general terms and conditions is
        determined by any court or other competent authority to be unlawful
        and/or unenforceable, the remaining provisions will continue to be in
        effect.
      </p>
      <p className="mb-4">
        20.2 If any unlawful and/or unenforceable provision of these general
        terms and conditions would be lawful or enforceable if a part of it were
        deleted, that part will be deemed deleted, and the rest of the provision
        will continue in effect.
      </p>

      <h2 className="mb-4 text-2xl font-semibold mmd:text-xl">
        21. Assignment
      </h2>
      <p className="mb-4">
        21.1 You hereby agree that we may assign, transfer, sub-contract, or
        otherwise deal with our rights and/or obligations under these general
        terms and conditions.
      </p>
      <p className="mb-4">
        21.2 You may not, without our prior written consent, assign, transfer,
        sub-contract, or otherwise deal with any of your rights and/or
        obligations under these general terms and conditions.
      </p>
      <div className=" mx-auto ">
        <h2 className="mb-4 text-2xl font-semibold mmd:text-xl">
          VENDORS TERMS OF USE
        </h2>

        <h3 className="mb-4 text-xl font-semibold mmd:text-lg">
          1. Account Terms
        </h3>
        <p className="mb-4">
          1.1. To use {`Bundo's`} Services, you must create an account
          (“Account”) by providing your full legal name, business address, phone
          number, a valid email address, and any other required information
          (collectively, “User Information”). Bundo reserves the right to reject
          your application or cancel your Account at its discretion.
        </p>
        <p className="mb-4">
          1.2. You guarantee that all User Information provided is accurate,
          current, and complete. You agree to promptly update any changes to
          your User Information in your Bundo Account and not to misrepresent
          yourself.
        </p>
        <p className="mb-4">
          1.3. You authorise Bundo, or its third-party partners, to verify your
          identity and User Information. This includes obtaining necessary
          information from institutions and databases to provide the Services.
        </p>
        <p className="mb-4">
          1.4. By using Bundo’s Services, you grant Bundo and its third-party
          providers a limited power of attorney to access third-party websites,
          retrieve your personal information with them (if necessary), and use
          your User Information as needed to provide the Services. This
          authorization allows Bundo and its partners to act as your agent in
          these activities.
        </p>
        <p className="mb-4">
          1.5. You must be at least 18 years old or of legal age in your
          jurisdiction to open an Account.
        </p>
        <p className="mb-4">
          1.6. The Services provided by Bundo are intended for business purposes
          only, not personal or household use.
        </p>
        <p className="mb-4">
          1.7. Bundo will use the email address you provide as your primary
          method of communication. Ensure your email address can both send and
          receive messages. All email communications must come from this primary
          address to be authenticated.
        </p>
        <p className="mb-4">
          1.8. You are responsible for keeping your password secure. Bundo is
          not liable for any loss or damage resulting from your failure to
          maintain security. You must keep your password confidential and are
          responsible for any activity on your Account resulting from a failure
          to do so. Your Account is for your use only and cannot be transferred.
          If you allow someone else to manage your Account, it is at your own
          risk.
        </p>
        <p className="mb-4">
          1.9. Technical support is available only to Bundo Users.
        </p>
        <p className="mb-4">
          1.10. You may not reproduce, duplicate, copy, sell, or exploit any
          part of the Services without {`Bundo's`} express written permission.
        </p>
        <p className="mb-4">
          1.11. Do not attempt to bypass technical limitations of the Services,
          including processing orders outside {`Bundo’s Checkout`}, enabling
          disabled features, or reverse engineering the Services.
        </p>
        <p className="mb-4">
          1.12. You may not use automated tools like robots or scrapers to
          access or monitor material from the Services.
        </p>
        <p className="mb-4">
          1.13. Your Materials may be transmitted unencrypted and may be adapted
          to technical requirements. {`"Materials" `}includes trademarks,
          copyrighted content, products or services sold through the Services,
          and any other data provided by you.
        </p>
        <p className="mb-4">
          1.14. Domain registrations purchased through Bundo will auto-renew
          annually as long as your Account is active. You are responsible for
          deactivating auto-renewal if you choose.
        </p>
        <p className="mb-4">
          1.15. Bundo may suspend or cancel your Account or modify Account
          details at its discretion and without notice. If Services are
          cancelled but paid for, and you have not breached the Agreement, a
          refund will be issued for the unused Services.
        </p>

        <h3 className="mb-4 text-xl font-semibold mmd:text-lg">
          2. Account Activation
        </h3>
        <h4 className="mb-4 text-lg font-semibold mmd:text-base">
          Store Owner
        </h4>
        <p className="mb-4">
          2.1. The person who opens the Account will be the contracting party
          (“Store Owner”) and is authorised to use the corresponding Account.
          Ensure the Store Owner’s name (or legal company name) is visible on
          the Store’s website.
        </p>
        <p className="mb-4">
          2.2. If you are signing up on behalf of your employer, your employer
          will be the Store Owner. Use your employer-issued email address and
          confirm you have the authority to bind your employer to these Terms.
        </p>
        <p className="mb-4">
          2.3. Each Bundo Store can only be associated with one Store Owner,
          although a Store Owner may manage multiple Stores. You agree to use
          Bundo Checkout for transactions.
        </p>

        <h3 className="mb-4 text-xl font-semibold mmd:text-lg">
          3. Bundo Rights
        </h3>
        <p className="mb-4">
          3.1. Not all features will be available to all Vendors at all times.
          Bundo may modify the Services without notice.
        </p>
        <p className="mb-4">
          3.2. Bundo may remove any Materials that violate our policies or
          terms, at our discretion.
        </p>
        <p className="mb-4">
          3.3. Abuse of Bundo staff will result in immediate Account
          termination.
        </p>
        <p className="mb-4">
          3.4. Bundo reserves the right to offer Services to competitors and
          make no exclusivity promises. Bundo employees may also be customers or
          vendors.
        </p>
        <p className="mb-4">
          3.5. In disputes over Account ownership, Bundo may request
          documentation to confirm ownership, including business licences or ID.
        </p>
        <p className="mb-4">
          3.6. Bundo will determine rightful Account ownership and may
          temporarily suspend an Account during disputes.
        </p>
        <p className="mb-4">3.7. The rights listed are not exhaustive.</p>

        <h3 className="mb-4 text-xl font-semibold mmd:text-lg">
          4. Your Responsibilities
        </h3>
        <p className="mb-4">
          4.1. Provide public contact information, refund policies, and order
          fulfilment timelines on your Bundo Store.
        </p>
        <p className="mb-4">
          4.2. Sales contracts are between you and the customer. You are
          responsible for your Store’s operation, materials, and transactions,
          including compliance with laws and handling disputes.
        </p>
        <p className="mb-4">
          4.3. You are responsible for the accuracy and legality of the goods or
          services you offer.
        </p>
        <p className="mb-4">
          4.4. Use Bundo Services legally and comply with all relevant laws,
          including copyright and consumer protection laws.
        </p>
        <p className="mb-4">
          4.5. Use Bundo Checkout for transactions associated with your online
          store.
        </p>
        <p className="mb-4">
          4.6. The responsibilities listed are not exhaustive.
        </p>

        <h3 className="mb-4 text-xl font-semibold mmd:text-lg">
          5. Payment of Fees and Taxes
        </h3>
        <p className="mb-4">
          5.1. Pay Subscription Fees, Transaction Fees, and Additional Fees.
          Together, these are referred to as “Fees.”
        </p>
        <p className="mb-4">
          5.2. Choose a valid payment method to pay for Fees. Bundo will charge
          Fees to this method until Services are terminated.
        </p>
        <p className="mb-4">
          5.3. Subscription Fees are billed in advance. Transaction Fees and
          Additional Fees are charged periodically. Invoices will be sent to
          your Primary Email Address.
        </p>
        <p className="mb-4">
          5.4. If payment fails, Bundo may suspend your Account until Fees are
          paid. Account benefits will be suspended until payment is made.
        </p>
        <p className="mb-4">5.5. Fees do not include taxes.</p>
        <p className="mb-4">
          5.6. You are responsible for applicable Taxes. All applicable fees and
          taxes will be added to your Fees based on your billing address. If
          exempt, provide evidence of exemption.
        </p>
        <p className="mb-4">
          5.7. Fees must be paid without deductions or withholdings, except for
          taxes charged by Bundo.
        </p>
        <p className="mb-4">
          5.8. The Vendor is responsible for all taxes related to sales on your
          Bundo Store.
        </p>
        <p className="mb-4">
          5.9. Maintain an accurate location in your Bundo Store’s admin
          console. Update it if you change jurisdictions.
        </p>
        <p className="mb-4">
          5.10. Bundo may introduce new Services or modify existing ones, and
          may introduce new charges or amend existing fees. You are responsible
          for complying with all applicable laws.
        </p>
      </div>
      <div>
        <h2 className="mb-6 text-2xl font-bold mmd:text-xl">
          6. Confidentiality
        </h2>

        <h3 className="mb-4 text-xl font-semibold mmd:text-lg">
          6.1. Confidential Information
        </h3>
        <p className="mb-4">
          {`"Confidential Information"`} refers to any proprietary information
          of either party including each {`party’s`}intellectual property,
          business practices, technical processes, customer lists, product
          designs, sales data, pricing, financial details, business plans,
          marketing strategies, trade secrets, and business practices relating
          to or in connection with the business. For Bundo, Confidential
          Information also includes any information about us or our Services
          that is not available to the public, including details about our
          security practices.
        </p>

        <h3 className="mb-4 text-xl font-semibold mmd:text-lg">
          6.2. Exceptions
        </h3>
        <p className="mb-4">
          Confidential Information does not include information that: (A) was
          already public or known by the receiving party before disclosure; (B)
          is independently developed by the receiving party without using the
          disclosing party’s Confidential Information; or (C) is received from a
          third party legally and without breaching these Terms.
        </p>

        <h3 className="mb-4 text-xl font-semibold mmd:text-lg">
          6.3. Use and Protection
        </h3>
        <p className="mb-4">
          Both parties agree to use Confidential Information only as needed to
          fulfil their obligations under these Terms and to adhere to all
          related requirements.
        </p>

        <h3 className="mb-4 text-xl font-semibold mmd:text-lg">
          6.4. Disclosure
        </h3>
        <p className="mb-4">
          Each party agrees to protect the Confidential Information with at
          least the same level of care used to protect its own sensitive
          information. Either party shall not disclose confidential information.
          Disclosure is allowed only to employees, agents, or subcontractors who
          need the information to perform their duties and who are bound by
          similar confidentiality obligations. Disclosure may also occur if
          required by law or court order, but the receiving party will, if
          allowed, promptly notify the disclosing party and ensure disclosure of
          information only as is necessary to fulfil the legal obligation and
          continue to make efforts to keep the information confidential.
        </p>

        <h2 className="mb-6 text-2xl font-bold mmd:text-xl">Termination</h2>

        <h3 className="mb-4 text-xl font-semibold mmd:text-lg">
          General Termination
        </h3>
        <p className="mb-4">
          These Terms & Conditions remain in effect until either party
          terminates them or Bundo’s services are terminated.
        </p>

        <p className="mb-4">
          Bundo may terminate this Agreement and remove the Vendor immediately
          if the Vendor is found to be engaged in fraudulent activities, damages
          Bundo’s brand, or acts on instructions from the acquiring bank or
          payment schemes.
        </p>

        <p className="mb-4">
          Either party may terminate this Agreement immediately if the other
          becomes insolvent, ceases business, or part of its business.
        </p>

        <p className="mb-4">
          Either party may terminate this Agreement immediately if the other is
          suspected of fraudulent or unlawful activity related to the services
          provided.
        </p>

        <p className="mb-4">
          Either party may terminate this Agreement immediately if the other
          goes into liquidation, receivership, judicial management, or similar
          proceedings.
        </p>

        <p className="mb-4">
          Either party may terminate this Agreement immediately if a court order
          or similar legal action is taken against the other, or if a receiver
          or similar official is appointed to manage the other’s assets.
        </p>

        <p className="mb-4">
          Either party may terminate this Agreement for convenience by providing
          one (1) month’s written notice.
        </p>

        <p className="mb-4">
          Upon termination, neither party will have further obligations except
          to settle any outstanding payments for transactions completed before
          termination.
        </p>

        <p className="mb-4">
          After termination, access to the Payment Gateway and other services
          will be revoked. Bundo will retain Vendor records, including
          transaction details, for a period of 6 years.
        </p>

        <p className="mb-4">
          Bundo may terminate this Agreement immediately and without prior
          notice for any of the following reasons:
        </p>

        <ul className="mb-4 list-inside list-disc pl-6">
          <li>If the Vendor breaches any terms of this service.</li>
          <li>If the Vendor breaches any terms of the Storefront.</li>
          <li>If the Vendor is deceased or its partnership is dissolved.</li>
          <li>
            If the Vendor’s webpage includes undesirable material or activities
            according to Bundo or any regulatory authority.
          </li>
          <li>If the Vendor’s web page or security system is compromised.</li>
          <li>
            If there are multiple complaints about the Vendor’s goods or
            services from customers.
          </li>
        </ul>

        <h2 className="mb-6 text-2xl font-bold mmd:text-xl">Privacy Policy</h2>

        <h3 className="mb-4 text-xl font-semibold mmd:text-lg">Introduction</h3>
        <p className="mb-4">
          This Privacy Policy details how and when we collect, use, store,
          share, and protect your information across our various platforms,
          including payment systems, APIs, software applications, websites,
          email notifications, and tools, regardless of how you access them.
        </p>

        <p className="mb-4">
          The Privacy Policy applies to all platforms, APIs, websites, and
          software applications operated by Bundo{" "}
          {`(hereafter referred to as
          "Bundo")`}
          . It does not cover services not owned or controlled by Bundo, such as
          third-party websites or the services of other partners. Bundo is
          committed to handling personal data in strict accordance with
          applicable data privacy and protection laws.
        </p>

        <p className="mb-4">
          To use our website or any of our services, you must consent to the use
          of your data as outlined in this Privacy Policy.
        </p>

        <p className="mb-4">
          We are dedicated to safeguarding your privacy and this policy outlines
          our obligations concerning the data we collect.
        </p>

        <h3 className="mb-4 text-xl font-semibold mmd:text-lg">
          Your Privacy Rights
        </h3>
        <p className="mb-4">
          This Privacy Policy describes your privacy rights regarding our
          collection, use, storage, sharing and protection of your personal
          information in our possession. It applies to the Bundo Systems’
          websites, mobile applications, and all databases, applications,
          services, tools and physical contact with us, regardless of how you
          access or use them.
        </p>

        <p className="mb-4">
          If you have created a username, account, password or any other piece
          of information as part of our access security infrastructure, you must
          treat such information as confidential, and such information must not
          be disclosed to any third party.
        </p>

        <p className="mb-4">
          We reserve the right to disable any user identification code or
          password, whether chosen by you or allocated by us, at any time, if in
          our opinion you have failed to comply with any of the provisions of
          this privacy policy.
        </p>

        <p className="mb-4">
          If you know or suspect that anyone other than you knows your security
          details, you must promptly notify us at company@bundo.app or
          support@bundo.app.
        </p>

        <h3 className="mb-4 text-xl font-semibold mmd:text-lg">Consent</h3>
        <p className="mb-4">
          You accept this privacy policy when you give consent upon access to
          our platforms, or use our services, content, features, technology or
          functions offered on our website, digital platforms or visit any of
          our offices for official or non-official purposes (collectively the
          “Bundo Services”). This privacy policy governs the use of the Bundo
          Services by users. We reserve the right to amend this privacy policy
          at any time and at our absolute discretion by posting a revised
          version on our website, digital platforms, or by placing such notice
          at conspicuous points at our office facilities. The revised version
          shall become effective 7 days after publication.
        </p>

        <h3 className="mb-4 text-xl font-semibold mmd:text-lg">
          Personal Information We May Collect
        </h3>
        <p className="mb-4">
          When you use Bundo Services, we collect information sent to us by your
          computer, mobile phone or other electronic devices. The information,
          which is automatically collected, includes but is not limited to data
          about the pages you access, computer IP address, device ID or unique
          identifier, device type, geo-location information, computer and
          connection information, mobile network information, statistics on page
          views, traffic to and from the sites, referral URL, ad data, standard
          web log data, still and moving images.
        </p>

        <p className="mb-4">
          We may also collect information you provide to us including but not
          limited to information on web forms, survey responses, account update
          information, email addresses, phone numbers, organisations you
          represent, official position, correspondence with the Bundo support
          services, and telecommunication with Bundo Systems. We may also
          collect information about your transactions, enquiries and your
          activities on our platform or premises.
        </p>

        <p className="mb-4">
          We may also use information about you and your online activities from
          third parties like social media sites. Information about you provided
          by other sites are not controlled by Bundo Systems and we are,
          therefore, not liable for how such third parties use your information.
        </p>

        <p className="mb-4">
          We may also collect, use, process, store, or transfer other of your
          personal information including:
        </p>

        <ul className="mb-4 list-inside list-disc pl-6">
          <li>
            <strong>Identity Data:</strong> Details such as your full name,
            government-issued identity number, and date of birth, used to verify
            your identity.
          </li>
          <li>
            <strong>Contact Data:</strong> Information needed to contact you,
            such as your address, email, phone number, device details, and
            billing information.
          </li>
          <li>
            <strong>Log/Technical Information:</strong> Automatic records from
            our servers, including browser data, clicked links, session
            duration, device identifiers, and location details.
          </li>
          <li>
            <strong>Financial Data:</strong> Details related to transactions,
            including account numbers, merchant information, transaction dates,
            and amounts.
          </li>
          <li>
            <strong>Transactional Data:</strong> Information about payments made
            through our services.
          </li>
          <li>
            <strong>Marketing and Communications Data:</strong> Records of your
            decisions regarding subscription to or withdrawal from marketing
            materials.
          </li>
        </ul>

        <p className="mb-4">
          We may also collect non-personal or anonymized data such as
          statistical or demographic information.
        </p>

        <h3 className="mb-4 text-xl font-semibold mmd:text-lg">
          Data Collection Methods
        </h3>
        <p className="mb-4">We collect data through:</p>

        <ul className="mb-4 list-inside list-disc pl-6">
          <li>
            <strong>Direct Information:</strong> Data you provide when creating
            an account, filling out forms, or contacting us.
          </li>
          <li>
            <strong>Usage Information:</strong> Data on how you interact with
            our products and services, including features used and content
            viewed.
          </li>
          <li>
            <strong>Location Data:</strong> If permitted, data about your
            {`device's`} location to offer location-based features.
          </li>
          <li>
            <strong>Device Information:</strong> Details about your device,
            including model, OS version, and ID.
          </li>
          <li>
            <strong>Log Data:</strong> Information such as IP address, device
            type, browser type, and pages visited.
          </li>
        </ul>

        <h3 className="mb-4 text-xl font-semibold mmd:text-lg">Use of Data</h3>
        <p className="mb-4">We use collected data to:</p>

        <ul className="mb-4 list-inside list-disc pl-6">
          <li>
            Improve our products and services, personalise your experience, and
            provide customer support.
          </li>
          <li>
            Manage accounts, verify identities, process payments, and respond to
            inquiries.
          </li>
          <li>Comply with legal obligations and enforce our policies.</li>
          <li>
            Manage risk, or to detect, prevent, and/or remediate fraud or other
            potentially prohibited or illegal activities.
          </li>
          <li>
            Communicate product updates, promotional offers, and program
            information.
          </li>
          <li>Evaluate job applications and target advertisements.</li>
          <li>
            Personalise your experience and conduct research for user insights.
          </li>
          <li>Provide services and support.</li>
          <li>
            Process applications and send notices about your transactions to
            requisite parties.
          </li>
          <li>Resolve disputes, collect fees, and troubleshoot problems.</li>
          <li>
            Detect, prevent or remediate violation of laws, regulations,
            standards, guidelines and frameworks.
          </li>
          <li>
            Improve our services by implementing aggregate customer or user
            preferences.
          </li>
          <li>
            Measure the performance of our products and improve content,
            technology and layout.
          </li>
          <li>
            Track information breach and remediate such identified breaches.
          </li>
          <li>
            Manage and protect our information technology and physical
            infrastructure.
          </li>
          <li>
            Contact you at any time through your provided telephone number,
            email address or other contact details.
          </li>
        </ul>
      </div>

      <div className="">
        <h2 className="mb-6 text-2xl font-bold mmd:text-xl">
          How We Protect Your Personal Information
        </h2>
        <p className="mb-4">
          We store and process your personal information on our servers in
          Nigeria. Where we need to transfer your data to another country, such
          country must have an adequate data protection law. We will seek your
          consent where we need to send your data to a country without adequate
          data protection laws. We protect your information using physical,
          technical, and administrative security measures to reduce the risks of
          loss, misuse, unauthorised access, disclosure and alteration. Some of
          the safeguards we use are firewalls and data encryption, physical
          access controls to our data centres, and information access
          authorization controls.
        </p>

        <h2 className="mb-6 text-2xl font-bold mmd:text-xl">Data Sharing</h2>
        <p className="mb-4">
          During your interaction with our website, Application or premises, we
          may provide our affiliates or other responsible third parties with
          information such as your name, contact details, or other details you
          provide us for the purpose of performing our statutory mandate to you
          or third parties.
        </p>
        <p className="mb-4">
          We work with third parties, including regulatory agencies to perform
          our services. In doing so, a third party may share information about
          you with us, such as your email address or mobile phone number.
        </p>
        <p className="mb-4">
          You accept that your pictures and testimonials on all social media
          platforms about Bundo Systems can be used for limited promotional
          purposes by us. This does not include your trademark or copyrighted
          materials.
        </p>
        <p className="mb-4">
          From time to time, we may send you relevant information such as news
          items, and essential information to assist you. We may also share your
          personal information in compliance with national or international
          laws; crime prevention and risk management agencies and service
          providers.
        </p>
        <p className="mb-4">
          Note that we do not sell or rent personal information but may share it
          under certain conditions:
        </p>
        <ul className="mb-4 list-inside list-disc pl-6">
          <li>With your consent.</li>
          <li>To comply with our legal requirements.</li>
          <li>To protect our rights or during mergers and acquisitions.</li>
          <li>
            With third-party service providers for tasks such as hosting,
            payment processing, or customer support. These providers are equally
            required to adhere to strict data protection standards.
          </li>
          <li>
            With financial institutions for transaction processing and fraud
            prevention.
          </li>
          <li>
            Across our affiliates and subsidiaries as needed for service
            delivery.
          </li>
          <li>
            Data may be transferred internationally, subject to compliance with
            applicable data protection regulations.
          </li>
        </ul>

        <h2 className="mb-6 text-2xl font-bold mmd:text-xl">Data Retention</h2>
        <p className="mb-4">
          We retain data only as long as necessary for its intended purposes or
          as required by law.
        </p>

        <h2 className="mb-6 text-2xl font-bold mmd:text-xl">Data Security</h2>
        <p className="mb-4">
          We will always hold your information safely and securely. To prevent
          unauthorized access to your information, we have implemented strong
          controls and security safeguards at the technical and operational
          levels. We implement technical, administrative, and organizational
          measures to secure your data, including encryption and firewall
          technologies.
        </p>
        <p className="mb-4">
          In order to secure your information, our websites use Secure Sockets
          Layer/Transport Layer Security (SSL/TLS) to ensure secure transmission
          of your personal data. You should see the padlock symbol in your URL
          address bar once you are successfully logged into the platform. The
          URL address will also start with https:// depicting a secure webpage.
          SSL applies encryption between two points such as your PC and the
          connecting server. Any data transmitted during the session will be
          encrypted before transmission and decrypted at the receiving end. This
          is to ensure that data cannot be interrupted and read during
          transmission. This level of protection and encryption also applies to
          all our mobile applications on all available platforms.
        </p>
        <p className="mb-4">
          We have also taken measures to comply with global Information Security
          Management Systems. We have, therefore, put in place digital and
          physical security measures to limit or eliminate possibilities of data
          privacy breach incidents.
        </p>

        <h2 className="mb-6 text-2xl font-bold mmd:text-xl">
          Data Confidentiality Rights
        </h2>
        <p className="mb-4">
          Your information is regarded as confidential and will not be divulged
          to any third party, except under legal and/or regulatory conditions.
          You have the right to request sight of, and copies of any and all
          information we keep on you, if such requests are reasonably made in
          compliance with the relevant applicable laws in Nigeria. While Bundo
          is responsible for safeguarding the information entrusted to us, your
          role in fulfilling confidentiality duties includes, but is not limited
          to, adopting and enforcing appropriate security measures such as
          non-sharing of passwords and other platform login details, adherence
          with physical security protocols on our premises, and dealing with
          only authorized officers of Bundo Systems.
        </p>

        <h2 className="mb-6 text-2xl font-bold mmd:text-xl">Access to Data</h2>
        <p className="mb-4">
          You have the right to access, correct, or delete your personal data.
          Contact us to exercise these rights.
        </p>

        <h2 className="mb-6 text-2xl font-bold mmd:text-xl">
          Data Protection Rights
        </h2>
        <ul className="mb-4 list-inside list-disc pl-6">
          <li>
            <strong>Right to Information:</strong> To be informed about your
            personal data.
          </li>
          <li>
            <strong>Right of Access:</strong> To view your personal data.
          </li>
          <li>
            <strong>Right to Rectification:</strong> To correct inaccuracies in
            your data.
          </li>
          <li>
            <strong>Right to Erasure:</strong> To delete data no longer needed.
          </li>
          <li>
            <strong>Right to Restrict Processing:</strong> To limit data
            processing for marketing.
          </li>
          <li>
            <strong>Right to Data Portability:</strong> To obtain your data in a
            transferable format.
          </li>
          <li>
            <strong>Right to Object:</strong> To object to certain data
            processing activities.
          </li>
          <li>
            <strong>Right to Not Be Subject to Automated Decisions:</strong> To
            avoid automated decision-making.
          </li>
        </ul>

        <h2 className="mb-6 text-2xl font-bold mmd:text-xl">
          Links to Other Websites
        </h2>
        <p className="mb-4">
          Certain transaction processing channels may require links to other
          websites or organizations other than ours. Please note that we are not
          responsible and have no control over websites outside our domain. We
          do not monitor or review the content of other party’s websites which
          are linked from our website or media platforms.
        </p>
        <p className="mb-4">
          Opinions expressed or materials appearing on such websites are not
          necessarily shared or endorsed by us, and Bundo should not be regarded
          as the publisher of such opinions or materials.
        </p>
        <p className="mb-4">
          Please be aware that we are not responsible for the privacy practices,
          or content of these other sites. We encourage our users to be aware of
          when they leave our site, and to read the privacy statements of these
          sites. You should evaluate the security and trustworthiness of any
          other site connected to our website and mobile applications or
          accessed through this site yourself, before disclosing any personal
          information to them.
        </p>
        <p className="mb-4">
          We will not accept responsibility for any loss or damage in whatever
          manner, howsoever arising, resulting from your disclosure of personal
          information to third parties.
        </p>

        <h2 className="mb-6 text-2xl font-bold mmd:text-xl">Cookies</h2>
        <p className="mb-4">
          Cookies are small files placed on your computer’s hard drive that
          enables the website to identify your computer as you view different
          pages. Cookies allow websites and applications to store your
          preferences in order to present contents, options or functions that
          are specific to you. Like most interactive websites, our website uses
          cookies to enable the recording of your activity for the duration of a
          session. Our website uses only encrypted session cookies which are
          erased either after a predefined timeout period or once you log out of
          the platform and close the browser. Session cookies do not collect
          information from the user’s computer. They will typically store
          information in the form of a session identification that does not
          personally identify the user.
        </p>
        <p className="mb-4">
          You may disable cookies through your browser settings, but this may
          limit your ability to use some features of our website.
        </p>

        <h2 className="mb-6 text-2xl font-bold mmd:text-xl">
          Contact Information
        </h2>
        <p className="mb-4">
          For questions or concerns about this Privacy Policy, contact us at
          contact@bundo.com. We may request additional details to address your
          inquiries and maintain records of our communications.
        </p>

        <h2 className="mb-6 text-2xl font-bold mmd:text-xl">Governing Law</h2>
        <p className="mb-4">
          This privacy policy is made pursuant to the Nigeria Data Protection
          Regulation 2019 and other relevant Nigerian laws, regulations or
          international conventions applicable to and in Nigeria. Where any
          provision of this Policy is deemed inconsistent with a law, regulation
          or convention, such provision shall be subject to the overriding law,
          regulation or convention.
        </p>
      </div>
      <h2 className="mb-6 text-2xl font-bold mmd:text-xl">Cookies Policy</h2>
      <p className="mb-4">
        Bundo (referred to as “Bundo,” “we,” “us,” or “our”) utilises cookies on
        our website (“Website”). By using our Website or any of our services,
        you agree to our use of cookies. This Cookies Policy outlines what
        cookies are, how we use them, and your options regarding cookies. Please
        review this policy alongside our Privacy Policy for additional details
        on how we handle personal information collected through your use of the
        Website.
      </p>

      <h3 className="mb-4 text-xl font-semibold mmd:text-lg">
        What Are Cookies?
      </h3>
      <p className="mb-4">
        Cookies are small text files sent to your web browser by a website you
        visit. These files may include web beacons, log files, and other
        tracking technologies, collectively known as “Cookies.” Cookies are
        stored in your web browser and help our Website recognize you and
        enhance your experience. They track your activities on the Website and
        retain information to improve future interactions.
      </p>

      <h3 className="mb-4 text-xl font-semibold mmd:text-lg">
        How Bundo Uses Cookies
      </h3>
      <p className="mb-4">
        When you access our Website, we may place various cookies in your web
        browser.
      </p>
      <ul className="mb-4 list-inside list-disc pl-6">
        <li>
          <strong>Identify and Distinguish Visitors:</strong> To recognize and
          differentiate between visitors.
        </li>
        <li>
          <strong>Track Navigation:</strong> To monitor your navigation through
          our Website and record your progress on past activities, if
          applicable.
        </li>
        <li>
          <strong>Determine Content Preferences:</strong> To understand your
          content preferences and site usage patterns.
        </li>
        <li>
          <strong>Measure Visit Duration:</strong> To measure the duration of
          your visits and specific functionalities you use.
        </li>
      </ul>

      <h3 className="mb-4 text-xl font-semibold mmd:text-lg">Cookies Types</h3>
      <ul className="mb-4 list-inside list-disc pl-6">
        <li>
          <strong>Functionality Cookies:</strong> Remember you when you return
          to our Website, allowing us to personalise content, greet you by name,
          and retain your preferences (e.g., language or region).
        </li>
        <li>
          <strong>Analytical/Performance Cookies:</strong> Help us assess how
          you use our Website, including visit and traffic data to enhance our
          services.
        </li>
        <li>
          <strong>Targeting Cookies:</strong> Record your visits, pages viewed,
          and links followed to tailor our Website and content to better match
          your interests.
        </li>
      </ul>

      <h3 className="mb-4 text-xl font-semibold mmd:text-lg">
        Your Choices Regarding Cookies
      </h3>
      <p className="mb-4">
        You can disable cookies by adjusting your browser settings and deleting
        any existing cookies. However, doing so may affect your ability to use
        certain features of our Website. For instance, you might experience
        difficulties logging in, saving preferences, or viewing some pages
        correctly. Your browser may offer options to manage cookies, including
        setting preferences for specific sites.
      </p>

      <h3 className="mb-4 text-xl font-semibold mmd:text-lg">Contact Us</h3>
      <p className="mb-4">
        For any questions regarding our use of cookies on the Website, please
        contact us at{" "}
        <a href="mailto:company@bundo.app" className="text-blue-500">
          company@bundo.app
        </a>{" "}
        or{" "}
        <a href="mailto:support@bundo.app" className="text-blue-500">
          support@bundo.app
        </a>
        .
      </p>

      <h2 className="mb-6 text-2xl font-bold mmd:text-xl">
        Terms and Agreement
      </h2>
      <p className="mb-4">
        You understand and agree that Bundo connects you with Vendors who are
        responsible for the actual sale of the goods. Unless otherwise
        indicated, Bundo is not the Vendor, seller or supplier and does not ship
        or deliver goods.
      </p>

      <p className="mb-4">
        However, Bundo ensures that vendors, sellers, suppliers, and shippers of
        goods featured on Bundo’s platforms agree to conform to good business
        practices and are in compliance with applicable laws relating to the
        sale of goods and consumer protection. As such, Bundo is in a position
        to mediate any disputes that may arise relating to the sale of any piece
        of merchandise on the Bundo platform.
      </p>

      <p className="mb-4">
        You agree that Bundo’s involvement in the dispute resolution process is
        limited to facilitating mediation between the parties and is in no
        position to make binding decisions for the parties. Where the parties
        are unable to agree, the purchase price shall be paid to the Vendor, and
        the customer may proceed to contact the vendor directly.
      </p>

      <p className="mb-4">
        Prior to purchase, you are responsible for confirming the cancellation,
        return, and refund policy of the vendor, seller or supplier. Bundo is
        responsible for administering the process under its customer service
        policy.
      </p>

      <p className="mb-4">
        While Bundo may assist in facilitating the delivery of the goods, Bundo
        makes no representations nor gives any warranties relating to the supply
        of the goods and is not responsible for any loss or damage to the goods
        while in transit. Our third-party shipping integration companies are
        responsible for the delivery of goods and are responsible for any damage
        to the goods while in transit. Where the goods were damaged while in
        transit, the third-party logistics provider will be solely responsible
        for refunds for damaged goods. Such refunds may be subject to the
        third-party logistics provider’s insurance policies. You are responsible
        for confirming the identity of the third-party logistics provider, and
        confirming their insurance and refund policies as it regards limitation
        of liability and the consequential refunds that you may be entitled to
        in the case of damage to goods while in transit. Under no circumstances
        is Bundo responsible for payment and refunds for goods damaged in
        transit. Bundo’s role in the process is providing support and ensuring,
        on a reasonable effort basis, that only credible third-party logistics
        providers having reasonable insurance policies are available to provide
        logistics services on the Bundo platform. In any case, customers are
        entitled to a refund under the following circumstances:
      </p>

      <ul className="mb-4 list-inside list-disc pl-6">
        <li>
          <strong>(a) Non-delivery of the goods:</strong> If you {`haven’t`}
          received the item you ordered after the estimated delivery time, or it
          was not delivered at all.
        </li>
        <li>
          <strong>(b) Delivery of expired goods:</strong> If the goods delivered
          are expired.
        </li>
      </ul>

      <h3 className="mb-4 text-xl font-semibold mmd:text-lg">
        {` Manufacturer's`} Warranty and Disclaimers
      </h3>
      <ul className="mb-4 list-inside list-disc pl-6">
        <li>
          <strong>(a) We do not manufacture or control:</strong> Any of the
          products or services offered on the Bundo platform.
        </li>
        <li>
          <strong>(b) No representations or warranties:</strong> We make no
          representations and warranties as to the quality, availability, and
          suitability of any product, goods, and services advertised on the
          Bundo platform.
        </li>
        <li>
          <strong>(c) No affiliation or endorsement:</strong> The availability
          of products or services through the Bundo platforms does not indicate
          an affiliation with or endorsement of any product, service, or
          manufacturer.
        </li>
        <li>
          <strong>(d) No conditions or warranties provided:</strong> We do not
          provide any conditions or warranties with respect to the products or
          services offered on the Bundo platform.
        </li>
        <li>
          <strong>{`(e) Manufacturer's`} warranty:</strong> The products and
          services offered on the Bundo platform are covered by the
          {`manufacturer's`} warranty as detailed in the {`product's`}{" "}
          description on the Bundo platform and included with the product.
        </li>
        <li>
          <strong>
            (f) No liability for {`manufacturer's`} warranty failures:
          </strong>{" "}
          YOU AFFIRM THAT WE SHALL NOT BE LIABLE, UNDER ANY CIRCUMSTANCES, FOR
          ANY BREACH OF WARRANTY OR CONDITION CLAIMS OR FOR ANY DAMAGES ARISING
          OUT OF THE {`MANUFACTURER'S`} FAILURE TO HONOUR ITS WARRANTY
          OBLIGATIONS TO YOU.
        </li>
      </ul>

      <h3 className="mb-4 text-xl font-semibold mmd:text-lg">
        General Guiding Principles for Cancellation, Return and Refunds
      </h3>
      <h4 className="mb-4 text-lg font-semibold mmd:text-base">Cancellation</h4>
      <ul className="mb-4 list-inside list-disc pl-6">
        <li>
          <strong>Cancellation Window:</strong> Cancellation can be done only
          within 24 hours of confirmation of order or before the goods have been
          processed for delivery, whichever is sooner.
        </li>
        <li>
          <strong>No Cancellation Post Shipping:</strong> Cancellation cannot be
          carried out after an order has been shipped.
        </li>
        <li>
          <strong>Vendor Delay:</strong> Where the vendor fails to deliver the
          goods within the estimated delivery time, the transaction can be
          cancelled and the customer is refunded.
        </li>
      </ul>

      <h3 className="mb-4 text-xl font-semibold mmd:text-lg">
        Return and Refunds
      </h3>
      <ul className="mb-4 list-inside list-disc pl-6">
        <li>
          <strong>Defective or Damaged Goods:</strong> Return can only be done
          in the case of defective or damaged goods, depending on if the Vendor
          has set the product to be returnable and if the merchandise falls
          under the eligibility criteria.
        </li>
        <li>
          <strong>Goods Ordered in Error:</strong> Goods ordered in error may be
          returned for a refund with the consent and agreement of the vendor.
          Requests for return and refunds can only be done within 24 hours of
          receipt of the item.
        </li>
        <li>
          <strong>Transaction Closure:</strong> If the goods are deemed
          accepted, and the transaction is closed after 24 hours of confirmation
          of receipt of the item, the vendor will be paid immediately
          thereafter.
        </li>
        <li>
          <strong>Refund Processing:</strong> Refunds will be processed within
          24 hours of the receipt by the vendor of the returned goods.
        </li>
        <li>
          <strong>Cost of Return:</strong> The cost of return will be borne by
          the vendor in the case of defective, damaged, or incorrect goods. In
          the case of goods ordered in error, the customer will bear the cost of
          return.
        </li>
      </ul>

      <h4 className="mb-4 text-lg font-semibold mmd:text-base">
        Items NOT Acceptable for Returns in the Marketplace
      </h4>
      <p className="mb-4">
        <strong>PS:</strong> THE FOLLOWING ONLY APPLIES TO
        PRODUCTS/GOODS/MERCHANDISE THAT HAVE BEEN SET TO RETURNABLE BY THE
        VENDOR.
      </p>
      <ul className="mb-4 list-inside list-disc pl-6">
        <li>
          <strong>Products Damaged Due to Misuse:</strong> If a product is
          damaged because of customer misuse, the responsibility lies with the
          customer rather than the seller.
        </li>
        <li>
          <strong>Product with Damaged or Tampered Packaging:</strong> Tampered
          packaging can indicate that the product may have been used,
          compromised, or contaminated. Returning such items poses a health and
          safety risk, and it is difficult to guarantee their original quality
          and safety.
        </li>
        <li>
          <strong>
            Products Modified or Altered from Their Original Form:
          </strong>{" "}
          Altered or modified products may not be resalable due to changes in
          their condition or functionality. This makes it challenging to
          determine the {`product's`} integrity.
        </li>
        <li>
          <strong>Intimate Products:</strong> Due to hygiene and privacy
          concerns, intimate products often cannot be returned once opened or
          used. This policy reduces the risk of reselling used items and ensures
          appropriate handling of sensitive items.
        </li>
        <li>
          <strong>Agricultural Items:</strong> Agricultural products, such as
          seeds and plants, are sensitive to handling and environmental
          conditions. Returning these items may result in contamination or
          deterioration, making them unsuitable for resale.
        </li>
        <li>
          <strong>Perishable Goods:</strong> Perishable goods cannot be returned
          except if a valid reason is raised at the point of delivery with
          affirmation from the dispatcher. The exception ensures immediate
          issues are addressed. Kindly Note that Bundo does not currently
          support Perishable goods (e.g., Fast Food, Fruits, Snacks, etc.)
          within the platform.
        </li>
        <li>
          <strong>
            Products in the Beauty, Health, and Personal Care Categories:
          </strong>{" "}
          These products often have hygiene and safety concerns. Once opened or
          used, they are unsuitable for returns and resale.
        </li>
        <li>
          <strong>
            Jewellery, Innerwear, Bed Sheets, Lingerie, and Socks:
          </strong>{" "}
          These items are personal in nature, and their return poses hygiene and
          health concerns. For underwear and lingerie, the intimate nature makes
          it inappropriate to resell returned items, ensuring customers receive
          new and unused products.
        </li>
      </ul>

      <h4 className="mb-4 text-lg font-semibold mmd:text-base">
        Acceptable Reasons for Refunds
      </h4>
      <ul className="mb-4 list-inside list-disc pl-6">
        <li>
          <strong>Goods Not Received or Undelivered:</strong> If you haven’t
          received the item you ordered after the estimated delivery time, or it
          was not delivered at all.
        </li>
        <li>
          <strong>Item(s) Unavailable:</strong> If the item(s) you ordered are
          not in stock or cannot be provided.
        </li>
        <li>
          <strong>Item Not as Advertised:</strong> If the item you received is
          very different from what was shown or described on the {`vendor's`}{" "}
          page.
        </li>
        <li>
          <strong>Defective Item(s):</strong> If the item you received is faulty
          or not working/functioning as it should.
        </li>
        <li>
          <strong>Other Reasons Approved by Platform Administrators:</strong>{" "}
          Any other return reasons that the platform administrators consider
          valid.
        </li>
      </ul>
      <p className="mb-4">
        Kindly Note: For refunds arranged directly between you and the merchant,
        Bundo is not responsible for any disputes that may arise.
      </p>

      <h4 className="mb-4 text-lg font-semibold mmd:text-base">
        Return Instructions
      </h4>
      <ul className="mb-4 list-inside list-disc pl-6">
        <li>
          <strong>Initiate a Return:</strong> To initiate a return, go to the
          “My Orders” page on your Bundo account, click on the product(s) you
          wish to return and click on the “Request return” button to file a
          return claim, stating the reason for your return with the option to
          attach images of proof.
        </li>
        <li>
          <strong>Claim Review:</strong> Once your claim has been submitted
          (which should be within 24 hours after receipt of the order), your
          request will be reviewed within 8–12 hours and can either be accepted
          or declined, depending on if it meets the standards set in our policy.
        </li>
        <li>
          <strong>Declined Requests:</strong> If your request is declined, you
          will be notified via email or phone. Kindly do not panic and read our
          policy to learn more about our return and refunds, to avoid future
          disappointment.
        </li>
        <li>
          <strong>Approved Requests:</strong> If your request is approved, our
          team will notify you via email, as well as the vendor in question to
          initiate a return. Bundo will assist only by notifying the vendor to
          resolve the matter as its sole responsibility without any further
          obligation.
        </li>
        <li>
          <strong>Vendor Follow-Up:</strong> Once the vendor has been notified
          and has accepted the request within the timeline of 48 hours, there
          will be a follow-up between the vendor and you.
        </li>
        <li>
          <strong>Refund Initiation:</strong> Upon confirmation of receipt of
          the return by the vendor, a refund will then be initiated.
        </li>
      </ul>

      <div className=" w-full overflow-x-hidden">
        <h3 className=" mx-auto my-4 text-center  text-xl">
          Requirement for refund
        </h3>

        <div className="w-full overflow-x-scroll">
          <table className="mx-auto  border-collapse border border-green-500 text-left text-sm text-gray-700">
            <thead>
              <tr>
                <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-xs sm:text-nowrap sm:text-base">
                  Reasons for refund
                </th>
                <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-xs sm:text-nowrap sm:text-base">
                  Description
                </th>
                <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-xs sm:text-nowrap sm:text-base">
                  Still in New Condition
                </th>{" "}
                <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-xs sm:text-nowrap sm:text-base">
                  Not Damaged
                </th>{" "}
                <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-xs sm:text-nowrap sm:text-base">
                  Original Packaging
                </th>{" "}
                <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-xs sm:text-nowrap sm:text-base">
                  Tags & Labels attached
                </th>{" "}
                <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-xs sm:text-nowrap sm:text-base">
                  Complete Accessories & Free Gifts
                </th>
              </tr>
            </thead>
            <tbody>
              {requirements.map((requirement, index) => (
                <tr key={index}>
                  <td className="place-content-center border border-gray-300 px-4 py-2">
                    {requirement.reason}
                  </td>
                  <td className="min-w-[250px] place-content-center border border-gray-300 px-4 py-2">
                    {requirement.desc}
                  </td>
                  <td className="place-content-center border border-gray-300 px-4 py-2">
                    {requirement.inCondition ? (
                      <SvgMark />
                    ) : (
                      <span className="mx-auto w-full text-center">N/A</span>
                    )}
                  </td>{" "}
                  <td className="place-content-center border border-gray-300 px-4 py-2">
                    {!requirement.damaged ? (
                      <SvgMark />
                    ) : (
                      <span className="mx-auto w-full text-center">N/A</span>
                    )}
                  </td>{" "}
                  <td className="place-content-center border border-gray-300 px-4 py-2">
                    {requirement.originalPackage ? (
                      <SvgMark />
                    ) : (
                      <span className="mx-auto w-full text-center">N/A</span>
                    )}
                  </td>{" "}
                  <td className="place-content-center border border-gray-300 px-4 py-2">
                    {requirement.tagsAndLabels ? (
                      <SvgMark />
                    ) : (
                      <span className="mx-auto w-full text-center">N/A</span>
                    )}
                  </td>{" "}
                  <td className="place-content-center border border-gray-300 px-4 py-2">
                    {requirement.extras ? (
                      <SvgMark />
                    ) : (
                      <span className="mx-auto w-full text-center">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditionsOfService;

function SvgMark() {
  return <CheckSquare className="mx-auto text-green-700" />;
}
