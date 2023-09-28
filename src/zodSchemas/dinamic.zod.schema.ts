import { FormField, Validation } from "@/components/Form/Form";
import { object, string, number } from "zod";

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

    // Si no hay reglas de validación, simplemente regresamos el objeto sin cambios
    return schemas;
  }, {});

  return object(fieldSchemas);
};
