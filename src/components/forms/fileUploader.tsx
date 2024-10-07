"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  checker,
  CirclePlusIcon,
  DeleteCircleIcon,
  UploadIcon,
} from "@/assets";
import { QUERY_KEYS } from "@/utils";
import {
  checkIfFilesAreTooBig,
  checkIfImagesAreCorrectType,
} from "@/utils/helpers";
import { useQueryClient } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";

import { updateProduct } from "@/lib/app/products/services";
import { deleteImageSingle } from "@/lib/app/uploads/services";
import cn from "@/lib/utils";
import { notify } from "@/app/(root)/_components/notifications/notify";
import ConfirmDialog from "@/app/dashboard/vendors/(vendors)/_components/confirmDialog";

import Drawer from "../drawer/drawer";
import SliderWrapper from "../shared/slider";

type Props = {
  name: string;
  id: string;
  snapType: string;
  variant?: "type1" | "type2";
  isMultiple?: boolean;
  uploadedPreviews?: string[];
  productId?: string;
  previewUrl?: string[];
  fileSize?: number;
};

function FileUploader({
  name,
  id,
  snapType,
  variant = "type1",
  isMultiple = false,
  uploadedPreviews = [],
  productId,
  previewUrl,
  fileSize = 2,
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [s3Path, setS3Path] = useState("");
  const { register, setValue } = useFormContext();
  const queryClient = useQueryClient();

  // State to store the selected files
  const [files, setFiles] = useState<File[]>(() => []);
  // State to store the previews of selected files
  const [previews, setPreviews] = useState<string[]>(() => previewUrl ?? []);
  useEffect(() => {
    // Ensure the form's default values are set up correctly
    setValue(name, []);
  }, [setValue, name]);

  // Effect to generate previews for selected files
  useEffect(() => {
    if (!files.length) return;

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);

    // Cleanup function to revoke object URLs and avoid memory leaks
    return () => {
      newPreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [files]);

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newFiles = event.target.files ? Array.from(event.target.files) : [];
    if (!checkIfImagesAreCorrectType(newFiles)) {
      notify.error({
        message: "Only images(png,jpg,jpeg) are allowed",
        type: "error",
      });
      return;
    }
    if (!checkIfFilesAreTooBig(newFiles, fileSize)) {
      notify.error({
        message: `File must be at most ${fileSize}mb`,
        type: "error",
      });
      return;
    }
    setValue(name, newFiles);
    setFiles(newFiles);
    return;
  };

  // Helper function to render the file upload UI based on the current state
  const renderUploadUI = () => {
    if (previews.length) {
      return isMultiple && variant === "type2" ? (
        <SliderWrapper
          slides={previews.map((preview, index) => (
            <div
              key={Math.random()}
              className="relative isolate flex aspect-square w-full items-center justify-center rounded-md border border-solid border-green-600"
            >
              <span className=" w-fit rounded-full bg-white p-2  transition-all duration-300 ease-in-out hover:scale-[1.2]">
                <CirclePlusIcon />
              </span>
              <Image
                src={preview}
                alt={`Preview ${index + 1}`}
                layout="fill"
                className="z-[-1] rounded-[inherit] object-cover"
                unoptimized
              />
            </div>
          ))}
        />
      ) : (
        <div className="relative min-h-[inherit] w-full rounded-[inherit]">
          {previews[0] || previewUrl ? (
            <div className=" min-h-[inherit] w-full rounded-[inherit] ">
              <Image
                src={(previews[0] as string) || (previewUrl as string[])[0]}
                fill
                className="rounded-[inherit] object-cover"
                alt="Captured"
                priority
              />
              <div className="absolute top-1/2 flex min-h-[inherit] w-full -translate-y-1/2 items-center justify-center rounded-[inherit] bg-black/40">
                <div className="up-btn flex items-center gap-2">
                  <small className="text-white">
                    Re-Upload document {snapType}
                  </small>
                  <UploadIcon />
                </div>
              </div>
            </div>
          ) : (
            <div className=" min-h-[inherit] w-full rounded-[inherit] ">
              <span className="text-sm text-white">{files[0]?.name}</span>
              <div className="absolute top-1/2 flex h-full w-full -translate-y-1/2 items-center justify-center rounded-[inherit] bg-black/40">
                <div className="up-btn flex items-center gap-2">
                  <small className="text-white">
                    Re-Upload document {snapType}
                  </small>
                  <UploadIcon />
                </div>
              </div>
            </div>
          )}
        </div>
      );
    } else {
      // Render the initial upload UI if no files are selected
      return variant === "type2" ? (
        <div className="relative isolate flex min-h-[inherit] w-full items-center justify-center  rounded-[inherit]">
          <span className=" w-fit rounded-full bg-white p-2  transition-all duration-300 ease-in-out hover:scale-[1.2]">
            <CirclePlusIcon />
          </span>
          <Image
            src={checker}
            fill
            className="z-[-1] rounded-[inherit] "
            alt="Captured"
            unoptimized
          />
        </div>
      ) : (
        <div className="up-btn flex min-h-[inherit] w-full items-center justify-center rounded-[inherit] bg-[rgba(222,242,251,0.3)]">
          <div className="up-btn flex items-center gap-2">
            <small className="text-[#808080]">Upload document {snapType}</small>
            <UploadIcon />
          </div>
        </div>
      );
    }
  };

  const handleDelete = async () => {
    if (s3Path === "") notify.error({ message: "Invalid s3path path" });
    setDeleting(true);
    console.log(uploadedPreviews.filter((p) => p !== s3Path));
    try {
      await deleteImageSingle(s3Path);
      await updateProduct({
        id: productId ?? "",
        data: { pictures: [...uploadedPreviews.filter((p) => p !== s3Path)] },
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PRODUCT],
      });
      notify.success({ message: "image deleted successfully" });
      setShowModal(false);
    } catch (error) {
      notify.error({
        message: "Unable to delete image",
      });
    } finally {
      setDeleting(false);
    }
  };
  return (
    <>
      <div
        className={cn(
          "mt-3 min-h-[96px] w-full  rounded-md border border-dashed border-[#272424]",
          variant === "type2" && "border-0",
        )}
      >
        <input
          {...register(name)}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
          multiple={isMultiple}
          id={id}
        />

        {uploadedPreviews?.length > 0 ? (
          <div className="min-h-[inherit] w-full rounded-[inherit]">
            <SliderWrapper
              slides={[
                ...uploadedPreviews.map((preview, index, array) => (
                  <div
                    key={Math.random()}
                    className="relative isolate flex h-[372px] w-full items-center justify-center rounded-md"
                  >
                    {array.length < 2 ? (
                      ""
                    ) : (
                      <button
                        onClick={() => {
                          setS3Path(preview);
                          return setShowModal(true);
                        }}
                        type="button"
                        className=" w-fit cursor-pointer rounded-full bg-white p-2 transition-all duration-300 ease-in-out hover:scale-[1.2]"
                      >
                        <DeleteCircleIcon />
                      </button>
                    )}
                    <Image
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      layout="fill"
                      className="z-[-1] rounded-[inherit] object-cover"
                    />
                  </div>
                )),
                ...previews.map((preview, index) => (
                  <label
                    htmlFor={id}
                    key={preview}
                    className="relative h-[372px] w-full cursor-pointer rounded-[inherit]  "
                  >
                    <div
                      key={Math.random()}
                      className="relative isolate flex h-[372px] w-full items-center justify-center rounded-md"
                    >
                      <span className=" w-fit rounded-full bg-white p-2  transition-all duration-300 ease-in-out hover:scale-[1.2]">
                        <CirclePlusIcon />
                      </span>
                      <Image
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        layout="fill"
                        className="z-[-1] rounded-[inherit] object-cover"
                        unoptimized
                      />
                    </div>
                  </label>
                )),
                ...Array(1)
                  .fill(0)
                  .map((i) => (
                    <label
                      htmlFor={id}
                      key={Math.random() * 3}
                      className=" relative h-full w-full cursor-pointer rounded-[inherit]  bg-red-600"
                    >
                      <div className="relative isolate flex h-[372px] w-full items-center justify-center  rounded-[inherit]">
                        <span className=" w-fit rounded-full bg-white p-2  transition-all duration-300 ease-in-out hover:scale-[1.2]">
                          <CirclePlusIcon />
                        </span>
                        <Image
                          src={checker}
                          fill
                          className="z-[-1] rounded-[inherit]  "
                          alt="Captured"
                          unoptimized
                        />
                      </div>
                    </label>
                  )),
              ]}
            />
          </div>
        ) : (
          <label
            htmlFor={id}
            className="relative min-h-[inherit]  w-full cursor-pointer rounded-[inherit]"
          >
            {renderUploadUI()}
          </label>
        )}
      </div>
      <Drawer
        open={showModal}
        onClose={() => setShowModal(!showModal)}
        title=""
        selector="bundo-app-portal"
        anchor="center"
        z="z-50"
        h="h-fit"
        bg="bg-transparent"
        borderRadius="rounded-lg"
        widthStyles="w-[500px] md:w-[500px]"
        isFooter={false}
        containerClassName={"grid-rows-[auto_1fr]"}
      >
        <ConfirmDialog
          deleting={deleting}
          handleDelete={handleDelete}
          showModal={showModal}
          setShowModal={setShowModal}
          confirmationMessage="Are you sure you want to remove this image?"
        />
      </Drawer>
    </>
  );
}

export default FileUploader;
