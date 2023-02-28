import { FreqData } from "./interfaces";

export interface HeaderTableProps extends FreqData {}
export default function HeaderTable(data: HeaderTableProps) {
  return (
    <table
      border={1}
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        width: "700px",
        fontFamily: "Arial, Helvetica, sans-serif",
        border: "2px solid black",
        borderCollapse: "collapse",
        marginBottom: "1em",
      }}
    >
      <tbody style={{ textAlign: "left" }}>
        <tr
          style={{
            backgroundColor: "rgb(221, 221, 221)",
            textAlign: "center",
          }}
        >
          <td colSpan={4} style={{ padding: "0.2em" }}>
            <strong>DADOS BÁSICOS</strong>
          </td>
        </tr>
        <tr>
          <td style={{ border: "none", width: 0, paddingLeft: "0.5em" }}>
            <strong>SERVIDOR:</strong>
          </td>
          <td style={{ border: "none" }}>{data.servidor}</td>
          <td style={{ border: "none", width: 0 }}>
            <strong>MATRÍCULA:</strong>
          </td>
          <td style={{ border: "none" }}>{data.matricula}</td>
        </tr>
        <tr>
          <td style={{ border: "none", paddingLeft: "0.5em" }}>
            <strong>CARGO:</strong>
          </td>
          <td style={{ border: "none" }}>{data.cargo}</td>
          <td style={{ border: "none" }}>
            <strong>FUNÇÃO:</strong>
          </td>
          <td style={{ border: "none" }}>{data.funcao}</td>
        </tr>
        <tr>
          <td style={{ border: "none", paddingLeft: "0.5em" }}>
            <strong>LOTAÇÃO:</strong>
          </td>
          <td style={{ border: "none" }}>{data.lotacao}</td>
          <td style={{ border: "none" }}>
            <strong>JORNADA:</strong>
          </td>
          <td style={{ border: "none" }}>{data.jornada}</td>
        </tr>
        <tr>
          <td style={{ border: "none", paddingLeft: "0.5em" }}>
            <strong>SETOR:</strong>
          </td>
          <td style={{ border: "none" }}>{data.setor}</td>
          <td style={{ border: "none" }}>
            <strong>HORÁRIO:</strong>
          </td>
          <td style={{ border: "none" }}>{data.horario}</td>
        </tr>
      </tbody>
    </table>
  );
}
