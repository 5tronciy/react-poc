import "./wdyr";
import * as React from "react";
import { render } from "react-dom";
import App from "./App/App";
import "./index.less";

const styleLink: HTMLLinkElement = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
    "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

render(<App />, document.body);
