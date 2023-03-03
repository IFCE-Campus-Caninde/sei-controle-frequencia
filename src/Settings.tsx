import { Formik, Field, Form, FormikHelpers } from "formik";
import { useState } from "react";
import FormField from "./FormField";
import { FreqData } from "./interfaces";
export interface SettingsProps {
  initialValues: FreqData;
  OnChange: (values: FreqData) => void;
}
export default function Settings({ initialValues, OnChange }: SettingsProps) {
  const handleChange = (values: FreqData) => {
    OnChange(values);
  };
  return (
    <div className="flex justify-center w-full">
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={handleChange}
        validateOnChange={true}
      >
        {(formik) => (
          <Form
            className="text-left"
            onChange={(e) => {
              formik.setSubmitting(true);
              formik.submitForm();
              formik.setSubmitting(false);
            }}
          >
            <table className="border-collapse border-0">
              <tbody>
                <tr>
                  <td>
                    <FormField
                      name="servidor"
                      label="Servidor"
                      placeholder="Ex: Fulano"
                    />
                  </td>
                  <td>
                    <FormField
                      name="matricula"
                      label="Matrícula"
                      placeholder="Ex: 0000000"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FormField
                      name="cargo"
                      label="Cargo"
                      placeholder="Ex: Técnico Administrativo"
                    />
                  </td>
                  <td>
                    <FormField
                      name="funcao"
                      label="Função"
                      placeholder="Ex: Coordenador"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FormField
                      name="lotacao"
                      label="Lotação"
                      placeholder="Ex: Campus Tal"
                    />
                  </td>
                  <td>
                    <FormField
                      name="jornada"
                      label="Jornada"
                      placeholder="Ex: 40 horas"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FormField
                      name="setor"
                      label="Setor"
                      placeholder="Ex: Coordenação de Algo"
                    />
                  </td>
                  <td>
                    <FormField
                      name="horario"
                      label="Horário"
                      placeholder="Ex: 08:00 - 12:00 / 14:00 - 18:00"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </Form>
        )}
      </Formik>
    </div>
  );
}
