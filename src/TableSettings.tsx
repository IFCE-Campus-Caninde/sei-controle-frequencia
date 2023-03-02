import { Form, Formik } from "formik";
import FormField, { FormFieldCheck, FormFieldSelectProps } from "./FormField";
import { MonthData } from "./interfaces";

export interface TableSettingsProps {
  OnChange: (values: MonthData) => void;
  initialValues: MonthData;
}

export default function TableSettings({
  OnChange,
  initialValues,
}: TableSettingsProps) {
  const handleChange = (values: MonthData) => {
    OnChange(values);
  };
  const meses = [
    { value: 0, label: "Janeiro" },
    { value: 1, label: "Fevereiro" },
    { value: 2, label: "Março" },
    { value: 3, label: "Abril" },
    { value: 4, label: "Maio" },
    { value: 5, label: "Junho" },
    { value: 6, label: "Julho" },
    { value: 7, label: "Agosto" },
    { value: 8, label: "Setembro" },
    { value: 9, label: "Outubro" },
    { value: 10, label: "Novembro" },
    { value: 11, label: "Dezembro" },
  ];
  return (
    <div className="flex justify-center w-full">
      <Formik
        initialValues={initialValues}
        enableReinitialize={false}
        onSubmit={handleChange}
        validateOnChange={true}
      >
        {(formik) => (
          <Form
            className="text-left"
            style={{ width: "700px" }}
            onChange={(e) => {
              formik.setSubmitting(true);
              formik.submitForm();
              formik.setSubmitting(false);
            }}
          >
            <div className="flex">
              <FormField name="year" label="Ano" placeholder="Ex: 2023" />
              <FormFieldSelectProps
                name="month"
                label="Mês"
                values={meses}
              ></FormFieldSelectProps>
            </div>
            <div className="flex justify-center">
              <FormFieldCheck label="Novo Estilo?" name="newStyle" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
