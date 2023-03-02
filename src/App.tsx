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
  const [copied, setCopied] = useState<boolean>(false);

  //saveSettings({ settings, additional: { newStyle: month.newStyle } });

  const returnHtml = useMemo(() => {
    saveSettings({ settings, additional: { newStyle: month.newStyle } });
    setCopied(false);
    return (
      <>
        <HeaderTable {...settings} newStyle={month.newStyle} />
        <DaysTable
          month={month.month}
          year={month.year}
          newStyle={month.newStyle}
        />
      </>
    );
  }, [month, settings]);
  const htmlString = ReactDOMServer.renderToString(returnHtml);
  const formattedHtml = prettier.format(htmlString, {
    parser: "html",
    plugins: [htmlParser],
  });

  return (
    <div className="App">
      <h2 className="text-2xl font-bold text-slate-200 bg-slate-500 p-2">
        Como usar
      </h2>
      <div className="border-2 border-slate-500 mb-2 p-2">
        <ul className="text-left list-disc pl-6">
          <li>Preencha seus dados na seção "Configuração".</li>
          <li>Selecione o mês e ano.</li>
          <li>Copie o código HTML gerado e cole no documento do SEI.</li>
        </ul>
      </div>
      <h2 className="text-2xl font-bold text-slate-200 bg-slate-500 p-2">
        Configuração
      </h2>
      <div className="border-2 border-slate-500 mb-2 p-2">
        <Settings OnChange={setSettings} initialValues={settings} />
        <TableSettings OnChange={setMonth} initialValues={initialMonthData} />
      </div>

      <div className="flex lg:flex-row flex-col gap-4 items-stretch">
        <div>
          <h2 className="text-2xl font-bold text-slate-200 bg-slate-500 p-2">
            Preview:
          </h2>
          <div className="border-2 border-slate-500 mb-2 p-2">
            <div className="all-initial">
              <div className="new-style">{returnHtml}</div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col">
          <h2 className="text-2xl font-bold text-slate-200 bg-slate-500 p-2">
            HTML:{" "}
            <button
              className="bg-slate-300 px-2 rounded-md text-sm text-slate-800"
              onClick={() => {
                setCopied(true);
                navigator.clipboard.writeText(formattedHtml);
              }}
            >
              {copied ? "Copiado!" : "Copiar"}
            </button>
          </h2>
          <div className="border-2 border-slate-500 mb-2 p-2 h-full">
            <textarea
              className="w-full lg:h-full h-96 border-slate-400 border-2 p-2 lg:resize-none"
              value={formattedHtml}
            />
          </div>
        </div>
      </div>
      <div className="">
        Feito com ❤️ por Carlos Alberto Castelo @ IFCE <em>Campus</em> Canindé
      </div>
    </div>
  );
}

export default App;
