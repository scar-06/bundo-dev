import { GreenChatIcon } from "@/assets";

import { IReview } from "@/lib/app/vendors/services";
import { Button } from "@/components/ui/button";
import Rating from "@/components/shared/ratings/rating";

function ReviewDetails({
  reviews = [],
  totalRating = 0,
  totalReviews = 0,
}: {
  reviews: IReview[];
  totalReviews: number;
  totalRating: number;
}) {
  return (
    <div className="w-full ">
      <div className="flex w-full justify-between">
        <span className="text-sm font-medium">{totalReviews} reviews</span>
        <div className="flex items-center gap-1">
          <GreenChatIcon />
          <span className="text-[12px]">Leave as a Review</span>
        </div>
      </div>

      <div className="mb-4 mt-10 flex items-center gap-2">
        <Rating actual={totalRating} readonly />{" "}
        <span className="text-[10px]">{totalRating}/5</span>
      </div>
      {reviews?.map((review) => (
        <div className="flex flex-col" key={Math.random() * Math.PI}>
          <div className="my-6 flex justify-between">
            <div className="flex w-[60%] items-center gap-2">
              <Button className="bg-[#DEF2FB] text-lg font-bold text-[#5BC0EB]">
                {review?.fullName.slice(0, 1)}
              </Button>
              <span className="text-[12px]">{review?.review}</span>
            </div>
            <Rating actual={review?.rating ?? 0} readonly />
          </div>
          <div className="w-full border-[1px] border-b border-b-[#E0E0E094]" />
        </div>
      ))}
    </div>
  );
}

export default ReviewDetails;
