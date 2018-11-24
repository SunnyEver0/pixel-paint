import "./index.css";

import * as serviceWorker from "./serviceWorker";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

const experiment = (/experiment=(\w+)/.exec(window.location.search) || [])[1];
ReactDOM.render(
  <App experiment={experiment} />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
