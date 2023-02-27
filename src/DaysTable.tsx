import { ReactNode } from "react";

export interface DaysTableProps {
  year?: number;
  month?: number;
  notes?: string;
}
export default function DaysTable({
  year = new Date().getFullYear(),
  month = new Date().getMonth(),
  notes = "",
}: DaysTableProps) {
  const monthDays = [
    ...new Array(new Date(year, month + 1, 0).getDate()).keys(),
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
        fontFamily: "Arial, Helvetica, sans-serif",
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
          <td colSpan={2}>1&ordm; TURNO</td>
          <td rowSpan={2}>DIA</td>
          <td colSpan={2}>2&ordm; TURNO</td>
        </tr>
        <tr
          style={{
            backgroundColor: "rgb(231, 231, 231)",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          <td>ENTRADA</td>
          <td>SA&Iacute;DA</td>
          <td>ENTRADA</td>
          <td>SA&Iacute;DA</td>
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
