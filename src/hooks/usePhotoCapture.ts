import { useCallback, useState } from "react";

export const usePhotoCapture = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);

  const startCamera = useCallback(() => {
    setIsCameraOn(true);
  }, []);

  const stopCamera = useCallback(() => {
    setIsCameraOn(false);
  }, []);

  const capturePhoto = useCallback(
    (videoRef: React.RefObject<HTMLVideoElement>) => {
      if (videoRef.current && isCameraOn) {
        const videoElement = videoRef.current;
        const canvas = document.createElement("canvas");
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
          const imageDataURL = canvas.toDataURL("image/png");
          setPhoto(imageDataURL);
          stopCamera(); // Optional: Stop the camera after capturing the photo
          return imageDataURL;
        }
      }
      return null;
    },
    [stopCamera, isCameraOn],
  );

  return { isCameraOn, startCamera, stopCamera, capturePhoto, photo };
};
