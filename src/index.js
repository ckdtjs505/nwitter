import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { firebase, analytics } from "./firebase";

console.log(firebase, analytics);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
