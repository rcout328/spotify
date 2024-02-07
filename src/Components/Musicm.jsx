import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactAudioPlayer from "react-audio-player";

const Musicm = () => {
  const [music, setMusic] = useState(null);
  const { _mid } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrackData = async () => {
      const clientId = "2faf64caa82f4690a4a382f588de0616";
      const clientSecret = "f4e31ed9ab1b4ad2a9cc2a5d04959d5a";
      const tokenEndpoint = "https://accounts.spotify.com/api/token";
      const apiEndpoint = `https://api.spotify.com/v1/tracks/${_mid}`;

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
        const trackData = await apiResponse.json();
        setMusic(trackData);
      } else {
        console.error("Error fetching track data");
      }

      setLoading(false);
    };

    fetchTrackData();
  }, [_mid]);

  return (
    <div className="bg-green-500 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <Link
          to={`/`}
          className="text-green-500 hover:underline mb-4 block text-sm"
        >
          &lt; Back to Playlist
        </Link>
        {loading ? (
          <p className="text-center text-xl font-semibold text-gray-800">
            Loading...
          </p>
        ) : music ? (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {music.name}
            </h2>
            <p className="text-gray-600">
              Artist: {music.artists.map((artist) => artist.name).join(", ")}
            </p>
            <p className="text-gray-600">Album: {music.album.name}</p>
            <p className="text-gray-600">
              Release Date: {music.album.release_date}
            </p>
            <p className="text-gray-600">Popularity: {music.popularity}</p>
            <img
              src={music.album.images[0].url}
              alt={music.name}
              className="mx-auto my-8 rounded-lg shadow-lg"
              width={300}
              height={300}
            />
            <ReactAudioPlayer src={music.preview_url} autoPlay controls />
          </div>
        ) : (
          <p className="text-center text-red-500 text-xl font-semibold">
            Error loading track data
          </p>
        )}
      </div>
    </div>
  );
};

export default Musicm;
