import { Formik, Field, Form, FormikHelpers } from "formik";
import { useState } from "react";
import { FreqData } from "./interfaces";
export interface SettingsProps {
  initialValues: FreqData;
  OnChange: (values: FreqData) => void;
}
export default function Settings({ initialValues, OnChange }: SettingsProps) {
  const initial = {
    servidor: "",
    cargo: "",
    funcao: "N/C",
    horario: "",
    jornada: "40 horas",
    lotacao: "Campus Canindé",
    setor: "",
    matricula: "",
  };
  const handleChange = (values: FreqData) => {
    OnChange(values);
  };
  return (
    <Formik
      initialValues={initial}
      enableReinitialize={false}
      onSubmit={handleChange}
      validateOnChange={true}
    >
      {(formik) => (
        <Form
          className="text-left ml-auto"
          style={{ width: "700px" }}
          onChange={(e) => {
            formik.setSubmitting(true);
            formik.submitForm();
            formik.setSubmitting(false);
          }}
        >
          <div className="block">
            <label
              className="text-gray-700 text-sm font-bold mb-2 mr-2"
              htmlFor="servidor"
            >
              Servidor
            </label>
            <Field
              className="text-gray-700 text-sm font-bold mb-2 border-gray-400 w-max"
              id="servidor"
              name="servidor"
              placeholder="Fulano"
            />
          </div>

          <div className="block">
            <label
              htmlFor="matricula"
              className="text-gray-700 text-sm font-bold mb-2 mr-2"
            >
              Matrícula
            </label>
            <Field
              id="matricula"
              name="matricula"
              placeholder="0000000"
              className="text-gray-700 text-sm font-bold mb-2 border-gray-400"
            />
          </div>
          <div className="block">
            <label
              htmlFor="cargo"
              className="text-gray-700 text-sm font-bold mb-2 mr-2"
            >
              Cargo
            </label>
            <Field
              id="cargo"
              name="cargo"
              placeholder="Técnico Administrativo"
              className="text-gray-700 text-sm font-bold mb-2 border-gray-400"
            />
          </div>
          <div className="block">
            <label
              htmlFor="funcao"
              className="text-gray-700 text-sm font-bold mb-2 mr-2"
            >
              Função
            </label>
            <Field
              id="funcao"
              name="funcao"
              placeholder="Coordenador"
              className="text-gray-700 text-sm font-bold mb-2 border-gray-400"
            />
          </div>
          <div className="block">
            <label
              htmlFor="lotacao"
              className="text-gray-700 text-sm font-bold mb-2 mr-2"
            >
              Lotação
            </label>
            <Field
              id="lotacao"
              name="lotacao"
              placeholder="Campus Tal"
              className="text-gray-700 text-sm font-bold mb-2 border-gray-400"
            />
          </div>
          <div className="block">
            <label
              htmlFor="jornada"
              className="text-gray-700 text-sm font-bold mb-2 mr-2"
            >
              Jornada
            </label>
            <Field
              id="jornada"
              name="jornada"
              placeholder="40 horas"
              className="text-gray-700 text-sm font-bold mb-2 border-gray-400"
            />
          </div>
          <div className="block">
            <label
              htmlFor="setor"
              className="text-gray-700 text-sm font-bold mb-2 mr-2"
            >
              Setor
            </label>
            <Field
              id="setor"
              name="setor"
              placeholder="Coordenação de Algo"
              className="text-gray-700 text-sm font-bold mb-2 border-gray-400"
            />
          </div>
          <div className="block">
            <label
              htmlFor="horario"
              className="text-gray-700 text-sm font-bold mb-2 mr-2"
            >
              Horário
            </label>
            <Field
              id="horario"
              name="horario"
              placeholder="08:00 - 12:00 / 14:00 - 18:00"
              className="text-gray-700 text-sm font-bold mb-2 border-gray-400"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}
