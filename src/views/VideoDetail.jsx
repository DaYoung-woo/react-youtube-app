import React, { useEffect, useState } from "react";
import { api } from "../assets/axios/index";
import { useTheme } from "../context/ThemeContext";
import { useParams } from "react-router-dom";

function VideoDetail() {
  const { id, channelId } = useParams();
  const { theme } = useTheme();
  const [video, setVideo] = useState([]);
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


  return <div className={`AppBody ${theme}`}>
    <div className="VideoDetail flex flex-row">
      <div className="basis-full md:basis-2/3">
        <iframe title={id} id={id} type="text/html"  src={`https://www.youtube.com/embed/${id}`} frameBorder="0" allowFullScreen ></iframe>

        <div>
        {video.map(el => el.snippet.title)}
        </div>
        
        {
          channel.map(el => {
            return(
              <div className="flex" key={el.id}>
                <img src={el.snippet.thumbnails.default.url} alt="channelthumb" maxWidth="50px" />
                <span>{el.snippet.title}</span>
              </div>
            )
          })
        }
        
      </div>
      <div className="basis-full md:basis-1/3">
      </div>
    </div>
  </div>;
}

export default VideoDetail;
