import "../assets/style/dark.scss";
import "../App.scss";
import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { api } from "../assets/axios";
import { useNavigate, useOutletContext } from "react-router-dom";

function VideoList() {
  const [videoList, setVideoList] = useState([]);
  const { keyword, calculateDate } = useOutletContext();
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  function goDetail(e, id, channelId) {
    e.preventDefault();
    navigate(`/detail/${id}/${channelId}`);
  }

  useEffect(() => {
    if (keyword) {
      const param = {
        part: "snippet",
        type: "video",
        key: process.env.REACT_APP_YOUTUBE_KEY,
        maxResults: 20,
        regionCode: "kr",
        q: keyword,
      };
      api.searchList(param).then(({ data }) => {
        setVideoList(
          data.items.map((el) => {
            return {
              id: el.id.videoId,
              channelId: el.snippet.channelId,
              url: el.snippet.thumbnails.medium.url,
              title: el.snippet.title,
              channelTitle: el.snippet.channelTitle,
              publishedAt: calculateDate(el.snippet.publishedAt),
            };
          })
        );
      });
    } else {
      const param = {
        part: "snippet",
        chart: "mostPopular",
        key: process.env.REACT_APP_YOUTUBE_KEY,
        maxResults: 20,
        regionCode: "kr",
      };
      api.getList(param).then(({ data }) => {
        setVideoList(
          data.items.map((el) => {
            return {
              id: el.id,
              channelId: el.snippet.channelId,
              url: el.snippet.thumbnails.medium.url,
              title: el.snippet.title,
              channelTitle: el.snippet.channelTitle,
              publishedAt: calculateDate(el.snippet.publishedAt),
            };
          })
        );
      });
    }
  }, [keyword]);

  return (
    <div className={`AppBody ${theme}`}>
      <div className="VideoList inline-grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {videoList.map((el) => (
          <div
            className="VideoItem row-span-2"
            key={el.id}
            onClick={(e) => goDetail(e, el.id, el.channelId)}
          >
            <img src={el.url} alt={el.title} />
            <div className="VideoTitle">
              <h4>{el.title}</h4>
              <h6>{el.channelTitle}</h6>
              <h6>{el.publishedAt}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoList;
