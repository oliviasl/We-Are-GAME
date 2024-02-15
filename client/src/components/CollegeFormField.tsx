import {CategoryField, CollegeFormField} from "../util/types/college-form";
import {Input, Textarea, Typography} from "@material-tailwind/react";
import {FieldErrors, UseFormReturn} from "react-hook-form";

type CollegeFormFieldProps = {
  form: UseFormReturn
  field: CategoryField | CollegeFormField
  isNested?: boolean
  errors: FieldErrors
}

export function CollegeFormFormField({form, field, isNested, errors}: CollegeFormFieldProps) {
  if (field.type === "category") {
    return <div className={"grid grid-cols-[1fr_2fr] gap-8"}>
      <div className={"h-10 flex items-center"}>
        <Typography className={"font-bold"}>{field.title}</Typography>
      </div>
      <div className={`grid ${field.columns === 1 ? "grid-cols-1" : "grid-cols-2"} gap-x-8 gap-y-4`}>
        {field.fields.map((subfield) => (
          <CollegeFormFormField
            key={subfield.id}
            form={form}
            field={subfield}
            isNested
            errors={errors}
          />
        ))}
      </div>
    </div>
  }

  if (field.type === "longform") {
    return <div>
      <Textarea
        required={field.required ?? false}
        value={form.getValues()[field.id] as string}
        onChange={e => form.setValue(field.id, e.target.value)}
      />
      {errors[field.id] &&
        <p className={"text-xs text-red-500"}>{form.getFieldState(field.id).error?.message}</p>}
    </div>
  }

  return <div className={`grid ${isNested ? "grid-cols-[1fr_1fr]" : "grid-cols-[1fr_2fr]"} gap-8`}>
    <div className={"h-10 flex items-center"}>
      <Typography className={`${isNested ? "font-regular" : "font-bold"}`}>{field.title}</Typography>
    </div>
    <div className={"space-y-1"}>
      <Input
        key={field.id}
        {...form.register(field.id)}
        type={field.type}
        containerProps={{className: "min-w-0"}}
        crossOrigin
      />
      {errors[field.id] &&
        <p className={"text-xs text-red-500"}>{form.getFieldState(field.id).error?.message}</p>}
    </div>
  </div>
}