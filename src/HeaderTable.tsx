import { FreqData } from "./interfaces";

export interface HeaderTableProps extends FreqData {
  newStyle?: boolean;
}
export default function HeaderTable(data: HeaderTableProps) {
  const { newStyle } = data;
  return (
    <table
      border={1}
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        width: "700px",
        fontFamily: newStyle
          ? "Arial, Helvetica, sans-serif"
          : "Times New Roman, Times, serif",
        border: "2px solid black",
        fontSize: newStyle ? "0.9em" : "1em",
        lineHeight: "1.2em",
        borderCollapse: newStyle ? "collapse" : "separate",
        marginBottom: "1em",
        //tableLayout: "fixed",
        whiteSpace: "nowrap",
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
          <td
            style={{
              border: "none",
              width: 0,
              paddingLeft: "0.5em",
              paddingBottom: "0.2em",
            }}
          >
            <strong>SERVIDOR:</strong>
          </td>
          <td style={{ border: "none" }}>{data.servidor}</td>
          <td style={{ border: "none", width: 0 }}>
            <strong>MATRÍCULA:</strong>
          </td>
          <td style={{ border: "none" }}>{data.matricula}</td>
        </tr>
        <tr>
          <td
            style={{
              border: "none",
              paddingLeft: "0.5em",
              paddingBottom: "0.2em",
            }}
          >
            <strong>CARGO:</strong>
          </td>
          <td style={{ border: "none" }}>{data.cargo}</td>
          <td style={{ border: "none" }}>
            <strong>FUNÇÃO:</strong>
          </td>
          <td style={{ border: "none" }}>{data.funcao}</td>
        </tr>
        <tr>
          <td
            style={{
              border: "none",
              paddingLeft: "0.5em",
              paddingBottom: "0.2em",
            }}
          >
            <strong>LOTAÇÃO:</strong>
          </td>
          <td style={{ border: "none" }}>{data.lotacao}</td>
          <td style={{ border: "none" }}>
            <strong>JORNADA:</strong>
          </td>
          <td style={{ border: "none" }}>{data.jornada}</td>
        </tr>
        <tr>
          <td
            style={{
              border: "none",
              paddingLeft: "0.5em",
              paddingBottom: "0.2em",
            }}
          >
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
