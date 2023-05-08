import { createBrowserRouter } from "react-router-dom";
import VideoList from "../views/VideoList";
import VideoDetail from "../views/VideoDetail";
import App from "../App";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: ":keyword?",
        element: <VideoList />,
      },
      {
        path: "",
        element: <VideoList />,
      },
      {
        path: "detail/:id/:channelId",
        element: <VideoDetail />,
      },
    ],
  },
]);
