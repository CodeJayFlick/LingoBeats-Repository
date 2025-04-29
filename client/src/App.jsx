import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MusicPlayer from "./pages/MusicPlayer";
import Quiz from "./pages/Quiz";
import Profile_Page from "./pages/Profile_Page";
import Score_Page from "./pages/Score_Page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/musicplayer" element={<MusicPlayer />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/profile" element={<Profile_Page />} />
      <Route path="/scores" element={<Score_Page />} /> 
    </Routes>
  );
}

export default App;