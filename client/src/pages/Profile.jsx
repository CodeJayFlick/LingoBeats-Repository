// Author: Cody Franecki
// Date of Revision: 2025-05-05

/*
    Description: This code is a React component for LingoBeats
    for assembling the profile page. This page includes a header for
    the profile page and an option to add a profile picture. The profile 
    page will also allow the user to have access to a few buttons. The buttons
    will allow the user to edit username/password, view quiz scores, logout 
    of account, or to delete their account. The profile page will also show the
    username of the user that is logged in and their overall average quiz score.
*/

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Default_Profile from "../assets/Default_Profile.png";
import { API_BASE_URL } from "../config";

function Profile() {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(null);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [overallAverage, setOverallAverage] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Fetch profile data
    fetch(`${API_BASE_URL}/profile`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.username) setUsername(data.username);
        if (data.profilePicture) setProfilePicture(data.profilePicture);
      })
      .catch((err) => {
        console.error("[ERROR] Failed to fetch profile data:", err);
        setError("Failed to fetch profile data. Please try again.");
      });

    // Fetch user scores for overall average
    fetch(`${API_BASE_URL}/auth/user/scores`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const allScores = data.flatMap(quiz => quiz.scores);
        const average = allScores.length > 0 
          ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length)
          : 0;
        setOverallAverage(average);
      })
      .catch((err) => {
        console.error("[ERROR] Failed to fetch scores:", err);
        setError("Failed to fetch scores. Please try again.");
      });
  }, []);

  const handleUploadPicture = async () => {
    const token = localStorage.getItem("token");
    if (!imageFile || !token) return;

    const formData = new FormData();
    formData.append("profilePicture", imageFile);

    try {
        const res = await fetch(`${API_BASE_URL}/profile/upload-picture`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        const data = await res.json();

        if (res.ok) {
            setProfilePicture(data.profilePicture);
            alert("Profile picture updated successfully!");
        } else {
            alert(data.error || "Failed to upload profile picture.");
        }
    } catch (error) {
        console.error("[ERROR] Failed to upload profile picture:", error);
        alert("An error occurred while uploading the profile picture. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white mb-4">Profile Page</h1>
      <h2 className="text-2xl text-white mb-4">
        Welcome, <span>{username}</span>
      </h2>
      <h3 className="text-xl text-white mb-4">
        Overall Average Score: {overallAverage}%
      </h3>

      <div className="flex flex-col items-center">
        <img src={profilePicture || Default_Profile} alt="Profile" className="w-40 h-40 rounded-full border-4 border-white shadow-md" />
        <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => {
                const file = e.target.files[0];
                setImageFile(file);
                setProfilePicture(URL.createObjectURL(file));
            }}
            className="mt-4 text-black bg-white rounded px-3 py-1"
        />
        <button 
            onClick={handleUploadPicture}
            className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 mt-2"
        >
            Save Profile Picture
        </button>
      </div>

      {error && <p className="text-red-200 mt-2">{error}</p>}

      <div className="flex flex-col items-center gap-3 mt-6">
        <button
            className="bg-white text-purple-700 font-semibold py-2 rounded hover:bg-gray-100 transition duration-300"
            onClick={() => navigate("/dashboard")}
        >
            Return to Dashboard
        </button>
        <button
          className="bg-white text-purple-700 font-semibold px-6 py-2 rounded hover:bg-gray-100"
          onClick={() => navigate("/edit-profile")}
        >
          Edit Username or Password
        </button>
        <button
          className="bg-white text-purple-700 font-semibold px-6 py-2 rounded hover:bg-gray-100"
          onClick={() => navigate("/scores")}
        >
          View Quiz Scores
        </button>
        <button
          className="bg-white text-purple-700 font-semibold px-6 py-2 rounded hover:bg-gray-100"
          onClick={() => navigate("/logout")}
        >
          Logout
        </button>
        <button
          className="bg-red-500 text-white font-semibold px-6 py-2 rounded hover:bg-red-600"
          onClick={() => navigate("/delete-profile")}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default Profile;