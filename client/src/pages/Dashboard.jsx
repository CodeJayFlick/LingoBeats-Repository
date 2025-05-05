import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../config";

export default function Dashboard() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState({
    isGuest: true,
    username: "",
  });
  const [userScores, setUserScores] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth status and fetch scores
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    console.log("Auth check - Token:", token, "Username:", username); // Add this line

    if (token && username) {
      setUser({ isGuest: false, username });
      fetchUserScores(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserScores = async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/user/scores`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("API Response:", data); // Add this line
      setUserScores(data);
    } catch (error) {
      if (user.isGuest) {
        window.location.href = "/";
      }
      console.error("Error fetching scores:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateSongAverage = (songTitle) => {
    if (user.isGuest || !userScores) return "-";

    const quiz = userScores.find((q) => q.name === songTitle);
    if (!quiz || !quiz.scores || quiz.scores.length === 0) return "-";

    const sum = quiz.scores.reduce((acc, score) => acc + score, 0);
    const average = sum / quiz.scores.length;

    return Math.round(average); // Return percentage rounded to nearest integer
  };
  const calculateCategoryAverage = (songs) => {
    if (user.isGuest || !userScores) return "-";

    let total = 0;
    let count = 0;

    songs.forEach((song) => {
      const avg = calculateSongAverage(song.title);
      if (avg !== "-" && !isNaN(avg)) {
        total += avg;
        count++;
      }
    });

    // Calculate percentage for category
    return count > 0 ? Math.round(total / count) : "-";
  };

  // Song lists data (without hardcoded scores)
  const songLists = {
    easy: [
      {
        title: "Caballito Blanco",
        artist: "Joel Valle",
        length: "1:14",
        path: "/caballito_blanco.mp4",
      },
      {
        title: "Tingalayo",
        artist: "Daria",
        length: "2:16",
        path: "/tingalayo.mp4",
      },
      {
        title: "Lluvia - Lluvia - Canciones Infantiles",
        artist: "Various",
        length: "1:45",
        path: "/Canción_infantil_de_la_lluvia_para_niños_y_bebés.mp4",
      },
      {
        title: "Humpty Dumpty",
        artist: "Traditional",
        length: "1:10",
        path: "/humpty_dumpty.mp4",
      },
      {
        title: "Un Elefante Se Balanceaba",
        artist: "Traditional",
        length: "1:30",
        path: "/un_elephante_se_balanceaba.mp4",
      },
    ],
    medium: [
      {
        title: "De Colores",
        artist: "Traditional",
        length: "2:30",
        path: "/decolores.mp4",
      },
      {
        title: "El Barquito Chiquitito",
        artist: "Traditional",
        length: "1:55",
        path: "/barquito.mp4",
      },
      {
        title: "La Gallina Turuleca",
        artist: "Traditional",
        length: "2:15",
        path: "/gallina.mp4",
      },
      {
        title: "Mambru Se Fue A La Guerra",
        artist: "Traditional",
        length: "2:45",
        path: "/mambru.mp4",
      },
      {
        title: "Mi Burrito Sabanero",
        artist: "Traditional",
        length: "3:05",
        path: "/Mi_Burrito_Sabanero.mp4",
      },
    ],
    hard: [
      {
        title: "A La Loco",
        artist: "Mila Egred",
        length: "2:31",
        path: "/a_la_loco.mp4",
      },
      {
        title: "Vuela Libre",
        artist: "Jerry Rivera",
        length: "4:47",
        path: "/vuela_libre.mp4",
      },
      {
        title: "Enloquecer",
        artist: "Various",
        length: "3:45",
        path: "/enloquecer.mp4",
      },
      {
        title: "Mamacita",
        artist: "Mike Leite",
        length: "3:14",
        path: "/Mamacita.mp4",
      },
      {
        title: "Tengo Una Muñeca Vestida de Azúl",
        artist: "Toycantado",
        length: "1:06",
        path: "/tengo_una_muneca_vestida_de_azul.mp4",
      },
    ],
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser({
      isGuest: true,
      username: "",
    });
    window.location.reload();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-dropdown")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 p-8">
      {/* User Dropdown */}
      <div className="absolute top-4 right-4 user-dropdown">
        {user.isGuest ? (
          <Link
            to="/"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Log In
          </Link>
        ) : (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-800 font-bold hover:bg-gray-200 transition cursor-pointer"
            >
              {user.username.charAt(0).toUpperCase()}
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-t-lg"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-b-lg"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          {user.isGuest ? "Guest's Dashboard" : `${user.username}'s Dashboard`}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["easy", "medium", "hard"].map((difficulty) => (
            <div key={difficulty}>
              <h2 className="text-2xl font-bold text-white mb-4 capitalize">
                {difficulty}{" "}
                <span className="text-lg">
                  Avg. Score: {calculateCategoryAverage(songLists[difficulty])}%
                </span>
              </h2>
              <div className="space-y-4">
                {songLists[difficulty].map((song) => (
                  <SongCard
                    key={song.title}
                    song={song}
                    score={calculateSongAverage(song.title)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SongCard({ song, score }) {
  return (
    <div
      className={`p-4 rounded-lg shadow-lg ${
        score === "-"
          ? "bg-gray-100"
          : score >= 90
          ? "bg-green-100"
          : "bg-gray-100"
      }`}
    >
      <Link
        to="/musicplayer"
        state={song}
        className="w-full text-left font-bold text-gray-800 hover:underline focus:outline-none"
      >
        {song.title}
      </Link>
      <p className="text-sm italic text-gray-600">{song.artist}</p>
      <p className="text-sm text-gray-600">{song.length}</p>
      <p className="text-sm text-gray-600">Score: {score}%</p>
      <Link to="/quiz" state={song}>
        <button className="mt-2 w-full bg-blue-500 text-white py-1 rounded-lg hover:bg-blue-600 transition">
          Take Quiz
        </button>
      </Link>
    </div>
  );
}
