import { ChangeEvent, ChangeEventHandler, useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { AiOutlineUserAdd, AiOutlineUserDelete } from "react-icons/ai";
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
  profiles: FreqData[];
  additional: { newStyle?: boolean };
}

function getSettings(): SettingsStorage {
  let profiles: FreqData[] = [initialSettings];
  let additional = { newStyle: true };
  try {
    //Verifica e atualiza configuração antiga
    const set1 = localStorage.getItem("settings");
    if (set1) {
      console.log("Atualizando dados antigos...");
      profiles = [JSON.parse(set1)];
      localStorage.removeItem("settings");
      localStorage.setItem("profiles", JSON.stringify(profiles));
    }
    const set3 = localStorage.getItem("profiles");
    if (set3) {
      profiles = JSON.parse(set3);
      if (profiles.length === 0) {
        profiles = [initialSettings];
      }
    }

    const set2 = localStorage.getItem("additional");
    if (set2) {
      additional = JSON.parse(set2);
    }
  } catch (e) {}
  return { profiles, additional };
}

function saveSettings({ profiles, additional }: SettingsStorage): void {
  try {
    localStorage.setItem("profiles", JSON.stringify(profiles));
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
  const [selectedProfile, setSelectedProfile] = useState<number>(0);

  const [profiles, setProfiles] = useState<FreqData[]>(store.profiles);
  const [month, setMonth] = useState<MonthData>(initialMonthData);
  const [copied, setCopied] = useState<boolean>(false);
  const settings = profiles[selectedProfile];

  const returnHtml = useMemo(() => {
    saveSettings({
      profiles,
      additional: { newStyle: month.newStyle },
    });
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
  }, [month, profiles, selectedProfile]);
  const htmlString = ReactDOMServer.renderToString(returnHtml);
  const formattedHtml = prettier.format(htmlString, {
    parser: "html",
    plugins: [htmlParser],
  });

  function onChangeSettingHandler(values: FreqData) {
    const newProfiles = profiles.map((value, index) =>
      index === selectedProfile ? values : value
    );
    setProfiles(newProfiles);
  }

  function deleteProfile() {
    const newProfiles = profiles.filter(
      (value, index) => index !== selectedProfile
    );
    setProfiles(newProfiles);
    setSelectedProfile(newProfiles.length - 1);
  }

  function addProfile() {
    const newProfiles = [...profiles, initialSettings];
    setProfiles(newProfiles);
    setSelectedProfile(newProfiles.length - 1);
  }
  function getProfileName(data: FreqData): string {
    return `${data.servidor} - ${data.matricula}`;
  }

  function profileChangeHandler(e: ChangeEvent<HTMLSelectElement>) {
    setSelectedProfile(parseInt(e.currentTarget.value));
  }

  return (
    <div className="App">
      <h2 className="text-2xl font-bold text-slate-200 bg-slate-500 p-2">
        Como usar
      </h2>
      <div className="border-2 border-slate-500 mb-2 p-2 bg-white overflow-auto">
        <ul className="text-left list-disc pl-6">
          <li>Preencha seus dados na seção "Configuração".</li>
          <li>Selecione o mês e ano.</li>
          <li>
            Copie o código HTML gerado e cole no documento do SEI (no modo
            "Código Fonte").
          </li>
        </ul>
      </div>
      <h2 className="text-2xl font-bold text-slate-200 bg-slate-500 p-2">
        <div className="lg:absolute flex-row flex items-center justify-center lg:justify-start h-8">
          <button
            className="px-1 text-center align-middle mr-1 hover:text-green-400"
            onClick={addProfile}
          >
            <AiOutlineUserAdd />
          </button>
          {profiles.length > 1 ? (
            <>
              <select
                className="text-slate-100 text-sm h-7 bg-slate-400 w-72 align-middle"
                value={selectedProfile}
                title="Adicionar Novo Perfil"
                onChange={profileChangeHandler}
              >
                {profiles.map((value, index) => (
                  <option key={index} value={index}>
                    {getProfileName(value)}
                  </option>
                ))}
              </select>
              <button
                className="px-1 text-center align-middle mr-1 hover:text-red-400"
                title="Deletar Perfil"
                onClick={deleteProfile}
              >
                <AiOutlineUserDelete />
              </button>
            </>
          ) : null}
        </div>
        Configuração
      </h2>
      <div className="border-2 border-slate-500 mb-2 p-2 bg-white overflow-auto">
        <Settings OnChange={onChangeSettingHandler} initialValues={settings} />
        <TableSettings OnChange={setMonth} initialValues={initialMonthData} />
      </div>

      <div className="flex lg:flex-row flex-col gap-2 items-stretch">
        <div>
          <h2 className="text-2xl font-bold text-slate-200 bg-slate-500 p-2">
            Preview:
          </h2>
          <div className="border-2 border-slate-500 mb-2 p-2 bg-white overflow-auto">
            <div className="all-initial">
              <div className="new-style">{returnHtml}</div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col">
          <h2 className="text-2xl font-bold text-slate-200 bg-slate-500 p-2">
            HTML:{" "}
            <button
              className="bg-slate-300 px-2 rounded-md text-sm text-slate-800 "
              onClick={() => {
                setCopied(true);
                navigator.clipboard.writeText(formattedHtml);
              }}
            >
              {copied ? "Copiado!" : "Copiar"}
            </button>
          </h2>
          <div className="border-2 border-slate-500 mb-2 p-2 h-full bg-white overflow-x-auto overflow-y-hidden">
            <textarea
              className="w-full lg:h-full h-96 border-slate-400 border-2 p-2 lg:resize-none"
              value={formattedHtml}
              disabled={true}
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
