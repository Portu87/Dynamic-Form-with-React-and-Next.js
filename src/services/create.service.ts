"use server";

import { FormField } from "@/components/Form/Form";

import { CategoryInterface } from "@/interfaces/category.interface";
import { ResServer } from "@/interfaces/server-response.interface";
import { prisma } from "@/libs/prismadb";
import { UploadImg } from "@/libs/upload-image";
import { DinamicZodSchema } from "@/zodSchemas/dinamic.zod.schema";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";

interface CreateInterface {
  data: FormData;
  type: string;
  image: boolean;
  fields: FormField[];
  revalidateUrl: string;
}

export const create = async ({
  data,
  type,
  image,
  fields,
  revalidateUrl,
}: CreateInterface): Promise<ResServer<CategoryInterface>> => {
  
  const file: File = data.get("file") as File;
  if (image) {
    if (!file) {
      return {
        error: true,
        code: 400,
        message: "No se ha subido ninguna imagen",
      };
    }
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
    formSchema.parse(formData);

    const img = await UploadImg(file, type);

    let result: any;
    // Utiliza un switch para manejar diferentes tipos
    switch (type) {
      case "Categoría":
        result = await prisma.category.create({
          data: {
            name: formValues.name,
            description: formValues.description,
            image: img, 
          },
        });
        break;
      case "Producto":
        result = await prisma.product.create({
          data: {
            name: formValues.name,
            price: parseFloat(formValues.price),
            description: formValues.description,
            featured: formValues.featured === "true",
            rating: parseInt(formValues.rating),
            image: img,
            categoryId: formValues.categoryId,
          },
        });
        break;
      default:
        throw new Error(`Tipo no válido: ${type}`);
    }
    revalidatePath(revalidateUrl);

    return {
      error: false,
      message: `Creación de ${type} exitosa`,
      code: 201,
    };
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      return {
        error: true,
        code: 400,
        message: error.issues.map((issue) => issue.message).join("\n \n"),
      };
    }
  }
  return {
    error: true,
    code: 500,
    message: `Hubo un error al crear ${type}`,
  };
};
