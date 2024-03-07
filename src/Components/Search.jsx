import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { DarkContext } from "./Context/DarkProvider";

const Search = () => {
  // State variables
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");
  const [speechRecognition, setSpeechRecognition] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [showListeningPopup, setShowListeningPopup] = useState(false);
  const [dark] = useContext(DarkContext);

  // Fetch data from Spotify based on the search query
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Spotify API details
        const clientId = "your_client_id";
        const clientSecret = "your_client_secret";
        const tokenEndpoint = "https://accounts.spotify.com/api/token";
        const apiEndpoint = "https://api.spotify.com/v1/search";

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

        const params = new URLSearchParams({
          q: search,
          type: "track",
          market: "ES",
          limit: 10,
          offset: 5,
          include_external: "audio",
        });

        // Fetch Spotify data using the access token and search parameters
        const response = await fetch(`${apiEndpoint}?${params.toString()}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSongs(data.tracks.items);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error in the fetch operation", error);
      }
    };

    if (search) {
      fetchData();
    }
  }, [search]);

  // Initialize speech recognition
  useEffect(() => {
    const initializeSpeechRecognition = () => {
      const recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition ||
        window.mozSpeechRecognition ||
        window.msSpeechRecognition)();

      recognition.lang = "en-US";
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
        setShowListeningPopup(true);
      };

      recognition.onresult = (event) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            transcript += event.results[i][0].transcript;
          } else {
            transcript += event.results[i][0].transcript + " ";
          }
        }
        setSearch(transcript);
      };

      recognition.onend = () => {
        setIsListening(false);
        setShowListeningPopup(false);
      };

      recognition.onerror = (err) => {
        console.log("Error: ", err);
        alert(
          "Boss! You're not allowed to use this feature. Please allow voice permission"
        );
      };

      setSpeechRecognition(recognition);
    };

    initializeSpeechRecognition();
  }, []);

  // Handle voice button click
  const handleVoiceButtonClick = () => {
    if (!isListening) {
      speechRecognition.start();
    } else {
      speechRecognition.stop();
    }
  };

  return (
    <div className={` ${dark ? "bg-black" : "bg-white"} min-h-screen`}>
      <div className="container mx-auto p-8">
        <div className="relative">
          {/* Search input */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for songs..."
            className="w-full px-4 py-2 rounded-md border-none shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {/* Search icon */}
          <FaSearch className="absolute right-3 top-3 text-gray-500" />
        </div>

        {/* Voice search button */}
        <div className="flex justify-center items-center">
          <button
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md flex items-center justify-center"
            onClick={handleVoiceButtonClick}
          >
            {isListening ? "Stop Listening" : "Start Listening"}
          </button>
        </div>

        {/* Listening popup */}
        {showListeningPopup && (
          <div className="listening-popup">
            <p>Listening...</p>
            <p>User said: {search}</p>
          </div>
        )}

        {/* Display the songs information */}
        {songs.length > 0 && (
          <div className="mt-8 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {songs.map((song, index) => (
              <Link to={`/songdetails/${song.id}`} key={index}>
                <div className="bg-white p-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105">
                  {/* Song details */}
                  <img
                    src={song.album.images[0].url}
                    alt={song.name}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {song.name}
                  </h2>
                  <p className="text-gray-600">
                    Artist:{" "}
                    {song.artists.map((artist) => artist.name).join(", ")}
                  </p>
                  {/* Add more song details as needed */}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
