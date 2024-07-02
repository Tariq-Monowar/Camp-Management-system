import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RegimentProvider } from "./context/RegimentContext.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <RegimentProvider>
        <App />
      </RegimentProvider>
    </BrowserRouter>
  </React.StrictMode>
);
