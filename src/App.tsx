import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import DaysTable from "./DaysTable";
import ReactDOMServer from "react-dom/server";
import prettier from "prettier/standalone";
import htmlParser from "prettier/parser-html";
import Settings from "./Settings";
import HeaderTable from "./HeaderTable";
import { FreqData } from "./interfaces";

function App() {
  const initialSettings = {
    servidor: "",
    cargo: "",
    funcao: "N/C",
    horario: "",
    jornada: "40 horas",
    lotacao: "Campus Canindé",
    setor: "",
    matricula: "",
  };
  const [settings, setSettings] = useState<FreqData>(initialSettings);
  const [count, setCount] = useState(0);
  const returnHtml = (
    <>
      <HeaderTable {...settings} />
      <DaysTable />
    </>
  );
  const htmlString = ReactDOMServer.renderToString(returnHtml);
  const formattedHtml = prettier.format(htmlString, {
    parser: "html",
    plugins: [htmlParser],
  });

  return (
    <div className="App">
      <h2>Configuração</h2>
      <Settings OnChange={setSettings} initialValues={initialSettings} />
      <h2>Preview:</h2>
      <div className="all-initial">
        <div>{returnHtml}</div>
      </div>
      <h2>HTML:</h2>
      <textarea
        style={{ width: "100%", height: "30em" }}
        value={formattedHtml}
      />
    </div>
  );
}

export default App;
