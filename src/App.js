import "./App.scss";
import React, { useState } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {
  const [keyword, setKeyword] = useState("");
  const setAppKeyword = (search) => {
    setKeyword(search);
  };
  return (
    <div className="App">
      <Header keyword={keyword} setAppKeyword={setAppKeyword} />
      <Outlet context={{ keyword }} />
    </div>
  );
}

export default App;
