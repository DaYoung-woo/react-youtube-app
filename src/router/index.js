import { createBrowserRouter } from "react-router-dom";

import VideoList from "../views/VideoList";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <VideoList />,
  },
]);
