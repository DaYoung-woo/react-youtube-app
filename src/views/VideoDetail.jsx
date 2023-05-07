import React from "react";
import "../assets/style/dark.scss";
import "../App.scss";
import { useTheme } from "../context/ThemeContext";
import { useParams } from "react-router-dom";

function VideoDetail() {
  const { id } = useParams();
  const { theme } = useTheme();

  return <div className={`AppBody ${theme}`}>{id}</div>;
}

export default VideoDetail;
