import React from "react";
import ReactDOM from "react-dom/client";
import "./App.scss";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  </React.StrictMode>
);
