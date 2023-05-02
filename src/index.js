import React from "react";
import ReactDOM from "react-dom/client";
import "./App.scss";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index";
import Header from "./components/Header";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="App">
      <Header />
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
