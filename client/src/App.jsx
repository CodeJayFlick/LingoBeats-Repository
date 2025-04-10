import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MusicPlayer from "./pages/MusicPlayer";
import Quiz from "./pages/Quiz";

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} 
        />
        <Route 
          path="/musicplayer" 
          element={isAuthenticated ? <MusicPlayer /> : <Navigate to="/" />} 
        />
        <Route 
          path="/quiz" 
          element={isAuthenticated ? <Quiz /> : <Navigate to="/" />} 
        />
      </Routes>
    </div>
  );
}

export default App;