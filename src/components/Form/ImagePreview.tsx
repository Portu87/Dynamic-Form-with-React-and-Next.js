/**
 * ImagePreview component for displaying an image preview with an optional delete button.
 * @param {object} props - The props for the ImagePreview component.
 * @param {boolean} props.disabled - Indicates whether the delete button should be disabled.
 * @returns {React.FC} - A React functional component representing the image preview.
 */

"use client";
import useImageUpload from "@/hooks/useImageUpload.store";
import { cn } from "@/libs/utils";
import Image from "next/image";
import React from "react";
import { IoMdClose } from "react-icons/io";

export interface ImagePreviewComponentInterface {
  disabled?: boolean;
}

const ImagePreview: React.FC<ImagePreviewComponentInterface> = ({
  disabled = false,
}) => {
  const ImgUpload = useImageUpload();

  // Function to handle file deletion
  const handleDeleteFile = () => {
    ImgUpload.setFile(null);
    ImgUpload.setImgPreview(null);
  };

  return (
    <>
      <div
        className={cn(
          "relative my-3 bg-neutral-200 rounded-md",
          ImgUpload.imgPreview && ImgUpload.imgPreview.name === ""
            ? "hidden"
            : "block"
        )}
      >
        {!disabled && (
          <IoMdClose
            onClick={() => handleDeleteFile()}
            size={18}
            className={cn(
              "absolute -top-2 -right-2 cursor-pointer rounded-full bg-neutral-300 text-neutral-800",
              ImgUpload.imgPreview ? "block" : "hidden"
            )}
          />
        )}
        {ImgUpload.imgPreview ? (
          <Image
            src={ImgUpload.imgPreview.url}
            className="rounded-md object-cover cursor-pointer"
            alt={ImgUpload.imgPreview.name}
            width={130}
            height={130}
          />
        ) : (
          ""
        )}
      </div>
      <p className="text-center">
        {ImgUpload.imgPreview ? ImgUpload.imgPreview.name : ""}
      </p>
    </>
  );
};

export default ImagePreview;
