import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MusicPlayer from "./pages/MusicPlayer";
import Quiz from "./pages/Quiz";
import Profile from "./pages/Profile";
import Scores from "./pages/Scores";
//import EditProfile from "./pages/EditProfile";
//import Logout from "./pages/Logout";
//import DeleteAccount from "./pages/DeleteAccount";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/musicplayer" element={<MusicPlayer />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/scores" element={<Scores />} />
    </Routes>
  );
}

export default App;
