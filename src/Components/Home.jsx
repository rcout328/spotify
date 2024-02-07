import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "./Navbar";

const Home = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpotifyData = async () => {
      const clientId = "2faf64caa82f4690a4a382f588de0616";
      const clientSecret = "f4e31ed9ab1b4ad2a9cc2a5d04959d5a";
      const tokenEndpoint = "https://accounts.spotify.com/api/token";
      const apiEndpoint =
        "https://api.spotify.com/v1/browse/featured-playlists";

      // Fetch access token
      const tokenResponse = await fetch(tokenEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        },
        body: "grant_type=client_credentials",
      });

      const tokenData = await tokenResponse.json();

      // Fetch Spotify data using the access token
      const apiResponse = await fetch(apiEndpoint, {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      });

      const apiData = await apiResponse.json();

      // Set the state with the fetched data
      setPlaylists(apiData.playlists.items);
      setLoading(false);
    };

    fetchSpotifyData();
  }, []);

  return (
    <div className="bg-green-500 min-h-screen">
      <NavBar />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-white mb-8">
          Featured Playlists
        </h1>

        {loading ? (
          <p className="text-white">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {playlists.map((playlist, index) => (
              <Link to={`/playlist/${playlist.id}`} key={index}>
                <div className="bg-white p-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105 hover:bg-gray-100">
                  <img
                    src={playlist.images[0].url}
                    alt={playlist.name}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <h2 className="text-lg font-semibold text-gray-800">
                    {playlist.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {playlist.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
