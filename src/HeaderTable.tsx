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
      }}
    >
      <tbody style={{ textAlign: "left" }}>
        <tr
          style={{ backgroundColor: "rgb(221, 221, 221)", textAlign: "center" }}
        >
          <td colSpan={4}>
            <strong>DADOS BÁSICOS</strong>
          </td>
        </tr>
        <tr>
          <td>
            <strong>SERVIDOR:</strong>
          </td>
          <td>{data.servidor}</td>
          <td>
            <strong>MATRÍCULA:</strong>
          </td>
          <td>{data.matricula}</td>
        </tr>
        <tr>
          <td>
            <strong>CARGO:</strong>
          </td>
          <td>{data.cargo}</td>
          <td>
            <strong>FUNÇÃO:</strong>
          </td>
          <td>{data.funcao}</td>
        </tr>
        <tr>
          <td>
            <strong>LOTAÇÃO:</strong>
          </td>
          <td>{data.lotacao}</td>
          <td>
            <strong>JORNADA:</strong>
          </td>
          <td>{data.jornada}</td>
        </tr>
        <tr>
          <td>
            <strong>SETOR:</strong>
          </td>
          <td>{data.setor}</td>
          <td>
            <strong>HORÁRIO:</strong>
          </td>
          <td>{data.horario}</td>
        </tr>
      </tbody>
    </table>
  );
}
