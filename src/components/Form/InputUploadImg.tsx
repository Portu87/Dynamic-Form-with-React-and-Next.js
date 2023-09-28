import React from "react";
import { FlexContainer } from "../Containers";

import ImagePreview from "./ImagePreview";
import InputFile from "./InputFile";

const InputUploadImg = () => {
  return (
    <FlexContainer className="gap-3 items-start justify-start">
      <ImagePreview />
      <InputFile />
    </FlexContainer>
  );
};

export default InputUploadImg;
