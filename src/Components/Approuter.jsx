import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Playlists from "./Playlists";
import Mainmusic from "./Mainmusic";
import Search from "./Search";

import Musicm from "./Musicm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/playlist/:playlistId",
    element: <Playlists />,
  },
  {
    path: "/track/:_musicId",
    element: <Mainmusic />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/songdetails/:_mid",
    element: <Musicm />,
  },
]);
const Approuter = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default Approuter;
