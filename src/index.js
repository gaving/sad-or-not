import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { injectGlobal } from "styled-components";

ReactDOM.render(<App />, document.getElementById("root"));

injectGlobal`
  body {
    padding: 0;
    margin: 0;
    font-family: cursive;
  }
`;
