/**
 * Form component for creating categories or products with dynamic fields and optional image upload.
 * @param {object} props - The props for the Form component.
 * @param {FormField[]} props.fields - An array of form fields with their configurations.
 * @param {boolean} props.image - Indicates whether the form allows image upload.
 * @param {string} props.submitText - The text to display on the submit button.
 * @param {string} props.type - The type of form (e.g., "Category" or "Product").
 * @param {string} props.revalidateUrl - The URL to revalidate after form submission.
 * @returns {React.FC} - A React functional component representing the dynamic form.
 */

"use client";

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

  // Function to handle form submission
  const handlesubmit = async (data: FormData) => {
    if (image) {
      if (!imageUpload.file) {
        return toast.error("You must select an image");
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

    
    try {
      const formSchema = DinamicZodSchema(fields);
      const formData = Object.fromEntries(data.entries());
      delete formData.file0;

      formSchema.parse(formData);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,       
      });
      console.log("response api --> ",{response});
      const img = await response.json();

      const { error, message, code } = await create({
        data,
        type,
        image,
        img,
        fields,
        revalidateUrl,
      });

      if (error) {
        console.log({ error, message, code });
        return toast.error(message);
      }

      toast.success(message);

      // Clear image upload state, reset form fields
      imageUpload.setFile(null);
      imageUpload.setImgPreview(null);
      formRef.current?.reset();
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error.issues);
        return error.issues.map((issue) => toast.error(issue.message));
      }
      return toast.error(`An error occurred while creating ${type}`);
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
      {image && <InputUploadImg />}
      <ButtonSpinner
        type="submit"
        text={submitText}
        className="bg-red-600 hover:bg-red-600 text-white"
      />
    </form>
  );
};

export default Form;
