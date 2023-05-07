import axios from "axios";
//process.env.REACT_APP_SERVICE_VERSION

function makeUrlParam(param) {
  let urlParam = "?";
  Object.keys(param).forEach((el) => {
    urlParam += `${el}=${param[el]}&`;
  });
  return urlParam;
}
const instance = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
});

//

export const api = {
  getList: (param) => {
    return instance.get(`/videos${makeUrlParam(param)}`);
  },
  searchList: (param) => {
    return instance.get(`/search${makeUrlParam(param)}`);
  },
};
