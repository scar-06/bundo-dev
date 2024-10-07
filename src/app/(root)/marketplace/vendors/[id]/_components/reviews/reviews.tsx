import React from "react";
import { QUERY_KEYS } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";

import { createReview, CreateReviewSchema } from "@/lib/app/reviews/services";
import { GetBusinessByIdRes, IReview } from "@/lib/app/vendors/services";
import { Button } from "@/components/ui/button";
import FormTextAreaInput from "@/components/forms/formTextAreaInput";
import Rating from "@/components/shared/ratings/rating";
import { notify } from "@/app/(root)/_components/notifications/notify";

interface FormValues {
  review: string;
  rating: number | null;
}

function Reviews({
  data,
  hide = false,
}: {
  data: GetBusinessByIdRes;
  hide?: boolean;
}) {
  const queryClient = useQueryClient();
  const methods = useForm<FormValues>({
    defaultValues: {
      review: "",
      rating: null,
    },
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = methods;
  const rating = watch("rating");

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: CreateReviewSchema) =>
      await createReview({ ...data }),
    onSuccess: async (data) => {
      if (data?.status === "success") {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.BUSINESS_BY_ID],
        });
        notify.success({ message: "Review submitted successfully" });
      }
    },
    onError: async (err) =>
      notify.error({
        message: "Unable to create review",
        subtitle:
          err?.message === "User is unauthorized😑!"
            ? "Please login to create a review"
            : err.message,
      }),
  });

  const onSubmit = (formData: FormValues) => {
    mutate({
      review: formData.review,
      rating: formData.rating as number,
      productId: data?.business?._id,
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 md:space-y-6"
      >
        {(data?.business?.reviews as IReview[]).length < 1 && !hide && (
          <div className="mt-4 flex w-full justify-center">
            <span className="text-sm">
              No reviews or ratings yet. Be the first to leave a review
            </span>
          </div>
        )}
        <div className="flex flex-col">
          <FormTextAreaInput
            labelText="Leave a Review"
            placeholder="Type your review here"
            maxLength={50}
            height="150px"
            {...register("review", {
              required: "This field is required",
              maxLength: {
                value: 50,
                message: "Review must not be more than 50 words",
              },
            })}
          />
          {errors.review && (
            <p className="text-xs italic text-red-500">
              {errors.review.message}
            </p>
          )}
          <div className="mb-6 mt-6 flex w-full cursor-pointer items-center justify-center md:mb-14">
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
    </FormProvider>
  );
}

export default Reviews;
