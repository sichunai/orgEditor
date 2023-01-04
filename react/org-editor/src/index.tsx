import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter, Link } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import OrgEditor from "./components/OrgEditor";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <div className="nav">
      <Link to="">Home</Link>
      <span className="separator"> | </span>
      <Link to="/orgEditor">Org Editor</Link>
    </div>
    <Routes>
      <Route path="" element={<App />} />
      <Route path="/orgEditor" element={<OrgEditor />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
