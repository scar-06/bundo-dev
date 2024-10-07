import { CallIcon, LoveFilled, TwitterLogo, WhatsAppLogo } from "@/assets";

function Contact({
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
  const contactItems = [
    {
      icon: <LoveFilled />,
      title: "Add this vendor to your favourites",
    },
  ];
  return (
    <div className="mt-3 flex flex-col">
      {contactItems.slice(0, 1).map((prop) => (
        <div
          className="flex items-center gap-3 border-b-[1px] border-b-[#C9C2B6] px-4 py-6"
          key={Math.random() * Math.PI}
        >
          <span>{prop.icon}</span>
          <span>{prop.title}</span>
        </div>
      ))}

      {phone_calls && (
        <a
          aria-label="call mobile number"
          href={`tel:${phone_calls}`}
          className="flex items-center gap-3 border-b-[1px] border-b-[#C9C2B6] px-4 py-6"
          key={Math.random() * Math.PI}
        >
          <span>
            <CallIcon />
          </span>
          <span>Call {phone_calls}</span>
        </a>
      )}
      {/* {additionalPhone && (
        <a
          aria-label="call hidden mobile number"
          href={`tel:${additionalPhone}`}
          rel="noreferrer"
          className="flex items-center gap-3 border-b-[1px] border-b-[#C9C2B6] px-4 py-6"
          key={Math.random() * Math.PI}
        >
          <span>
            <CallIcon />
          </span>
          <span>Call {additionalPhone}</span>
        </a>
      )}
      {phone_whatsapp && (
        <a
          aria-label="Chat on WhatsApp"
          target="_blank"
          rel="noreferrer"
          href={`https://wa.me/234${phone_whatsapp.slice(1)}`}
          className="flex items-center gap-3 border-b-[1px] border-b-[#C9C2B6] px-4 py-6"
          key={Math.random() * Math.PI}
        >
          <span>
            <WhatsAppLogo />
          </span>
          <span>Chat on whatsapp</span>
        </a>
      )}
      {phone_whatsappBusiness && (
        <a
          aria-label="Chat on WhatsApp"
          target="_blank"
          rel="noreferrer"
          href={`https://wa.me/234${phone_whatsappBusiness.slice(1)}`}
          className=" hidden items-center gap-3 border-b-[1px] border-b-[#C9C2B6] px-4 py-6"
          key={Math.random() * Math.PI}
        >
          <span>
            <WhatsAppLogo />
          </span>
          <span>Chat on whatsapp business</span>
        </a>
      )}
      {twitterLink && (
        <a
          aria-label="message on Twitter"
          href={`${twitterLink}`}
          rel="noreferrer"
          target="_blank"
       
          className="flex items-center gap-3 border-b-[1px] border-b-[#C9C2B6] px-4 py-6"
          key={Math.random() * Math.PI}
        >
          <span>
            <TwitterLogo className="text-green-600" />
          </span>
          <span>Chat on Twitter</span>
        </a>
      )} */}
    </div>
  );
}

export default Contact;
