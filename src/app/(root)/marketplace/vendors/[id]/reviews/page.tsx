"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user.store";
import { QUERY_KEYS } from "@/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "zustand";

import {
  getBusinessById,
  GetBusinessByIdRes,
} from "@/lib/app/vendors/services";
import PageLoader from "@/components/loaders/pageLoader";

import ReviewDetails from "../_components/reviews/reviewDetails";
import Reviews from "../_components/reviews/reviews";

type IModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

// New Modal component
function Modal({ isOpen, onClose, children }: IModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleResize = () => {
      onClose();
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-end bg-black bg-opacity-50"
        >
          <motion.div
            ref={modalRef}
            initial={{ y: 400, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 400, opacity: 0 }}
            className="w-full  rounded-lg bg-white p-6 shadow-lg"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function VendorReviews() {
  const router = useRouter();
  const user = useStore(useUserStore, (state) => state.user);
  const fetching = useStore(useUserStore, (state) => state.fetching);
  const id = user?.vendorId?.business ?? "";
  const queryClient = useQueryClient();
  const [addReview, setAddReview] = useState(false);
  const { isFetching, isError, data } = useQuery(
    {
      queryKey: [QUERY_KEYS.BUSINESS_BY_ID],
      queryFn: async () => getBusinessById(id),
      enabled: id !== "",
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 3,
    },
    queryClient,
  );

  if (fetching || isFetching) {
    return <PageLoader />;
  }
  if (isError) {
    return <div>Error fetching a vendor business</div>;
  }

  const business = data?.business;
  const reviews = business?.reviews ?? [];
  const totalReviews = business?.total_reviews ?? 0;
  const totalRating = business?.average_rating ?? 0;

  return (
    <div
      key={Math.random() * Math.PI}
      className="flex h-fit w-full flex-col px-4 lg:block"
    >
      <div className="block w-full bg-white py-4 lg:hidden">
        <button
          onClick={router.back}
          className="flex w-full cursor-pointer gap-2 text-lg font-semibold"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" fill="white" fillOpacity="0.01" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.41379 11.4994H17.9998C18.265 11.4994 18.5194 11.6048 18.7069 11.7923C18.8944 11.9799 18.9998 12.2342 18.9998 12.4994C18.9998 12.7646 18.8944 13.019 18.7069 13.2065C18.5194 13.3941 18.265 13.4994 17.9998 13.4994H8.41379L12.2068 17.2924C12.3889 17.481 12.4897 17.7336 12.4875 17.9958C12.4852 18.258 12.38 18.5088 12.1946 18.6942C12.0092 18.8797 11.7584 18.9848 11.4962 18.9871C11.234 18.9894 10.9814 18.8886 10.7928 18.7064L5.29279 13.2064C5.10532 13.0189 5 12.7646 5 12.4994C5 12.2343 5.10532 11.98 5.29279 11.7924L10.7928 6.29243C10.9814 6.11027 11.234 6.00948 11.4962 6.01176C11.7584 6.01403 12.0092 6.1192 12.1946 6.30461C12.38 6.49002 12.4852 6.74083 12.4875 7.00303C12.4897 7.26523 12.3889 7.51783 12.2068 7.70643L8.41379 11.4994Z"
              fill="#333333"
            />
          </svg>
          <span className="ml-auto text-sm md:text-base">Reviews </span>{" "}
        </button>
      </div>
      <div className="flex-1 overflow-auto">
        <ReviewDetails
          reviews={reviews}
          totalRating={Number(totalRating.toFixed(2))}
          totalReviews={totalReviews}
          action={() => setAddReview(true)}
        />
      </div>

      <Modal isOpen={addReview} onClose={() => setAddReview(false)}>
        <Reviews hide data={data as GetBusinessByIdRes} />
      </Modal>
    </div>
  );
}

export default VendorReviews;
