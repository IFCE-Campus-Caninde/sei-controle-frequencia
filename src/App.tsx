import { useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import DaysTable from "./DaysTable";
import ReactDOMServer from "react-dom/server";
import prettier from "prettier/standalone";
import htmlParser from "prettier/parser-html";
import Settings from "./Settings";
import HeaderTable from "./HeaderTable";
import { FreqData, MonthData } from "./interfaces";
import TableSettings from "./TableSettings";

function App() {
  const initialSettings: FreqData = {
    servidor: "",
    cargo: "",
    funcao: "N/C",
    horario: "",
    jornada: "40 horas",
    lotacao: "Campus Canindé",
    setor: "",
    matricula: "",
  };
  const initialMonthData: MonthData = {
    newStyle: true,
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  };
  const [settings, setSettings] = useState<FreqData>(initialSettings);
  const [month, setMonth] = useState<MonthData>(initialMonthData);

  const returnHtml = useMemo(
    () => (
      <>
        <HeaderTable {...settings} newStyle={month.newStyle} />
        <DaysTable
          month={month.month}
          year={month.year}
          newStyle={month.newStyle}
        />
      </>
    ),
    [month, settings]
  );
  const htmlString = ReactDOMServer.renderToString(returnHtml);
  const formattedHtml = prettier.format(htmlString, {
    parser: "html",
    plugins: [htmlParser],
  });

  return (
    <div className="App">
      <h2 className="text-2xl font-bold text-slate-200 bg-slate-500 p-2 mb-2">
        Configuração
      </h2>
      <Settings OnChange={setSettings} initialValues={initialSettings} />
      <TableSettings OnChange={setMonth} initialValues={initialMonthData} />
      <div className="lg:flex gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-200 bg-slate-500 p-2 mb-2">
            Preview:
          </h2>
          <div className="all-initial">
            <div className="new-style">{returnHtml}</div>
          </div>
        </div>
        <div className="w-full">
          <h2 className="text-2xl font-bold text-slate-200 bg-slate-500 p-2 mb-2">
            HTML:
          </h2>
          <textarea
            className="w-full h-96 border-2 border-slate-500 p-2"
            value={formattedHtml}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
