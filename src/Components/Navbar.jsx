import { UserButton } from "@clerk/clerk-react";
import { useContext } from "react";
import { DarkContext } from "./Context/DarkProvider";
import { Link } from "react-router-dom";
const NavBar = () => {
  const [dark, setDark] = useContext(DarkContext);

  const toggle = () => {
    setDark(!dark);
  };
  return (
    <div
      className={`h-full flex flex-row ${
        dark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <img
        src="https://imagetolink.com/ib/NbIgjDZFS8.png"
        height={100}
        width={60}
        className="mt-5 ml-5 mb-3"
      />
      <ul className="absolute top-0 right-0 flex flex-row mr-10 gap-4 text-xl mt-7 ">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>
        <button onClick={toggle}>{dark ? "Light" : "Dark"}</button>
        <div className="flex items-center space-x-4">
          <UserButton
            className="text-green-500 hover:text-green-700 cursor-pointer "
            showAvatar={false} // Set to true if you want to display the user's avatar
            showName={false} // Set to true if you want to display the user's name
          />
        </div>
      </ul>
    </div>
  );
};

export default NavBar;
