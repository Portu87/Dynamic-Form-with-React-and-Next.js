import { ImgPreviewInterface } from "@/interfaces/image.interface";
import { create } from "zustand";

interface useImgUploadStore {
    imgPreview: ImgPreviewInterface | null, 
    setImgPreview:(imgPreview:ImgPreviewInterface | null )=>void;
    file: File | null;
    setFile: (file: File | null) => void;
}

const useImageUpload = create<useImgUploadStore>((set) => {
 
  return {
   imgPreview: null,
    setImgPreview: (imgPreview: ImgPreviewInterface | null) => set({ imgPreview }),
    file: null,
    setFile: (file: File | null) => set({ file }),   
  };
});

export default useImageUpload;