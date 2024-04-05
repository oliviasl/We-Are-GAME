export type CategoryField = {
  type: "category";
  title: string;
  columns: number;
  fields: CollegeFormField[];
};

type NumberField = {
  type: "number";
  title: string;
  id: string;
  min?: number;
  max?: number;
  step?: number;
  percentage?: boolean;
};

type TextField = {
  type: "text";
  title: string;
  id: string;
};

type LongformField = {
  type: "longform";
  title: string;
  id: string;
};

type DateField = {
  type: "date";
  title: string;
  id: string;
};

export type CollegeFormField = (TextField | NumberField | LongformField | DateField) & {
  half_width?: boolean;
  required?: boolean;
};

export type CollegeFormSection = {
  title: string;
  fields: (CategoryField | CollegeFormField)[];
};

export type CollegeForm = CollegeFormSection[]