import React from "react";
import ReactDOM from "react-dom";
import Snake from "./app";
import "./styles.css";


const App = () => (
  <div>
    <Snake />
  </div>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
