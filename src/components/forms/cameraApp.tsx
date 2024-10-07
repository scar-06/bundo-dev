import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

function PhotoCaptureComponent() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    if (isCameraOn) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) videoRef.current.srcObject = stream;
        })
        .catch(console.error);
    } else {
      // Turn off the camera; stop the stream
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
      return;
    }

    return () => {
      // Cleanup: turn off the camera
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [isCameraOn]);

  const handleCaptureClick = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const canvas = document.createElement("canvas");
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const imageDataURL = canvas.toDataURL("image/png");
        setPhoto(imageDataURL);
      }
    }
  };

  return (
    <div>
      {isCameraOn ? (
        <>
          <video ref={videoRef} autoPlay playsInline />
          <button onClick={handleCaptureClick}>Capture Photo</button>
        </>
      ) : (
        <button onClick={() => setIsCameraOn(true)}>Turn On Camera</button>
      )}
      {photo && <Image src={photo} alt="Captured" />}
    </div>
  );
}

export default PhotoCaptureComponent;
