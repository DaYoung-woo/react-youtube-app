import "../App.scss";
import { api } from "../assets/axios";
import { useEffect, useState } from "react";

function VideoList() {
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    api.getList().then((res) => {
      console.log(res);
      setVideoList(res);
      console.log(videoList);
    });
  }, []);
  return (
    <div className="Video-list">
      <div></div>
    </div>
  );
}

export default VideoList;
