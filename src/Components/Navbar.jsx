import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="p-4 flex justify-between items-center bg-white">
      <Link to="/" className="text-green-500 font-bold text-4xl">
        Spotify
      </Link>
      <div className="flex space-x-4 ">
        <Link to="/" className="text-green-500">
          Home
        </Link>
        <Link to="/browse" className="text-green-500">
          Browse
        </Link>
        <Link to="/search" className="text-green-500">
          Search
        </Link>
        {/* Add more navigation links as needed */}
      </div>
    </nav>
  );
};

export default NavBar;
