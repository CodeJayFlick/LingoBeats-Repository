// Author: Cody Franecki
// Date: 2025-04-22
// Description: This file will act as the frontend for the Password Validation and give checkmarks
// for the user if they had met certain requirements for password of the account.
// If the user has typed in a password that meets certain requirements, such as having one capital
// letter, then a green checkmark will be displayed for the user.

// Import packages
import React, { useState } from "react";

// For Registration for the user
const Registration = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [token, setToken] = useState("");

// Requirements set for the password validation
const Requirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*]/.test(password),
};

// Checks every rule to see if requirements are met
const isValid = Object.values(Requirements).every(Boolean);

// Function for handling user registration
const handleSubmit = async (e) => {
    e.preventDefault();
    // Logic check for if the user does not meet requirments for the password
    if(!isValid) {
        console.log("[ERROR]: Password does not meet requirements for registration. Try Again.");
        return;
    }
    
    // Fetching the API for the registration to the lingo beats server
    try {
        const request = await fetch(`{API_BASE_URL}/register`, {
            method: "POST",
            headers: { "Conent-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await request.json();
/*
        if (request.ok) {
            console.log("{DEBUG] Resgistration successful:", data);
        }
*/
        if (!request.ok) {
            setError(data.message || "Registration failed. Please try again.");
        }

        // Save JWT token to local storage so user can have access to the app
        localStorage.setItem("token", data.token);
        setToken(data.token);
        navigate("/profile");
        setError('');
        alert('✅ Registration successful!');
    } catch (error) {
        console.error(error);
        setError("An error had occurred within registration. Please try again.");
    }
};

return (
    <div style ={{ maxWidth: "400px", margin: 'auto' }}>
        <h2>LingoBeats Registration</h2>
        <form onSubmit ={handleSubmit}>
            <input
            type="text"
            placeholder="Username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            />
            <input
            type = "password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            />

            <ul>
                <li style={{ color: Requirements.length ? "green" : "red"}}>
                    {Requirements.length ? "✅" : "❌"} Password must be at least 8 characters long.
                </li>
                <li style={{ color: Requirements.uppercase ? "green" : "red"}}>
                    {Requirements.uppercase ? "✅" : "❌"} Password must contain at least one uppercase letter.
                </li>
                <li style={{ color: Requirements.lowercase ? "green" : "red"}}>
                    {Requirements.lowercase ? "✅" : "❌"} Password must contain at least one lowercase letter.
                </li>
                <li style={{ color: Requirements.number ? "green" : "red"}}>
                    {Requirements.number ? "✅" : "❌"} Password must contain at least one number.
                </li>
                <li style={{ color: Requirements.special ? "green" : "red"}}>
                    {Requirements.special ? "✅" : "❌"} Password must contain at least one special character.
                </li>
            </ul>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <button type = "submit" disabled={!isValid}>Register</button>
        </form>

        {token && (
            <div>
                <p style={{ color: "green" }}>Token is now stored into local storage</p>
            </div>
        )}
    </div>
    );
};

export default Registration;