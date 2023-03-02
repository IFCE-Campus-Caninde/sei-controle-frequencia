import { ReactNode } from "react";
import { getDaysInMonth } from "date-fns";

export interface DaysTableProps {
  year?: number;
  month?: number;
  notes?: string;
  newStyle?: boolean;
}

export default function DaysTable({
  year = new Date().getFullYear(),
  month = new Date().getMonth(),
  notes = "",
  newStyle = true,
}: DaysTableProps) {
  const monthDays = [
    ...new Array(getDaysInMonth(new Date(year, month))).keys(),
  ].map((i) => {
    const date = new Date(year, month, i + 1);
    let text: ReactNode = "";
    if (date.getDay() === 0) {
      text = <strong>DOMINGO</strong>;
    } else if (date.getDay() === 6) {
      text = <strong>SÁBADO</strong>;
    }
    return {
      date,
      text,
    };
  });
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
        borderCollapse: newStyle ? "collapse" : "separate",
      }}
    >
      <thead>
        <tr
          style={{
            backgroundColor: "rgb(221, 221, 221)",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          <td colSpan={2} style={{ padding: "0.2em" }}>
            1º TURNO
          </td>
          <td rowSpan={2} style={{ padding: "0.2em" }}>
            DIA
          </td>
          <td colSpan={2} style={{ padding: "0.2em" }}>
            2º TURNO
          </td>
        </tr>
        <tr
          style={{
            backgroundColor: "rgb(231, 231, 231)",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          <td style={{ padding: "0.2em" }}>ENTRADA</td>
          <td style={{ padding: "0.2em" }}>SAÍDA</td>
          <td style={{ padding: "0.2em" }}>ENTRADA</td>
          <td style={{ padding: "0.2em" }}>SAÍDA</td>
        </tr>
      </thead>
      <tbody style={{ textAlign: "center" }}>
        {monthDays.map((v) => (
          <tr key={v.date.toString()}>
            <td>{v.text}</td>
            <td>{v.text}</td>
            <td>{v.date.getDate().toString().padStart(2, "0")}</td>
            <td>{v.text}</td>
            <td>{v.text}</td>
          </tr>
        ))}

        <tr>
          <td colSpan={5}>{notes}&nbsp;</td>
        </tr>
      </tbody>
    </table>
  );
}
