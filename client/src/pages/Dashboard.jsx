import { Link } from "react-router-dom";

export default function Dashboard() {
  const songLists = {
    easy: [
      {
        title: "Caballito Blanco",
        artist: "Joel Valle",
        length: "1:14",
        score: 95,
        path: "/caballito_blanco.mp4",
      },
      {
        title: "Song 2",
        artist: "Artist 2",
        length: "2:45",
        score: 88,
        path: "",
      },
      {
        title: "Song 3",
        artist: "Artist 3",
        length: "2:30",
        score: 92,
        path: "",
      },
      {
        title: "Song 4",
        artist: "Artist 4",
        length: "3:00",
        score: 85,
        path: "",
      },
      {
        title: "Song 5",
        artist: "Artist 5",
        length: "2:50",
        score: 90,
        path: "",
      },
    ],
    medium: [
      {
        title: "Song 1",
        artist: "Artist 1",
        length: "4:20",
        score: 82,
        path: "",
      },
      {
        title: "Song 2",
        artist: "Artist 2",
        length: "3:55",
        score: 76,
        path: "",
      },
      {
        title: "Song 3",
        artist: "Artist 3",
        length: "4:00",
        score: 80,
        path: "",
      },
      {
        title: "Song 4",
        artist: "Artist 4",
        length: "3:45",
        score: 78,
        path: "",
      },
      {
        title: "Song 5",
        artist: "Artist 5",
        length: "4:10",
        score: 85,
        path: "",
      },
    ],
    hard: [
      {
        title: "Song 1",
        artist: "Artist 1",
        length: "5:10",
        score: 65,
        path: "",
      },
      {
        title: "Song 2",
        artist: "Artist 2",
        length: "4:45",
        score: 70,
        path: "",
      },
      {
        title: "Song 3",
        artist: "Artist 3",
        length: "5:30",
        score: 68,
        path: "",
      },
      {
        title: "Song 4",
        artist: "Artist 4",
        length: "4:55",
        score: 72,
        path: "",
      },
      {
        title: "Song 5",
        artist: "Artist 5",
        length: "5:20",
        score: 66,
        path: "",
      },
    ],
  };

  // Calculate average scores dynamically
  const calculateAvgScore = (songs) => {
    if (songs.length === 0) return 0;
    const total = songs.reduce((sum, song) => sum + song.score, 0);
    return Math.round(total / songs.length);
  };

  //  user data
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
      {/* Profile Icon*/}
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
      <button className="mt-2 w-full bg-blue-500 text-white py-1 rounded-lg hover:bg-blue-600 transition">
        Take Quiz
      </button>
    </div>
  );
}
