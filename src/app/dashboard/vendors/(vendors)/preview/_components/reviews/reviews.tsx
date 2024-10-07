/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";

import { Button } from "@/components/ui/button";
import Rating from "@/components/shared/ratings/rating";

function Reviews() {
  const [rating, setRating] = React.useState<number | null>(null);
  return (
    <div>
      <div className="mt-4 flex w-full justify-center">
        <span className="text-sm">
          No reviews or ratings yet. Be the first to leave a review
        </span>
      </div>
      <div className="flex flex-col">
        <label className="mb-2 mt-10 block text-sm font-medium text-gray-900 dark:text-white">
          Leave a Review
        </label>
        <textarea
          id="message"
          rows={6}
          className="block w-full rounded-lg border-[1px] border-[#C8C8C8] bg-[#f6fcfe] p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Type your review here"
        />
        <div className="flex w-full justify-end">
          <span className=" text-[12px] text-[#808080]">
            Not more than 50 words
          </span>
        </div>
        <div className=" mb-14 mt-6 flex w-full cursor-pointer items-center justify-center">
          <Rating
            actual={rating === null ? null : rating}
            onChange={(newRating) => {
              setRating(newRating);
            }}
          />
        </div>
      </div>
      <Button className="w-full">SUBMIT</Button>
    </div>
  );
}

export default Reviews;
