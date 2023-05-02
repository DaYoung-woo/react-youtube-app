import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import VideoList from "../views/VideoList";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <VideoList />,
  },
  {
    path: "/app",
    element: <App />,
  },
]);
