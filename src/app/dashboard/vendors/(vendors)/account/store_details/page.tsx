"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MobilePhoneIconDark, MobileWhatsappIconDark } from "@/assets";
import { useVendorBusinessStore } from "@/store/business.store";
import { useUserStore } from "@/store/user.store";
import { QUERY_KEYS } from "@/utils";
import {
  fieldSetterAndClearer,
  filterContactsWithValues,
  formatContacts,
} from "@/utils/helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";

import { getAllCategories } from "@/lib/app/category/services";
import { validateAddress } from "@/lib/app/orders/services";
import { handleUploadMultiple } from "@/lib/app/uploads/services";
import {
  updateStoreValidationSchema,
  UpdateStoreValidationSchemaData,
} from "@/lib/app/vendors/schema";
import { updateStore, UpdateStoreSchema } from "@/lib/app/vendors/services";
import { useGetBusiness } from "@/hooks/useGetBusiness";
import useStore from "@/hooks/useStateFromStore";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import FileUploader from "@/components/forms/fileUploader";
import FormTextAreaInput from "@/components/forms/formTextAreaInput";
import FormTextInput from "@/components/forms/formTextInput";
import { MultiSearchSelect } from "@/components/forms/multiSelect";
import StorePageSetupLoader from "@/components/loaders/skeletonLoaderVarients/storePageSetup";
import GetLocationpoint from "@/components/map/getLocationpoint";
import { notify } from "@/app/(root)/_components/notifications/notify";
import GoBack from "@/app/dashboard/goBack";

import AccordionInputWrapper from "../../_components/accordionInputWrapper";
import ContactMeInput from "../../_components/contactMeInput";

function StoreDetails() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isFetching: gettingBusiness } = useGetBusiness();
  const user = useStore(useUserStore, (state) => state.user);
  const businessState = useStore(useVendorBusinessStore, (state) => state, [
    gettingBusiness,
  ]);
  const business = businessState?.business;
  const fetching = businessState?.fetching;
  const businessType = business?.business?.business_type;

  const [showMap, setShowMap] = useState(false);
  const [place, setPlace] = useState<google.maps.places.PlaceResult | null>(
    null,
  );
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const {
    data: categoriesData,
    isFetching: fetchingCategories,
    isError: categoriesError,
  } = useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: getAllCategories,
    enabled: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 3,
  });

  const { mutate: updateStoreMutation, isPending: isUpdatingStore } =
    useMutation({
      mutationFn: updateStore,
      onSuccess: (data) => {
        if (data?.status === "success") {
          notify.success({ message: "Store updated successfully" });
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BUSINESS] });
          router.push(`/dashboard/vendors`);
        }
      },
      onError: (err) =>
        notify.error({
          message: "Error while updating store",
          subtitle: err?.message,
        }),
    });

  const { mutate: validateAddressMutation, isPending: isValidatingAddress } =
    useMutation({
      mutationFn: validateAddress,
      onSuccess: (response) => {
        if (response?.status !== "success") {
          return notify.error({
            message: "Address validation failed",
            subtitle: "Please try selecting a different address",
          });
        }
        // @ts-expect-error
        handleStoreUpdate(response.data.address_code);
      },
      onError: () => {
        notify.error({
          message: "Address validation failed",
          subtitle: "Please try selecting a different address",
        });
      },
    });

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(updateStoreValidationSchema),
  });

  const { setValue, clearErrors } = methods;

  useEffect(() => {
    if (business) {
      setSelectedLocation({
        lat: business?.business?.location?.coordinates[0],
        lng: business?.business?.location?.coordinates[1],
      });
      methods.reset({
        address: business?.business.address,
        business_profile_picture: business?.business.business_profile_picture,
        description: business?.business.description ?? "",
        categories:
          business?.business?.categories.map((category) => ({
            label: category,
            value: category,
          })) ?? [],
        phone_calls: business?.business?.contact?.phone_calls ?? "",
        additionalPhone: business?.business?.contact?.additionalPhone ?? "",
        phone_whatsapp: business?.business?.contact?.phone_whatsapp ?? "",
        phone_whatsappBusiness:
          business?.business?.contact?.phone_whatsappBusiness ?? "",
        twitterLink: business?.business?.contact?.twitterLink ?? "",
      });
    }
  }, [business, methods, businessType]);

  const handleFileUpload = async (file: File): Promise<string[]> => {
    setUploading(true);
    try {
      const uploadRes = await handleUploadMultiple({
        files: [file],
      });
      // @ts-expect-error
      return uploadRes?.urls ?? [];
    } catch (error) {
      notify.error({
        message: "Error while uploading store logo",
        // @ts-expect-error
        subtitle: error.message,
      });
      return [];
    } finally {
      setUploading(false);
    }
  };

  const handleStoreUpdate = async (addressCode?: string) => {
    const formData = methods.getValues();
    const {
      description,
      cacDoc,
      categories,
      business_profile_picture,
      ...rest
    } = formData;

    if (rest.address?.length < 1)
      return notify.error({ message: "Please select a location" });

    let uploadUrl = business?.business?.business_profile_picture;
    // @ts-expect-error
    if (cacDoc && cacDoc[0] instanceof File) {
      // @ts-expect-error
      const uploadUrls = await handleFileUpload(cacDoc[0]);
      uploadUrl = uploadUrls[0] ?? "";
    }
    if ((uploadUrl as string)?.length < 1) return;
    const updateData: UpdateStoreSchema = {
      description,
      lat: selectedLocation?.lat.toString() ?? "",
      long: selectedLocation?.lng.toString() ?? "",
      business_profile_picture: uploadUrl,
      address: place?.formatted_address as string,
      categories: categories?.map((c) => c.value),
      // @ts-expect-error
      contact: formatContacts(filterContactsWithValues(rest)),
      addressCode,
    };

    updateStoreMutation(updateData);
  };

  const onSubmit = async (data: UpdateStoreValidationSchemaData) => {
    if (place) {
      validateAddressMutation({
        email: user?.email as string,
        address: place.formatted_address as string,
        name: `${user?.firstName} ${user?.lastName}`,
        phoneNumber: business?.business.contact.phone_calls as string,
      });
    } else {
      handleStoreUpdate();
    }
  };

  if (fetchingCategories || fetching || gettingBusiness) {
    return <StorePageSetupLoader />;
  }

  if (categoriesError) {
    return <div>Error loading categories...</div>;
  }

  const categories = categoriesData?.categories?.filter((c) =>
    businessType === "products"
      ? !c.category.includes(" Services")
      : c.category.includes(" Services"),
  );

  const categoriesOptions = categories?.map((category) => ({
    label: category.category,
    value: category.category,
  }));

  return (
    <>
      {showMap && (
        <Modal isOpen={showMap} closeModal={() => setShowMap(false)}>
          <div className="flex w-[95vw] max-w-[500px] flex-col gap-4 rounded-md bg-white p-2 pb-5 shadow-2xl">
            <GetLocationpoint
              zoom={16}
              action={() => setShowMap(false)}
              selectedLocation={selectedLocation}
              onLocationSelect={(data) => {
                return setSelectedLocation(data);
              }}
              updatePlace={(place) => {
                setPlace(place);
                return fieldSetterAndClearer({
                  value: place?.formatted_address,
                  setterFunc: setValue,
                  setField: "address",
                  clearErrors,
                });
              }}
            />
            <Button className="w-full" onClick={() => setShowMap(false)}>
              Continue
            </Button>
          </div>
        </Modal>
      )}

      <div className="mb-20 w-full pb-8 mmd:-mt-5">
        <div className="flex w-full max-w-md items-center justify-between pr-4">
          <div className="max-w-[150px]">
            <GoBack text="Store Details" />
          </div>
          <div className="isolate flex aspect-square w-[clamp(50px,_8vw,_50px)] items-center justify-center rounded-full bg-[#34A853]">
            <span className="font-bold text-[#fff]">
              {user?.firstName?.slice(0, 1)}
            </span>
          </div>
        </div>

        <div className="mt-6 w-full max-w-md">
          <FormProvider {...methods}>
            <form
              className="mt-5 flex flex-col gap-6"
              onSubmit={methods.handleSubmit(onSubmit, (err) =>
                console.log(err),
              )}
            >
              <AccordionInputWrapper
                isError={methods.watch("description")?.length < 1}
                title="Write a Business Description"
              >
                <FormTextAreaInput
                  name="description"
                  labelText=""
                  placeholder="What best describes your business"
                  maxLength={150}
                />
              </AccordionInputWrapper>

              <AccordionInputWrapper
                isError={!selectedLocation?.lat}
                title="Business Address"
              >
                <div onClick={() => setShowMap(true)}>
                  <FormTextInput
                    name="address"
                    labelText=""
                    placeholder="Business address"
                    disabled
                    type="text"
                    value={place?.formatted_address ?? methods.watch("address")}
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
                    callback={() => setShowMap(true)}
                  />
                </div>
              </AccordionInputWrapper>

              <AccordionInputWrapper
                isError={(methods.watch("categories")?.length ?? 0) < 1}
                title="Choose 3 tags that best describe your Business"
              >
                <MultiSearchSelect
                  name="categories"
                  isMulti
                  value={methods.watch("categories")}
                  isOptionDisabled={() =>
                    (methods.watch("categories")?.length ?? 0) === 3
                  }
                  options={categoriesOptions || []}
                  onChange={(value) => {
                    if (
                      (methods.watch("categories")?.length ?? 0) === 3 &&
                      value.length >= 3
                    ) {
                      return notify.error({
                        message: "You can't add more than 3 categories",
                      });
                    }
                    methods.setValue(
                      "categories",
                      value as { label: string; value: string }[],
                    );
                  }}
                />
              </AccordionInputWrapper>

              <AccordionInputWrapper
                hideOverFlow
                title="How can customers reach you?"
              >
                <div className="flex w-full flex-col gap-4">
                  <ContactMeInput
                    name="phone_calls"
                    placeholder="Phone-call Number"
                    Icon={MobilePhoneIconDark}
                    disabled
                  />
                  {/* <ContactMeInput
                    name="additionalPhone"
                    placeholder="Additional Phone-call Number"
                    Icon={MobilePhoneIconDark}
                  />
                  <ContactMeInput
                    name="phone_whatsapp"
                    placeholder="WhatsApp Number"
                    Icon={MobileWhatsappIconDark}
                  /> */}
                </div>
              </AccordionInputWrapper>

              <div className="flex w-full flex-col gap-2">
                <h2 className="text-xs font-semibold">
                  Upload a Business Logo/Dp
                </h2>
                <FileUploader
                  name="cacDoc"
                  id="file-input-cac"
                  snapType=""
                  previewUrl={[
                    methods.watch("business_profile_picture") as string,
                  ]}
                />
              </div>

              <div className="mx-auto mt-6 w-[100%]">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isUpdatingStore || uploading || isValidatingAddress}
                  loading={isValidatingAddress || uploading || isUpdatingStore}
                >
                  {isValidatingAddress
                    ? "Validating address..."
                    : uploading
                      ? "Uploading files..."
                      : isUpdatingStore
                        ? "Updating store"
                        : "Update store"}
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
}

export default StoreDetails;
