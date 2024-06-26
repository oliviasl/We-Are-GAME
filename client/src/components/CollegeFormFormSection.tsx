import {Button, Typography} from "@material-tailwind/react";
import {CollegeFormFormField} from "./CollegeFormField";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {CollegeFormSection} from "../util/types/college-form";
import {useEffect} from "react";

type CollegeFormFormSectionProps = {
  section: CollegeFormSection;
  schema: z.ZodObject<any>;
  onBack: (() => void) | undefined;
  onNext: (data: any) => void;
  isLastTab: boolean;
  data?: any;
  autofillData?: any;
}


export const CollegeFormFormSection = ({
  section,
  schema,
  onBack,
  onNext,
  isLastTab,
  data,
  autofillData,
}: CollegeFormFormSectionProps) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: data
  });

  // somehow need to pass autofilled data here
  useEffect(() => {
    for (const property in autofillData) {
      form.setValue(property, autofillData[property])
    }
  }, [form, autofillData])

  useEffect(() => {
    // no-op effect to trigger re-render on errors
  }, [form.formState.errors])

  return <>
    <Typography variant={"h3"}>{section.title}</Typography>
    <form onSubmit={form.handleSubmit(onNext)} className="space-y-8">
      <div className={"flex flex-col space-y-4"}>
        {section.fields.map((field,) => (
          <CollegeFormFormField
            key={field.title}
            form={form}
            field={field}
            errors={form.formState.errors}
          />
        ))}
        <div className={"flex justify-between pt-8"}>
          <Button
            onClick={onBack}
            disabled={!onBack}
            variant={"outlined"}
            size={"lg"}
          >
            Back
          </Button>
          <Button
            type={"submit"}
            size={"lg"}
          >
            {isLastTab ? "Submit" : "Next"}
          </Button>
        </div>
      </div>
    </form>
  </>
}