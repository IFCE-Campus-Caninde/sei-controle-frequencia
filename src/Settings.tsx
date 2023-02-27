import { Formik, Field, Form, FormikHelpers } from "formik";
import { useState } from "react";
import { FreqData } from "./interfaces";
export default function Settings() {
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
  const handleSubmit = (values: FreqData) => {
    console.log("Valores do formulário:", values);
    // Enviar os dados para o servidor aqui
  };
  return (
    <Formik
      initialValues={initial}
      enableReinitialize={false}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form>
          <label htmlFor="servidor">Servidor</label>
          <Field
            id="servidor"
            name="servidor"
            placeholder="Fulano"
            onChange={(e: any) => {
              formik.handleChange(e);
              formik.submitForm();
            }}
          />
          <label htmlFor="matricula">Matrícula</label>
          <Field
            id="matricula"
            name="matricula"
            placeholder="0000000"
            onChange={(e: any) => {
              formik.handleChange(e);
              formik.submitForm();
            }}
          />
          <label htmlFor="cargo">Cargo</label>
          <Field
            id="cargo"
            name="cargo"
            placeholder="Técnico Administrativo"
            onChange={(e: any) => {
              formik.handleChange(e);
              formik.submitForm();
            }}
          />
          <label htmlFor="funcao">Função</label>
          <Field
            id="funcao"
            name="funcao"
            placeholder="Coordenador"
            onChange={(e: any) => {
              formik.handleChange(e);
              formik.submitForm();
            }}
          />
          <label htmlFor="lotacao">Lotação</label>
          <Field
            id="lotacao"
            name="lotacao"
            placeholder="Campus Tal"
            onChange={(e: any) => {
              formik.handleChange(e);
              formik.submitForm();
            }}
          />
          <label htmlFor="jornada">Jornada</label>
          <Field
            id="jornada"
            name="jornada"
            placeholder="40 horas"
            onChange={(e: any) => {
              formik.handleChange(e);
              formik.submitForm();
            }}
          />
          <label htmlFor="setor">Setor</label>
          <Field
            id="setor"
            name="setor"
            placeholder="Coordenação de Algo"
            onChange={(e: any) => {
              formik.handleChange(e);
              formik.submitForm();
            }}
          />
          <label htmlFor="horario">Horário</label>
          <Field
            id="horario"
            name="horario"
            placeholder="08:00 - 12:00 / 14:00 - 18:00"
            onChange={(e: any) => {
              formik.handleChange(e);
              formik.submitForm();
            }}
          />
        </Form>
      )}
    </Formik>
  );
}
