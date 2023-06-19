import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createGlobalStyle } from "styled-components";
import SBST from "./assets/fonts/SBSansText/SBSansText.ttf";
import SBSI from "./assets/fonts/SB Sans Interface/SBSansInterface.ttf";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./reducer/store";

const Global = createGlobalStyle`
   @font-face {
    font-family: "SB Sans Text";
    src: url(${SBST}) format("truetype");
  }

  @font-face {
    font-family: 'SB Sans Interface';
    src: url(${SBSI}) format("truetype");
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "SB Sans Text Mono", sans-serif;
  }

  body {
    background: #F4F4F5
  }
`;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Global />
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
