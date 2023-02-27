import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import DaysTable from "./DaysTable";
import ReactDOMServer from "react-dom/server";
import prettier from "prettier/standalone";
import htmlParser from "prettier/parser-html";

function App() {
  const [count, setCount] = useState(0);
  const htmlString = ReactDOMServer.renderToString(<DaysTable />);
  const formattedHtml = prettier.format(htmlString, {
    parser: "html",
    plugins: [htmlParser],
  });
  return (
    <div className="App">
      <h2>Preview:</h2>
      <DaysTable></DaysTable>
      <h2>HTML:</h2>
      <textarea style={{ width: "100%", height: "30em" }}>
        {formattedHtml}
      </textarea>
    </div>
  );
}

export default App;
