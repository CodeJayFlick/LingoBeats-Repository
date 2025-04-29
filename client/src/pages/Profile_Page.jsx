// Author: Cody Franecki
// Date of Revision: 2025-04-22

/*
    Description: This code is a React component for LingoBeats
    for assembling the profile page. This page includes a header for
    the profile page and an option to add a profile picture. The profile 
    page will also allow the user to have access to a few buttons. The buttons
    will allow the user to edit username/password, view quiz scores, logout 
    of account, or to delete their account. The profile page will also show the
    username of the user that is logged in.
*/

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Default_Profile from "../assets/Default_Profile.png"; // Importing default profile picture

// The main function entering the profile page Profile Page
function Profile_Page() {
    const [profilePicture, setProfilePicture] = useState(null);
    const [username, setUsername] = useState();

    // Fetch the current user's profile data from the
    useEffect(() => {
        // Fetching JWT token from local storage of user (if it exists)
        const token = localStorage.getItem("token");
        if (!token) return; // If no token, do not fetch data
            fetch (`${API_BASE_URL}/profile`, {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` },
            })
            .then(res => res.json()) 
            .then(data => {
                if (data.username) setUsername(data.username);
            })
            .catch(err => console.error("[ERROR] Failed to fetch profile data:", err));
        }, []); // Dependency array to re-run effects when token changes 
        return (
            <div className ="profile-page">
                <h1>Welcome, {username}!</h1>
                <img src={DefaultProfile} alt="Profile" className="profile-picture" />
                <div className="profile-info">
                    <button onClick={() => navigate('/edit-profile')}>Edit Username/Password</button>
                    <button onClick={() => navigate('/scores')}>View Quiz Scores</button>
                    <button onClick={() => navigate('/logout')}>Logout</button>
                    <button onClick={() => navigate('/delete-profile')}>Delete Account</button>
                </div>
            </div>
        );
}