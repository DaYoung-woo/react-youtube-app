import React, { useEffect, useState } from "react";
import { api } from "../assets/axios/index";
import { useTheme } from "../context/ThemeContext";
import { useParams } from "react-router-dom";

function VideoDetail() {
  const { id, channelId } = useParams();
  const { theme } = useTheme();
  const [video, setVideo] = useState([]);
  const [recomendList, setRecomendList] = useState([]);
  const [channel, setChannel] = useState([]);

  useEffect(() => {
    const param = {
      part: "snippet",
      id,
      key: "AIzaSyACXoQ22yt8rGf9jcPqiLktxpcwPoMMyME",
      maxResults: 20,
      regionCode: "kr",
    };
    api.getList(param).then(({ data }) => {
      setVideo(data.items);
    });
    const param2 = {
      part: "snippet",
      relatedToVideoId: id,
      key: "AIzaSyACXoQ22yt8rGf9jcPqiLktxpcwPoMMyME",
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
      key: "AIzaSyACXoQ22yt8rGf9jcPqiLktxpcwPoMMyME",
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
                <div className="flex items-center">
                  <img
                    src={el.snippet.thumbnails.default.url}
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
        <div className="lg:basis-1/3 xl:basis-1/4 2xl:basis-1/4">
          {recomendList.map((el) => {
            return (
              <div className="RecomendList" key={el.id.videoId}>
                <img
                  src={el.snippet.thumbnails.default.url}
                  alt={el.snippet.title}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default VideoDetail;
