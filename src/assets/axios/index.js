import axios from "axios";
//process.env.REACT_APP_SERVICE_VERSION
const instance = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
});

export const api = {
  getList: (param) => {
    return instance.get(
      "/videos/?part=player&chart=mostPopular&key=AIzaSyACXoQ22yt8rGf9jcPqiLktxpcwPoMMyME",
      param
    );
  },
};
