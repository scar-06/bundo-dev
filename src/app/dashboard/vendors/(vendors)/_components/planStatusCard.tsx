import React from "react";
import Link from "next/link";
import { ShareIcon } from "lucide-react";
import { toast } from "react-toastify";

import { GetBusinessRes } from "@/lib/app/vendors/services";
import { Button } from "@/components/ui/button";

function PlanStatusComponent({
  data,
  showShareBtn = false,
}: {
  data: GetBusinessRes;
  showShareBtn?: boolean;
}) {
  const loc = window.location;
  const base = loc.origin;
  const copyLink = () => {
    const link = `${base}/marketplace/vendors/${data?.business?._id}/products`;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast.info("Link copied to clipboard!", {
          icon: (
            <svg
              width="32"
              height="33"
              viewBox="0 0 32 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="32"
                height="32"
                transform="translate(0 0.5)"
                fill="white"
                fillOpacity="0.01"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.9993 29.8307C23.3631 29.8307 29.3327 23.8612 29.3327 16.4974C29.3327 9.1336 23.3631 3.16406 15.9993 3.16406C8.63555 3.16406 2.66602 9.1336 2.66602 16.4974C2.66602 23.8612 8.63555 29.8307 15.9993 29.8307ZM15.666 22.0307L16.3967 21.3147C16.4713 21.2421 16.5306 21.1552 16.571 21.0592C16.6115 20.9633 16.6324 20.8602 16.6324 20.7561C16.6324 20.6519 16.6115 20.5489 16.571 20.4529C16.5306 20.357 16.4713 20.2701 16.3967 20.1974C16.2447 20.0484 16.0403 19.9649 15.8274 19.9649C15.6145 19.9649 15.4101 20.0484 15.258 20.1974L14.4927 20.9494C13.7407 21.6867 12.5154 21.8321 11.6914 21.1734C11.4708 20.9995 11.2898 20.7806 11.1605 20.5312C11.0312 20.2818 10.9566 20.0078 10.9416 19.7273C10.9266 19.4468 10.9715 19.1664 11.0734 18.9046C11.1754 18.6429 11.3319 18.4059 11.5327 18.2094L13.7914 15.9921C14.1757 15.6168 14.6915 15.4067 15.2287 15.4067C15.7658 15.4067 16.2817 15.6168 16.666 15.9921L17.5287 16.8387L18.666 15.7201L17.8047 14.8734C17.1144 14.2042 16.1908 13.83 15.2294 13.83C14.268 13.83 13.3443 14.2042 12.654 14.8734L10.3954 17.0921C10.0369 17.444 9.75729 17.868 9.57508 18.3361C9.39286 18.8042 9.31219 19.3056 9.33841 19.8072C9.36463 20.3089 9.49715 20.7992 9.72718 21.2457C9.9572 21.6923 10.2795 22.0848 10.6727 22.3974C12.1447 23.5761 14.3234 23.3507 15.6674 22.0307H15.666ZM15.6033 11.6801L16.3327 10.9641H16.3313C17.6753 9.64407 19.854 9.41873 21.326 10.5974C21.7193 10.9099 22.0417 11.3024 22.2718 11.7489C22.502 12.1953 22.6346 12.6856 22.661 13.1873C22.6873 13.6889 22.6068 14.1904 22.4247 14.6585C22.2426 15.1267 21.9631 15.5508 21.6047 15.9027L19.3447 18.1214C18.6544 18.7906 17.7307 19.1648 16.7694 19.1648C15.808 19.1648 14.8843 18.7906 14.194 18.1214L13.3327 17.2747L14.47 16.1561L15.3327 17.0027C15.717 17.378 16.2329 17.5881 16.77 17.5881C17.3072 17.5881 17.823 17.378 18.2073 17.0027L20.466 14.7854C21.3074 13.9587 21.254 12.5814 20.3074 11.8214C19.4833 11.1627 18.258 11.3081 17.506 12.0454L16.7407 12.7974C16.5887 12.946 16.3846 13.0292 16.172 13.0292C15.9594 13.0292 15.7553 12.946 15.6033 12.7974C15.5288 12.7247 15.4695 12.6379 15.429 12.5419C15.3885 12.446 15.3677 12.3429 15.3677 12.2387C15.3677 12.1346 15.3885 12.0315 15.429 11.9356C15.4695 11.8396 15.5288 11.7527 15.6033 11.6801Z"
                fill="#34A853"
              />
            </svg>
          ),
        });
      })
      .catch((err) => {
        toast.error("Failed to copy: ");
      });
  };
  return (
    <div className="flex items-center space-x-2">
      <Link
        href={"/dashboard/vendors/account/upgrade_my_plan"}
        className="rounded-full bg-[#D6EEDD] p-[6.5px_13px] text-[10px] font-bold md:text-xs"
      >
        {data?.business?.plan?.planName} PLAN
      </Link>
      {showShareBtn && (
        <Button
          className="rounded-full bg-[#D6EEDD] p-2 hover:shadow-md"
          variant="plain"
          onClick={copyLink}
        >
          <ShareIcon />
        </Button>
      )}
    </div>
  );
}

export default PlanStatusComponent;
