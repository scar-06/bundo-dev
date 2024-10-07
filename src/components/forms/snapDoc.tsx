import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { UploadIcon } from "@/assets";
import { useUpdateEffect } from "usehooks-ts";

import cn from "@/lib/utils";
import { usePhotoCapture } from "@/hooks/usePhotoCapture";

import { Button } from "../ui/button";

type Props = {
  snapType: string;
};

function SnapDoc({ snapType }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isCameraOn, startCamera, capturePhoto, photo, stopCamera } =
    usePhotoCapture();

  useEffect(() => {
    if (isCameraOn) {
      const constraints = { video: { facingMode: "environment" } };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          if (videoRef.current) videoRef.current.srcObject = stream;
        })
        .catch((error) => {
          // Consider more user-friendly error handling
          alert("Error accessing the camera: " + error.message);
        });
    }
  }, [isCameraOn]); // Removed useUpdateEffect to stick with standard useEffect

  return (
    <div className=" mt-3 h-[96px] w-full rounded-md border border-dashed border-[#272424]">
      {isCameraOn && !photo && (
        <div
          className={cn(
            "fixed left-1/2 top-1/2 isolate h-fit w-fit -translate-x-1/2 -translate-y-1/2 rounded-md bg-black/90",
          )}
        >
          <video className="z-[-1]" ref={videoRef} autoPlay playsInline />
          <div className="absolute bottom-0 z-20 flex w-full gap-6 px-6 py-3">
            <Button
              type="button"
              className="w-full"
              onClick={() => capturePhoto(videoRef)}
            >
              Snap
            </Button>
            <Button
              type="button"
              variant="destructive"
              className="w-full bg-red-600 text-white"
              onClick={stopCamera}
            >
              Close
            </Button>
          </div>
        </div>
      )}
      {!isCameraOn && !photo && (
        <button
          type="button"
          onClick={startCamera}
          className="flex h-full w-full items-center justify-center rounded-[inherit] bg-[rgba(222,242,251,0.3)]"
        >
          <div className="flex items-center gap-2">
            <small className="text-[#808080]">Snap {snapType} document</small>
            <UploadIcon />
          </div>
        </button>
      )}
      {photo && (
        <div className="absolute top-0 h-full w-full rounded-md border-solid border-red-600">
          <Image
            src={photo}
            fill
            className="rounded-md object-cover"
            alt="Captured"
          />
          <button
            type="button"
            onClick={startCamera}
            className="absolute top-1/2 flex h-full w-full -translate-y-1/2 items-center justify-center rounded-[inherit] bg-black/40"
          >
            <div className="flex items-center gap-2">
              <small className="text-white">Re-Take {snapType} document</small>
              <UploadIcon />
            </div>
          </button>
        </div>
      )}
    </div>
  );
}

export default SnapDoc;
