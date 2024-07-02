import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

import { CampProvider } from "./context/CampManagement.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CampProvider>
        <App />
      </CampProvider>
    </BrowserRouter>
  </React.StrictMode>
);
