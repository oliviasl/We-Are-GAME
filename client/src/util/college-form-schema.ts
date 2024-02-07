import {z} from "zod";
import {CategoryField, CollegeFormField} from "./types/college-form";
import {collegeForm} from "./data/college-form";

const createZodField = (field: CollegeFormField) => {
  switch (field.type) {
    case "text":
    case "url":
    case "date":
    case "longform":
      return z
        .string()
        .refine((data) => !field.required || data.trim() !== "", {
          message: "Field is required",
        });
    case "number":
      return z
        .string()
        .transform((v) => parseInt(v, 10))
        .refine((data) => !field.required || !isNaN(data), {
          message: "Field is required",
        })
        .transform((v) => field.percentage ? v / 100 : v)
        .refine(
          (data) => isNaN(data) || typeof field.min === "undefined" || data >= field.min!,
          {message: `Must be more than ${field.min}`},
        )
        .refine(
          (data) => isNaN(data) || typeof field.max === "undefined" || data <= field.max!,
          {message: `Must be less than ${field.max}`},
        );
    default:
      return z.unknown(); // You can customize this for other field types
  }
};


const processFields = (fields: (CategoryField | CollegeFormField)[]) => {
  let zodFields: Record<string, ReturnType<typeof createZodField>> = {};

  fields.forEach((field) => {
    if (field.type === "category") {
      zodFields = {...zodFields, ...processFields(field.fields)};
    } else {
      zodFields[field.id] = createZodField(field)
    }
  });

  return zodFields;
};

export const collegeFormSchemas = collegeForm.map(form => z.object(processFields(form.fields)))