import { Field } from "formik";

export interface FormFieldProps {
  name: string;
  label: string;
  placeholder?: string;
}

export interface FormFieldSelectProps {
  name: string;
  label: string;
  values: { value: any; label: string }[];
}

export default function FormField({
  name,
  label,
  placeholder = "",
}: FormFieldProps) {
  return (
    <div className="block">
      <label
        className="text-gray-700 text-sm font-bold mb-2 mx-2 inline-block w-32 lg:text-right"
        htmlFor={name}
      >
        {label}
      </label>
      <Field
        className="text-gray-700 text-sm mb-2 w-52 lg:w-80 p-1 bg-slate-100"
        id={name}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
}

export function FormFieldCheck({ name, label }: FormFieldProps) {
  return (
    <div className="block">
      <label
        className="text-gray-700 text-sm font-bold mb-2 mx-2 inline-block w-32 lg:text-right"
        htmlFor={name}
      >
        {label}
      </label>
      <Field
        type="checkbox"
        className="text-gray-700 text-sm mb-2 w-max p-1 "
        id={name}
        name={name}
      />
    </div>
  );
}

export function FormFieldSelectProps({
  name,
  label,
  values,
}: FormFieldSelectProps) {
  return (
    <div className="block">
      <label
        className="text-gray-700 text-sm font-bold mb-2 mx-2 inline-block w-32 lg:text-right"
        htmlFor={name}
      >
        {label}
      </label>
      <Field
        as="select"
        className="text-gray-700 text-sm mb-2 w-52 lg:w-80 p-1 bg-slate-100"
        id={name}
        name={name}
      >
        {values.map((value) => (
          <option key={value.value} value={value.value}>
            {value.label}
          </option>
        ))}
      </Field>
    </div>
  );
}
