import { Link } from "react-router-dom";
import { SignInButton } from "@clerk/clerk-react";

const NavBar1 = () => {
  return (
    <nav className="p-4 flex justify-between items-center bg-white">
      <Link to="/" className="text-green-500 font-bold text-4xl">
        Spotify
      </Link>
      <div className="flex space-x-4 ">
        <Link to="/" className="text-green-500">
          Home
        </Link>

        <Link to="/search" className="text-green-500">
          Search
        </Link>
        <Link to="/sss" className="text-green-500">
          Searc111
        </Link>
        <SignInButton />
      </div>
    </nav>
  );
};

export default NavBar1;
