"use client";

import React, { useState } from "react";
import {
  ChatWhatsappIcon,
  CloseContactsIcon,
  GreenCallIcon,
  OpenContactsIcon,
  WhatsAppIcon,
} from "@/assets";

import cn from "@/lib/utils";

function ContactsButton({
  phone_calls,
  phone_whatsapp,
  additionalPhone,
  phone_whatsappBusiness,
  twitterLink,
}: {
  phone_calls?: string;
  phone_whatsapp?: string;
  additionalPhone?: string;
  phone_whatsappBusiness?: string;
  twitterLink?: string;
}) {
  const [showContacts, setShowContacts] = useState(false);
  return (
    <div className="">
      <div
        className={cn(
          `absolute bottom-[110px] right-3 grid w-[88px] overflow-hidden transition-all duration-500 ease-in-out`,
          showContacts
            ? "h-[auto] grid-rows-[1fr] opacity-100"
            : "h-[0px] grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="flex h-fit w-full flex-col">
          <div className="hidden">
            {additionalPhone}
            {twitterLink}
          </div>
          {phone_whatsapp && (
            <a
              aria-label="Chat on WhatsApp"
              target="_blank"
              rel="noreferrer"
              href={`https://wa.me/234${phone_whatsapp.slice(1)}`}
              key={Math.random() * Math.PI}
            >
              <span>
                <WhatsAppIcon />
              </span>
            </a>
          )}
          {phone_whatsappBusiness && (
            <a
              aria-label="Chat on WhatsApp"
              target="_blank"
              rel="noreferrer"
              href={`https://wa.me/234${phone_whatsappBusiness.slice(1)}`}
              key={Math.random() * Math.PI}
            >
              <span>
                <ChatWhatsappIcon />
              </span>
            </a>
          )}
          {phone_calls && (
            <a
              aria-label="call mobile number"
              href={`tel:${phone_calls}`}
              rel="noreferrer"
              key={Math.random() * Math.PI}
            >
              <span>
                <GreenCallIcon />
              </span>
            </a>
          )}
        </div>
      </div>
      <button
        onClick={() => setShowContacts(!showContacts)}
        className="absolute bottom-4 right-3 h-[73px] w-[73px]  drop-shadow-lg transition-all duration-500 ease-in-out "
      >
        <CloseContactsIcon
          className={cn(
            `absolute  left-[-15px] top-[-9px] scale-[0.985] transition-all duration-500 ease-in-out`,
            showContacts ? "opacity-100" : "opacity-0",
          )}
        />
        <OpenContactsIcon
          className={cn(
            `absolute  left-[-20px] top-[-10px] scale-[0.95] transition-all duration-500 ease-in-out`,
            !showContacts ? "opacity-100" : "opacity-0",
          )}
        />
      </button>
    </div>
  );
}

export default ContactsButton;
