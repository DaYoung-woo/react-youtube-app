import React, { useEffect } from "react";
import { api } from "../assets/axios/index";
import { useTheme } from "../context/ThemeContext";
import { useParams } from "react-router-dom";

function VideoDetail() {
  const { id } = useParams();
  const { theme } = useTheme();

  useEffect(() => {
    const param = {
      part: "snippet",
      videoId: id,
      key: "AIzaSyACXoQ22yt8rGf9jcPqiLktxpcwPoMMyME",
    };
    api.getCommentList(param).then((data) => {
      console.log(data);
    });
  }, [id]);
  return <div className={`AppBody ${theme}`}>{id}</div>;
}

export default VideoDetail;
