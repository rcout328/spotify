import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { DarkContext } from "./Context/DarkProvider";

const PlaylistPage = () => {
  const [playlist, setPlaylist] = useState(null);
  const { playlistId } = useParams();
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useContext(DarkContext);
  useEffect(() => {
    const fetchPlaylistData = async () => {
      const clientId = "2faf64caa82f4690a4a382f588de0616";
      const clientSecret = "f4e31ed9ab1b4ad2a9cc2a5d04959d5a";
      const tokenEndpoint = "https://accounts.spotify.com/api/token";
      const apiEndpoint = `https://api.spotify.com/v1/playlists/${playlistId}`;

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

      if (apiResponse.ok) {
        const playlistData = await apiResponse.json();
        setPlaylist(playlistData);
      } else {
        console.error("Error fetching playlist data");
      }

      setLoading(false);
    };

    fetchPlaylistData();
  }, [playlistId]);

  return (
    <div
      className={`min-h-screen ${
        dark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div
        className={`container mx-auto p-8 hover:shadow-lg transition duration-300 ${
          dark ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <Link
          to="/"
          className={`${dark ? "text-white" : "text-black"} mb-4 block`}
        >
          {/* Back Button */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="inline-block w-5 h-5 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Home
        </Link>
        {loading ? (
          <p className={`${dark ? "text-white" : "text-black"} `}>Loading...</p>
        ) : playlist ? (
          <div>
            <div className="mb-8">
              <img
                src={playlist.images[0].url}
                alt={playlist.name}
                className="w-full h-64 object-cover rounded-md shadow-md"
              />
            </div>
            <h1
              className={`text-3xl font-bold ${
                dark ? "text-white" : "text-black"
              } mb-4`}
            >
              {playlist.name}
            </h1>
            <p className={`text-sm ${dark ? "text-white" : "text-black"} mb-6`}>
              {playlist.description}
            </p>

            <h2 className="text-xl font-semibold text-white mb-2">Tracks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {playlist.tracks.items.map((item, index) => (
                <Link to={`/track/${item.track.id}`} key={index}>
                  <div className="bg-white p-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105">
                    <img
                      src={item.track.album.images[0].url}
                      alt={item.track.name}
                      className="w-full h-40 object-cover rounded-md mb-4"
                    />
                    <h3 className="text-md font-semibold text-gray-800">
                      {item.track.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {item.track.artists[0].name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-white">Error loading playlist data</p>
        )}
      </div>
    </div>
  );
};

export default PlaylistPage;
