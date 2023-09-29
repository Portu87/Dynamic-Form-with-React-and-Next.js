/**
 * This module contains a server-side function for creating categories or products.
 *
 * @module create
 */

"use server";

import { FormField } from "@/components/Form/Form";
import { CategoryInterface } from "@/interfaces/category.interface";
import { ImageInterface } from "@/interfaces/image.interface";
import { ResServer } from "@/interfaces/server-response.interface";
import { prisma } from "@/libs/prismadb";
import { DinamicZodSchema } from "@/zodSchemas/dinamic.zod.schema";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";

/**
 * Creates a category or product based on the provided data.
 *
 * @param {CreateInterface} data - The data needed for the creation process.
 * @returns {Promise<ResServer<CategoryInterface>>} A response object indicating success or failure.
 */
export const create = async ({
  data,
  type,
  image,
  img,
  fields,
  revalidateUrl,
}: CreateInterface): Promise<ResServer<CategoryInterface>> => {
  const file: File = data.get("file") as File;

  if (image) {
    if (!file) {
      return {
        error: true,
        code: 400,
        message: "No image has been uploaded",
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

    let result: any;

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
      // Add more cases for other types if needed.
      default:
        throw new Error(`Invalid type: ${type}`);
    }

    revalidatePath(revalidateUrl);

    return {
      error: false,
      message: `${type} creation successful`,
      code: 201,
    };
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      return {
        error: true,
        code: 400,
        message: error.issues.map((issue) => issue.message).join("\n\n"),
      };
    }
  }

  return {
    error: true,
    code: 500,
    message: `An error occurred while creating ${type}`,
  };
};

/**
 * Interface for the data needed to create a category or product.
 * @typedef {Object} CreateInterface
 * @property {FormData} data - The form data containing the creation details.
 * @property {string} type - The type of entity to create (e.g., "Category" or "Product").
 * @property {boolean} image - Indicates whether an image is included in the creation.
 * @property {FormField[]} fields - The form fields to be validated.
 * @property {string} revalidateUrl - The URL to revalidate after creation.
 */
interface CreateInterface {
  data: FormData;
  type: string;
  image: boolean;
  img: ImageInterface;
  fields: FormField[];
  revalidateUrl: string;
}
