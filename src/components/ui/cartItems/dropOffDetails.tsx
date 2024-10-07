/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from "react";
import { CloseIcon, GreenPlusCirleIcon } from "@/assets";
import { QUERY_KEYS } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Country, State } from "country-state-city";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { deliverySchema } from "@/lib/app/orders/schema";
import {
  addDeliveryInfo,
  AddDeliveryInfoReq,
  getAllDropOffLocations,
  validateAddress,
  ValidateAddressReq,
} from "@/lib/app/orders/services";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormTextInput from "@/components/forms/formTextInput";
import MobilePhone from "@/components/forms/mobilePhone";
import { SingleSearchSelect } from "@/components/forms/singleSearchSelect";
import GetLocationpoint from "@/components/map/getLocationpoint";
import { Typography } from "@/components/typography";
import { notify } from "@/app/(root)/_components/notifications/notify";

import { Modal } from "../modal";

export const formatPhoneNumberSec = (phoneNumber: string): string => {
  if (phoneNumber.startsWith("2340")) {
    return "234" + phoneNumber.slice(4);
  }
  return phoneNumber;
};
function DropOffDetails({
  addNewDropOffLocation,
}: {
  addNewDropOffLocation: boolean;
}) {
  const [showMap, setShowMap] = useState(false);
  const [place, setPlace] = useState<google.maps.places.PlaceResult | null>(
    null,
  );
  const [openModal, setOpenModal] = useState(false);
  const [formState, setFormState] = useState<AddDeliveryInfoReq | null>(null);
  // ORDER Matters
  const queryClient = useQueryClient();

  const { mutate: addAddressMutate, isPending } = useMutation({
    mutationFn: async (formData: AddDeliveryInfoReq) =>
      await addDeliveryInfo(formData),
    onSuccess: async (response) => {
      setOpenModal(false);
      notify.success({ message: "Delivery info added successfully" });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.DELIVERYLOCATION],
      });
    },
    onError: async (error) => {
      return notify.error({
        message: "Delivery info creation failed",
        subtitle: error.message,
      });
    },
  });
  const { mutate, isPending: isValidatingAddress } = useMutation({
    mutationFn: async (formData: ValidateAddressReq) =>
      await validateAddress(formData),
    onSuccess: async (response) => {
      // @ts-expect-error
      if (response?.status !== "success" && response?.staus !== "success") {
        return notify.error({
          message: "Address validation failed",
          subtitle: "Please try selecting a different address",
        });
      }
      addAddressMutate({
        email: formState?.email as string,
        phoneNumber: formState?.phoneNumber as string,
        address: place?.formatted_address as string,
        firstName: formState?.firstName as string,
        lastName: formState?.lastName as string,
        note: formState?.note as string,
        // @ts-expect-error
        addressCode: response?.data?.address_code as string,
      });
    },
    onError: async (error) => {
      return notify.error({
        message: "Address validation failed",
        subtitle: error.message,
      });
    },
  });

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(deliverySchema),
  });

  const onSubmit = async (data: AddDeliveryInfoReq) => {
    const phoneNumber = formatPhoneNumberSec(data.phoneNumber);
    data = { ...data, phoneNumber: phoneNumber };
    setFormState(data);
    await mutate({
      email: data.email,
      phoneNumber: data.phoneNumber,
      address: place?.formatted_address as string,
      name: data?.firstName + " " + data?.lastName,
    });
  };

  useEffect(() => {
    if (place) {
      methods.setValue("address", place?.formatted_address as string);
    }
  }, [place]);

  return (
    <>
      <div>
        {addNewDropOffLocation ? (
          <div
            onClick={() => setOpenModal(true)}
            className="flex cursor-pointer items-center gap-1"
          >
            <Typography>Add your delivery details</Typography>
            <GreenPlusCirleIcon className="cursor-pointer" />
          </div>
        ) : (
          <div
            className="flex items-center gap-1"
            onClick={() => setOpenModal(true)}
          >
            <Typography className="hidden sm:block">
              Add new delivery details
            </Typography>
            <Typography className="sm:hidden">Add new</Typography>

            <GreenPlusCirleIcon className="cursor-pointer" />
          </div>
        )}
      </div>
      <Modal isOpen={openModal} closeModal={() => setOpenModal(false)}>
        <div className="hideScrollBar isolate flex h-[95%] w-[90vw] max-w-[500px] flex-col   items-center  rounded-xl bg-white px-6 py-4 font-tv2SansDisplay ">
          <div
            className="fixed right-0 top-0 z-[10] flex w-fit cursor-pointer justify-start rounded-full bg-white p-4 shadow-lg"
            onClick={() => setOpenModal(false)}
          >
            <CloseIcon />
          </div>

          {showMap && (
            <div className=" absolute bottom-0 left-0 right-0 top-0 z-[2] flex items-center justify-center">
              <div className="  flex w-full  max-w-[500px] flex-col gap-4 rounded-md bg-white p-2 pb-5 shadow-2xl">
                <GetLocationpoint
                  zoom={16}
                  action={() => setShowMap(!showMap)}
                  selectedLocation={{
                    lat: (place?.geometry?.location?.lat() as number) ?? 0,
                    lng: (place?.geometry?.location?.lng() as number) ?? 0,
                  }}
                  onLocationSelect={(loc) => null}
                  updatePlace={(place) => setPlace(place)}
                />

                <div className="flex w-full items-center justify-center">
                  <Button className="w-full" onClick={() => setShowMap(false)}>
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="z-[1] w-full">
            <div className="flex w-full flex-col items-center">
              <h3 className="text-sm md:text-base">
                <span>Delivery/Drop-off details</span>
              </h3>
              <span className="text-[12px]">
                Kindly fill in the correct details
              </span>
            </div>
            <div className="w-full">
              <div className="flex h-fit  w-full flex-col   justify-center ">
                <FormProvider {...methods}>
                  <form
                    className="w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                  >
                    <div className=" mt-8 flex w-full flex-col gap-6">
                      <div className="flex gap-3 mmd:flex-col">
                        <FormTextInput
                          name="firstName"
                          labelText="First Name"
                          placeholder="Firstname"
                          type="text"
                        />
                        <FormTextInput
                          name="lastName"
                          labelText="Last Name"
                          placeholder="lastname"
                          type="text"
                        />
                      </div>
                      <div onClick={() => setShowMap(true)}>
                        <FormTextInput
                          name="address"
                          labelText="Address"
                          placeholder="Select your address"
                          type="text"
                          value={place?.formatted_address ?? ""}
                          disabled
                          Icon={
                            <div className="rounded-md bg-white px-2 py-2 shadow-md">
                              <svg
                                width="25"
                                height="25"
                                viewBox="0 0 25 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  width="24"
                                  height="24"
                                  transform="translate(0.578125 0.0585938)"
                                  fill="white"
                                  fillOpacity="0.01"
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M12.5781 21.0586C10.2981 21.0586 6.57812 12.3726 6.57812 9.05859C6.57813 7.46729 7.21027 5.94117 8.33548 4.81595C9.4607 3.69073 10.9868 3.05859 12.5781 3.05859C14.1694 3.05859 15.6955 3.69073 16.8208 4.81595C17.946 5.94117 18.5781 7.46729 18.5781 9.05859C18.5781 12.3726 14.8581 21.0586 12.5781 21.0586ZM12.5781 12.0586C12.9605 12.0586 13.3392 11.9833 13.6925 11.8369C14.0458 11.6906 14.3668 11.4761 14.6372 11.2057C14.9076 10.9353 15.1221 10.6143 15.2685 10.261C15.4148 9.90767 15.4901 9.529 15.4901 9.14659C15.4901 8.76418 15.4148 8.38552 15.2685 8.03222C15.1221 7.67892 14.9076 7.3579 14.6372 7.0875C14.3668 6.81709 14.0458 6.6026 13.6925 6.45626C13.3392 6.30991 12.9605 6.23459 12.5781 6.23459C11.8058 6.23459 11.0651 6.54139 10.519 7.0875C9.97292 7.6336 9.66613 8.37428 9.66613 9.14659C9.66613 9.9189 9.97292 10.6596 10.519 11.2057C11.0651 11.7518 11.8058 12.0586 12.5781 12.0586Z"
                                  fill="#34A853"
                                />
                              </svg>
                            </div>
                          }
                          callback={() => {
                            setShowMap(true);
                          }}
                        />
                      </div>

                      <MobilePhone name="phoneNumber" />
                      <MobilePhone
                        name="addtionalPhoneNumber"
                        label="Phone Number 2 (optional)"
                      />
                      <FormTextInput
                        name="email"
                        labelText="Email Address"
                        placeholder="sarah@gmail.com"
                        type="email"
                      />
                      <div className="flex flex-col items-start">
                        <label className="text-[12px] " htmlFor="note_optional">
                          Note (optional)
                        </label>
                        <textarea
                          id="note_optional"
                          rows={3}
                          className={`relative mt-2 h-full w-full rounded-md border-none bg-[rgba(222,_242,_251,_0.30)] py-5 pl-2 text-sm font-light outline-none ring-1   ring-[#C8C8C8] placeholder:text-[#AAAAAA]   ${" text-[#302F2C] ring-primary-500 focus-within:ring-primary-500"}`}
                          {...methods.register("note")}
                        />
                      </div>
                      <Button
                        disabled={isPending || isValidatingAddress}
                        type="submit"
                        className="mt-1"
                        loading={isPending}
                      >
                        {isValidatingAddress
                          ? "validating address.."
                          : isPending
                            ? "Adding address.."
                            : " Add Address"}
                      </Button>
                    </div>
                  </form>
                </FormProvider>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
export default DropOffDetails;
