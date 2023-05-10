import "./App.scss";
import React, { useState } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const dayjs = require("dayjs");

function calculateDate(date) {
  if (dayjs(date).diff(dayjs(), "year") < 0) {
    return `${dayjs(date).diff(dayjs(), "year") * -1}년 전`;
  } else if (dayjs(date).diff(dayjs(), "month") < 0) {
    return `${dayjs(date).diff(dayjs(), "month") * -1}달 전`;
  } else if (dayjs(date).diff(dayjs(), "day") < 0) {
    return `${dayjs(date).diff(dayjs(), "day") * -1}일 전`;
  } else if (dayjs(date).diff(dayjs(), "hour") < 0) {
    return `${dayjs(date).diff(dayjs(), "hour") * -1}시간 전`;
  } else if (dayjs(date).diff(dayjs(), "minute") < 0) {
    return `${dayjs(date).diff(dayjs(), "minute") * -1}분 전`;
  } else if (dayjs(date).diff(dayjs(), "second") < 0) {
    return `${dayjs(date).diff(dayjs(), "second") * -1}초 전`;
  }
}

function App() {
  const [keyword, setKeyword] = useState("");
  const setAppKeyword = (search) => {
    setKeyword(search);
  };
  return (
    <div className="App">
      <Header keyword={keyword} setAppKeyword={setAppKeyword} />
      <Outlet context={{ keyword, calculateDate }}/>
    </div>
  );
}

export default App;
