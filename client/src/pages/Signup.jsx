import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
  
      // Check if response exists and is valid
      if (!response.ok) {
        const errorText = await response.text(); // Read as text first
        throw new Error(errorText || 'Registration failed (no details)');
      }
  
      const data = await response.json(); // Now safe to parse
      console.log('Success:', data); // Debug log
      navigate('/login');
    } catch (err) {
      setError(err.message);
      console.error('Signup error:', err); // Debug log
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="bg-gray-100 p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">LingoBeats Signup</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-gray-800">Username</label>
            <input
              type="text"
              name="username"
              className="bg-gray-100 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-800">Password</label>
            <input
              type="password"
              name="password"
              className="bg-gray-100 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Signup
          </button>
        </form>
        <div className="text-center mt-4">
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
          <span className="mx-2">|</span>
          <Link to="/dashboard" className="text-blue-500 hover:underline">
            Continue as Guest
          </Link>
        </div>
      </div>
    </div>
  );
}