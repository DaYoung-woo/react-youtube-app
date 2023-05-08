import "../assets/style/dark.scss";
import "../App.scss";
import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { api } from "../assets/axios";
import { useParams, useNavigate } from "react-router-dom";
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

function VideoList() {
  const [videoList, setVideoList] = useState([]);
  const { theme } = useTheme();
  const { keyword } = useParams();
  const navigate = useNavigate();

  function goDetail(e, id, channelId) {
    e.preventDefault();
    console.log(channelId)
    navigate(`/detail/${id}/${channelId}`);
  }

  useEffect(() => {
    if (keyword) {
      const param = {
        part: "snippet",
        type: "video",
        key: "AIzaSyACXoQ22yt8rGf9jcPqiLktxpcwPoMMyME",
        maxResults: 20,
        regionCode: "kr",
        q: keyword,
      };
      api.searchList(param).then(({ data }) => {
        setVideoList(data.items);
      });
    } else {
      const param = {
        part: "snippet",
        chart: "mostPopular",
        key: "AIzaSyACXoQ22yt8rGf9jcPqiLktxpcwPoMMyME",
        maxResults: 20,
        regionCode: "kr",
      };
      api.getList(param).then(({ data }) => {
        setVideoList(data.items);
      });
    }
  }, [keyword]);

  return (
    <div className={`AppBody ${theme}`}>
      <div className="VideoList inline-grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {videoList.map((el) => (
          <div
            className="VideoItem row-span-2"
            key={keyword ? el.id.videoId : el.id}
            onClick={(e) => goDetail(e, keyword ? el.id.videoId : el.id, keyword ? el.id.channelId : el.snippet.channelId)}
          >
            <img
              src={el.snippet.thumbnails.medium.url}
              alt={el.snippet.title}
            />
            <div className="VideoTitle">
              <h4>{el.snippet.title}</h4>
              <h6>{el.snippet.channelTitle}</h6>
              <h6>{calculateDate(el.snippet.publishedAt)}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoList;
