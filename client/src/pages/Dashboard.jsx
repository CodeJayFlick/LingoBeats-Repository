import { Link } from "react-router-dom";

export default function Dashboard() {
  const songLists = {
    easy: [
      {
        title: "Caballito Blanco",
        artist: "Joel Valle",
        length: "1:14",
        score: 95,
        path: "/caballito_blanco.mp4", //Completed
      },
      {
        title: "Tingalayo",
        artist: "Daria",
        length: "2:16",
        score: 88,
        path: "/tingalayo.mp4", //Placeholder path
      },
      {
        title: "Un Elephante Se Balanceaba",
        artist: "Appuseries",
        length: "2:44",
        score: 90,
        path: "/un_elephante_se_balanceaba.mp4", // Completed
      },
      {
        title: "Canción infantil de la Lluvia Para Niños y Bebés",
        artist: "Nene León, cancion infantiles",
        length: "1:53",
        score: 85,
        path: "/cancioninfantil", //Placeholder path
      },
      {
        title: "Humpty Dumpty",
        artist: "The Countdown Kids",
        length: "1:35",
        score: 90,
        path: "", //Placeholder path
      },
    ],
    medium: [
      {
        title: "A La Loco",
        artist: "Mila Egred",
        length: "2:31",
        score: 82,
        path: "/a_la_loco.mp4", //Placeholder Path
      },
      {
        title: "De Colores",
        artist: "Joan Baez",
        length: "2:26",
        score: 76,
        path: "/de_colores", //Placeholder Path
      },
      {
        title: "El Barquito Chiquitito",
        artist: "tonycantando",
        length: "2:13",
        score: 80,
        path: "/elbarquitochiquitito", //Placeholder Path
      },
      {
        title: "La Gallina Turuleca",
        artist: "El Reino Infantil",
        length: "2:55",
        score: 78,
        path: "la_gallina_infantil", //Placeholder Path
      },
      {
        title: "Mi Burrito Sabanero",
        artist: "Rondalla Y Coro Infantil Suarez",
        length: "3:10",
        score: 85,
        path: "mi_buritto_sabanero", //Placeholder Path
      },
    ],
    hard: [
      {
        title: "Vuela Libre",
        artist: "Javier De Lucas",
        length: "3:20",
        score: 65,
        path: "/vuela_libre.mp4", // Placeholder path
      },
      {
        title: "Mambru Se Fue A La Guerra",
        artist: "Voces Infantiles",
        length: "1:55",
        score: 70,
        path: "mambru_se_fue_a_la_guerra", //Placeholder Path
      },
      {
        title: "Enloquecer",
        artist: "Mike Leite",
        length: "3:06",
        score: 68,
        path: "enloquecer", //Placeholder Path
      },
      {
        title: "La Mar Estaba Serena",
        artist: "El Reino Infantil",
        length: "2:51",
        score: 72,
        path: "la_mar_estaba_serena", //Placeholder Path
      },
      {
        title: "Mamacita",
        artist: "Mike Leite",
        length: "3:14",
        score: 90,
        path: "/mamacita.mp4", // Placeholder path
      },
    ],
  };

  // Calculate average scores dynamically
  const calculateAvgScore = (songs) => {
    if (songs.length === 0) return 0;
    const total = songs.reduce((sum, song) => sum + song.score, 0);
    return Math.round(total / songs.length);
  };

  // User data
  const user = {
    isGuest: false,
    initials: "HM",
    avgScores: {
      easy: calculateAvgScore(songLists.easy),
      medium: calculateAvgScore(songLists.medium),
      hard: calculateAvgScore(songLists.hard),
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 p-8">
      {/* Profile Icon */}
      <div className="absolute top-4 right-4">
        {user.isGuest ? (
          <Link
            to="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Log In
          </Link>
        ) : (
          <div className="relative">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-800 font-bold">
              {user.initials}
            </div>
            <div className="absolute right-0 mt-2 w-48 bg-gray-100 rounded-lg shadow-lg hidden">
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                View Profile
              </Link>
              <Link
                to="/login"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Log Out
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Main Dashboard Content */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Dashboard
        </h1>

        {/* Song Lists */}
        <div className="grid grid-cols-3 gap-6">
          {/* Easy List */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Easy{" "}
              <span className="text-lg">
                Avg. Score: {user.avgScores.easy}%
              </span>
            </h2>
            <div className="space-y-4">
              {songLists.easy.map((song, index) => (
                <SongCard key={index} song={song} />
              ))}
            </div>
          </div>

          {/* Medium List */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Medium{" "}
              <span className="text-lg">
                Avg. Score: {user.avgScores.medium}%
              </span>
            </h2>
            <div className="space-y-4">
              {songLists.medium.map((song, index) => (
                <SongCard key={index} song={song} />
              ))}
            </div>
          </div>

          {/* Hard List */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Hard{" "}
              <span className="text-lg">
                Avg. Score: {user.avgScores.hard}%
              </span>
            </h2>
            <div className="space-y-4">
              {songLists.hard.map((song, index) => (
                <SongCard key={index} song={song} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Song Card Component
function SongCard({ song }) {
  const isCompleted = song.score >= 90;

  return (
    <div
      className={`p-4 rounded-lg shadow-lg ${
        isCompleted ? "bg-green-100" : "bg-gray-100"
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
      <p className="text-sm text-gray-600">Score: {song.score}%</p>
      <Link to="/quiz" state={song}>
        <button className="mt-2 w-full bg-blue-500 text-white py-1 rounded-lg hover:bg-blue-600 transition">
          Take Quiz
        </button>
      </Link>
    </div>
  );
}
