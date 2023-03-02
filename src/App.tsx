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

interface SettingsStorage {
  settings: FreqData;
  additional: { newStyle?: boolean };
}

function getSettings(): SettingsStorage {
  let settings: FreqData = initialSettings;
  let additional = { newStyle: true };
  try {
    const set1 = localStorage.getItem("settings");
    if (set1) {
      settings = JSON.parse(set1);
    }
    const set2 = localStorage.getItem("additional");
    if (set2) {
      additional = JSON.parse(set2);
    }
  } catch (e) {}

  console.log(settings, additional);
  return { settings, additional };
}

function saveSettings({ settings, additional }: SettingsStorage): void {
  try {
    localStorage.setItem("settings", JSON.stringify(settings));
    localStorage.setItem("additional", JSON.stringify(additional));
  } catch (e) {}
}

function App() {
  const store = getSettings();

  const initialMonthData: MonthData = {
    newStyle: store.additional.newStyle,
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  };
  const [settings, setSettings] = useState<FreqData>(store.settings);
  const [month, setMonth] = useState<MonthData>(initialMonthData);

  saveSettings({ settings, additional: { newStyle: month.newStyle } });

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
      <Settings OnChange={setSettings} initialValues={settings} />
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
            HTML:{" "}
            <button
              className="bg-slate-300 px-2 rounded-md text-sm text-slate-800"
              onClick={() => {
                navigator.clipboard.writeText(formattedHtml);
              }}
            >
              Copiar
            </button>
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
