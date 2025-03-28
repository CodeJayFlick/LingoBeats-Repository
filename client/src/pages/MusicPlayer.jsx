import VideoPlayer from "../components/VideoPlayer";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function MusicPlayer() {
  const location = useLocation();
  const { state } = location;
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
      <Link to="/dashboard">
        <button className="absolute top-5 left-5 px-4 py-2 rounded-md text-white bg-indigo-500 hover:bg-indigo-600">
          Back to Dashboard
        </button>
      </Link>
      <VideoPlayer src={state.path} />
    </div>
  );
}
