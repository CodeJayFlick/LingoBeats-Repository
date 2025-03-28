import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MusicPlayer from "./pages/MusicPlayer";
import Quiz from "./pages/Quiz";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/musicplayer" element={<MusicPlayer />} />
        <Route path="/quiz" element={<Quiz />} />

      </Routes>
    </div>
  );
}

export default App;
