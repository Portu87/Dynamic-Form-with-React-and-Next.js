/**
 * InputUploadImg component for displaying image upload and preview components.
 * @returns {React.FC} - A React functional component representing the image upload component.
 */

import React from "react";
import { FlexContainer } from "../Containers";

import ImagePreview from "./ImagePreview";
import InputFile from "./InputFile";

const InputUploadImg: React.FC = () => {
  return (
    <FlexContainer className="gap-3 items-start justify-start">
      <ImagePreview />
      <InputFile />
    </FlexContainer>
  );
};

export default InputUploadImg;
