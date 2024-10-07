import React from "react";
import { QUERY_KEYS } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { createReview, CreateReviewSchema } from "@/lib/app/reviews/services";
import { GetBusinessByIdRes, IReview } from "@/lib/app/vendors/services";
import { Button } from "@/components/ui/button";
import Rating from "@/components/shared/ratings/rating";
import { notify } from "@/app/(root)/_components/notifications/notify";

interface FormValues {
  review: string;
  rating: number | null;
}

function Reviews({ data, hide }: { data: GetBusinessByIdRes; hide?: boolean }) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      review: "",
      rating: null,
    },
  });

  const rating = watch("rating");

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: CreateReviewSchema) =>
      await createReview({ ...data }),
    onSuccess: async (data) => {
      if (data?.status === "success") {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.BUSINESS_BY_ID],
        });
        notify.success({ message: "review submitted successfully" });
      }
    },
    onError: async (err) =>
      notify.error({
        message: "Unable to create review",
        subtitle: err?.message,
      }),
  });

  const onSubmit = (formData: FormValues) => {
    console.log(formData, data.business);

    mutate({
      review: formData.review,
      rating: formData.rating as number,
      productId: data?.business?._id,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {(data?.business?.reviews as IReview[]).length < 1 && !hide && (
        <div className="mt-4 flex w-full justify-center">
          <span className="text-sm">
            No reviews or ratings yet. Be the first to leave a review
          </span>
        </div>
      )}
      <div className="flex flex-col">
        <label
          htmlFor="review"
          className="mb-2 mt-10 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Leave a Review
        </label>
        <textarea
          {...register("review", {
            required: "This field is required",
            maxLength: {
              value: 50,
              message: "Review must not be more than 50 words",
            },
          })}
          id="review"
          rows={6}
          className="block w-full rounded-lg border-[1px] border-[#C8C8C8] bg-[#f6fcfe] p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Type your review here"
        />
        {errors.review && (
          <p className="text-xs italic text-red-500">{errors.review.message}</p>
        )}
        <div className="flex w-full justify-end">
          <span className="text-[12px] text-[#808080]">
            Not more than 50 words
          </span>
        </div>
        <div className="mb-14 mt-6 flex w-full cursor-pointer items-center justify-center">
          <Rating
            actual={rating}
            onChange={(newRating) => {
              setValue("rating", newRating, { shouldValidate: true });
            }}
          />
        </div>
      </div>
      <Button type="submit" className="w-full" loading={isPending}>
        {isPending ? "Submitting" : "SUBMIT"}
      </Button>
    </form>
  );
}

export default Reviews;
