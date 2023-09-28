/**
 * InputFile component for selecting and uploading image files.
 * @param {object} props - The props for the InputFile component.
 * @param {boolean} props.edit - Indicates whether the component is in edit mode.
 * @param {boolean} props.disabled - Indicates whether the input should be disabled.
 * @returns {React.FC} - A React functional component representing the input file component.
 */

"use client";
import useImageUpload from "@/hooks/useImageUpload.store";
import { FaCamera } from "react-icons/fa";

export interface InputFileInterface {
  edit?: boolean;
  disabled?: boolean;
}

const InputFile: React.FC<InputFileInterface> = ({ edit, disabled }) => {
  const ImageUpload = useImageUpload();

  // Function to handle image file selection and preview
  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const url = URL.createObjectURL(file);

      // Update image upload store with selected file and preview data
      ImageUpload.setFile(file);
      ImageUpload.setImgPreview({
        name: file.name,
        originalName: file.name,
        format: file.type,
        bytes: file.size,
        width: 130,
        height: 130,
        url,
        file,
      });
    }
  };

  return (
    <div
      className="flex items-start justify-start gap-3 cursor-pointer"
    >
      <div
        className="
          relative
          py-1 px-2
          rounded-md
          bg-neutral-300
          mt-2
          overflow-hidden
          transition
          duration-300
          hover:bg-red-600
          cursor-pointer
          w-full
          flex
          items-center
          justify-center
          gap-3
      "
      >
        <div className="group bg-transparent border-neutral-400 transition duration-300 flex items-center justify-center text-neutral-800 cursor-pointer">
          <FaCamera className="mr-2 hover:text-neutral-600 cursor-pointer" />{" "}
          {edit ? "Change Image" : "Upload an Image"}
          <input
            disabled={disabled}
            className="absolute w-full z-50 left-0 top-0 opacity-0 cursor-pointer group-hover:cursor-pointer border border-neutral-700"
            name="file"
            type="file"
            id="file"
            onChange={handleChangeImg}
          />
        </div>
      </div>
    </div>
  );
};

export default InputFile;
