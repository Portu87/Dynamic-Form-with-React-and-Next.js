"use client"
import InputUploadImg from "@/components/Form/InputUploadImg";
import useImageUpload from "@/hooks/useImageUpload.store";
import { create } from "@/services/create.service";
import { DinamicZodSchema } from "@/zodSchemas/dinamic.zod.schema";
import React, { useRef } from "react";
import toast from "react-hot-toast";
import { ZodError } from "zod";
import ButtonSpinner from "./ButtonSpinner";


export interface Validation {
  type: "string" | "number";
  min?: number;
  max?: number;
  trim?: boolean;
}

export interface FormField {
  type: string;
  name: string;
  validations?: Validation[];
  placeholder?: string;
}

interface FormCreateCategoryProps {
  fields: FormField[];
  image: boolean;
  submitText: string;
  type: string;
  revalidateUrl: string;
}

const Form: React.FC<FormCreateCategoryProps> = ({
  fields,
  image,
  submitText,
  type,
  revalidateUrl,
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const imageUpload = useImageUpload();

  const handlesubmit = async (data: FormData) => {
    if (image) {
      if (!imageUpload.file) {
        return toast.error("Debes seleccionar una imagen");
      }
        data.append("file", imageUpload.file, imageUpload.file.name);
    }

    const formValues: { [key: string]: string } = {};
    fields.forEach((field) => {
      const value = data.get(field.name);
      if (value) {
        formValues[field.name] = value as string;
      }
    });

    const formSchema = DinamicZodSchema(fields);

    try {
      const formData = Object.fromEntries(data.entries());
      delete formData.file0;

      formSchema.parse(formData);
      
      const { error, message, code } = await create({
        data,
        type,
        image,        
        fields,
        revalidateUrl,
      });

      if (error) {
        console.log({ error, message, code });
        return toast.error(message);
      }

      toast.success(message);

      imageUpload.setFile(null);
      imageUpload.setImgPreview(null);
      formRef.current?.reset();
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error.issues);
        return error.issues.map((issue) => toast.error(issue.message));
      }
      return toast.error(`Ha ocurrido un error al crear ${type}`);
    }
  };

  return (
    <form
      ref={formRef}
      action={handlesubmit}
      className="flex flex-col space-y-4 max-w-md gap-4"
    >
      {fields.map((field) => (
        <input
          key={field.name}
          type={field.type}
          className="p-4 rounded-md"
          name={field.name}
          placeholder={field.placeholder || ""}
        />
      ))}
      {image && <InputUploadImg />}{" "}
      
      <ButtonSpinner
        type="submit"
        text={submitText}
        className="bg-red-600 hover:bg-red-600 text-white"
      />
     
    </form>
  );
};

export default Form;
