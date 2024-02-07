import { Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

const NavBar = () => {
  return (
    <nav className="bg-white p-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-green-500 font-bold text-4xl">
        Spotify
      </Link>
      <div className="flex space-x-4">
        <Link to="/" className="text-green-500 hover:text-green-700">
          Home
        </Link>

        <Link to="/search" className="text-green-500 hover:text-green-700">
          Search
        </Link>

        {/* Add more navigation links as needed */}

        <div className="flex items-center space-x-4">
          <UserButton
            className="text-green-500 hover:text-green-700 cursor-pointer"
            showAvatar={false} // Set to true if you want to display the user's avatar
            showName={false} // Set to true if you want to display the user's name
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
