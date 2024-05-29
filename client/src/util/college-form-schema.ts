import {z} from "zod";
import {CategoryField, CollegeFormField} from "./types/college-form";
import {collegeForm} from "./data/college-form";

const createZodField = (field: CollegeFormField) => {
  switch (field.type) {
    case "text":
    case "date":
    case "longform":
      return z
        .string()
        .optional()
        .refine((data) => !field.required || (data || "").trim() !== "", {
          message: "Field is required",
        })
        .nullable()
        .transform((v) => (v === "" && field.type === "date") ? null : v);
    case "number":
      return z.union([z.string(), z.number()])
        .nullable()
        .transform((v) => parseInt(String(v), 10))
        .refine((data) => !field.required || !isNaN(data), {
          message: "Field is required",
        })
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
    } else if (field.id) {
      zodFields[field.id] = createZodField(field)
    }
  });

  return zodFields;
};

export const collegeFormSchemas = collegeForm.map(form => z.object(processFields(form.fields)))