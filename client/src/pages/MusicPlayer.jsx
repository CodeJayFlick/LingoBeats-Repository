import VideoPlayer from "../components/VideoPlayer";
import { useLocation, Link } from "react-router-dom";

export default function MusicPlayer() {
  const location = useLocation();
  const { state } = location; // Song data passed from Dashboard

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 relative">
      {/* Dashboard Button at Top-Left */}
      <div className="absolute top-4 left-4">
        <Link to="/dashboard">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
            Dashboard
          </button>
        </Link>
      </div>

      {/* Main Content Centered */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <VideoPlayer src={state.path} />
          <Link to="/quiz" state={state}>
            <button className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition">
              Take Quiz
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
