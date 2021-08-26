import React from "react";
import ReactDOM from "react-dom";
import App from "./src/App/App.jsx";

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

ReactDOM.render(<App />, document.body);
