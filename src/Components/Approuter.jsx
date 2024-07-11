import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Playlists from "./Playlists";
import Mainmusic from "./Mainmusic";
import Search from "./Search";
import { Link } from "react-router-dom";
import Musicm from "./Musicm";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import NavBar from "./Navbar";
import NavBar1 from "./Navbar1";
import DarkProvider from "./Context/DarkProvider";
import SS from "./ss";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <SignedOut>
          <NavBar1 />
        </SignedOut>
        <SignedIn>
          <NavBar />
        </SignedIn>
        <Home />
      </div>
    ),
  },
  {
    path: "/playlist/:playlistId",
    element: (
      <div>
        <SignedOut>
          <Link to="/" className="absolute top-4 left-4 text-white text-lg">
            Back
          </Link>
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-red-500 text-white p-8 text-center">
            <h1 className="text-3xl mb-6">Sign in please</h1>
            <SignInButton
              className="bg-green-500 text-white py-2 px-4 rounded-full text-lg hover:bg-red-600 cursor-pointer"
              buttonText="Sign In"
            />
          </div>
        </SignedOut>
        <SignedIn>
          <Playlists />
        </SignedIn>
      </div>
    ),
  },
  {
    path: "/track/:_musicId",
    element: (
      <div>
        <SignedOut>
          <Link to="/" className="absolute top-4 left-4 text-white text-lg">
            Back
          </Link>
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-red-500 text-white p-8 text-center">
            <h1 className="text-3xl mb-6">Sign in please</h1>
            <SignInButton
              className="bg-green-500 text-white py-2 px-4 rounded-full text-lg hover:bg-red-600 cursor-pointer"
              buttonText="Sign In"
            />
          </div>
        </SignedOut>
        <SignedIn>
          <Mainmusic />
        </SignedIn>
      </div>
    ),
  },
  {
    path: "/search",
    element: (
      <div>
        <SignedOut>
          <NavBar1 />
        </SignedOut>
        <SignedIn>
          <NavBar />
        </SignedIn>
        <Search />
      </div>
    ),
  },
  {
    path: "/songdetails/:_mid",
    element: (
      <div>
        <SignedOut>
          <Link to="/" className="absolute top-4 left-4 text-white text-lg">
            Back
          </Link>
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-bg-green-500 text-white p-8 text-center">
            <h1 className="text-3xl mb-6">Sign in please</h1>
            <SignInButton
              className="bg-green-500 text-white py-2 px-4 rounded-full text-lg hover:bg-red-600 cursor-pointer"
              buttonText="Sign In"
            />
          </div>
        </SignedOut>
        <SignedIn>
          <Musicm />
        </SignedIn>
      </div>
    ),
  },
  {
    path: "/sss",
    element: <SS />,
  },
]);
const Approuter = () => {
  return (
    <div>
      <DarkProvider>
        <RouterProvider router={router} />
      </DarkProvider>
    </div>
  );
};

export default Approuter;
