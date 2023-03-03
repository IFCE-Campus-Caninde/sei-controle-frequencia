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
      <div className="border-2 border-slate-500 mb-2 p-2 bg-white dark:bg-slate-800 overflow-auto">
        <Settings OnChange={onChangeSettingHandler} initialValues={settings} />
        <TableSettings OnChange={setMonth} initialValues={initialMonthData} />
      </div>

      <div className="flex lg:flex-row flex-col gap-2 items-stretch">
        <div>
          <h2 className="text-2xl font-bold text-slate-200 bg-slate-500 p-2">
            Preview:
          </h2>
          <div className="border-2 border-slate-500 mb-2 p-2 bg-white dark:bg-slate-800 overflow-auto">
            <div className="all-initial">
              <div className="new-style preview">{returnHtml}</div>
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
          <div className="border-2 border-slate-500 mb-2 p-2 h-full bg-white dark:bg-slate-800 overflow-x-auto overflow-y-hidden">
            <textarea
              className="w-full lg:h-full h-96 border-slate-400 dark:text-slate-200 dark:bg-slate-600 border-2 p-2 lg:resize-none"
              value={formattedHtml}
              disabled={true}
            />
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-slate-200 bg-slate-500 p-2">
        Informações
      </h2>
      <div className="border-2 border-slate-500 mb-2 p-2 bg-white dark:bg-slate-800 overflow-auto flex justify-center">
        <div className="prose dark:prose-invert text-left">
          <p>
            Este app tem o objetivo de facilitar a tarefa manual repetitiva de
            gerar as tabelas de frequência usada pelo IFCE, além de
            automaticamente marcar os finais de semana corretamente.
          </p>
          <h4>O modo mais comum de uso é:</h4>
          <ol>
            <li>
              Preencher os dados na seção <code>Configuração</code>.
            </li>
            <li>Selecionar o mês e ano.</li>
            <li>Copiar o código HTML gerado</li>
            <li>
              Colar no documento do SEI (no modo "Código Fonte").
              <ul>
                <li>
                  Recomenda-se substituir toda a tabela do modelo do SEI, que
                  seria todo o código compreendendo <code>{"<table>"}</code> e{" "}
                  <code>{"</table>"}</code>.
                </li>
              </ul>
            </li>
          </ol>
          <h4>Mais informações:</h4>
          <ul className="">
            <li>
              Você pode usar o botão <AiOutlineUserAdd className="inline m-0" />{" "}
              para adicionar outro perfil e o botão{" "}
              <AiOutlineUserDelete className="inline-block m-0" /> para remover
              um perfil, isso pode ser útil se você precisar gerar tabelas para
              diferentes servidores com frequência.
            </li>
            <li>
              Os dados são armazenados localmente no navegador e não são
              enviados para servidores externos.
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="prose dark:prose-invert">
          Feito com ❤️ por Carlos Alberto Castelo @ IFCE <em>Campus</em> Canindé
          (
          <a href="https://github.com/IFCE-Campus-Caninde/sei-controle-frequencia">
            github
          </a>
          )
        </div>
      </div>
    </div>
  );
}

export default App;
