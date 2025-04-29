// Author: Cody Franecki
// Date: 2025-04-22
// Description: This file will act as the frontend for the Password Validation and give checkmarks
// for the user if they had met certain requirements for password of the account.
// If the user has typed in a password that meets certain requirements, such as having one capital
// letter, then a green checkmark will be displayed for the user.

// Import packages
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

// For Registration for the user
const Registration = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [token, setToken] = useState("");
    const navigate = useNavigate(); // For navigation to other pages

// Requirements set for the password validation
const Requirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[A-Za-z\d]/.test(password),
};

// Checks every rule to see if requirements are met
const isValid = Object.values(Requirements).every(Boolean);

// Function for handling user registration
const handleSubmit = async (e) => {
    e.preventDefault();
    // Logic check for if the user does not meet requirments for the password
    if(!isValid) {
        console.log("[ERROR]: Password does not meet requirements for registration. Try Again.");
        setError("Password does not meet requirements.");
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
    <div style ={{ maxWidth: "400px", margin: 'auto', padding: "20px" }}>
        <h2>LingoBeats Registration</h2>
        <form onSubmit ={handleSubmit}>
            <input
            type="text"
            placeholder="Username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            style={{ marginBottom: "10px", width: "100%" }}
            />
        <div style={{ position: "relative", width: "100%"}}>
            <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%", paddingRight: "40px" }}
            />
            <button
                type = "button"
                onClick={() => setShowPassword((prev) => !prev)}
                style={{ 
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                }}
            >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
        </div>

        <ul style = {{ listStyleType: "none", padding: 0 , marginTop: "10px" }}>
            <li style={{ color: passwordRequirements.length ? "green" : "red"}}>
                {passwordRequirements.length ? "✅" : "❌"} Password must be at least 8 characters long.
            </li>
            <li style={{ color: passwordRequirements.uppercase ? "green" : "red"}}>
                {passwordRequirements.uppercase ? "✅" : "❌"} Password must contain at least one uppercase letter.
            </li>
            <li style={{ color: passwordRequirements.lowercase ? "green" : "red"}}>
                {passwordRequirements.lowercase ? "✅" : "❌"} Password must contain at least one lowercase letter.
            </li>
            <li style={{ color: passwordRequirements.number ? "green" : "red"}}>
                {passwordRequirements.number ? "✅" : "❌"} Password must contain at least one number.
            </li>
             <li style={{ color: passwordRequirements.special ? "green" : "red"}}>
                    {passwordRequirements.special ? "✅" : "❌"} Password must contain at least one special character.
             </li>
            </ul>

            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

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