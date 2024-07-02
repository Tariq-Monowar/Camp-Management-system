import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { SuperAdminAuthProvider } from "./context/superAdminAuth.jsx";
import { CampProvider } from "./context/CampManagement.jsx";

if (process.env.NODE_ENV !== "development") {
  console.log = () => {};
  console.debug = () => {};
  console.warn= () => {};
  console.error = () => {};
  console.assert = () => {};
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SuperAdminAuthProvider>
        <CampProvider>
          <App />
        </CampProvider>
      </SuperAdminAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
