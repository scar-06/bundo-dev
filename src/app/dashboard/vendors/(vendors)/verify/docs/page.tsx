"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { identificationsMeans, requiredSnaps } from "@/mocks/data";
import { QUERY_KEYS } from "@/utils";
import { extractFirstElements } from "@/utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";

import { handleUploadMultiple } from "@/lib/app/uploads/services";
import { updateVendor, UpdateVendorSchema } from "@/lib/app/vendors/services";
import cn from "@/lib/utils";
import { Button } from "@/components/ui/button";
import SingleSelect from "@/components/forms/customSelect";
import FileUploader from "@/components/forms/fileUploader";
import { notify } from "@/app/(root)/_components/notifications/notify";

const init = {
  idMeans: {
    name: "",
    value: "",
  },
};
function UploadVerificationDocs() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [uploadingFile, setUploadingFile] = useState<boolean>(false);
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: UpdateVendorSchema) =>
      await updateVendor({ ...data }),
    onSuccess: async (data) => {
      if (data?.status === "success") {
        notify.success({ message: "store updated successfully" });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.BUSINESS, QUERY_KEYS.USER],
        });
        router.push("/dashboard/vendors");
      }
    },
    onError: async (err) =>
      notify.error({
        message: "Error while updating vendor",
        subtitle: err?.message,
      }),
  });
  const methods = useForm({
    mode: "onChange",
    defaultValues: init,
  });
  const snapsToShow = requiredSnaps.filter(
    (snaps) => snaps.name === methods.watch("idMeans").name,
  );
  const handleFileUpload = async (file: any): Promise<string[]> => {
    setUploadingFile(true);
    try {
      const uploadRes = await handleUploadMultiple({
        files: [...file],
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
      setUploadingFile(false);
    }
  };
  return (
    <div className="mx-[auto] mb-[64px]  flex h-fit min-h-[500px] w-full max-w-[600px] flex-col rounded-3xl  bg-white py-[29px]">
      <div className="mx-[auto] mt-[20px] flex h-fit w-full  flex-col">
        <div className="mx-auto flex w-full flex-col">
          <h3 className="mx-auto  mb-1 w-[80%]  max-w-[280px] text-center text-lg font-semibold text-tertiary-pale-950">
            Identity Verification
          </h3>

          <FormProvider {...methods}>
            <form
              className="my-[20px] w-full"
              onSubmit={methods.handleSubmit(async (data) => {
                const { idMeans, ...rest } = data;
                setUploadingFile(true);
                try {
                  const uploadRes = await handleFileUpload([
                    ...extractFirstElements(rest),
                  ]);
                  setUploadingFile(false);
                  mutate({
                    identificationMeans: idMeans.value,
                    supportingDocument: uploadRes[0],
                  });
                } catch (error) {
                  notify.error({ message: "Unable to upload files" });
                } finally {
                  setUploadingFile(false);
                }
              })}
            >
              <div
                className={cn(
                  `grid  w-full transition-all duration-300 ease-in-out`,
                )}
              >
                <div className="w-full">
                  <div className="relative isolate mx-auto flex  w-[90%] flex-col items-start gap-2">
                    <SingleSelect
                      value={methods.watch("idMeans").name}
                      selectedDisplayValue={methods.watch("idMeans").value}
                      label="Select a means of Identification"
                      placeholder="Select a means of Identification"
                      listValue={[identificationsMeans[0]]}
                      onChange={(value) =>
                        methods.setValue(
                          "idMeans",
                          value as { name: string; value: string },
                        )
                      }
                      errorMessage={methods.formState.errors?.idMeans?.message}
                    />
                    {snapsToShow?.map(({ name, snaps }) =>
                      snaps.map((snapType, index, arr) => (
                        <FileUploader
                          key={snapType}
                          name={`${name}${snapType}`}
                          id={`file-input-${index}`}
                          snapType={arr.length === 1 ? "" : snapType}
                          fileSize={3}
                        />
                      )),
                    )}
                    <Button
                      variant={"plain"}
                      size={"plain"}
                      disabled={
                        snapsToShow.length < 1 || isPending || uploadingFile
                      }
                      type="submit"
                      loading={isPending || uploadingFile}
                      className={cn(
                        "mb-6 mt-6 h-[54px] w-full bg-primary-500 font-medium  text-white hover:bg-primary-700",
                      )}
                    >
                      {uploadingFile
                        ? "Uploading..."
                        : isPending
                          ? "Submitting docs..."
                          : "Submit"}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

export default UploadVerificationDocs;
