import React, { useEffect, useState } from "react";
import { api } from "../assets/axios/index";
import { useTheme } from "../context/ThemeContext";
import { useParams, useOutletContext } from "react-router-dom";

function VideoDetail() {
  
  const [video, setVideo] = useState([]);
  const [recomendList, setRecomendList] = useState([]);
  const [channel, setChannel] = useState([]);
  const { calculateDate } = useOutletContext();
  const { id, channelId } = useParams();
  const { theme } = useTheme();

  useEffect(() => {
    const param = {
      part: "snippet",
      id,
      key: process.env.REACT_APP_YOUTUBE_KEY,
      maxResults: 20,
      regionCode: "kr",
    };
    api.getList(param).then(({ data }) => {
      setVideo(data.items);
    });
    const param2 = {
      part: "snippet",
      relatedToVideoId: id,
      key: process.env.REACT_APP_YOUTUBE_KEY,
      maxResults: 20,
      type: "video",
    };
    api.searchList(param2).then(({ data }) => {
      setRecomendList(data.items);
    });
  }, [id]);

  useEffect(() => {
    const param = {
      part: "snippet",
      id: channelId,
      key: process.env.REACT_APP_YOUTUBE_KEY,
      maxResults: 20,
      regionCode: "kr",
    };
    api.getChannelList(param).then(({ data }) => {
      setChannel(data.items);
    });
  }, [channelId]);

  return (
    <div className={`AppBody ${theme}`}>
      <div className="VideoDetail lg:flex lg:flex-row">
        <div className="lg:basis-2/3 xl:basis-3/4 2xl:basis-3/4">
          <iframe
            title={id}
            id={id}
            type="text/html"
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder="0"
            allowFullScreen
          ></iframe>

          <div className="VideoTitle">
            {video.map((el) => el.snippet.title)}
          </div>

          {channel.map((el) => {
            return (
              <div key={el.id}>
                <div className="flex items-center mb-1">
                  <img
                    src={el.snippet.thumbnails.high.url}
                    alt="channelthumb"
                    maxwidth="50px"
                  />
                  <p>{el.snippet.title}</p>
                </div>

                <div className={`desc ${theme}`}>
                  {video.map((el) => {
                    return (
                      <div
                        key={el.snippet.description}
                        dangerouslySetInnerHTML={{
                          __html: el.snippet.description
                            .split("\n")
                            .join("<br/>"),
                        }}
                      ></div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="lg:basis-1/4 xl:basis-1/4 2xl:basis-1/4">
          <ul className="RecomendList">
          {recomendList.map((el) => {
            return (
              <li  key={el.id.videoId}>
                <img
                  src={el.snippet.thumbnails.standard.url}
                  alt={el.snippet.title}
                />
                <div className="VideoTitle RecomendDetail">
                  <h4>{el.snippet.title}</h4>
                  <h6>{el.snippet.channelTitle}</h6>
                  <h6>{calculateDate(el.snippet.publishedAt)}</h6>
                </div>
              </li>
            );
          })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default VideoDetail;
