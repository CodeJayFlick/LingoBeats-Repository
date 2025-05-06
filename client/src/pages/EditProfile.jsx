import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config"; // Importing the API base URL

function EditProfile() {
    const navigate = useNavigate(); // For navigation to other pages
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const token = localStorage.getItem("token");

    // Function for handling user profile update
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setMessage("Enter a new username or password.");
            return;
        }

        try {
            const payload = {};
            if (username) payload.username = username;
            if (password) payload.password = password;

            const request = await fetch(`${API_BASE_URL}/profile/update`, {
                method: "PUT",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, 
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await request.json();

            if (!request.ok) {
                setMessage(data.error || "❌ Failed to update profile.");
            } else {
                setMessage('✅ Profile changes successfully updated!');
                navigate("/profile");
                if(username) localStorage.setItem("username", username); // Update username in local storage
                setUsername("");
                setPassword("");
                setTimeout(() => navigate("/profile"), 2000); // Redirect after 2 seconds
            }
        } catch (error) {
            console.error("[UPDATE ERROR]", error);
            setMessage("An error occurred while updating the profile. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
            <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md p-6 bg-white rounded-lg shadow-md text-black">
                <div>
                    <label>New Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter new username"
                        className="p-2 rounded w-full mt-1"
                    />
                </div>

                <div>
                    <label>New Password:</label>
                    <div className="flex items-center">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                            className="p-2 rounded w-full"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="ml-2 text-sm text-blue-600 underline"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>

                {message && (
                    <p className="mt-2 text-sm" style={{ color: message.startsWith("✅") ? "green" : "red" }}>
                        {message}
                    </p>
                )}

                <button
                    type="submit"
                    className="bg-white text-purple-700 font-semibold py-2 px-4 rounded hover:bg-gray-100"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}

export default EditProfile;