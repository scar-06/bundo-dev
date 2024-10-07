import Image from "next/image";
import Link from "next/link";
import {
  FacebookLogo,
  footerImage,
  FullLogo,
  InstagramLogo,
  LinkedInLogo,
  TwitterLogo,
} from "@/assets";

export function Footer() {
  return (
    <footer>
      <div className="container  px-4 pt-10 ">
        <Link href="/" className="flex flex-col space-y-2">
          <FullLogo className="-ml-4 scale-75" />
          <small className="text-sm font-light capitalize tracking-tight text-tertiary-white-800">
            Simplifying Retail.
          </small>
        </Link>
        <div className="mt-10 flex w-full flex-col-reverse items-start gap-24  sm:flex-row">
          <div className="flex justify-center md:block ">
            <Image
              src={footerImage}
              alt="footer-image"
              placeholder="blur"
              width={377}
            />
          </div>
          <div className="flex min-h-[400px] grow flex-col justify-between  pb-6">
            <div className="grid grid-cols-2 flex-wrap gap-x-14 md:gap-x-20 lg:flex xlg:grid xlg:grid-cols-4">
              <div>
                <h4 className=" mb-4 text-lg font-bold text-tertiary-deep-green-950 ">
                  Company
                </h4>
                <div className=" [&>a]:mb-5 [&>a]:block [&>a]:text-sm [&>a]:font-[300] [&>a]:text-tertiary-pale-950">
                  <Link className="hover:underline" href="/about">
                    About Us
                  </Link>
                  <a
                    className="hover:underline"
                    href="https://tiny-aletopelta-82e.notion.site/3d1201de7266457eb1678b931b60aba7?v=39b4be0ea79a469fa669548d4a5d32d8"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Careers
                  </a>
                  <a
                    className="hover:underline"
                    href="https://chat.whatsapp.com/G6wdiNfRWQSB6VPxR2Xtgj"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Community
                  </a>
                </div>
              </div>

              <div>
                <h4 className=" mb-4 text-lg font-bold text-tertiary-deep-green-950 ">
                  Contact
                </h4>
                <div className=" flex flex-col [&>*]:mb-5 [&>*]:block [&>*]:text-sm [&>*]:font-[300] [&>a]:text-tertiary-pale-950">
                  <p>Lagos, Nigeria</p>

                  <a
                    className="hover:underline"
                    href="mailto:company@bundo.app"
                    target="_blank"
                    rel="noreferrer"
                  >
                    company@
                    <br className="md:hidden" />
                    bundo.app
                  </a>
                </div>
              </div>

              <div>
                <h4 className=" mb-4 text-lg font-bold text-tertiary-deep-green-950 ">
                  Support
                </h4>
                <div className=" [&>a]:mb-5 [&>a]:block [&>a]:text-sm [&>a]:font-[300] [&>a]:text-tertiary-pale-950">
                  <Link className="hover:underline" href="/#faqs">
                    FAQs
                  </Link>
                  <a
                    className="hover:underline"
                    href="mailto:support@bundo.app"
                    target="_blank"
                    rel="noreferrer"
                  >
                    support@bundo.app
                  </a>
                  <a
                    className="hover:underline"
                    href="mailto:help@bundo.app"
                    target="_blank"
                    rel="noreferrer"
                  >
                    help@bundo.app
                  </a>
                </div>
              </div>

              <div>
                <h4 className=" mb-4 text-lg font-bold text-tertiary-deep-green-950 ">
                  Legal
                </h4>
                <div className=" [&>a]:mb-5 [&>a]:block [&>a]:text-sm [&>a]:font-[300] [&>a]:text-tertiary-pale-950">
                  <a
                    className="hover:underline"
                    href="https://drive.google.com/file/d/1DW2iPyGdtQM55kboJEpRtlOsR8ILsFL_/view?usp=sharing"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Privacy Policy
                  </a>
                  <a
                    className="hover:underline"
                    href="https://drive.google.com/file/d/1T5AqX4LUETD9nTtlN4JNos_itnxPMtCQ/view?usp=sharing"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Terms of Use
                  </a>
                  <a
                    className="hover:underline"
                    href="https://drive.google.com/file/d/1T5AqX4LUETD9nTtlN4JNos_itnxPMtCQ/view?usp=sharing"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Vendor Agreement
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-4 flex flex-col flex-wrap gap-5 sm:gap-10  md:mt-12 md:flex-row md:items-start md:justify-between md:gap-5">
              <h4 className=" whitespace-nowrap text-lg font-bold text-tertiary-deep-green-950 [&>a]:text-tertiary-pale-950 ">
                Keep up with us
              </h4>
              <div className="[&>a]: flex  flex-wrap gap-8 text-primary-500 [&>a]:flex [&>a]:items-center [&>a]:gap-2 [&>a]:text-sm [&>a]:font-[300]  [&>a]:underline [&>a]:transition-all [&>a]:ease-in-out [&>a]:hover:scale-[1.01]">
                <a
                  href="https://twitter.com/getbundo_app"
                  rel="noreferrer"
                  target="_blank"
                >
                  <TwitterLogo />
                  <span>Twitter</span>
                </a>
                <a
                  href="https://www.instagram.com/getbundo.app/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <InstagramLogo />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://www.facebook.com/bundoapp"
                  rel="noreferrer"
                  target="_blank"
                >
                  <FacebookLogo />
                  <span>Facebook</span>
                </a>
                <a
                  href="https://www.linkedin.com/company/bundoapp/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkedInLogo />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
