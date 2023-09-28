"use client";
import useImageUpload from "@/hooks/useImageUpload.store";
import { FaCamera } from "react-icons/fa";

export interface InputFileInterface {
  edit?: boolean;
  disabled?: boolean;
}

const InputFile: React.FC<InputFileInterface> = ({ edit, disabled }) => {
  const ImageUpload = useImageUpload();

  const handleChangeImg = (e: any) => {
    let file = e.target.files[0];

    let url = URL.createObjectURL(file);

    ImageUpload.setFile(file);
    ImageUpload.setImgPreview({
      name: e.target.files[0].name,
      originalName: e.target.files[0].name,
      format: e.target.files[0].type,
      bytes: e.target.files[0].size,
      width: 130,
      height: 130,
      url,
      file,
    });
  };

  return (
    <div
      className=" flex
        items-start
        justify-start
        gap-3 cursor-pointer"
    >
      <div
        className="
            relative
            py-1 px-2
            rounded-md
            bg-neutral-300
            mt-2
            overFlow-hidden
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
        <div className="group bg-transparent border-none transition duration-300 flex items-center justify-center text-neutral-800 hover:text-white cursor-pointer">
          <FaCamera className="mr-2 hover:text-neutral-600 cursor-pointer" />{" "}
          {edit ? "Cambia la Imagen" : "Sube una Imagen"}
          <input
            disabled={disabled}
            className="absolute w-full z-50 left-0 top-0 opacity-0 cursor-pointer group-hover:cursor-pointer"
            name="file0"
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
