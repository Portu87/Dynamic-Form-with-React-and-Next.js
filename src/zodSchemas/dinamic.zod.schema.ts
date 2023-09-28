/**
 * This module provides a dynamic Zod schema generation function based on the form fields.
 *
 * @module DinamicZodSchema
 */

import { FormField, Validation } from "@/components/Form/Form";
import { object, string, number } from "zod";

/**
 * Generates a Zod schema based on the provided form fields and their validations.
 *
 * @param {FormField[]} fields - The form fields for which to generate the schema.
 * @returns {object} A Zod schema object.
 */
export const DinamicZodSchema = (fields: FormField[]) => {
  const fieldSchemas = fields.reduce((schemas, field) => {
    if (field.validations) {
      const { type, min, max, trim }: Validation = field.validations[0];
      let schema;

      const zodValidations: Validation = {
        type,
        min,
        max,
        trim,
      };

      if (zodValidations.type === "string") {
        schema = string();
        if (zodValidations.min !== undefined) {
          schema = schema.min(zodValidations.min);
        }
        if (zodValidations.max !== undefined) {
          schema = schema.max(zodValidations.max);
        }
        if (zodValidations.trim) {
          schema = schema.trim();
        }
      } else if (zodValidations.type === "number") {
        schema = number();
        if (zodValidations.min !== undefined) {
          schema = schema.min(zodValidations.min);
        }
        if (zodValidations.max !== undefined) {
          schema = schema.max(zodValidations.max);
        }
      }

      return { ...schemas, [field.name]: schema };
    }

    // If there are no validation rules, return the object without changes
    return schemas;
  }, {});

  return object(fieldSchemas);
};
