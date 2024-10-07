import React, { useEffect, useState } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image, { ImageProps, StaticImageData } from "next/image";

interface ImageWrapperProps extends ImageProps {
  src: string | StaticImageData;
  fallbackSrc: string | StaticImageData;
}

function ImageWrapper({
  src,
  alt,
  fill,
  className,
  unoptimized,
  fallbackSrc,
  ...rest
}: ImageWrapperProps) {
  const [imgSrc, setImgSrc] = useState<string | StaticImageData | StaticImport>(
    src,
  );
  const [error, setError] = useState<boolean>(false);

  const placeholderUrl =
    "https://thumbnail.imgbin.com/24/17/18/imgbin-grid-drawing-creative-winter-snow-NfPJtef3hwQzMqr6fWmnFyqZS_t.jpg";

  useEffect(() => {
    const img = new window.Image();
    img.src = typeof imgSrc === "string" ? imgSrc : "";
    img.onload = () => setImgSrc(src);
    img.onerror = () => setImgSrc(fallbackSrc);
  }, [src, fallbackSrc]);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill={fill}
      className={className}
      unoptimized={unoptimized}
      {...rest}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
}

export default ImageWrapper;
